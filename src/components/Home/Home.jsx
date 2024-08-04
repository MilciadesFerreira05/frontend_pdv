import { useState } from 'react';
import { Router, Route } from 'wouter';
import Sidebar from '../ui/sidebar';
import Navbar from '../ui/navbar';
import Products from '../Products';
import Categories from '../Categories';
import Clients from '../Clients';
import Form from '../PurchaseProducts/form';


const Home = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
		<Router>
			<div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[280px_1fr]">
				<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
				<div className="flex flex-col">
					<Navbar toggleSidebar={toggleSidebar} searchData = {null} />
          <div className="p-4">
            <Form/>
            <Route path="/products" component={Products} />
            <Route path="/categories" component={Categories} />
            <Route path="/clients" component={Clients} />
          </div>
				</div>
			</div>
		</Router>
  );
};

export default Home;