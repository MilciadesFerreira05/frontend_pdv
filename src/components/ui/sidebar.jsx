// Sidebar.js
import { Link, useLocation } from "wouter";
import { Package2Icon, PackageIcon, ClipboardIcon, UsersIcon, SettingsIcon, CurrenciesIcon, XIcon } from "./icons";
import { useContext } from "react";
import { AuthContext } from "./../../services/Auth/AuthContext"; // Asegúrate de importar tu contexto de autenticación

const menuItems = [
  { path: "/sales", text: "Ventas", icon: <ClipboardIcon className="h-4 w-4" />, permission: "ProductSale.all" },
  { path: "/purchases", text: "Compras", icon: <ClipboardIcon className="h-4 w-4" />, permission: "ProductPurchase.all" },
  { path: "/products", text: "Productos", icon: <PackageIcon className="h-4 w-4" />, permission: "Product.all" },
  { path: "/clients", text: "Clientes", icon: <UsersIcon className="h-4 w-4" />, permission: "Client.all" },
  { path: "/suppliers", text: "Proveedores", icon: <CurrenciesIcon className="h-4 w-4" />, permission: "Supplier.all" },
  { path: "/categories", text: "Categorías", icon: <ClipboardIcon className="h-4 w-4" />, permission: "Category.all" },
  { path: "/roles", text: "Roles", icon: <SettingsIcon className="h-4 w-4" />, permission: "Role.all" },
  { path: "/users", text: "Usuarios", icon: <UsersIcon className="h-4 w-4" />, permission: "User.all" }
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useContext(AuthContext); // Obtener el usuario del contexto de autenticación

  // Función para verificar si el usuario tiene un permiso específico
  const hasPermission = (permission) => {
    return user?.authorities?.includes(permission);
  };

  return (
    <div className={`border-r bg-muted/40 ${isOpen ? 'block' : 'hidden'} lg:block`}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2Icon className="h-6 w-6" />
            <span className="">Punto de venta</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {menuItems.map((item) => (
              hasPermission(item.permission) && (
                <Link
                  key={item.path}
                  href={item.path}
                  className={(active) => (active ? 'text-primary' : ' text-muted-foreground') + " flex items-center gap-3 rounded-lg bg-muted px-3 py-2 transition-all hover:text-primary"}
                >
                  {item.icon}
                  {item.text}
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
