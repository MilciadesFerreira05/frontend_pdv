'use client'

import { useEffect, useState } from 'react'
import { Link, Router } from 'wouter'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TableData } from '../ui/table'
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
} from '@/components/ui/icons'
import { getProducts } from '../../services/api'
import Sidebar from '../ui/sidebar'
import Navbar from '../ui/navbar'

export default function Products() {
	const [products, setProducts] = useState([])
	console.log(products)
	const [selectedProduct, setSelectedProduct] = useState(null)

	useEffect(() => {
		const fetchProducts = async () => {
			const products = await getProducts()
			console.log(products)
			setProducts(products)
		}
		fetchProducts()
	}, [])

	const handleProductSelect = (product) => {
		setSelectedProduct(product)
	}

	const handleProductCreate = (newProduct) => {
		setProducts([...products, newProduct])
		setSelectedProduct(null)
	}

	const columns = [
      {name: "id",label: "ID"},
      {name: "name",label: "Nombre"},
      {name: "description",label: "Descripción"},
      {name: "price",label: "Precio"},
      {name: "stock",label: "Stock"},
      {name: "category.name",label: "Categoría"},
      {name: "user.username", label: "Creado por"},
	]


	const fakeData = [
		{
			id: 1,
			name: "Producto 1",
			description: "Descripción del producto 1",
			price: 10.99,
			stock: 10,
			category: {name:"Categoria 1"},
			user: {username: "Usuario 1"},
		},
		{
			id: 2,
			name: "Producto 2",
			description: "Descripción del producto 2",
			price: 20.99,
			stock: 20,
			category: {name:"Categoria 2"},
			user: {username: "Usuario 2"},
		},
		{
			id: 3,
			name: "Producto 3",
			description: "Descripción del producto 3",
			price: 30.99,
			stock: 30,
			category: {name:"Categoria 3"},
			user: {username: "Usuario 3"},
		},
	]

	const handleProductUpdate = (updatedProduct) => {
		const updatedProducts = products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
		setProducts(updatedProducts)
		setSelectedProduct(null)
	}

	return (
		<Router>
			<div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[280px_1fr]">
        <Sidebar />
				<div className="flex flex-col">
          <Navbar/>
					<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
						{(
							<div className="grid gap-4 md:gap-8">
								<div className="flex justify-between items-center">
									<h1 className="text-2xl font-bold">Products</h1>
									<Button variant="primary" onClick={() => setSelectedProduct({})}>
										Add Product
									</Button>
								</div>
								<Card>
									<CardContent>
                      <TableData data={fakeData} columns={columns}/>
									</CardContent>
								</Card>
							</div>
						)}
					</main>
				</div>
			</div>
		</Router>
	)
}
