import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeftIcon } from '../ui/icons';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import Select from 'react-select';
import CategoryService from '../../services/CategoryService';

const Form = ({ selectedProduct, handleProductUpdate, handleProductCreate, setProduct }) => {
  const [categories, setCategories] = useState([]);
  const [isNewProduct, setIsNewProduct] = useState(!selectedProduct);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getAllCategories();
        const options = data.map(category => ({
          value: category.id,
          label: category.name
        }));
        setCategories(options);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProduct = {
      id: selectedProduct?.id,
      code: formData.get('code'),
      name: formData.get('name'),
      description: formData.get('description'),
      category: { id: formData.get('category_id') },
      price: parseFloat(formData.get('price')),
      iva: parseInt(formData.get('iva')),
      stock: parseInt(formData.get('stock')),
      stockControl: formData.get('stockControl') === 'on'
    };

    if (isNewProduct) {
      handleProductCreate(updatedProduct);
    } else {
      handleProductUpdate(updatedProduct);
    }
  };

  return (
    <div className="grid gap-4 md:gap-8">
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
        <h1 className="text-2xl font-bold">{isNewProduct ? 'New Product' : selectedProduct.name}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  type="text"
                  defaultValue={selectedProduct?.code || ''}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  defaultValue={selectedProduct?.name || ''}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  defaultValue={selectedProduct?.description || ''}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category_id">Category</Label>
                <Select
                  options={categories}
                  defaultValue={categories.find(option => option.value === selectedProduct?.category?.id)}
                  name="category_id"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  defaultValue={selectedProduct?.price || ''}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="iva">IVA %</Label>
                <Input
                  id="iva"
                  type="number"
                  defaultValue={selectedProduct?.iva || ''}
                />
              </div>
              <div className="grid gap-2 ">
                <Checkbox
                    id="stockControl"
                    defaultChecked={selectedProduct?.stockControl || false}
                />
                <Label htmlFor="stockControl" className="ml-2">Stock Control</Label>
              </div>

              <div className="col-span-2 flex justify-end">
                <Button type="submit">{isNewProduct ? 'Create' : 'Save'}</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Form;
