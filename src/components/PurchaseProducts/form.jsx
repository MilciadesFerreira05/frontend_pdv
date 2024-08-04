import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { SearchIcon } from "../ui/icons"
import Select from 'react-select'

const Form = () => {
	return (
		<Card className="w-full max-w-[100%]">
			<CardHeader>
				<CardTitle>Compra de productos</CardTitle>
			</CardHeader>
			<CardContent>
				<form className="grid gap-6">
					<div className="grid sm:grid-cols-3 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Fecha</Label>
							<Input id="date" type="date" placeholder="" defaultValue={new Date()} />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="supplier">Proveedor</Label>
							<Select />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="client">Nro. de Factura</Label>
							<Input id="invoice" type="text" placeholder="" />
						</div>
					</div>

					<div>
						<div className="flex justify-end mt-4 font-semibold text-red-600 text-xl">Total: $42.98</div>
						<Label className="font-semibold">Productos</Label>
						<p className="text-sm text-muted-foreground">Lista de productos comprados</p>
						<div className="border rounded-lg mt-2 p-4">
							<div className="relative mb-4">
								<Input
									type="search"
									placeholder="Buscar productos..."
									className="w-full rounded-lg bg-background pl-8"
								/>
								<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							</div>
							<table className="w-full">
								<thead>
									<tr className="border-b">
										<th className="text-left pb-2 w-58"></th>
										<th className="text-center pb-2 w-52">Cantidad</th>
										<th className="text-center pb-2 w-52">Precio</th>
										<th className="text-right pb-2 w-52">Subtotal</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b">
										<td className="py-2">
											<div className="flex items-center gap-3">
												<img
													src="/placeholder.svg"
													alt="Product Image"
													width={50}
													height={50}
													className="rounded-md"
													style={{ aspectRatio: '50/50', objectFit: 'cover' }}
												/>
												<div>
													<h4 className="font-medium">Prodcuto 1</h4>
													<p className="text-sm text-muted-foreground">
														Descripción del producto 1
													</p>
												</div>
											</div>
										</td>
										<td className="text-right py-2">
											<Input type="number" defaultValue="10" className="w-52"/>
										</td>
										<td className="text-right py-2">
											<Input type="number" defaultValue="7500" className="w-52"/>
										</td>
										<td className="text-right py-2">75.000</td>
									</tr>
									<tr className="border-b">
										<td className="py-2">
											<div className="flex items-center gap-3">
												<img
													src="/placeholder.svg"
													alt="Product Image"
													width={50}
													height={50}
													className="rounded-md"
													style={{ aspectRatio: '50/50', objectFit: 'cover' }}
												/>
												<div>
													<h4 className="font-medium">Prodcuto 2</h4>
													<p className="text-sm text-muted-foreground">
														Descripción del producto 2
													</p>
												</div>
											</div>
										</td>
										<td className="text-right py-2">
											<Input type="number" defaultValue="10" className="w-52"/>
										</td>
										<td className="text-right py-2">
											<Input type="number" defaultValue="7500" className="w-52"/>
										</td>
										<td className="text-right py-2">75.000</td>
									</tr>
								</tbody>
							</table>
							
						</div>
					</div>
				</form>
			</CardContent>
			{/* <CardFooter>
				<Button type="submit" className="ml-auto">
					Complete Purchase
				</Button>
			</CardFooter> */}
		</Card>
	)
}

export default Form
