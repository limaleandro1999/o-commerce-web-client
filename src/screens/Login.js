import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewUser from '../screens/NewUser';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/navbar.css';

export default class Login extends Component {
  handleClickNewUser = () => {
    this.props.history.push('/cadastrar');
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
              <Form.Control type="email" placeholder="Email"/>
              
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Senha"/>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClickNewUser}>
              Cadastrar
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Login
            </Button>
          </Modal.Footer>
			</Modal>
    );
  }
}
