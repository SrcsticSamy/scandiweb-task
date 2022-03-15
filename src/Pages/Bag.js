import React, { Component } from 'react'
import { connect } from 'react-redux'

class Bag extends Component {
  clearBag = () => {
    localStorage.removeItem("bag")
    this.props.clearBagItems()
  }
  render() {
    return (
      <div>

          <button onClick={this.clearBag} 
          style={{margin:"20px auto", padding:"1%", display:"block", height:"max-content", width:"max-content", borderRadius:"10px",
          fontWeight:"bold", fontSize:"2rem", backgroundColor:"red", border:"none", color:"white", boxShadow:"2px 2px 10px black"}}>
            Clear Bag
          </button>

          {this.props.bagItems.map((item, index)=>{
            return(

              <div style={{border:"2px solid black", margin:"10px", padding:"20px"}} key={index+1}>
                <h2>{item.name}</h2>
                <h3>Quantity: {item.quantity}</h3>

                {
                  Object.entries(item.attributes).map(choice=>{
        
                    return <span key={choice}>{choice[0]}: <b>{choice[1]}</b> | </span>
                  })
                }

                <h3>Price: {Math.ceil(item.price * item.quantity)} {this.props.currency}</h3>
                
              </div>

            )
          })}

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