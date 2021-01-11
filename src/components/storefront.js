
import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import ItemContainer from './itemcontainer'

class Storefront extends React.Component {


  
    constructor(props) {
        
      super(props);
      this.state = {
        currentpage: 1, 
        displayedItems:[],
        allItems:[],
        search:'',
        userdata:{},
        purchaseView:false
    };

     const fetchedItems = []

     if(this.state.displayedItems.length == 0) {
     fetch('https://murmuring-wave-81772.herokuapp.com/api/getallitems', {
         method: "GET",
         headers: {"Content-type": "application/json;charset=UTF-8"}
       })
       .then(response => response.json()) 
       .then((json) => {          
         if(json.OK == false){

         } else {
             let jobj = JSON.parse(json)
             for(let o in jobj){
                fetchedItems.push(jobj[o])
             }
         }
       

         this.setState({
             displayedItems:fetchedItems,
             allItems:fetchedItems,
             search:''
         })   

       }); 
    }
  
      this.handlePageChange = this.handlePageChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);

    }
    
    handlePageChange(event) {
        this.setState({username: event.target.value});
      }
      
    componentDidUpdate() {
        if(this.props.userdata != this.state.userdata) {
            let purchaseView = (this.state.userdata._id != null) ? true : false

            this.setState({
                userdata:this.props.userdata
            })
        }
    }

    handleSearch(event) {

        let searchResults = []
        for(let item in this.state.allItems) {
            let element = this.state.allItems[item]
            if(element.name.includes(event.target.value)) {
                searchResults.push(element)
            }
        }

        this.setState(previousState => ({
            search: event.target.value, 
            displayedItems:searchResults}));

      }
    
    render() {
        

        return (
          <div>
            <h2>Products for sale</h2>
            <label for="lname">Search:</label><br></br>
              <input type="text" id="lname" name="lname"  value={this.state.search} onChange={this.handleSearch}></input><br></br>
            <div className="container col-sm-12"> 
                <ItemContainer displayedItems={this.state.displayedItems} purchaseView={this.props.loggedIn} editView={false} userdata={this.props.userdata}></ItemContainer>
            </div>
          </div>
        );
      }
  }
  
  export default Storefront;