import React, { Component } from 'react';

import '../styles/navbar.css';
import logo from '../images/cuttedLogo.png';
import 'bootstrap/dist/css/bootstrap.css';

export default class Navbar extends Component {
  state = {
    search: ''
  };

  handleInputChange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
        <nav className="navbar topnav navbar-expand-lg">
          <div className="logo navbar-brand nav-item">
            <img src={logo} alt="alt"/>
          </div>
          <div className="textField nav-item">
            <input type="text" placeholder="Buscar" className="searchInput form-control" value={this.state.search} onChange={this.handleInputChange}/>
          </div>
          <div className="nav-item">
            <div className="userPhoto">
              
            </div>
          </div>
        </nav>
    );
  }
}
