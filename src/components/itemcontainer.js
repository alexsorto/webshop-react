
import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Item from './item'

class ItemContainer extends React.Component {


  
    constructor(props) {
      super(props);
      this.state = {
        currentpage: 1, 
        displayedItems:[],
        editView: false,
        purchaseView: false,
        userdata: {}
      };

      
      
      this.handlePageChange = this.handlePageChange.bind(this);
      this.forwardEdit = this.forwardEdit.bind(this);
      this.forwardRemove = this.forwardRemove.bind(this);

    }
    
    handlePageChange(event) {
        this.setState({username: event.target.value});
      }
      
    forwardEdit(item){
        this.props.handleEdit(item)
    }

    forwardRemove(item){
      this.props.handleRemove(item)
    }

    componentDidMount(){
      this.setState({
        userdata:this.props.userdata
      })
    }
    componentDidUpdate(){
      if(this.props.userdata != this.state.userdata) {
      this.setState({
        userdata:this.props.userdata
      })
    }
  }
    render() {
      console.log("Rendering item container")

      const items = []
      this.props.displayedItems.forEach(element => {
        
        let purchasable = false
        if(this.props.purchaseView) {
        purchasable = (element.ownerId === this.props.userdata._id) ? false : true;
        }
        items.push(
        <Item handleEdit={this.forwardEdit} handleRemove={this.forwardRemove} itemData= {element} 
          key={element._id} editView={this.props.editView} usercanbuy={purchasable} purchaseView={this.props.purchaseView}>

          </Item>)
      });
      
        return (
            <div className="container"> 
                {items}
            </div>
        );
      }
  }
  




  export default ItemContainer;