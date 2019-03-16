import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import ProductItem from '../components/ProductItem';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class ProductsListHome extends Component {
    state = {
        products: []
    }

    componentWillMount(){
        let products = this.props.location.state.products;
        this.setState({ products: products });
    }

    UNSAFE_componentWillReceiveProps(){
        let products = this.props.location.state.products;
        this.setState({ products: products });
    }
    
    handleClickProduct = (product) => {
        this.props.history.push({pathname: `/produto/${product._id}`, state: { product: product }});
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
                                    return (
                                        <ProductItem key={index} index={index} product={product}>
                                            <Button onClick={() => this.handleClickProduct(product)} variant="outline-success">Confira!</Button>
                                        </ProductItem>
                                    )
                                })
                            }
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}
