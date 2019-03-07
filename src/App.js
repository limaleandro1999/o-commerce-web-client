import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './screens/Home';
import NewUser from './screens/NewUser';
import Dashboard from './screens/Dashboard'
import ProductList from './screens/ProductsList';
import NewProduct from './screens/NewProduct';
import EditProduct from './screens/EditProduct';
import ProductListHome from './screens/ProductsListHome';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/cadastrar" component={NewUser}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/produtos" component={ProductList}/>
          <Route path="/cadastrar_produto" component={NewProduct}/>
          <Route path="/editar_produto" component={EditProduct}/>
          <Route path="/lista_produtos" component={ProductListHome}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
