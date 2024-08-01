const form = ({ selectedProduct }) => {
    <div className="grid gap-4 md:gap-8">
        <div className="flex items-center">
            <Button
                variant="outline"
                size="icon"
                className="mr-4"
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
                        //handleProductUpdate(updatedProduct)
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
}

export default form