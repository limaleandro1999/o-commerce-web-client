import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import api from '../services/api';

export default class ProductForm extends Component {
    state = {
        name: '',
        description: '',
        price: 0
    }

    async componentDidMount(){
        if(this.props.productId){
            const responseProducts = await api.get(`/products/${this.props.productId}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('@O-Commerce:accessToken')}`}});
            let product = responseProducts.data;

            this.setState({ _id: product._id ,name: product.name, description: product.description, price: product.price });
        }
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = () => {
        this.props.handleSubmit(this.state);
    };

    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Nome do produto</Form.Label>
                    <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control as="textarea" name="description" value={this.state.description} onChange={this.handleInputChange} rows="3" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Valor</Form.Label>
                    <Form.Control type="number" name="price" value={this.state.price} onChange={this.handleInputChange}/>
                </Form.Group>

                <Button variant="primary" onClick={this.handleSubmit}>
                    Salvar
                </Button>
            </Form>
        );
    }
}
