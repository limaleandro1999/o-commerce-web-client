import React, { Component } from 'react';

import logo from '../images/cuttedLogo.png';
import profilePhoto from '../images/profilePhoto.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/navbar.css';

export default class SellerNav extends Component {
  state = {
    profilePhoto: ''
  };

  componentDidMount(){
    const username = localStorage.getItem('@O-Commerce:name');

    const isBuyer = localStorage.getItem('@O-Commerce:isBuyer');

    if(isBuyer === 'true'){
      return this.props.history.push('/');
    }

    if(username){
      this.setState({ username: username });
    }
  }

  handleClickProducts = () => {
    this.props.history.push('/produtos');
  };

  handleClickSales = () => {
    this.props.history.push('/vendas');
  };

  handleClickHome = () => {
    this.props.history.push('/dashboard');
  };
  
  render() {
    return (
      <>
        <Navbar bg="light" expand="lg" className="topnav">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand>
            <img onClick={this.handleClickHome} src={logo} alt="alt"/>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link onClick={this.handleClickProducts}>
                    Produtos
                </Nav.Link>
                <Nav.Link onClick={this.handleClickSales}>
                    Vendas
                </Nav.Link>
            </Nav>
            <Nav>
                <div className="loginText">
                    <p className="username">{this.state.username}</p>
                </div>
                <img src={this.state.profilePhoto.length > 0 ? this.state.profilePhoto : profilePhoto} className="rounded-circle userPhoto" alt="alt"/>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
