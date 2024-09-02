import { useEffect, useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TableData } from '../ui/table';
import ProductService from '../../services/ProductService';
import Form from './form';
import { AuthContext } from '../../services/Auth/AuthContext';
import { DeleteIcon, EditIcon } from '../ui/icons';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); // Estado para la página actual
    const [pageSize] = useState(10); // Tamaño de página
    const [totalElements, setTotalElements] = useState(0); // Estado para el total de elementos
    const { user } = useContext(AuthContext);

    // Mover la función fetchProducts antes del useEffect
    const fetchProducts = async (page) => {
        try {
            const response = await ProductService.getAllProducts({ page, size: pageSize });
            setProducts(response.content); // Asumiendo que la respuesta tiene un campo 'content' con los productos
            setTotalElements(response.totalElements); // Asumiendo que la respuesta tiene un campo 'totalElements'
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage); // Llamada a la función de carga de productos
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage); // Actualizar la página actual
    };

    const handleProductCreate = async (newProduct) => {
        try {
            const createdProduct = await ProductService.save(newProduct);
            setProducts([...products, createdProduct]);
            setSelectedProduct(null);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleProductUpdate = async (updatedProduct) => {
        try {
            const product = await ProductService.update(updatedProduct.id, updatedProduct);
            const updatedProducts = products.map((p) => 
                p.id === updatedProduct.id ? product : p
            );
            setProducts(updatedProducts);
            setSelectedProduct(null);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleProductDelete = async (productId) => {
        try {
            await ProductService.delete(productId);
            const updatedProducts = products.filter((p) => p.id !== productId);
            setProducts(updatedProducts);
            setSelectedProduct(null);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const openConfirmModal = (product) => {
        setProductToDelete(product);
        setIsModalOpen(true);
    };
    
    const confirmDeleteProduct = () => {
        if (productToDelete) {
            handleProductDelete(productToDelete.id);
        }
        setIsModalOpen(false);
    };

    const getActions = () => {
        const actions = [];
        if (user?.authorities.includes('Product.update')) {
            actions.push({
                label: "Editar",
                icon: <EditIcon className="h-4 w-4"/>,
                onClick: (product) => setSelectedProduct(product),
            });
        }
        if (user?.authorities.includes('Product.delete')) {
            actions.push({
                label: "Eliminar",
                icon: <DeleteIcon className="h-4 w-4"/>,
                onClick: (product) => openConfirmModal(product),
            });
        }
        return actions;
    };

    const columns = [
        { name: "id", label: "ID" },
        { name: "code", label: "Código" },
        { name: "name", label: "Nombre" },
        { name: "price", label: "Precio" },
        { name: "stock", label: "Stock" },
        { name: "category.name", label: "Categoría" },
    ];

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {selectedProduct ? (
                <Form
                    selectedProduct={selectedProduct}
                    handleProductUpdate={handleProductUpdate}
                    handleProductCreate={handleProductCreate}
                    setProduct={setSelectedProduct}
                />
            ) : (
                <div className="grid gap-4 md:gap-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Products</h1>
                        {user?.authorities.includes('Product.create') && (
                            <Button variant="primary" onClick={() => setSelectedProduct({})}>
                                Crear
                            </Button>
                        )}
                    </div>
                    <Card>
                        <CardContent>
                            <TableData 
                                data={products} 
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
                onConfirm={confirmDeleteProduct}
                title="Confirmar eliminación"
                message="¿Estás seguro de que deseas eliminar este producto?"
            />
        </main>
    );
}
