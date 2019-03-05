import React, { Component } from 'react';

import SellerNav from '../components/SellerNav';
import ProductsForm from '../components/ProductsForm';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


import api from '../services/api'

export default class NewProduct extends Component {
    handleSaveProduct = (product) => {
        api.post('/products', product, {headers: {'Authorization': `Bearer ${localStorage.getItem('@O-Commerce:accessToken')}`}}).then(res => {
            this.props.history.push('/produtos');
        }).catch(error => {
            console.log(error);
        });
    };

    render() {
        return (
            <div>
                <SellerNav history={this.props.history}/>
                <Container style={{ marginTop: 2 + 'em' }}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Novo Produto</Card.Title>
                            <ProductsForm handleSubmit={this.handleSaveProduct}/>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}
