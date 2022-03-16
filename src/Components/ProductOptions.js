import React, { Component } from 'react'
import { connect } from 'react-redux'

class ProductOptions extends Component {

    constructor(props){
        super(props)
        this.state = {
            product: {
                attributes: {}
            },
            quantityError : null,
            addToBagMsg: "Select Choices To Add To Bag"
        }
    }

    createProductObject = () => {
      const product = {
        name: this.props.data.name,
        prices: this.props.data.prices,
        image: this.props.data.gallery[0],
        brand: this.props.data.brand,
        quantity: 1,
        id: Math.floor(Math.random()*1000),
        attributes: {}
        }

      this.props.data.attributes.forEach(attribute => {
        product.attributes[attribute.name] = ""
      });

      this.setState({
        product: product
      })
    }

    componentDidMount(){
        this.createProductObject()
    }
 
    handleChoice = (attributeName, itemID) => {
        this.setState({
            product: {
                ...this.state.product,
                
                attributes: {
                    ...this.state.product.attributes,
                    [attributeName]: itemID

                }
            }
        })
    }

    handleBag = () => {
      this.props.addtoBag(this.state.product);
      this.setState({
        addToBagMsg: "Added To Your Bag!"
      })

      this.createProductObject()


      setTimeout(()=>{
        this.setState({
          addToBagMsg: "Select Choices To Add To Bag"
        })
      }, 3000)
      
    }

    handleQuantity = (e) =>{
      if(e.target.value>10 || e.target.value<1){
        this.setState({
          quantityError: "Max 10 items Allowed."
        })
      } else{
        this.setState({
          product:{
            ...this.state.product,
            quantity: e.target.value
          },
          quantityError: null
        })
      }
    }

  render() {

    if(!this.props.data.inStock){
      return(
        <h2 style={{color:"red", textAlign:"center"}}>
          OUT OF STOCK ❌
        </h2>
      )
    }
      
    return (
      <>
        {this.props.data.attributes.map((attribute) => {
          return (
            <div key={attribute.name}>

              <span key={attribute.name}>{attribute.name}: <b>{this.state.product.attributes[attribute.name] || "Choose an option"}</b> </span>
                <br />
              {attribute.items.map((item) => {
                return (
                  <button 
                  style={{backgroundColor: item.value, border:"1px solid black", minWidth: "40px", height: "30px",
                  margin:"5px", padding: "1%"}} 
                  key={item.id} 
                  onClick={() => this.handleChoice(attribute.name, item.id )}
                   >
                    {attribute.type === "swatch"? "" : item.displayValue}
                  </button>
                );
              })}
            </div>
            
          );
        })}


        <div>
          <label htmlFor="quantity">{this.state.quantityError? this.state.quantityError : "Quantity"}</label>
          <input type="number" max="10" min="1" id="quantity" placeholder='Max 10 Items' style={{width:"100%"}} onChange={this.handleQuantity}/>
        </div>
        
        {/* Determines if the user made product choices or not */}
        {!Object.values(this.state.product.attributes).some(choice=> choice === "") && !this.state.quantityError ?
            (<button onClick={this.handleBag} style={{width:"100%", marginTop:"20px", height:"2em"}}>ADD TO BAG</button>)
            :
            (<h6 style={{marginTop:"20px", textAlign:"center", height:"2em"}}>{this.state.addToBagMsg}</h6> )
        }

      </>
    );
  }
}

const mapStateToProps = (state) => {
    return{
       bagItems : state.bag
    }
  }

const mapDispatchToProps = (dispatch) => {
    return{
      addtoBag: (product)=> dispatch({type: "ADD_TO_BAG", product}),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductOptions)