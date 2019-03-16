import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './screens/Home';
import NewUser from './screens/NewUser';
import Dashboard from './screens/Dashboard'
import ProductList from './screens/ProductsList';
import NewProduct from './screens/NewProduct';
import EditProduct from './screens/EditProduct';
import ProductListHome from './screens/ProductsListHome';
import Product from './screens/Product';
import Cart from './screens/Cart';
import Sales from './screens/Sales';

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
          <Route path="/produto" component={Product}/>
          <Route path="/carrinho" component={Cart}/>
          <Route path="/vendas" component={Sales}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
