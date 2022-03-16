import React, { Component } from 'react'
import { connect } from 'react-redux'
import BagItem from '../Components/BagItem'

class Bag extends Component {
  clearBag = () => {
    this.props.clearBagItems()
  }


  render() {

    const totalPrices = []

    return (
      <div style={{ padding:"10px 10%"}}>

          <button onClick={this.clearBag} 
          style={{margin:"20px auto", padding:"1%", display:"block", height:"max-content", width:"max-content", borderRadius:"10px",
          fontWeight:"bold", fontSize:"2rem", backgroundColor:"red", border:"none", color:"white", boxShadow:"2px 2px 10px black"}}>
            Clear Bag
          </button>

          <div style={{height:"50vh", overflowX:"hidden", overflowY:"scroll"}}>
            {this.props.bagItems.map(item=>{
              const currentCurrencyPrice = item.prices.find(currency=> currency.currency.label === this.props.currency)
              totalPrices.push(Math.ceil(item.quantity * currentCurrencyPrice.amount))
              
              return(

                <BagItem key={item.id} price={currentCurrencyPrice} data={item} />

              )
            })}
          </div>

          <h1>Total Price:
             
            {totalPrices.reduce((prev, nxt)=>{
            return prev+nxt
          }, 0)} 
          USD
          </h1>


      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return{
      bagItems: state.bag,
      currency: state.currency
    }
  }

const mapDispatchToProps = (dispatch) => {
    return{
      changeProductOptions: (productOption)=> dispatch({type: "PRODUCT_OPTIONS_UPDATE", productOptions: productOption}),
      clearBagItems : ()=> dispatch({type: "CLEAR_BAG"})
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Bag)