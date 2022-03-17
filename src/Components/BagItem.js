import React, { Component } from "react";
import { connect } from "react-redux";
import { store } from "../Redux/store";
import styles from "../Styles/BagItem.module.css";
import deleteIcon from "../Static/delete.svg";

class BagItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.data.quantity,
    };
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      const x = this.props.data.id;
      const item = store.getState().bag.find((item) => {
        return item.id === x;
      });

      this.setState({
        quantity: item.quantity ? item.quantity : 0,
      });
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  increment = () => {
    this.props.incrementQunatity(this.props.data.id);
  };

  decrement = () => {
    this.props.decrementQunatity(this.props.data.id);
  };

  removeItem = () => {
    this.props.removeItem(this.props.data.id);
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.productDetails}>
          <div>
            <h4>{this.props.data.brand}</h4>
            <h3>{this.props.data.name}</h3>
            {this.props.price.currency && (
              <h4>
                {this.props.price.amount}
                {this.props.price.currency.symbol}
              </h4>
            )}
            <hr />
          </div>

          {Object.entries(this.props.data.attributes).map((attribute) => {
            return (
              <span key={attribute}>
                {attribute[0]}: <b>{attribute[1]}</b> |{" "}
              </span>
            );
          })}

          <h4>
            Total Price:{" "}
            {Math.floor(this.props.data.quantity * this.props.price.amount)}
            {this.props.price.currency.symbol}
          </h4>
        </div>

        <div className={styles.productShowCase}>
          <div className={styles.productQuantity}>
            <button onClick={this.increment}>+</button>
            <b>{this.state.quantity}</b>
            <button onClick={this.decrement}>-</button>
          </div>

          <img
            src={this.props.data.image}
            width="150"
            height="auto"
            alt="prod"
          />
          <button
            onClick={this.removeItem}
            style={{
              padding: "1%",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "1rem",
              backgroundColor: "red",
              border: "none",
              color: "white",
            }}
          >
            <img
              src={deleteIcon}
              width="32"
              height="auto"
              alt="trash can icon"
            />
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementQunatity: (id) => dispatch({ type: "QUANTITY_INC", id }),
    decrementQunatity: (id) => dispatch({ type: "QUANTITY_DEC", id }),
    removeItem: (id) => dispatch({ type: "REMOVE_BAG_ITEM", id }),
  };
};

export default connect(null, mapDispatchToProps)(BagItem);
