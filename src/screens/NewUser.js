import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import api from '../services/api'

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/newUser.css';

export default class NewUser extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    isBuyer: ''
  };

  handleInputChange = e => {
    if(e.target.name === 'isBuyer'){
      this.setState({ cpf: '', phone: '', cep: '', address: '', cnpj: '' });
    }

    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    api.post('/users', this.state).then(res => {
      alert('Sucesso, agora você pode fazer seu login!');
      this.props.history.push('/');
      console.log(res.data);
    }).catch(error => {
      console.log(error)
      alert('Veja o console de desenvolvedor');
    });
  };

  render() {
    return (
			<div>
				<Navbar/>
        <Container style={{ marginTop: 2 + 'em' }}>
          <Card>
            <Card.Body>
              <Card.Title>
                Dados do usuário
              </Card.Title>
              <Form>
                <Row>
                  <Col sm={12} md={6}>
                    <Form.Group>
                      <Form.Label>Nome</Form.Label>
                      <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/>
                    </Form.Group>
                    
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleInputChange}/>
                    </Form.Group>
                    
                    <Form.Group>
                      <Form.Label>Senha</Form.Label>
                      <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange}/>
                    </Form.Group>

                    <fieldset>
                      <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={6}>
                          Tipo de usuário
                        </Form.Label>
                        <Col sm={6}>
                          <Form.Check
                            type="radio"
                            label="Comprador"
                            name="isBuyer"
                            onChange={this.handleInputChange}
                            value={true}
                          />
                          <Form.Check
                            type="radio"
                            label="Vendedor"
                            name="isBuyer"
                            onChange={this.handleInputChange}
                            value={false}
                          />
                        </Col>
                      </Form.Group>
                    </fieldset>
                  </Col>
                  {
                    this.state.isBuyer !== ''
                    ? 
                      this.state.isBuyer === "true"
                      ? <Col sm={12} md={6}>
                          <Form.Group>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control type="text" name="cpf" value={this.state.cpf} onChange={this.handleInputChange}/>
                          </Form.Group>
                          
                          <Form.Group>
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control type="text" name="phone" value={this.state.phone} onChange={this.handleInputChange}/>
                          </Form.Group>
                          
                          <Form.Group>
                            <Form.Label>CEP</Form.Label>
                            <Form.Control type="text" name="cep" value={this.state.cep} onChange={this.handleInputChange}/>
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control type="text" name="address" value={this.state.address} onChange={this.handleInputChange}/>
                          </Form.Group>

                          <Form.Group>
                            <Button onClick={this.handleSubmit}>
                              Cadastrar
                            </Button>
                          </Form.Group>                    
                        </Col>
                      : <Col sm={12} md={6}>
                          <Form.Group>
                            <Form.Label>CNPJ</Form.Label>
                            <Form.Control type="text" name="cnpj" value={this.state.cnpj} onChange={this.handleInputChange}/>  
                          </Form.Group>
                          
                          <Form.Group>
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control type="text" name="phone" value={this.state.phone} onChange={this.handleInputChange}/>
                          </Form.Group>
                          
                          <Form.Group>
                            <Button onClick={this.handleSubmit}>
                              Cadastrar
                            </Button>
                          </Form.Group>
                        </Col>
                    : <div/>
                  }
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Container>
			</div>
    );
  }
}
