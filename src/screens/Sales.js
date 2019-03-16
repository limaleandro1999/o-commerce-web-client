import React, { Component } from 'react';

import SellerNav from '../components/SellerNav';
import ProductItem from '../components/ProductItem';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import api from '../services/api';

export default class Sales extends Component {
    state = {
        sales: []
    };

    async componentDidMount(){
        const sales = await api.get('/sales', {headers: {'Authorization': `Bearer ${localStorage.getItem('@O-Commerce:accessToken')}`}});
        
        sales.data.map(sale => {
            sale.product.price = sale.total;
        })

        this.setState({ sales: sales.data });
    }

    render() {
        return (
            <>
                <SellerNav history={this.props.history}/>
                <Container style={{ marginTop: 2 + 'em' }}>
                    <Card>
                        <Card.Header>
                            <h3>Vendas</h3>
                        </Card.Header>
                        <Card.Body>
                            {
                                this.state.sales.length > 0
                                ?   this.state.sales.map(sale => {
                                        return(
                                            <ProductItem product={sale.product}>
                                                <p><b>Quantidade:</b> {sale.quantity}</p>
                                                <p><b>Comprador:</b> {sale.buyer.name}</p>
                                                <p><b>Email do comprador:</b> {sale.buyer.email}</p>
                                            </ProductItem>
                                        )
                                    })
                                : <h5>Você ainda não tem vendas</h5>
                            }
                        </Card.Body>                        
                    </Card>
                </Container>       
            </>
        );
    }
}
