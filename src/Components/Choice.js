import React, { Component } from 'react'

export default class Choice extends Component {
  render() {
    return (
      <button 
      style={{margin:"10px", padding:"5px", height:"50px", width: "100px", border: "3px solid", display:"inline-block",
      backgroundColor: this.props.color, fontWeight:"bold"}}>
        {this.props.type==="swatch"? "" : this.props.text}
      </button>
    )
  }
}
