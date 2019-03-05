import React, { Component } from 'react';

import SellerNav from '../components/SellerNav';

export default class Dashboard extends Component {
  render() {
    return (  
      <SellerNav history={this.props.history}/>
    );
  }
}
