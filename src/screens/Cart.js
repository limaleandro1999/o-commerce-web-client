import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import ProductItem from '../components/ProductItem';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import api from '../services/api';

export default class Cart extends Component {
    state = {
        cart: {
            products: []
        },
        total: 0
    };

    async componentDidMount(){
        let cart = await api.get(`/cart/cart`, {headers: {'Authorization': `Bearer ${localStorage.getItem('@O-Commerce:accessToken')}`}});
        this.setState({ cart: cart.data });

        this.getTotalCart();
    }

    getTotalCart = () => {
        let total = 0;

        this.state.cart.products.map(product => {
            total += product.quantity * product.product.price;
        })

        this.setState({ total: total });
    }; 

    handleFinishSale = async () => {
        await api.post('/sales', this.state.cart,  {headers: {'Authorization': `Bearer ${localStorage.getItem('@O-Commerce:accessToken')}`}})
        .then(res => {
            alert('Compra finalizada com sucesso!');
            console.log(res.data);
            this.setState({ cart: res.data }); 
        })    
        .catch(error => {
            alert('error');
        })
    };

    render() {
        return (
            <div>
                <Navbar history={this.props.history}/>
                <Container style={{ marginTop: 2 + 'em' }}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <Container>
                                    <Row>
                                        <Col md={7}><h2>Carrinho</h2></Col>
                                        {
                                            this.state.cart.products.length > 0 
                                            ?
                                                <>
                                                    <Col md={3}><h2>Total: R$ {this.state.total}</h2></Col>
                                                    <Col md={1}><Button onClick={this.handleFinishSale} variant="outline-success">Finalizar</Button></Col>
                                                </>
                                            : <div/>
                                        }                                                
                                    </Row>
                                </Container>
                            </Card.Title>
                            {
                                this.state.cart.products.length > 0 
                                ?   this.state.cart.products.map((product, index) => {
                                        return (
                                            <ProductItem key={index} index={index} product={product.product}>
                                                <p>Quantidade: {product.quantity}</p>
                                            </ProductItem>
                                        )
                                    })
                                : <h2>Nenhum produto encontrado</h2>
                            }
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}
