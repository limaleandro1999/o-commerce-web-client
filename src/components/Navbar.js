import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import logo from '../images/cuttedLogo.png';
import profilePhoto from '../images/profilePhoto.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Login from '../screens/Login';

import api from '../services/api';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/navbar.css';

export default class MainNavbar extends Component {
  state = {
    search: '',
    profilePhoto: '',
    countProducts: 0,
    modalVisibility: false
  };

  async getData(){
    const username = localStorage.getItem('@O-Commerce:name');
    const isBuyer = localStorage.getItem('@O-Commerce:isBuyer');

    if(isBuyer === 'false'){
      return this.props.history.push('/dashboard');
    }

    if(username){
      this.setState({ username: username });
      let countProducts = await api.get('/cart/cartCount', {headers: {'Authorization': `Bearer ${localStorage.getItem('@O-Commerce:accessToken')}`}});
      this.setState({ countProducts: countProducts.data.countProducts });
    }
  }

  async componentWillMount(){
    await this.getData();
  }

  handleInputChange = e => {
    this.setState({ search: e.target.value });
  };

  handleClickButton = () => {
    if(this.state.search.length > 0){
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
    }
  };

  handleClickCart = () => {
    this.props.history.push(`/carrinho`);
  };

  handleClickHome = () => {
    this.props.history.push('/');
  };

  handleShowModal = () => {
    this.setState({ modalVisibility: !this.state.modalVisibility });
  };

  handleAfterLogin = async () => {
    const isBuyer = localStorage.getItem('@O-Commerce:isBuyer');

    if(isBuyer){
      await this.getData();
    }
  };

  render() {
    return (
      <>
        <Login 
          visibility={this.state.modalVisibility}
          handleShowModal={this.handleShowModal}
          afterLogin={this.handleAfterLogin}
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
              {
                this.state.username 
                ? <Nav.Link onClick={this.handleClickCart}>
                    <FontAwesomeIcon icon={faShoppingCart} size="lg"/>
                    <Badge pill variant="warning">{ this.state.countProducts }</Badge>
                  </Nav.Link>
                : <div/>
              }
              
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
