import React, { Component } from 'react'

import { graphql } from '@apollo/client/react/hoc';
import { gql } from "@apollo/client"

class ProductDetails extends Component {
  render() {
    console.log(this.props);
    return (
      
      <div>
        {!this.props.data.loading && <div>{this.props.data.product.name}</div> }
      </div>
    )
  }
}

const GET_DATA = gql`{
  product(id : "ps-5"){
    name
    description
  }
}`

export default graphql(GET_DATA)(ProductDetails);