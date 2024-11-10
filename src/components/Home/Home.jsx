import { useState, useContext, useEffect } from 'react';
import { Route, Switch } from 'wouter';
import Sidebar from '../ui/sidebar';
import Navbar from '../ui/navbar';
import Products from '../Products';
import Categories from '../Categories';
import Clients from '../Clients';
import Login from '../Auth/Login';
import { AuthContext } from '../../services/Auth/AuthContext';
import Suppliers from '../Supliers';
import Roles from '../Roles';
import PurchaseProducts from '../PurchaseProducts';
import Users from '../Users';
import QuickAccess from './QuickAccess';
import SaleProducts from '../SaleProducts';
import Config from '../Config/Config';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [title, setTitle] = useState(''); // Estado para el título
  const [sidebarOpen, setSidebarOpen] = useState(true); // Nuevo estado para el sidebar

  // Mostrar componente login si no esta autenticado
  if (!isAuthenticated) {
    return <Route path="/login" component={Login} />;
  }

  // Crear un componente de envoltura para las rutas que actualizan el título
  const RouteWithTitle = ({ path, title, Component }) => {
    useEffect(() => {
      setTitle(title);
    }, [title]);

    return <Route path={path} component={Component} />;
  };

  // Mostrar la aplicacion si esta autenticado
  return (
    <div className={`grid min-h-screen w-full ${sidebarOpen ? 'lg:grid-cols-[200px_1fr]' : 'lg:grid-cols-[80px_1fr]'}`}>
      {/* Pasamos el estado de sidebar y la función para alternarlo al Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-col">
        <Navbar title={title}  isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen) } />
        <div className="p-4">
          <Switch>
            <RouteWithTitle path="/" title="Home" Component={QuickAccess} />
            <RouteWithTitle path="/products" title="Productos" Component={Products} />
            <RouteWithTitle path="/categories" title="Categorías" Component={Categories} />
            <RouteWithTitle path="/clients" title="Clientes" Component={Clients} />
            <RouteWithTitle path="/suppliers" title="Proveedores" Component={Suppliers} />
            <RouteWithTitle path="/purchases" title="Compras" Component={PurchaseProducts} />
            <RouteWithTitle path="/sales" title="Ventas" Component={SaleProducts} />
            <RouteWithTitle path="/roles" title="Roles" Component={Roles} />
            <RouteWithTitle path="/Users" title="Usuarios" Component={Users} />
            <RouteWithTitle path="/settings" title="Configuración" Component={Config} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Home;
