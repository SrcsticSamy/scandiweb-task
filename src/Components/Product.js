import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from "../Styles/Product.module.css"
import bag from "../Static/bag.svg"

export default class Product extends Component {
  render() {
    return (
      <section className={styles.container}>
        <Link to={`/product/${this.props.data.id}`}>
          <img
            src={this.props.data.gallery[0]}
            height="300"
            width="auto"
            alt="product image"
            className={styles.productImg}
          />
        </Link>

        <div>
          {this.props.data.inStock ? (
            <div className={styles.details}>
              <h5>{this.props.data.name}</h5>
              <div>
                  {/* //change currency when you add state */}
                <b>{this.props.data.prices[0].amount}{this.props.data.prices[0].currency.symbol}</b>
                <button className={styles.addToBag}>
                  <img
                    src={bag}
                    height="32"
                    width="32"
                    alt="shopping bag icon"
                  />
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.details}>
                <h5>{this.props.data.name}</h5>
                <b style={{color:"red"}}>OUT OF STOCK</b>
            </div>
          )}
        </div>
      </section>
    );
  }
}
