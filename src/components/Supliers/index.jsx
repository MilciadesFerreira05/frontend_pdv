import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TableData } from '../ui/table';
import { PlusIcon, EditIcon, DeleteIcon } from '@/components/ui/icons';
import Form from './form'; // Asegúrate de tener un componente Form para crear/editar proveedores
import SupplierService from '@/services/SupplierService';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    // Cargar proveedores al montar el componente
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const data = await SupplierService.getAllSuppliers();
      setSuppliers(data.content || []);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleSupplierSelect = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleSupplierCreate = async (newSupplier) => {
    try {
      await SupplierService.save(newSupplier);
      fetchSuppliers();
      setSelectedSupplier(null);
    } catch (error) {
      console.error('Error creating supplier:', error);
    }
  };

  const handleSupplierUpdate = async (updatedSupplier) => {
    try {
      await SupplierService.update(updatedSupplier.id, updatedSupplier);
      fetchSuppliers();
      setSelectedSupplier(null);
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  const handleSupplierDelete = async (supplierId) => {
    try {
      await SupplierService.delete(supplierId);
      fetchSuppliers();
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  const columns = [
    { name: "id", label: "ID" },
    { name: "name", label: "Nombre" },
    { name: "contactName", label: "Nombre de Contacto" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Teléfono" },
    { name: "address", label: "Dirección" },
  ];

  const actions = [
    {
      label: "Editar",
      icon: <EditIcon className="h-4 w-4" />,
      onClick: (supplier) => handleSupplierSelect(supplier),
    },
    {
      label: "Eliminar",
      icon: <DeleteIcon className="h-4 w-4" />,
      onClick: (supplier) => handleSupplierDelete(supplier.id),
    },
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      {
        selectedSupplier ?
          <Form selectedSupplier={selectedSupplier} handleSupplierUpdate={handleSupplierUpdate} handleSupplierCreate={handleSupplierCreate} setSupplier={setSelectedSupplier} />
          :
          <div className="grid gap-4 md:gap-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Proveedores</h1>
              <Button variant="primary" onClick={() => setSelectedSupplier({})}>
                <PlusIcon className="h-4 w-4" /> Crear proveedor
              </Button>
            </div>
            <Card>
              <CardContent>
                <TableData data={suppliers} columns={columns} actions={actions} />
              </CardContent>
            </Card>
          </div>
      }
    </main>
  );
}
