import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import logo from '../images/cuttedLogo.png';
import profilePhoto from '../images/profilePhoto.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Login from '../screens/Login';

import api from '../services/api'

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/navbar.css';

export default class MainNavbar extends Component {
  state = {
    search: '',
    profilePhoto: '',
    modalVisibility: false
  };

  componentDidMount(){
    const username = localStorage.getItem('@O-Commerce:name');
    if(username){
      this.setState({ username: username });
    }
  }

  handleInputChange = e => {
    this.setState({ search: e.target.value });
  };

  handleClickButton = () => {
    api.get(`/products/list`, {
      params: {
        q: this.state.search
      }
    }).then(res => {
      if(this.props.history.location.pathname === '/lista_produtos'){
        this.props.history.push({pathname: '/lista_produtos', search: `?q=${this.state.search}`, state: {products: res.data} });
      }else{
        this.props.history.push('/lista_produtos', { products: res.data });
      }
    })
  };

  handleClickHome = () => {
    this.props.history.push('/');
  };

  handleShowModal = () => {
    this.setState({ modalVisibility: !this.state.modalVisibility });
  };

  render() {
    return (
      <>
        <Login 
          visibility={this.state.modalVisibility}
          handleShowModal={this.handleShowModal}
          history={this.props.history}
        />
        <Navbar bg="light" expand="lg" className="topnav">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand>
            <img onClick={this.handleClickHome} src={logo} alt="alt"/>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Form inline>
                <FormControl type="text" placeholder="Buscar" value={this.state.search} onChange={this.handleInputChange} className="searchInput mr-sm-2" />
                <Button onClick={this.handleClickButton}>Buscar</Button>
              </Form>
            </Nav>
            <Nav>
              <Nav.Link>
                <FontAwesomeIcon icon={faShoppingCart} size="lg"/>
              </Nav.Link>
              {
                this.state.username 
                ? <div className="loginText">
                    <p className="username">{this.state.username}</p>
                  </div>
                : <Nav.Link onClick={this.handleShowModal}>
                    <div className="loginText">
                      <p className="text">Faça o login, ou cadastre-se agora!</p>
                    </div>
                  </Nav.Link>
              }
              
              <img src={this.state.profilePhoto.length > 0 ? this.state.profilePhoto : profilePhoto} className="rounded-circle userPhoto" alt="alt"/>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
