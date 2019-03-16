import React, { Component } from 'react';

import SellerNav from '../components/SellerNav';

export default class Dashboard extends Component {
  componentWillMount(){
    const isBuyer = localStorage.getItem('@O-Commerce:isBuyer');
    const token = localStorage.getItem('@O-Commerce:accessToken');

    if((isBuyer === 'true' && token) || !token){
      alert('Você precisa está logado e ter uma conta Vendedor para acessar esta página!');
      this.props.history.push('/');
    }
  }

  render() {
    return (  
      <SellerNav history={this.props.history}/>
    );
  }
}
