import { Link } from "wouter";
import {Package2Icon, PackageIcon, ClipboardIcon, UsersIcon, SettingsIcon } from "./icons";

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link to="#" className="flex items-center gap-2 font-semibold">
            <Package2Icon className="h-6 w-6" />
            <span className="">Punto de venta</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">


          <nav className="grid items-start px-4 text-sm font-medium">
            <Link href="" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
              <PackageIcon className="h-4 w-4" />
              Productos
            </Link>
            <Link to="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <ClipboardIcon className="h-4 w-4" />
              Orders
            </Link>
            <Link to="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <UsersIcon className="h-4 w-4" />
              Customers
            </Link>
            <Link to="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <SettingsIcon className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;