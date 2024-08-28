import { useEffect, useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TableData } from '../ui/table';
import ProductService from '../../services/ProductService'; // Asegúrate de importar el servicio correctamente
import Form from './form';
import { AuthContext } from '../../services/Auth/AuthContext'; // Asegúrate de importar el contexto de autenticación correctamente

export default function Products() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useContext(AuthContext); // Obtener los permisos del usuario desde el contexto

    useEffect(() => {
        // Cargar productos desde la API
        const fetchProducts = async () => {
            try {
                const data = await ProductService.getAllProducts(); // Llamada al servicio
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductCreate = async (newProduct) => {
        try {
            const createdProduct = await ProductService.save(newProduct); // Llamada al servicio para crear el producto
            setProducts([...products, createdProduct]);
            setSelectedProduct(null);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleProductUpdate = async (updatedProduct) => {
        try {
            const product = await ProductService.update(updatedProduct.id, updatedProduct); // Llamada al servicio para actualizar el producto
            const updatedProducts = products.map((product) => 
                product.id === updatedProduct.id ? product : product
            );
            setProducts(updatedProducts);
            setSelectedProduct(null);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleProductDelete = async (productId) => {
        try {
            await ProductService.delete(productId); // Llamada al servicio para eliminar el producto
            const updatedProducts = products.filter((p) => p.id !== productId);
            setProducts(updatedProducts);
            setSelectedProduct(null);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Filtrar acciones en función de los permisos del usuario
    const getActions = () => {
        const actions = [];
        if (user?.authorities.includes('Product.create')) {
            actions.push({
                label: "Add",
                onClick: () => setSelectedProduct({})
            });
        }
        if (user?.authorities.includes('Product.update')) {
            actions.push({
                label: "Edit",
                onClick: (product) => setSelectedProduct(product),
            });
        }
        if (user?.authorities.includes('Product.delete')) {
            actions.push({
                label: "Delete",
                onClick: (product) => {
                    if (window.confirm('Are you sure you want to delete this product?')) {
                        handleProductDelete(product.id);
                    }
                },
            });
        }
        return actions;
    };

    const columns = [
        { name: "id", label: "ID" },
        { name: "name", label: "Nombre" },
        { name: "price", label: "Precio" },
        { name: "stock", label: "Stock" },
        { name: "category.name", label: "Categoría" },
        { name: "createdBy.username", label: "Creado por" },
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
                        <Button variant="primary" onClick={() => setSelectedProduct({})}>
                            Add Product
                        </Button>
                    </div>
                    <Card>
                        <CardContent>
                            <TableData data={products} columns={columns} actions={getActions()} />
                        </CardContent>
                    </Card>
                </div>
            )}
        </main>
    );
}
