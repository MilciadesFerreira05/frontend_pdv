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
import { getProducts } from '../../services/api';
import Sidebar from '../ui/sidebar';
import Navbar from '../ui/navbar';
import Form from './form';

export default function Products() {
	const [products, setProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);


	//   useEffect(() => {
	//     const fetchProducts = async () => {
	//       const products = await getProducts();
	//       setProducts(products);
	//     };
	//     fetchProducts();
	//   }, []);

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
		{ name: "user.username", label: "Creado por" },
	];

	const fakeData = [
		{
			id: 1,
			name: "Producto 1",
			price: 10.99,
			description: "Descripción del producto 1",
			stock: 10,
			category: { name: "Categoria 1" },
			user: { username: "Usuario 1" },
		},
		{
			id: 2,
			name: "Producto 2",
			price: 20.99,
			description: "Descripción del Producto 2",
			stock: 20,
			category: { name: "Categoria 2" },
			user: { username: "Usuario 2" },
		},
		{
			id: 3,
			name: "Producto 3",
			price: 30.99,
			description: "Descripción del Producto 3",
			stock: 30,
			category: { name: "Categoria 3" },
			user: { username: "Usuario 3" },
		},
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
		<Router>
			<div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[280px_1fr]">
				<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
				<div className="flex flex-col">
					<Navbar toggleSidebar={toggleSidebar} />
					<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
						{
							selectedProduct ?
								<Form selectedProduct={selectedProduct} handleProductUpdate={handleProductUpdate} handleProductCreate={handleProductCreate} setProduct={setSelectedProduct}/>
								:
								<div className="grid gap-4 md:gap-8">
									<div className="flex justify-between items-center">
										<h1 className="text-2xl font-bold">Products</h1>
										<Button variant="primary" onClick={() => setSelectedProduct({})}>
											Add Product
										</Button>
									</div>
									<Card>
										<CardContent>
											<TableData data={fakeData} columns={columns} actions={actions} />
										</CardContent>
									</Card>
								</div>
						}
					</main>
				</div>
			</div>
		</Router>
	);
}
