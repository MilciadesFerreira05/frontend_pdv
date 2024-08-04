import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeftIcon } from '../ui/icons';
import {Label} from '../ui/label';
import {Input} from '../ui/input';
import {Textarea} from '../ui/textarea';

const Form = ({ selectedCategory, handleCategoryUpdate, handleCategoryCreate, setCategory}) => {

    return <div className="grid gap-4 md:gap-8">
        <div className="flex items-center">
            <Button
                variant="outline"
                size="icon"
                className="mr-4"
                onClick={() => setCategory(null)}
            >
                <ArrowLeftIcon className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-2xl font-bold">{selectedCategory.name}</h1>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>{selectedCategory ? 'Actualizar Producto' : 'Crear Producto'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.target)
                        const Category = {
                            id: selectedCategory.id || null,
                            name: formData.get('name'),
                            description: formData.get('description'),
                        }
                        selectedCategory ? handleCategoryUpdate(Category) : handleCategoryCreate(Category)
                    }}
                >
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" defaultValue={selectedCategory.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                defaultValue={selectedCategory.description}
                            />
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