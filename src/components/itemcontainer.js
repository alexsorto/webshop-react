
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
        editView: this.props.editView
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

    componentWillReceiveProps(){
       this.setState({})

    }
    
    render() {
      console.log("Rendering item container")
      const items = []
      this.props.displayedItems.forEach(element => {
        items.push(<Item handleEdit={this.forwardEdit} handleRemove={this.forwardRemove} itemData= {element} key={element._id} editView={this.state.editView}></Item>)
      });
      
        return (
            <div className="container"> 
                {items}
            </div>
        );
      }
  }
  




  export default ItemContainer;