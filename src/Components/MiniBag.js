import React, { Component } from "react";
import { connect } from "react-redux";
import BagItem from "./BagItem";
import styles from "../Styles/MiniBag.module.css";
import { Link } from "react-router-dom";

class MiniBag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  render() {
    const totalPrices = [];

    return (
      <div className={styles.backdrop}>
        <div className={styles.minibag}>
          <h1 style={{ textAlign: "center" }}>
            {this.props.bagItems.length} items
          </h1>

          <div className={styles.items}>
            {this.props.bagItems.map((item) => {
              const currentCurrencyPrice = item.prices.find(
                (currency) => currency.currency.label === this.props.currency
              );
              totalPrices.push(
                Math.ceil(item.quantity * currentCurrencyPrice.amount)
              );

              return (
                <BagItem
                  key={item.id}
                  price={currentCurrencyPrice}
                  data={item}
                />
              );
            })}
          </div>

          <h2 style={{ textAlign: "center" }}>
            Total Price: {totalPrices.reduce((prev, nxt) => prev + nxt, 0)}{" "}
            {this.props.currency}
          </h2>

          <div className={styles.showFullBag}>
            <Link to="/bag">
              <button>Show Full Bag</button>
            </Link>

            <button>Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bagItems: state.bag,
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProductOptions: (productOption) =>
      dispatch({
        type: "PRODUCT_OPTIONS_UPDATE",
        productOptions: productOption,
      }),
    clearBagItems: () => dispatch({ type: "CLEAR_BAG" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniBag);
