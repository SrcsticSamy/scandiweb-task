import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from "../Styles/Product.module.css"
import bag from "../Static/bag.svg"

export default class Product extends Component {
  render() {
    return (
      <section className={styles.container}>

          <Link to="/product/4" >
            <img src="https://picsum.photos/300" height="300" width="auto" alt="product image" className={styles.productImg} />
          </Link>

          <div>
            <div className={styles.details}>
                <h5>Product Name</h5>
                <div>
                    <b>25$</b>
                    <button className={styles.addToBag}>
                        <img src={bag} height="32" width="32" alt="shopping bag icon" />
                    </button>
                </div>
            </div>

          </div>
          
      </section>
    )
  }
}
