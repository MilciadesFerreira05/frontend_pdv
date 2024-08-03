import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeftIcon } from '../ui/icons';
import {Label} from '../ui/label';
import {Input} from '../ui/input';
import {Textarea} from '../ui/textarea';
import Select from 'react-select'

const Form = ({ selectedProduct, handleProductUpdate, handleProductCreate, setProduct}) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ];

    return <div className="grid gap-4 md:gap-8">
        <div className="flex items-center">
            <Button
                variant="outline"
                size="icon"
                className="mr-4"
                onClick={() => setProduct(null)}
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

                            <Select options={options} isMulti />
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

                                <Label htmlFor="stock">IVA %</Label>
                                <Input
                                    id="iva"
                                    type="number"
                                    defaultValue={selectedProduct.iva}
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

export default Form