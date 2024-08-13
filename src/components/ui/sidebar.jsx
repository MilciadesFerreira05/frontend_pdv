import { Link, useLocation } from "wouter";
import { Package2Icon, PackageIcon, ClipboardIcon, UsersIcon, SettingsIcon, XIcon, CurrenciesIcon } from "./icons";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [, location] = useLocation();
  return (
    <div className={`border-r bg-muted/40 ${isOpen ? 'block' : 'hidden'} lg:block`}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link to="/products" className="flex items-center gap-2 font-semibold">
            <Package2Icon className="h-6 w-6" />
            <span className="">Punto de venta</span>
          </Link>
          <button onClick={toggleSidebar} className="ml-auto">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link href="/products" className={(active) => (active ? 'text-primary' : ' text-muted-foreground') + " flex items-center gap-3 rounded-lg bg-muted px-3 py-2 transition-all hover:text-primary"}>
              <PackageIcon className="h-4 w-4" />
              Productos
            </Link>
            <Link to="/categories" className={(active) => (active ? 'text-primary' : ' text-muted-foreground') + " flex items-center gap-3 rounded-lg bg-muted px-3 py-2 transition-all hover:text-primary"}>
              <ClipboardIcon className="h-4 w-4" />
              Categorias
            </Link>
            <Link to="/clients" className={(active) => (active ? 'text-primary' : ' text-muted-foreground') + " flex items-center gap-3 rounded-lg bg-muted px-3 py-2 transition-all hover:text-primary"}>
              <UsersIcon className="h-4 w-4" />
              Clientes
            </Link>

          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
