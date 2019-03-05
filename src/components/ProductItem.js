import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default class ProductItem extends Component {
  render() {
    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col md={3} >
                        <Image fluid src={this.props.product.imgUrl ? this.props.product.imgUrl : 'https://palaciodaarte.vteximg.com.br/arquivos/ids/210463-300-300/Caixa-Organizadora-de-Maquiagem-com-17-Divisoes-e-1-Gaveta-232x22x153cm---Palacio-da-Arte-1.jpg?v=636718497461330000' } />
                    </Col>
                    <Col md={6}>
                        <strong>{this.props.product.name}</strong>
                        <p>{this.props.product.description}</p>
                    </Col>
                    <Col>
                        <p>R$ {this.props.product.price}</p>
                        
                        <Button style={{ marginRight: 7 + 'px' }} onClick={() => this.props.handleEdit(this.props.product._id)} variant="outline-warning">Editar</Button>
                        <Button onClick={() => this.props.handleDelete(this.props.product._id, this.props.index)} variant="outline-danger">Deletar</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
  }
}
