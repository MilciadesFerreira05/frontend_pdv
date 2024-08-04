import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TableData } from '../ui/table';
import {
	PlusIcon,
} from '@/components/ui/icons';
import Form from './form';
import { DeleteIcon, EditIcon } from '../ui/icons';

export default function Clients() {
	const [clients, setClients] = useState([]);
	const [selectedClient, setSelectedClient] = useState(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleClientSelect = (client) => {
		setSelectedClient(client);
	};

	const handleClientCreate = (newClient) => {
		setClients([...clients, newClient]);
		setSelectedClient(null);
	};

	const columns = [
		{ name: "id", label: "ID" },
		{ name: "name", label: "Nombre" },
		{ name: "phone", label: "Telefono" },
		{ name: "address", label: "Dirección" },
		{ name: "ruc", label: "RUC" },
		{ name: "email", label: "Email" },
		{ name: "user.username", label: "Creado por" },
	];

	const fakeData = [
		{
			id: 1,
			name: "Cliente 1",
			address: "Dirección 1",
			ruc: "RUC 1",
			email: "cliente1@correo.com",
			user: { username: "Usuario 1" },
		},
		{
			id: 2,
			name: "Cliente 2",
			address: "Dirección 2",
			ruc: "RUC 2",
			email: "cliente2@correo.com",
			user: { username: "Usuario 2" },
		},
	];

	const actions = [
		{
			label: "Editar",
			icon: <EditIcon className="h-4 w-4"/>,
			onClick: (client) => {
				setSelectedClient(client);
			},
		},
		{
			label: "Eliminar",
			icon: <DeleteIcon className="h-4 w-4"/>,
			onClick: (client) => {
				const updatedClients = clients.filter((p) => p.id !== client.id);
				setClients(updatedClients);
				setSelectedClient(null);
			},
		},
	];

	const handleClientUpdate = (updatedClient) => {
		const updatedClients = clients.map((client) => (client.id === updatedClient.id ? updatedClient : client));
		setClients(updatedClients);
		setSelectedClient(null);
	};

	return (
		<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
			{
				selectedClient ?
					<Form selectedClient={selectedClient} handleClientUpdate={handleClientUpdate} handleClientCreate={handleClientCreate} setClient={setSelectedClient}/>
					:
					<div className="grid gap-4 md:gap-8">
						<div className="flex justify-between items-center">
							<h1 className="text-2xl font-bold">Clientes</h1>
							<Button variant="primary" onClick={() => setSelectedClient({})}>
								<PlusIcon className="h-4 w-4" /> Crear cliente
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
