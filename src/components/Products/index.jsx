"use client"

import { useState } from "react"
import { Link, BrowserRouter as Router, Route } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import {ArrowLeftIcon,
    ClipboardIcon,
    Package2Icon,
    PackageIcon,
    PlusIcon,
    SearchIcon,
    SettingsIcon,
    UsersIcon,
    XIcon } from "@/components/ui/icons";

export default function Products() {
  const [products, setProducts] = useState([
    {
      id: "PROD001",
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      category: "Electronics",
      price: 99.99,
      stock: 50,
    },
    {
      id: "PROD002",
      name: "Cotton T-Shirt",
      description: "Soft and comfortable 100% cotton t-shirt",
      category: "Clothing",
      price: 24.99,
      stock: 100,
    },
    {
      id: "PROD003",
      name: "Ceramic Mug",
      description: "Handcrafted ceramic mug with a unique design",
      category: "Home",
      price: 12.99,
      stock: 75,
    },
    {
      id: "PROD004",
      name: "Hiking Backpack",
      description: "Durable and spacious backpack for outdoor adventures",
      category: "Outdoor",
      price: 79.99,
      stock: 30,
    },
  ])
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const handleProductSelect = (product) => {
    setSelectedProduct(product)
  }

  const handleProductCreate = (newProduct) => {
    setProducts([...products, newProduct])
    setSelectedProduct(null)
  }

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
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link to="#" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                  <PackageIcon className="h-4 w-4" />
                  Products
                </Link>
                <Link to="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <ClipboardIcon className="h-4 w-4" />
                  Orders
                </Link>
                <Link to="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <UsersIcon className="h-4 w-4" />
                  Customers
                </Link>
                <Link to="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full border w-8 h-8">
                  <img src="/placeholder.svg" width="32" height="32" className="rounded-full" alt="Avatar" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {selectedProduct ? (
              <div className="grid gap-4 md:gap-8">
                <div className="flex items-center">
                  <Button variant="outline" size="icon" className="mr-4" onClick={() => setSelectedProduct(null)}>
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
                          name: formData.get("name"),
                          description: formData.get("description"),
                          category: formData.get("category"),
                          price: parseFloat(formData.get("price")),
                          stock: parseInt(formData.get("stock")),
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
                          <Textarea id="description" defaultValue={selectedProduct.description} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="category">Category</Label>
                          <Input id="category" type="text" defaultValue={selectedProduct.category} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" type="number" step="0.01" defaultValue={selectedProduct.price} />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input id="stock" type="number" defaultValue={selectedProduct.stock} />
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
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="icon" onClick={() => handleProductSelect(product)}>
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
