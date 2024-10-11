import React, { useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeftIcon, LogoutIcon, Package2Icon, SearchIcon } from "./icons";
import { Input } from "./input";
import { UsersIcon } from './icons';

const Navbar = ({title}) => {
  const dropdownRef = useRef(null); // Referencia al dropdown

  // Manejo de clics fuera del dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Cierra el dropdown si se hace clic fuera de él
        dropdownRef.current.open = false; // Cierra el dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
      <button className="lg:hidden">
        <Package2Icon className="h-6 w-6" />
        <span className="sr-only">Open sidebar</span>
      </button>
      <div className="w-full flex-1">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <details ref={dropdownRef} className="dropdown dropdown-end">
        <summary className="btn m-1">
          <UsersIcon /> Admin
        </summary>
        <ul className="menu dropdown-content bg-white border border-gray-300 rounded-box z-[1] w-52 p-2 shadow-lg right-0">
          <li>
            <a href="#"  onClick={handleLogout}>
              <ArrowLeftIcon className="h-4 w-4" /> Cerrar Sesión
            </a>
          </li>
        </ul>
      </details>
    </header>
  );
};

export default Navbar;
