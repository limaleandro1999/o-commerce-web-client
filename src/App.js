import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './screens/Home';
import NewUser from './screens/NewUser';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/cadastrar" component={NewUser}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
