 
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
        purchaseView:false,
        itemData: {}
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
    componentDidMount() {
      this.setState({
        itemData:this.props.itemData,
        canBuy: this.props.usercanbuy,
        purchaseView:this.props.purchaseView
      })
    }

    componentDidUpdate(lastprops){
      console.log("Item did update")
      if(this.props.itemData != this.state.itemData){
        this.setState({
          itemData:this.props.itemData,
          canBuy: this.props.usercanbuy,
          purchaseView:this.props.purchaseView
        })
      }
    }

    render() {

      console.log("RENDERING ITEM")

        let purchasableButtonStyle = {display:"none"}


        if(this.state.canBuy && this.state.purchaseView){
          purchasableButtonStyle = {display:"block", "margin-top":"20px"}
        }

        let editViewStyle = {display:"none"}

        if(this.props.editView){
          editViewStyle = {display:"block"}
        }

        return (
            <div className=" col-sm-5 col-sm-offset-1 item"> 
              <div className="col-sm-8 text-left itemInfo">
                <p className="itemname"> {this.state.itemData.name}</p>
                <p className="itemdesc"> {this.state.itemData.description}</p>
                <p className="itemprice"> ${this.state.itemData.price}</p>
                <input valign="bottom" type="submit" value="Add to Cart" style={purchasableButtonStyle}></input>
                <div className=" col-sm-12 itemeditbuttons">
                <a className="col-sm-6" style={editViewStyle} onClick={this.onEdit}> Edit </a>
                <a className="col-sm-6" style={editViewStyle} onClick={this.onRemove}> Remove </a>
                </div>
                {/* <img src={cart} className="cartIcon"></img> */}

              </div>
              <div className="col-sm-4 itemImage">

              </div>
            </div>
        );
      }
  }

  export default Item;