import React, { Component } from 'react'
import Choice from '../Components/Choice'
import styles from "../Styles/ProductDetails.module.css"

import { gql } from "@apollo/client"

import { Query } from '@apollo/client/react/components'

import {store} from '../Redux/store';
import { connect } from 'react-redux'

class ProductDetails extends Component {

  constructor(props){
    super(props)
    this.state ={
      productID: store.getState().productID,
      currency: store.getState().currency,
      imageIndex: 0
    }
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=>{
      this.setState({productID: store.getState().productID, currency: store.getState().currency})
      console.log(store.getState());
    })
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  handleImage = (index) =>{
    this.setState({imageIndex: index})
  }

  render() {

    const GET_DATA = gql`{
      product(id : ${JSON.stringify(this.state.productID)}){
        name
        description
        brand
        inStock
        gallery
        prices{
          amount
          currency{
            label
            symbol
          }
        }
        attributes{
          id
          name
          type
          items{
            displayValue
            id
            value
          }
        }
      }
    }`

    return (
      <Query query={GET_DATA}>
        {
          ({data, loading, error})=>{
            
            if (error) {
              return (
                <h1 style={{ textAlign: "center", margin: "10rem" }}>
                  An Error Occured.
                </h1>
              );
            }

            if (loading) {
              return (
                <h1 style={{ textAlign: "center", margin: "10rem" }}>
                  Loading...
                </h1>
              );
            } else {
              const currentCurrencyPrice = data.product.prices.find(currency=> currency.currency.label === this.state.currency)
              const attributes = data.product.attributes
              return (
                <div className={styles.container}>
  
                  <div className={styles.productInfo}>
                    <h1>{data.product.name}</h1>
                    <h2>Price: {currentCurrencyPrice.currency.symbol}{currentCurrencyPrice.amount}</h2>  
                    
                    <hr style={{margin:"20px auto", width:"100%"}}/>
                    {attributes.map(attribute=>{
                      return(
                        <div key={attribute.name}>
                          <h2 key={attribute.name}>{attribute.name}</h2>
                          {attribute.items.map(item=>{
                              return ( <Choice onClick={()=>this.props.changeProductOptions({"attribute": item.value})} key={item.id} text={item.displayValue} color={item.value} type={attribute.type}/> )
                            })}

                        </div>
                      )
                    })}
                    {data.product.inStock? <button className={styles.addtoBag}>ADD TO BAG</button> : <h3>OUT OF STOCK ❌</h3> }

                    

                    <hr style={{margin:"20px auto", width:"100%"}}/>

                    <h3>From <b>{data.product.brand}</b></h3>
                    <div dangerouslySetInnerHTML={{__html: data.product.description}}></div>                    

                  </div>
  
                  <div className={styles.productImages}>
                    <img src={data.product.gallery[this.state.imageIndex]} alt={data.product.name} height="400" />
                    <br />
                    {data.product.gallery.map((image, index)=>{
                      return <img src={image} key={image} width="auto" alt="" height="100" onClick={()=>this.handleImage(index)}/>
                    })}
                  </div>
                  
                </div>
              );
            }            
          }
        }
      </Query>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    changeProductOptions: (productOption)=> dispatch({type: "PRODUCT_OPTIONS_UPDATE", productOptions: productOption}),
  }
}

export default connect(null, mapDispatchToProps)(ProductDetails);