import { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TableData } from '../ui/table';
import Form from './form';
import { DeleteIcon, EditIcon } from '../ui/icons';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { AuthContext } from '../../services/Auth/AuthContext';
import CategoryService from '../../services/CategoryService';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [pageSize] = useState(10); // Tamaño de página
    const [totalElements, setTotalElements] = useState(0); // Total de elementos
    const { user } = useContext(AuthContext);

    const fetchCategories = async (page) => {
        try {
            const response = await CategoryService.getAllCategories({ page, size: pageSize });
            setCategories(response.content); // Asumiendo que la respuesta tiene un campo 'content' con las categorías
            setTotalElements(response.totalElements); // Asumiendo que la respuesta tiene un campo 'totalElements'
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories(currentPage); // Llamada a la función de carga de categorías
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < Math.ceil(totalElements / pageSize)) {
            setCurrentPage(newPage); // Actualizar la página actual
        }
    };

    const handleCategoryCreate = async (newCategory) => {
        try {
            const createdCategory = await CategoryService.save(newCategory);
            setCategories([...categories, createdCategory]);
            setSelectedCategory(null);
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleCategoryUpdate = async (updatedCategory) => {
        try {
            const category = await CategoryService.update(updatedCategory.id, updatedCategory);
            const updatedCategories = categories.map((cat) =>
                cat.id === updatedCategory.id ? category : cat
            );
            setCategories(updatedCategories);
            setSelectedCategory(null);
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleCategoryDelete = async (categoryId) => {
        try {
            await CategoryService.delete(categoryId);
            const updatedCategories = categories.filter((category) => category.id !== categoryId);
            setCategories(updatedCategories);
            setSelectedCategory(null);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const openConfirmModal = (category) => {
        setCategoryToDelete(category);
        setIsModalOpen(true);
    };

    const confirmDeleteCategory = () => {
        if (categoryToDelete) {
            handleCategoryDelete(categoryToDelete.id);
        }
        setIsModalOpen(false);
    };

    const getActions = () => {
        const actions = [];
        if (user?.authorities.includes('Category.update')) {
            actions.push({
                label: "Editar",
                icon: <EditIcon className="h-4 w-4" />,
                onClick: (category) => setSelectedCategory(category),
            });
        }
        if (user?.authorities.includes('Category.delete')) {
            actions.push({
                label: "Eliminar",
                icon: <DeleteIcon className="h-4 w-4" />,
                onClick: (category) => openConfirmModal(category),
            });
        }
        return actions;
    };

    const columns = [
        { name: "id", label: "ID" },
        { name: "name", label: "Nombre" },
        { name: "description", label: "Descripción" },
    ];

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {selectedCategory ? (
                <Form
                    selectedCategory={selectedCategory}
                    handleCategoryUpdate={handleCategoryUpdate}
                    handleCategoryCreate={handleCategoryCreate}
                    setCategory={setSelectedCategory}
                />
            ) : (
                <div className="grid gap-4 md:gap-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Categorías</h1>
                        {user?.authorities.includes('Category.create') && (
                            <Button variant="primary" onClick={() => setSelectedCategory({})}>
                                Crear Categoría
                            </Button>
                        )}
                    </div>
                    <Card>
                        <CardContent>
                            <TableData 
                                data={categories} 
                                columns={columns} 
                                actions={getActions()} 
                                totalElements={totalElements}
                                pageSize={pageSize}
                                onPageChange={handlePageChange}
                            />
                        </CardContent>
                    </Card>
                </div>
            )}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDeleteCategory}
                title="Confirmar eliminación"
                message="¿Estás seguro de que deseas eliminar esta categoría?"
            />
        </main>
    );
}
