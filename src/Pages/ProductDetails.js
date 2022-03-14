import React, { Component } from 'react'

import { gql } from "@apollo/client"

import { Query } from '@apollo/client/react/components'

import {store} from '../Redux/store';

class ProductDetails extends Component {

  constructor(props){
    super(props)
    this.state ={
      productID: store.getState().productID
    }
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=>{
      this.setState({productID: store.getState().productID})
    })
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  render() {

    const GET_DATA = gql`{
      product(id : ${JSON.stringify(this.state.productID)}){
        name
        description
      }
    }`

    return (
      <Query query={GET_DATA}>
        {
          ({data, loading, error})=>{

            if(error){
              return(
                <>
                  <h1>An Error Occured.</h1>
                </>
              )
            }

            if(loading){
              return(
                <h1>Loading...</h1>
              )
            }

            return (
              <>
                <h1>{data.product.name}</h1>
                <div dangerouslySetInnerHTML={{__html: data.product.description}}></div>
              </>
            );
          }
        }
      </Query>
    )
  }
}

export default ProductDetails;