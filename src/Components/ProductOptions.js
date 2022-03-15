import React, { Component } from 'react'
import { connect } from 'react-redux'
import { store } from '../Redux/store'

class ProductOptions extends Component {

    constructor(props){
        super(props)
        this.state = {
            product: {
                attributes: {}
            }
        }
    }

    componentDidMount(){
        const obj = {
            name: this.props.name,
            price: this.props.price.amount,
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

  render() {
      
    return (
      <>
        {this.props.attributes.map((attribute) => {
          return (
            <div key={attribute.name}>

              <h2 key={attribute.name}>{attribute.name}</h2>

              {attribute.items.map((item) => {
                return (
                  <button key={item.id} onClick={() => this.handleChoice(attribute.name, item.id )}>
                    {item.displayValue}
                  </button>
                );
              })}

            </div>
          );
        })}

        {this.props.inStock ? (
            !Object.values(this.state.product.attributes).some(choice=> choice === "")?
            (<button onClick={()=>this.props.addtoBag(this.state.product)}>ADD TO BAG</button>)
            :
            (<div style={{border:"2px solid black", margin:"10px"}}>Choose options to add to bag</div> )
        ) : (
          <h3>OUT OF STOCK ❌</h3>
        )}

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
      addtoBag: (product)=> dispatch({type: "ADD_TO_BAG", product: product}),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductOptions)