import React, { Component } from 'react';

import '../styles/navbar.css';
import logo from '../images/cuttedLogo.png';
import profilePhoto from '../images/profilePhoto.png';
import 'bootstrap/dist/css/bootstrap.css';

export default class Navbar extends Component {
  state = {
    search: '',
    profilePhoto: ''
  };

  handleInputChange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <nav className="navbar topnav navbar-light bg-light">
          <div className="logo navbar-brand nav-item">
            <img src={logo} alt="alt"/>
          </div>
          <form className="form-inline">
            <input type="text" placeholder="Buscar" className="searchInput form-control mr-sm-2" value={this.state.search} onChange={this.handleInputChange}/>
          </form>
          <div className="nav-item my-2 my-sm-0">
            <img src={this.state.profilePhoto.length > 0 ? this.state.profilePhoto : profilePhoto} className="rounded-circle userPhoto" alt="alt"/>
          </div>
      </nav>
    );
  }
}
