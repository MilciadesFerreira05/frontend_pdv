import { Link } from "wouter";
import { Package2Icon, SearchIcon, } from "./icons";
import { Input } from "./input";
import {UsersIcon} from './icons'

const Navbar = ({ toggleSidebar, searchData }) => {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
      <button onClick={toggleSidebar} className="lg:hidden">
        <Package2Icon className="h-6 w-6" />
        <span className="sr-only">Open sidebar</span>
      </button>
      <div className="w-full flex-1">
        {searchData ? (
          <form>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={searchData.placeholder}
                className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
          
          ): (
            <h1 className="text-2xl font-bold">Punto de venta</h1>
          )
        }
      </div>
      <details className="dropdown">
        
        <summary className="btn m-1"><UsersIcon/> Admin</summary>

        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li>
            <a>Perfil</a>
          </li>
          <li>
            <a>Cerrar Sesion</a>
          </li>
        </ul>
      </details>
    </header>
  )
}

export default Navbar;