import { useEffect, useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TableData } from '../ui/table';
import PurchaseService from '../../services/PurchaseService'; // Asegúrate de crear este servicio
import Form from './form'; // Asegúrate de tener un formulario para las compras
import { AuthContext } from '../../services/Auth/AuthContext';
import { DeleteIcon, EditIcon } from '../ui/icons';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

const PurchaseProducts  = () => {
    const [purchases, setPurchases] = useState([]);
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [purchaseToDelete, setPurchaseToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); // Estado para la página actual
    const [pageSize] = useState(10); // Tamaño de página
    const [totalElements, setTotalElements] = useState(0); // Estado para el total de elementos
    const { user } = useContext(AuthContext);

    const fetchPurchases = async (page) => {
        try {
            const response = await PurchaseService.getAllPurchases({ page, size: pageSize });
            setPurchases(response.content); // Asumiendo que la respuesta tiene un campo 'content' con las compras
            setTotalElements(response.totalElements); // Asumiendo que la respuesta tiene un campo 'totalElements'
        } catch (error) {
            console.error('Error fetching purchases:', error);
        }
    };

    useEffect(() => {
        fetchPurchases(currentPage); // Llamada a la función de carga de compras
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage); // Actualizar la página actual
    };

    const handlePurchaseCreate = async (newPurchase) => {
        try {
            const createdPurchase = await PurchaseService.save(newPurchase);
            setPurchases([...purchases, createdPurchase]);
            setSelectedPurchase(null);
        } catch (error) {
            console.error('Error creating purchase:', error);
        }
    };

    const handlePurchaseUpdate = async (updatedPurchase) => {
        try {
            const purchase = await PurchaseService.update(updatedPurchase.id, updatedPurchase);
            const updatedPurchases = purchases.map((p) => 
                p.id === updatedPurchase.id ? purchase : p
            );
            setPurchases(updatedPurchases);
            setSelectedPurchase(null);
        } catch (error) {
            console.error('Error updating purchase:', error);
        }
    };

    const handlePurchaseDelete = async (purchaseId) => {
        try {
            await PurchaseService.delete(purchaseId);
            const updatedPurchases = purchases.filter((p) => p.id !== purchaseId);
            setPurchases(updatedPurchases);
            setSelectedPurchase(null);
        } catch (error) {
            console.error('Error deleting purchase:', error);
        }
    };

    const openConfirmModal = (purchase) => {
        setPurchaseToDelete(purchase);
        setIsModalOpen(true);
    };
    
    const confirmDeletePurchase = () => {
        if (purchaseToDelete) {
            handlePurchaseDelete(purchaseToDelete.id);
        }
        setIsModalOpen(false);
    };

    const getActions = () => {
        const actions = [];
        if (user?.authorities.includes('ProductPurchase.update')) {
            actions.push({
                label: "Editar",
                icon: <EditIcon className="h-4 w-4"/>,
                onClick: (purchase) => setSelectedPurchase(purchase),
            });
        }
        if (user?.authorities.includes('ProductPurchase.delete')) {
            actions.push({
                label: "Eliminar",
                icon: <DeleteIcon className="h-4 w-4"/>,
                onClick: (purchase) => openConfirmModal(purchase),
            });
        }
        return actions;
    };

    const columns = [
        { name: "id", label: "ID" },
        { name: "date", label: "Fecha" },
        { name: "invoice", label: "Número de Factura" },
        { name: "supplier.name", label: "Proveedor" },
        { name: "total", label: "Total" },
    ];

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {selectedPurchase ? (
                <Form
                    selectedPurchase={selectedPurchase}
                    handlePurchaseUpdate={handlePurchaseUpdate}
                    handlePurchaseCreate={handlePurchaseCreate}
                    setPurchase={setSelectedPurchase}
                />
            ) : (
                <div className="grid gap-4 md:gap-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Compras</h1>
                        {user?.authorities.includes('ProductPurchase.create') && (
                            <Button variant="primary" onClick={() => setSelectedPurchase({})}>
                                Crear
                            </Button>
                        )}
                    </div>
                    <Card>
                        <CardContent>
                            <TableData 
                                data={purchases} 
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
                onConfirm={confirmDeletePurchase}
                title="Confirmar eliminación"
                message="¿Estás seguro de que deseas eliminar esta compra?"
            />
        </main>
    );
}

export default PurchaseProducts;


