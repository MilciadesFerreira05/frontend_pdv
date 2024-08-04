import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TableData } from '../ui/table';
import Form from './form';
import { DeleteIcon, EditIcon } from '../ui/icons';

export default function Categories() {
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
	};

	const handleCategoryCreate = (newCategory) => {
		setCategories([...categories, newCategory]);
		setSelectedCategory(null);
	};

	const columns = [
		{ name: "id", label: "ID" },
		{ name: "name", label: "Nombre" },
		{ name: "description", label: "Descripción" },
	];

	const fakeData = [
		{
			id: 1,
			name: "Categoría 1",
			description: "Descripción de la categoría 1",
		},
		{
			id: 2,
			name: "Categoría 2",
			description: "Descripción de la categoría 2",
		},
		{
			id: 3,
			name: "Categoría 3",
			description: "Descripción de la categoría 3",
		},
	];

	const actions = [
		{
			label: "Editar",
			icon: <EditIcon />,
			onClick: (category) => {
				setSelectedCategory(category);
			},
		},
		{
			label: "Eliminar",
			icon: <DeleteIcon />,
			onClick: (category) => {
				const updatedProducts = categories.filter((p) => p.id !== category.id);
				setProducts(updatedCategories);
				setSelectedCategory(null);
			},
		},
	];

	const handleCategoryUpdate = (updatedCategory) => {
		const updatedCategories = categories.map((category) => (category.id === updatedCategory.id ? updatedCategory : category));
		setCategories(updatedCategories);
		setSelectedCategory(null);
	};



	return (

		<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
			{
				selectedCategory ?
					<Form selectedCategory={selectedCategory} handleCategoryUpdate={handleCategoryUpdate} handleCategoryCreate={handleCategoryCreate} setCategory={setSelectedCategory}/>
					:
					<div className="grid gap-4 md:gap-8">
						<div className="flex justify-between items-center">
							<h1 className="text-2xl font-bold">Categorias</h1>
							<Button variant="primary" onClick={() => setSelectedCategory({})}>
								Crear Categoría
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

	);
}
