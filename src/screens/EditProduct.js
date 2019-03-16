import React, { Component } from 'react';

import SellerNav from '../components/SellerNav';
import ProductsForm from '../components/ProductsForm';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import api from '../services/api';

export default class NewProduct extends Component {
    componentWillMount(){
        const isBuyer = localStorage.getItem('@O-Commerce:isBuyer');
        const token = localStorage.getItem('@O-Commerce:accessToken');
        
        if((isBuyer === 'true' && token) || !token){
            alert('Você precisa está logado e ter uma conta Vendedor para acessar esta página!');
            this.props.history.push('/');
    
        }
    }

    handleSaveProduct = (product) => {
        api.put(`/products/${product._id}`, product, {headers: {'Authorization': `Bearer ${localStorage.getItem('@O-Commerce:accessToken')}`}}).then(res => {
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
                            <Card.Title>Editar Produto</Card.Title>
                            <ProductsForm productId={this.props.location.state.productId} handleSubmit={this.handleSaveProduct}/>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}
