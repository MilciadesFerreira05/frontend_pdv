import { useEffect, useState, useRef } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { SearchIcon, DeleteIcon, NoImageIcon, ArrowLeftIcon } from '../ui/icons' // Asumiendo que tienes un icono de basura
import Select from 'react-select'
import ProductService from '../../services/ProductService'
import ClientService from './../../services/ClientService'

const SaleProductsForm = ({ selectedSale, handleSaleUpdate, handleSaleCreate, setSale }) => {
	const [clients, setClients] = useState([])
	const [products, setProducts] = useState([])
	const [searchResults, setSearchResults] = useState([])
	const [selectedClient, setSelectedClient] = useState(selectedSale.client || null)
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedProducts, setSelectedProducts] = useState(selectedSale.items || [])
	const [total, setTotal] = useState(0)
	const [isNewSale, setIsNewSale] = useState(Object.keys(selectedSale).length === 0)
	const inputRef = useRef(null)

	useEffect(() => {
		const fetchClients = async () => {
			try {
				const result = await ClientService.getAllClients()
				setClients(result.content)
			} catch (error) {
				console.error('Error fetching clients:', error)
			}
		}

		fetchClients()
	}, [])

	useEffect(() => {
		const newTotal = selectedProducts.reduce((acc, product) => acc + product.quantity * product.price, 0)
		setTotal(newTotal)
	}, [selectedProducts])

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const result = await ProductService.searchProducts({ q: searchQuery })
				setSearchResults(result.content)
			} catch (error) {
				console.error('Error fetching products:', error)
			}
		}

		if (searchQuery) {
			fetchProducts()
		} else {
			setSearchResults([])
		}
	}, [searchQuery])

	const handleProductSelect = (product) => {
		setSelectedProducts((prevSelectedProducts) => {
			// Verifica si el producto ya está en la lista
			const existingProduct = prevSelectedProducts.find((p) => p.product.id === product.id)

			if (existingProduct) {
				// Si ya está en la lista, incrementa la cantidad
				return prevSelectedProducts.map((p) =>
					p.product.id === product.id
						? {
								...p,
								quantity: Number(p.quantity) + 1,
								price: p.price,
								subtotal: (Number(p.quantity) + 1) * p.price || 0,
						  }
						: p
				)
			} else {
				// Si no está en la lista, agrega un nuevo producto con cantidad 1
				return [
					...prevSelectedProducts,
					{
						product: { id: product.id, name: product.name },
						quantity: 1,
						price: product.price,
						subtotal: product.price,
					},
				]
			}
		})

		setSearchQuery('')
		setSearchResults([])
		updateTotal()
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}

	const handleProductChange = (event, index, field) => {
		const newProducts = [...selectedProducts]
		const updatedValue = event.target.value

		// Actualiza el campo correspondiente (quantity o price)
		newProducts[index] = { ...newProducts[index], [field]: updatedValue }

		// Actualiza el subtotal basado en la nueva cantidad o precio
		const quantity = Number(newProducts[index].quantity) || 0
		const price = Number(newProducts[index].price) || 0
		newProducts[index].subtotal = quantity * price

		setSelectedProducts(newProducts)

		// Luego de actualizar los productos, recalcula el total
		const newTotal = newProducts.reduce((acc, product) => acc + product.subtotal, 0)
		setTotal(newTotal)
	}

	const handleRemoveProduct = (index) => {
		const newProducts = [...selectedProducts]
		newProducts.splice(index, 1) // Elimina el producto en el índice dado
		setSelectedProducts(newProducts)

		// Recalcula el total después de eliminar un producto
		const newTotal = newProducts.reduce((acc, product) => acc + product.subtotal, 0)
		setTotal(newTotal)
	}

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value)
	}

	const updateTotal = () => {
		const newTotal = selectedProducts.reduce((acc, product) => acc + product.quantity * product.price, 0)
		setTotal(newTotal)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		const formData = new FormData(event.target)

		const errors = {}
		if (!formData.get('date')) {
			errors.date = 'Fecha es requerido'
		}
		if (!selectedClient) {
			errors.client = 'Cliente es requerido'
		}
		// if (!formData.get('invoice')) {
		// 	errors.invoice = 'Factura es requerido'
		// }
		if (total <= 0) {
			errors.total = 'El total es requerido'
		}
		if (selectedProducts.length === 0) {
			errors.products = 'Debe agregar al menos un producto'
		} else {
			selectedProducts.forEach((product) => {
				if (!product.quantity || product.quantity <= 0) {
					errors.quantity = 'La cantidad es requerida'
				}
				if (!product.price || product.price <= 0) {
					errors.price = 'El precio es requerido'
				}
			})
		}
		if (Object.keys(errors).length > 0) {
			alert(`Faltan campos obligatorios: ${Object.values(errors).join(', ')}`)
			return
		}

		const sale = {
			id: selectedSale?.id,
			date: formData.get('date'),
			client: selectedClient,
			invoiceNumber: formData.get('invoice'),
			items: selectedProducts.map((p) => ({
				...p,
				quantity: Number(p.quantity),
				price: Number(p.price),
				subtotal: p.quantity * p.price,
			})),
			total: total,
		}

		if (isNewSale) {
			console.log('New sale:', sale)

			handleSaleCreate(sale)
		} else {
			handleSaleUpdate(sale)
		}
	}

	return (
		<div className="grid gap-4 md:gap-8">
			<div className="flex items-center">
				<Button variant="outline" size="icon" className="mr-4" onClick={() => setSale(null)}>
					<ArrowLeftIcon className="h-4 w-4" />
					<span className="sr-only">Back</span>
				</Button>
				<h1 className="text-2xl font-bold">{isNewSale ? 'Nueva venta' : 'Editar venta'}</h1>
			</div>

			<Card className="w-full max-w-[100%]">
				<CardHeader>
					<CardTitle>Compra de productos</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="grid gap-6" onSubmit={handleSubmit}>
						<div className="grid sm:grid-cols-3 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="date">Fecha</Label>
								<Input
									id="date"
									name="date"
									type="date"
									defaultValue={selectedSale?.date || new Date().toISOString().split('T')[0]}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="client">Cliente</Label>
								<Select
									id="client"
									getOptionLabel={(option) => option.name}
									getOptionValue={(option) => option.id}
									options={clients.map((s) => ({ id: s.id, name: s.name }))}
									onChange={(selectedOption) => setSelectedClient(selectedOption)}
									value={clients.find((option) => option.id === selectedSale?.client?.id)}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="invoice">Nro. de Factura</Label>
								<Input
									id="invoice"
									name="invoice"
									type="text"
									placeholder=""
									defaultValue={selectedSale?.invoiceNumber || ''}
								/>
							</div>
						</div>

						<div>
							<div className="flex justify-end mt-4 font-semibold text-red-600 text-xl">
								Total: {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'PYG' }).format(selectedSale?.total  || total.toFixed(2)).replace('PYG', '₲')}
							</div>
							<Label className="font-semibold">Productos</Label>
							<p className="text-sm text-muted-foreground">Lista de productos comprados</p>
							<div className="border rounded-lg mt-2 p-4">
								{/* search */}
								<div className="relative mb-4">
									<Input
										type="search"
										placeholder="Buscar productos..."
										className="w-full rounded-lg bg-background pl-8"
										value={searchQuery}
										onChange={handleSearchChange}
										ref={inputRef}
									/>
									<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
									{searchResults.length > 0 && (
										<div className="absolute z-10 w-full bg-white border border-gray-200 rounded mt-1 max-h-60 overflow-y-auto shadow-lg">
											{searchResults.map((product) => (
												<div
													key={product.id}
													className="flex justify-between p-2 cursor-pointer hover:bg-gray-100"
													onClick={() => handleProductSelect(product)}
												>
													<div className="flex gap-4">
														<div className="w-10 h-10 rounded-full bg-gray-100"></div>
														<div className="flex flex-col">
															<div className="flex items-center">
																<span className="font-medium">{product.name}</span>
																<span className="ml-2 text-sm text-gray-500">
																	({product.code})
																</span>{' '}
																{/* Aquí el código al lado del nombre */}
															</div>
															<span className="text-sm text-gray-500 truncate">
																{product.description}
															</span>
														</div>
													</div>

													<div className="flex gap-4 mr-2">
														{product.stockControl && (
															<span className="text-sm text-gray-500">
																Stock: {product.stock}
															</span>
														)}
														<span className="text-sm font-semibold">${product.price}</span>
													</div>
												</div>
											))}
										</div>
									)}
								</div>

								{/* table */}
								<table className="w-full">
									<thead>
										<tr className="border-b">
											<th className="text-left pb-2 w-58">Producto</th>
											<th className="text-center pb-2 w-24">Cantidad</th>
											<th className="text-center pb-2 w-40">Precio de venta</th>
											<th className="text-right pb-2 w-40">Subtotal</th>
											<th className="text-right pb-2 w-20"></th>
										</tr>
									</thead>
									<tbody>
										{selectedProducts.map((item, index) => (
											<tr key={item.id} className="border-b">
												<td className="py-2">
													<div className="flex items-center gap-3">
														<div className="w-10 h-10 rounded-full bg-gray-100"></div>
														<div>
															<h4 className="font-medium">{item.product.name}</h4>
															<p className="text-sm text-muted-foreground">
																{item.product.description}
															</p>
														</div>
													</div>
												</td>
												<td className="text-right py-2">
													<Input
														type="number"
														value={item.quantity}
														onInput={(e) => handleProductChange(e, index, 'quantity')}
														className="w-52"
													/>
												</td>
												<td className="text-right py-2">
													<Input
														type="number"
														value={item.price}
														readOnly
														step="0.01"
														onInput={(e) => handleProductChange(e, index, 'price')}
														className="w-52"
													/>
												</td>

												<td className="text-right py-2">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'PYG' }).format(item.subtotal.toFixed(2)).replace('PYG', '₲')}</td> 
												<td className="text-right py-2">
													<Button
														type="button"
														className="p-1 text-red-600 hover:text-red-800"
														onClick={() => handleRemoveProduct(index)}
													>
														<DeleteIcon className="w-4 h-4" />
													</Button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						<div className="flex justify-between mt-4 items-center">
							<div className="flex items-center">
								<input type="checkbox" id="printOnSave" name="printOnSave" className="mr-2" defaultChecked />
								<label htmlFor="printOnSave" className="text-gray-700">
									Imprimir al guardar
								</label>
							</div>
							<Button type="submit">Completar compra</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}

export default SaleProductsForm
