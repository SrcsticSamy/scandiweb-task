import React, { Component } from 'react'
import { connect } from 'react-redux'

class Bag extends Component {
  render() {
    return (
      <div>

          {this.props.bagItems.map((item, index)=>{
            return(

              <div style={{border:"2px solid black", margin:"10px", padding:"20px"}} key={index+1}>
                <h2>{item.name} - {item.price}</h2>

                {
                  Object.entries(item.attributes).map(choice=>{
        
                    return <span key={choice}>{choice[0]}: <b>{choice[1]}</b> | </span>
                  })
                }
                
              </div>

            )
          })}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return{
      bagItems: state.bag
    }
  }

const mapDispatchToProps = (dispatch) => {
    return{
      changeProductOptions: (productOption)=> dispatch({type: "PRODUCT_OPTIONS_UPDATE", productOptions: productOption}),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Bag)