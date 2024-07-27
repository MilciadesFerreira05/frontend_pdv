import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Suppliers from './components/Suppliers/Suppliers';
import Currencies from './components/Currencies/Currencies';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/products" component={Products} />
          <Route path="/categories" component={Categories} />
          <Route path="/suppliers" component={Suppliers} />
          <Route path="/currencies" component={Currencies} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
