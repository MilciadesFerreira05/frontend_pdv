import { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TableData } from '../ui/table';
import Form from './form';
import { DeleteIcon, EditIcon } from '../ui/icons';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { AuthContext } from '../../services/Auth/AuthContext'; // Asegúrate de importar el contexto de autenticación correctamente
import CategoryService from '../../services/CategoryService'; // Importar el servicio de categorías

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const { user } = useContext(AuthContext); // Obtener los permisos del usuario desde el contexto

    useEffect(() => {
        // Cargar categorías desde la API
        const fetchCategories = async () => {
            try {
                const data = await CategoryService.getAllCategories(); // Llamada al servicio
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryCreate = async (newCategory) => {
        try {
            const createdCategory = await CategoryService.save(newCategory); // Llamada al servicio para crear la categoría
            setCategories([...categories, createdCategory]);
            setSelectedCategory(null);
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleCategoryUpdate = async (updatedCategory) => {
        try {
            const category = await CategoryService.update(updatedCategory.id, updatedCategory); // Llamada al servicio para actualizar la categoría
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
            await CategoryService.delete(categoryId); // Llamada al servicio para eliminar la categoría
            const updatedCategories = categories.filter((category) => category.id !== categoryId);
            setCategories(updatedCategories);
            setSelectedCategory(null);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const openConfirmModal = (category) => {
        setCategoryToDelete(category); // Establece la categoría que se desea eliminar
        setIsModalOpen(true);
    };

    const confirmDeleteCategory = () => {
        if (categoryToDelete) {
            handleCategoryDelete(categoryToDelete.id);
        }
        setIsModalOpen(false);
    };

    // Filtrar acciones en función de los permisos del usuario
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
                            <TableData data={categories} columns={columns} actions={getActions()} />
                        </CardContent>
                    </Card>
                </div>
            )}
            {/* Modal de Confirmación */}
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
