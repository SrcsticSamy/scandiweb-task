import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from "../Styles/Product.module.css"
import bag from "../Static/bag.svg"

import ProductOptions from './ProductOptions'

import { connect } from 'react-redux'

class Product extends Component {
  //gets clicked product's id to fetch its data for the PDP
  viewProduct = () => {
    this.props.changeProductID(this.props.data.id)
  }

  render() {

    return (
      <div className={styles.container}>
        {/* Product image */}
        <Link to={`/product/${this.props.data.id}`}>
          <img
            src={this.props.data.gallery[0]}
            height="300"
            width="auto"
            alt={this.props.data.name}
            className={styles.productImg}
            onClick={this.viewProduct}
          />
        </Link>

        <div className={styles.details}>
            {/* Product name and price */}
            <h4>{this.props.data.name}</h4>

            <h5>
              {this.props.price.currency.symbol}
              {this.props.price.amount}
            </h5>

            <hr />

            <ProductOptions
              attributes={this.props.data.attributes}
              inStock={this.props.data.inStock}
              name={this.props.data.name}
              price={this.props.price}
            />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    changeProductID: (productID)=> dispatch({type: "PRODUCT_ID_UPDATE", productID: productID}),
  }
}

export default connect(null, mapDispatchToProps)(Product)