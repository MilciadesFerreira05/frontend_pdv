import React, { useState } from 'react';
import { MenuIcon } from './icons';

const TableData = ({ data = [], columns = [], actions = [], totalElements = 0, pageSize = 10, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(0); // Estado para la página actual
    const totalPages = Math.ceil(totalElements / pageSize); // Cálculo del número total de páginas

    // Manejo del cambio de página
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
            onPageChange(newPage); // Función para cargar nuevos datos para la página
        }
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns?.map((c, index) => (
                            <TableHead key={index}>{c.label}</TableHead>
                        ))}
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((d, index) => (
                        <TableRow key={index}>
                            {columns?.map((c1, index) => (
                                <TableCell key={index}>
                                    {c1.name.includes(".")
                                        ? d[c1.name.split(".")[0]][c1.name.split(".")[1]]
                                        : d[c1.name]}
                                </TableCell>
                            ))}
                            <TableCell>
                                <details className="dropdown">
                                    <summary className="btn m-1 btn-sm">
                                        <MenuIcon className="h-4 w-4" />
                                        Opciones
                                    </summary>
                                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow z-[1]">
                                        {actions?.map((a, index) => (
                                            <li key={index}>
                                                <a onClick={() => a.onClick(d)}>
                                                    {a.icon ? a.icon : null}
                                                    {a.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            {/* Controles de Paginación */}
            <div className="flex justify-between items-center mt-4">
                <button 
                    className="btn btn-sm" 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 0}
                >
                    Anterior
                </button>
                <span>Página {currentPage + 1} de {totalPages}</span>
                <button 
                    className="btn btn-sm" 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages - 1}
                >
                    Siguiente
                </button>
            </div>
        </>
    );
};

const Table = ({ children, className = '' }) => {
    return <table className={`min-w-full divide-y divide-gray-200 ${className}`}>{children}</table>;
};

const TableHeader = ({ children, className = '' }) => {
    return <thead className={` ${className}`}>{children}</thead>;
};

const TableRow = ({ children, className = '' }) => {
    return <tr className={`bg-white divide-x divide-gray-200 ${className}`}>{children}</tr>;
};

const TableHead = ({ children, className = '' }) => {
    return (
        <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
            {children}
        </th>
    );
};

const TableBody = ({ children, className = '' }) => {
    return <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>{children}</tbody>;
};

const TableCell = ({ children, className = '' }) => {
    return <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${className}`}>{children}</td>;
};

export { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableData };
