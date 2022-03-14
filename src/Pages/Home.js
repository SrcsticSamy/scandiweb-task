import React, { Component } from 'react'
import styles from "../Styles/HomePage.module.css"
import Product from '../Components/Product'

import { graphql } from '@apollo/client/react/hoc';
import { gql } from "@apollo/client"

class Home extends Component {


  showProducts() {
    if(!this.props.data.loading){
      const categories = this.props.data.categories;
      //change all to current selected category when you add state
      const {products} = categories.find(category => category.name === "all")

      return(
        products.map(product=>{
          return <Product data={product} key={product.id}/>
        })
      )
      
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>ALL</h1>

        <div className={styles.productsList}>
          {this.showProducts()}
        </div>
      </div>
    )
  }
}

const GET_DATA = gql`{
  categories{
    name
    products{
      id
      name
      inStock
      gallery
      prices{
        amount
        currency{
          symbol
          label
        }
      }
    }
  }
}`

export default graphql(GET_DATA)(Home);