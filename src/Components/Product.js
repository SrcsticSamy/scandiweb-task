import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from "../Styles/Product.module.css"
import bag from "../Static/bag.svg"

import { connect } from 'react-redux'

class Product extends Component {

  viewProduct = () => {
    this.props.changeProductID(this.props.data.id)
  }

  render() {
    return (
      <div className={styles.container}>
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
          

        <div>
          {this.props.data.inStock ? (
            <div className={styles.details}>
              <h5>{this.props.data.name}</h5>
              <div>
                <span>{this.props.price.amount}{this.props.price.currency.symbol}</span>
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