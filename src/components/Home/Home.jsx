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
  const [title, setTitle] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  if (!isAuthenticated) {
    return <Route path="/login" component={Login} />;
  }

  // Detectar si está en móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // breakpoint lg
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const RouteWithTitle = ({ path, title, Component }) => {
    useEffect(() => {
      setTitle(title);
    }, [title]);
    return <Route path={path} component={Component} />;
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      {/* Checkbox para controlar apertura del drawer en móvil */}
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />

      {/* Contenido principal */}
      <div className="drawer-content flex flex-col">
        <Navbar
          title={title}
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          canToggle={!isMobile} // solo permite minimizar en desktop
        />
        <main className="p-4 flex-1 overflow-y-auto">
          <Switch>
            <RouteWithTitle path="/" title="Home" Component={QuickAccess} />
            <RouteWithTitle path="/products" title="Productos" Component={Products} />
            <RouteWithTitle path="/categories" title="Categorías" Component={Categories} />
            <RouteWithTitle path="/clients" title="Clientes" Component={Clients} />
            <RouteWithTitle path="/suppliers" title="Proveedores" Component={Suppliers} />
            <RouteWithTitle path="/purchases" title="Compras" Component={PurchaseProducts} />
            <RouteWithTitle path="/sales" title="Ventas" Component={SaleProducts} />
            <RouteWithTitle path="/roles" title="Roles" Component={Roles} />
            <RouteWithTitle path="/users" title="Usuarios" Component={Users} />
            <RouteWithTitle path="/settings" title="Configuración" Component={Config} />
          </Switch>
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side ">
        <label htmlFor="main-drawer" className="drawer-overlay"></label>
        <Sidebar isOpen={isMobile ? true : sidebarOpen} canToggle={!isMobile} />
      </div>
    </div>
  );
};

export default Home;
