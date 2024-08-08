import React from 'react';
import { Switch, Route } from 'wouter';
import { AuthProvider } from './services/Auth/AuthContext';
import PrivateRoute from './services/Auth/PrivateRoute';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';

const App = () => {
  return (
    <AuthProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </AuthProvider>
  );
};

export default App;
