import React, { Component } from 'react'
import { connect } from 'react-redux'
import { store } from '../Redux/store'

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

    componentDidMount(){
        const obj = {
            name: this.props.name,
            price: this.props.price.amount,
            quantity: 1,
            attributes: {}
        }
        this.props.attributes.forEach(attribute => {
            obj.attributes[attribute.name] = ""
        });
        this.setState({
            product: obj
        })
    }

    componentDidUpdate(){
        store.subscribe(()=>{
            localStorage.setItem("bag", JSON.stringify(store.getState().bag))
        })
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

    handleBag = (e) => {
      this.props.addtoBag(this.state.product);
      this.setState({
        addToBagMsg: "Added To Your Bag!"
      })

      setTimeout(()=>{
        this.setState({
          addToBagMsg: "Select Choices To Add To Bag"
        })
      }, 3000)
      
      // const obj = {
      //   name: this.props.name,
      //   price: this.props.price.amount,
      //   quantity: 1,
      //   attributes: {},
      // };

      // this.props.attributes.forEach((attribute) => {
      //   obj.attributes[attribute.name] = "";
      // });



      // this.setState({
      //   product: obj,

      // });
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

    if(!this.props.inStock){
      return(
        <h2 style={{color:"red", textAlign:"center"}}>
          OUT OF STOCK ❌
        </h2>
      )
    }
      
    return (
      <>
        {this.props.attributes.map((attribute) => {
          return (
            <div key={attribute.name}>

              <h6 key={attribute.name}>{attribute.name}: {this.state.product.attributes[attribute.name] || "Choose an option"} </h6>

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