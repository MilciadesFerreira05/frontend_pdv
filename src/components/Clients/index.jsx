import { useEffect, useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TableData } from '../ui/table';
import { PlusIcon, DeleteIcon, EditIcon } from '../ui/icons';
import Form from './form';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import ClientService from '../../services/ClientService'; // Asegúrate de que este servicio exista
import { AuthContext } from '../../services/Auth/AuthContext';

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientToDelete, setClientToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); // Estado para la página actual
    const [pageSize] = useState(10); // Tamaño de página
    const [totalElements, setTotalElements] = useState(0); // Estado para el total de elementos
    const { user } = useContext(AuthContext);

    // Mover la función fetchClients antes del useEffect
    const fetchClients = async (page) => {
        try {
            const response = await ClientService.getAllClients({ page, size: pageSize });
            setClients(response.content); // Asumiendo que la respuesta tiene un campo 'content' con los clientes
            setTotalElements(response.totalElements); // Asumiendo que la respuesta tiene un campo 'totalElements'
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    useEffect(() => {
        fetchClients(currentPage); // Llamada a la función de carga de clientes
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage); // Actualizar la página actual
    };

    const handleClientCreate = async (newClient) => {
        try {
            const createdClient = await ClientService.save(newClient);
            setClients([...clients, createdClient]);
            setSelectedClient(null);
        } catch (error) {
            console.error('Error creating client:', error);
        }
    };

    const handleClientUpdate = async (updatedClient) => {
        try {
            const client = await ClientService.update(updatedClient.id, updatedClient);
            const updatedClients = clients.map((c) => 
                c.id === updatedClient.id ? client : c
            );
            setClients(updatedClients);
            setSelectedClient(null);
        } catch (error) {
            console.error('Error updating client:', error);
        }
    };

    const handleClientDelete = async (clientId) => {
        try {
            await ClientService.delete(clientId);
            const updatedClients = clients.filter((c) => c.id !== clientId);
            setClients(updatedClients);
            setSelectedClient(null);
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    const openConfirmModal = (client) => {
        setClientToDelete(client);
        setIsModalOpen(true);
    };
    
    const confirmDeleteClient = () => {
        if (clientToDelete) {
            handleClientDelete(clientToDelete.id);
        }
        setIsModalOpen(false);
    };

    const getActions = () => {
        const actions = [];
        if (user?.authorities.includes('Client.update')) {
            actions.push({
                label: "Editar",
                icon: <EditIcon className="h-4 w-4"/>,
                onClick: (client) => setSelectedClient(client),
            });
        }
        if (user?.authorities.includes('Client.delete')) {
            actions.push({
                label: "Eliminar",
                icon: <DeleteIcon className="h-4 w-4"/>,
                onClick: (client) => openConfirmModal(client),
            });
        }
        return actions;
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

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {selectedClient ? (
                <Form
                    selectedClient={selectedClient}
                    handleClientUpdate={handleClientUpdate}
                    handleClientCreate={handleClientCreate}
                    setClient={setSelectedClient}
                />
            ) : (
                <div className="grid gap-4 md:gap-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Clientes</h1>
                        {user?.authorities.includes('Client.create') && (
                            <Button variant="primary" onClick={() => setSelectedClient({})}>
                                <PlusIcon className="h-4 w-4" /> Crear cliente
                            </Button>
                        )}
                    </div>
                    <Card>
                        <CardContent>
                            <TableData 
                                data={clients} 
                                columns={columns} 
                                actions={getActions()} 
                                totalElements={totalElements}
                                pageSize={pageSize}
                                onPageChange={handlePageChange}
                            />
                        </CardContent>
                    </Card>
                </div>
            )}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDeleteClient}
                title="Confirmar eliminación"
                message="¿Estás seguro de que deseas eliminar este cliente?"
            />
        </main>
    );
}
