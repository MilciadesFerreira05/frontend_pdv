import { useEffect, useState } from 'react';
import { Link, Router } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TableData } from '../ui/table';
import {
	ArrowLeftIcon,
	ClipboardIcon,
	Package2Icon,
	PackageIcon,
	PlusIcon,
	SearchIcon,
	SettingsIcon,
	UsersIcon,
	XIcon,
} from '@/components/ui/icons';
import ProductService from '../../services/ProductService'; // Asegúrate de importar el servicio correctamente
import Sidebar from '../ui/sidebar';
import Navbar from '../ui/navbar';
import Form from './form';

export default function Products() {
	const [products, setProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);

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

	const handleProductSelect = (product) => {
		setSelectedProduct(product);
	};

	const handleProductCreate = (newProduct) => {
		setProducts([...products, newProduct]);
		setSelectedProduct(null);
	};

	const columns = [
		{ name: "id", label: "ID" },
		{ name: "name", label: "Nombre" },
		{ name: "price", label: "Precio" },
		{ name: "stock", label: "Stock" },
		{ name: "category.name", label: "Categoría" },
		{ name: "createdBy.username", label: "Creado por" },
	];

	const actions = [
		{
			label: "Edit",
			onClick: (product) => {
				setSelectedProduct(product);
			},
		},
		{
			label: "Delete",
			onClick: (product) => {
				const updatedProducts = products.filter((p) => p.id !== product.id);
				setProducts(updatedProducts);
				setSelectedProduct(null);
			},
		},
	];

	const handleProductUpdate = (updatedProduct) => {
		const updatedProducts = products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product));
		setProducts(updatedProducts);
		setSelectedProduct(null);
	};

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
			{selectedProduct ? (
				<Form selectedProduct={selectedProduct} handleProductUpdate={handleProductUpdate} handleProductCreate={handleProductCreate} setProduct={setSelectedProduct} />
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
							<TableData data={products} columns={columns} actions={actions} />
						</CardContent>
					</Card>
				</div>
			)}
		</main>
	);
}
