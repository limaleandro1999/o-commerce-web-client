import React, { Component } from 'react';

import SellerNav from '../components/SellerNav';
import ProductItem from '../components/ProductItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import api from '../services/api';

export default class ProductList extends Component {
    state = {
        products: []
    };

    componentWillMount(){
        const isBuyer = localStorage.getItem('@O-Commerce:isBuyer');
        const token = localStorage.getItem('@O-Commerce:accessToken');
        
        if((isBuyer === 'true' && token) || !token){
            alert('Você precisa está logado e ter uma conta Vendedor para acessar esta página!');
            this.props.history.push('/');
    
        }
    }

    async componentDidMount(){
        const responseProducts = await api.get('/products', {headers: {'Authorization': `Bearer ${localStorage.getItem('@O-Commerce:accessToken')}`}});
        this.setState({ products: responseProducts.data });
    }

    handleClickNewProduct = () => {
        this.props.history.push('/cadastrar_produto');
    };

    handleEditProduct = (productId) => {
        this.props.history.push('/editar_produto', {productId: productId})
    };

    handleDeleteProduct = (productId, index) => {
        api.delete(`/products/${productId}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('@O-Commerce:accessToken')}`}}).then(res => {
            const { products } = this.state;

            products.splice(index, 1);

            this.setState({ products: products });
        }).catch(error => {
            console.log(error);
        });
    };

    render() {
        return (
            <> 
                <SellerNav history={this.props.history}/>
                <Container style={{ marginTop: 2 + 'em' }}>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col md={10}>
                                    <h3>Produtos</h3>
                                </Col>
                                <Col>
                                    <Button variant="outline-success" onClick={this.handleClickNewProduct}>
                                        Novo Produto
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            {
                                this.state.products.map((product, index) => {
                                    return (
                                        <ProductItem key={index} index={index} product={product}>
                                            <Button style={{ marginRight: 7 + 'px' }} onClick={() => this.handleEditProduct(product._id)} variant="outline-warning">Editar</Button>
                                            <Button onClick={() => this.handleDeleteProduct(product._id, this.index)} variant="outline-danger">Deletar</Button>
                                        </ProductItem>
                                    )
                                })
                            }
                        </Card.Body>
                    </Card>
                </Container>
            </>
        );
    }
}
