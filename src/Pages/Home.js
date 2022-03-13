import React, { Component } from 'react'
import styles from "../Styles/HomePage.module.css"

import Product from '../Components/Product'

export default class Home extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>Clothes</h1>

        <div className={styles.productsList}>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
          <Product/>
        </div>
      </div>
    )
  }
}