'use client'

import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { Input } from '@/components/ui/input'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
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
    {
      name: "id": 1,
      name: "name": "Laptop",
      name: "description": "High-performance laptop",
      name: "price": 999.99,
      name: "stock": 50,
      name: "category": {
        "id": 1,
        "name": "Electronics",
        "description": "Electronic devices and gadgets",
        "user": {
          "id": 1,
          "username": "john_doe",
          "email": "john@example.com",
          "password": "password123",
          "createdId": null,
          "role": null,
          "admin": true
        }
      },
      "user": {
        "id": 1,
        "username": "john_doe",
        "email": "john@example.com",
        "password": "password123",
        "createdId": null,
        "role": null,
        "admin": true
      }
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
				<div className="hidden border-r bg-muted/40 lg:block">
					<div className="flex h-full max-h-screen flex-col gap-2">
						<div className="flex h-[60px] items-center border-b px-6">
							<Link to="#" className="flex items-center gap-2 font-semibold">
								<Package2Icon className="h-6 w-6" />
								<span className="">Product Manager</span>
							</Link>
						</div>
						<div className="flex-1 overflow-auto py-2">
							<Navbar />
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
						<Link to="#" className="lg:hidden">
							<Package2Icon className="h-6 w-6" />
							<span className="sr-only">Home</span>
						</Link>
						<div className="w-full flex-1">
							<form>
								<div className="relative">
									<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										type="search"
										placeholder="Search products..."
										className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
									/>
								</div>
							</form>
						</div>
						<details className="dropdown">
							<summary className="btn m-1">open or close</summary>
							<ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
								<li>
									<a>Item 1</a>
								</li>
								<li>
									<a>Item 2</a>
								</li>
							</ul>
						</details>
					</header>
					<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
						{selectedProduct ? (
							<div className="grid gap-4 md:gap-8">
								<div className="flex items-center">
									<Button
										variant="outline"
										size="icon"
										className="mr-4"
										onClick={() => setSelectedProduct(null)}
									>
										<ArrowLeftIcon className="h-4 w-4" />
										<span className="sr-only">Back</span>
									</Button>
									<h1 className="text-2xl font-bold">{selectedProduct.name}</h1>
								</div>
								<Card>
									<CardHeader>
										<CardTitle>Product Details</CardTitle>
									</CardHeader>
									<CardContent>
										<form
											onSubmit={(e) => {
												e.preventDefault()
												const formData = new FormData(e.target)
												const updatedProduct = {
													id: selectedProduct.id,
													name: formData.get('name'),
													description: formData.get('description'),
													category_id: formData.get('category_id'),
													price: parseFloat(formData.get('price')),
													stock: parseInt(formData.get('stock')),
												}
												handleProductUpdate(updatedProduct)
											}}
										>
											<div className="grid gap-4">
												<div className="grid gap-2">
													<Label htmlFor="name">Name</Label>
													<Input id="name" type="text" defaultValue={selectedProduct.name} />
												</div>
												<div className="grid gap-2">
													<Label htmlFor="description">Description</Label>
													<Textarea
														id="description"
														defaultValue={selectedProduct.description}
													/>
												</div>
												<div className="grid gap-2">
													<Label htmlFor="category_id">Category</Label>
													<Input
														id="category_id"
														type="text"
														defaultValue={selectedProduct.category.nmae}
													/>
												</div>
												<div className="grid grid-cols-2 gap-4">
													<div className="grid gap-2">
														<Label htmlFor="price">Price</Label>
														<Input
															id="price"
															type="number"
															step="0.01"
															defaultValue={selectedProduct.price}
														/>
													</div>
													<div className="grid gap-2">
														<Label htmlFor="stock">Stock</Label>
														<Input
															id="stock"
															type="number"
															defaultValue={selectedProduct.stock}
														/>
													</div>
												</div>
												<div className="flex justify-end">
													<Button type="submit">Save</Button>
												</div>
											</div>
										</form>
									</CardContent>
								</Card>
							</div>
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
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Name</TableHead>
													<TableHead>Category</TableHead>
													<TableHead>Price</TableHead>
													<TableHead>Stock</TableHead>
													<TableHead></TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{products?.map((product) => (
													<TableRow key={product.id}>
														<TableCell>{product.name}</TableCell>
														<TableCell>{product.category.name}</TableCell>
														<TableCell>${product.price.toFixed(2)}</TableCell>
														<TableCell>{product.stock}</TableCell>
														<TableCell>
															<Button
																variant="outline"
																size="icon"
																onClick={() => handleProductSelect(product)}
															>
																Edit
															</Button>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
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
