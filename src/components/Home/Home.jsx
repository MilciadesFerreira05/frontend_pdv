import { useState,useContext } from 'react';
import { Route, Switch, Redirect } from 'wouter';
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

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mostrar componente login si no esta autenticado
  if(!isAuthenticated) {
    return <Route path="/login" component={Login} />
  }

  // Mostrar la aplicacion si esta autenticado
  return (
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[280px_1fr]">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex flex-col">
          <Navbar toggleSidebar={toggleSidebar} searchData = {null} />
          <div className="p-4">
            <Switch>
              <Route path="/">
                <Redirect to="/products"  />
              </Route>
              <Route path="/products" component={Products} />
              <Route path="/categories" component={Categories} />
              <Route path="/clients" component={Clients} />
              <Route path="/suppliers" component={Suppliers} />
              <Route path="/purchases" component={PurchaseProducts} />
              <Route path="/roles" component={Roles} />

            
            </Switch>
          </div>
        </div>
      </div>
    )
};

export default Home;