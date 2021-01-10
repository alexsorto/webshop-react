 
import React, { Component } from 'react';
import cart from './shopping-cart.svg'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

 
 class Item extends React.Component {


  
    constructor(props) {
      super(props);
      this.state = {
        loggedUserId : "",
        canBuy:false,
        editView:false,
        itemData: this.props.itemData
      };

      
  
      this.addToCart = this.addToCart.bind(this);
      this.onEdit = this.onEdit.bind(this);
      this.onRemove = this.onRemove.bind(this);

    }
    
    addToCart(event) {
    
    }
      
    onEdit() {
      console.log("Edt")

      this.props.handleEdit(this.state.itemData)
    }

    onRemove() {
      this.props.handleRemove(this.state.itemData)
    }
    
    render() {

        let purchasableButtonStyle = {display:"none"}

        if(this.props.canBuy){
          purchasableButtonStyle = {display:"block"}
        }

        if(this.props.ownerId == this.props.itemData.ownerId){
          purchasableButtonStyle = {display:"none"}
        }

        let editViewStyle = {display:"none"}

        if(this.props.editView){
          editViewStyle = {display:"block"}
        }

        return (
            <div className=" col-sm-4 col-sm-offset-1 item"> 
              <div className="col-sm-8 text-left itemInfo">
                <p> {this.state.itemData.name}</p>
                <p className="itemdesc"> {this.state.itemData.description}</p>
                <p> ${this.state.itemData.price}</p>
                <input type="submit" value="Add to Cart" style={purchasableButtonStyle}></input>
                <a className="col-sm-4" style={editViewStyle} onClick={this.onEdit}> Edit </a>
                <a className="col-sm-4" style={editViewStyle} onClick={this.onRemove}> Remove </a>

                {/* <img src={cart} className="cartIcon"></img> */}

              </div>
              <div className="col-sm-4 itemImage">

              </div>
            </div>
        );
      }
  }

  export default Item;