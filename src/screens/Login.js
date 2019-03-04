import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import api from '../services/api';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/navbar.css';

export default class Login extends Component {
  state = {
    email: '',
    password: ''
  }
  
  handleClickNewUser = () => {
    this.props.history.push('/cadastrar');
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = () => {
    api.post('/users/authenticate', this.state).then(res => {
      console.log(res.data);
      localStorage.setItem('@O-Commerce:accessToken', res.data.accessToken);
      localStorage.setItem('@O-Commerce:email', res.data.email);
      localStorage.setItem('@O-Commerce:name', res.data.name);
      localStorage.setItem('@O-Commerce:isBuyer', res.data.isBuyes);
    }).catch(error => {
      console.log(error);
    });
  };

  render() {
    return (
			<Modal show={this.props.visibility} onHide={this.props.handleShowModal}>
				<Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Email" name="email" onChange={this.handleInputChange} value={this.state.email}/>
              
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Senha" name="password" onChange={this.handleInputChange} value={this.state.password}/>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClickNewUser}>
              Cadastrar
            </Button>
            <Button variant="primary" onClick={this.handleLogin}>
              Login
            </Button>
          </Modal.Footer>
			</Modal>
    );
  }
}
