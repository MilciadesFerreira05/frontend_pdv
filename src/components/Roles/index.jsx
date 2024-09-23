import { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TableData } from '../ui/table';
import RoleForm from './form'; // Componente para crear/modificar roles
import { DeleteIcon, EditIcon } from '../ui/icons';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { AuthContext } from '../../services/Auth/AuthContext';
import RoleService from '../../services/RoleService'; // Servicio para gestionar roles

export default function Roles() {
    const [roles, setRoles] = useState([]);
	const [permissions, setPermissions] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [pageSize] = useState(10); // Tamaño de página
    const [totalElements, setTotalElements] = useState(0); // Total de elementos
    const { user } = useContext(AuthContext);

    const fetchRoles = async (page) => {
        try {
            const response = await RoleService.getAllRoles({ page, size: pageSize });
            setRoles(response.content); // Asumiendo que la respuesta tiene un campo 'content' con los roles
            setTotalElements(response.totalElements); // Asumiendo que la respuesta tiene un campo 'totalElements'
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

	const fetchPermissions = async () => {
		try {
			const response = await RoleService.getPermissions();
			setPermissions(response);
		} catch (error) {
			console.error('Error fetching permissions:', error);
		}
	};

    useEffect(() => {
        fetchRoles(currentPage); // Carga inicial de roles		
    }, [currentPage]);

	useEffect(() => {
		fetchPermissions();
	}, []);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < Math.ceil(totalElements / pageSize)) {
            setCurrentPage(newPage); // Actualiza la página actual
        }
    };

    const handleRoleCreate = async (newRole) => {
        try {
            const createdRole = await RoleService.save(newRole);
            setRoles([...roles, createdRole]);
            setSelectedRole(null);
        } catch (error) {
            console.error('Error creating role:', error);
        }
    };

    const handleRoleUpdate = async (updatedRole) => {
        try {
            const role = await RoleService.update(updatedRole.id, updatedRole);
            const updatedRoles = roles.map((r) => (r.id === updatedRole.id ? role : r));
            setRoles(updatedRoles);
            setSelectedRole(null);
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    const handleRoleDelete = async (roleId) => {
        try {
            await RoleService.delete(roleId);
            const updatedRoles = roles.filter((role) => role.id !== roleId);
            setRoles(updatedRoles);
            setSelectedRole(null);
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    const openConfirmModal = (role) => {
        setRoleToDelete(role);
        setIsModalOpen(true);
    };

    const confirmDeleteRole = () => {
        if (roleToDelete) {
            handleRoleDelete(roleToDelete.id);
        }
        setIsModalOpen(false);
    };

    const getActions = () => {
        const actions = [];
        if (user?.authorities.includes('Role.update')) {
            actions.push({
                label: "Editar",
                icon: <EditIcon className="h-4 w-4" />,
                onClick: (role) => setSelectedRole(role),
            });
        }
        if (user?.authorities.includes('Role.delete')) {
            actions.push({
                label: "Eliminar",
                icon: <DeleteIcon className="h-4 w-4" />,
                onClick: (role) => openConfirmModal(role),
            });
        }
        return actions;
    };

    const columns = [
        { name: "id", label: "ID" },
        { name: "name", label: "Nombre" },
        { name: "description", label: "Descripción" },
    ];

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {selectedRole ? (
                <RoleForm
                    selectedRole={selectedRole}
					permissions={permissions}
                    handleRoleUpdate={handleRoleUpdate}
                    handleRoleCreate={handleRoleCreate}
                    setRole={setSelectedRole}
                />
            ) : (
                <div className="grid gap-4 md:gap-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Roles</h1>
                        {user?.authorities.includes('Role.create') && (
                            <Button variant="primary" onClick={() => setSelectedRole({})}>
                                Crear Rol
                            </Button>
                        )}
                    </div>
                    <Card>
                        <CardContent>
                            <TableData 
                                data={roles} 
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
                onConfirm={confirmDeleteRole}
                title="Confirmar eliminación"
                message="¿Estás seguro de que deseas eliminar este rol?"
            />
        </main>
    );
}
