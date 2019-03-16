import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import api from '../services/api';

export default class Product extends Component {
    state = {
        product: undefined
    }
    
    async componentWillMount(){
        let product = await api.get(`/products/${this.props.history.location.pathname.slice(9)}`)
        this.setState({ product: product.data });
    }

    handleButtonAddProduct = async () => {
        let cart = await api.post(`/cart/addProduct`, {
            productId: this.state.product._id
        }, {
            headers: {'Authorization': `Bearer ${localStorage.getItem('@O-Commerce:accessToken')}`}
        }).then(res => {
            alert('Produto adicionado');
            console.log(res.data)
        }).catch(error => {
            alert(error);
        })
    };

    render() {
        return (
            <div>
                <Navbar render={this.state.render} history={this.props.history}/>
                <Container style={{ marginTop: 2 + 'em' }}>
                    <Card>
                        <Card.Body>
                            {
                                this.state.product 
                                ?   <>
                                        <Row>
                                            <Col xs={6} md={4}>
                                                <Card.Img src={this.state.product.imgUrl ? this.state.product.imgUrl : 'https://image.flaticon.com/icons/png/512/36/36601.png'} fluid rounded />
                                            </Col>
                                            <Col>
                                                <h1>{this.state.product.name}</h1>
                                            </Col>
                                            <Col>
                                                <h3>R$ {this.state.product.price}</h3>
                                                <Button onClick={this.handleButtonAddProduct} variant="outline-secondary" size="lg">Carrinho</Button>
                                            </Col>
                                        </Row>
                                        <Card.Text style={{ marginTop: 1 + 'em' }}>
                                            <h3>Descrição</h3>
                                            {this.state.product.description}
                                        </Card.Text>
                                    </>
                                :   <Row>
                                        <h2>Nenhum produto encontrado</h2>
                                    </Row>

                            }
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}
