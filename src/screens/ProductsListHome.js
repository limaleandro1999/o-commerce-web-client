import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import ProductItem from '../components/ProductItem';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export default class ProductsListHome extends Component {
    state = {
        products: []
    }

    componentWillMount(){
        let products = this.props.location.state.products;
        console.log('monut', products)
        this.setState({ products: products });
    }

    UNSAFE_componentWillReceiveProps(){
        let products = this.props.location.state.products;
        console.log('update', products)
        this.setState({ products: products });
    }
    
    render() {
        return (
            <div>
                <Navbar history={this.props.history}/>
                <Container style={{ marginTop: 2 + 'em' }}>
                    <Card>
                        <Card.Header>
                            <h3>Resultados</h3>
                        </Card.Header>
                        <Card.Body>
                            {
                                this.state.products.length <= 0 
                                ? <h2>Nenhum produto encontrado</h2>
                                : this.state.products.map((product, index) => {
                                    return (<ProductItem key={index} index={index} handleDelete={this.handleDeleteProduct} handleEdit={this.handleEditProduct} product={product}/>)
                                })
                            }
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}
