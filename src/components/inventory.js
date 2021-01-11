
import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import ItemContainer from './itemcontainer'
import ItemForm from './itemform'
import EditForm from './editform'

class Inventory extends React.Component {


  
    constructor(props) {
        
      super(props);
      this.state = {
        currentpage: 1, 
        displayedItems:[],
        allItems:[],
        search:'',
        editingItem:false,
        selectedItem:{name:'',desc:'',price:'2'},
        editFormStyle:{display:"none"},
        createFormStyle:{display:"block"},
        test:"1234",
        userdata:{}
    };


      this.handlePageChange = this.handlePageChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleNewItem = this.handleNewItem.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.handleCreateNewItemButton = this.handleCreateNewItemButton.bind(this);
      this.handleEditReturn = this.handleEditReturn.bind(this);
    }

    loadItems() {
        const fetchedItems = []
        let data = {"ownerId":this.props.userinfo._id}
   
        fetch('http://127.0.0.1:8000/api/getitemsforuser', {
            method: "POST",
            body: JSON.stringify(data),
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
          
   
            this.setState((previousState) => ({
                displayedItems:fetchedItems,
                allItems:fetchedItems,
                search:'',
                currentForm:'none',
                test:'123',
                userdata:this.props.userinfo
                
            }))   
   
          }); 
    }

    componentDidMount(){
        console.log("Component mount")

        this.loadItems();
    }



    handlePageChange(event) {
        this.setState({username: event.target.value});
      }
      
    handleSearch(event) {

        let searchResults = []
        for(let item in this.state.allItems) {
            let element = this.state.allItems[item]
            if(element.name.includes(event.target.value)) {
                searchResults.push(element)
            }
        }

        this.setState({
            search: event.target.value, 
            displayedItems:searchResults});

      }

    
    handleEdit(item) {

        this.setState({
            editingItem:true,
            selectedItem:item
        })

        console.log(this.state.selectedItem)
    }

    handleEditReturn(item) {
        console.log(item)
        let newList = []
        for(let i in this.state.displayedItems) {
            let element = this.state.displayedItems[i]
            if(element._id == item._id){
               continue
            } else {
            newList.push(element)
            }
        }
        newList.push(item)

        this.setState({
            displayedItems:newList
        })


    }

    handleCreateNewItemButton(event) {
        this.setState({            
            editingItem:false,
        });
    }
      
    handleNewItem(item) {
        console.log("ON NEW ITEM")
        console.log(item)

        let newList = this.state.displayedItems
        
        newList.push(item)

        this.setState({
            displayedItems: newList
        })

    
}


    handleRemove(item) {
        
        console.log("Removing")
        console.log(item)
        let data = {"_id":item._id}
        let loginErrorHere = false

        fetch('http://127.0.0.1:8000/api/removeItem', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json;charset=UTF-8"}
          })
          .then(response => response.json()) 
          .then((json) => {          
            if(json.OK == true){
                console.log(json.message)
                loginErrorHere = false
  
            } else {
                console.log(json.message)
                loginErrorHere = true

            }
          
          
          }); 
        
        let newList = []
        for(let i in this.state.displayedItems) {
            let element = this.state.displayedItems[i]
            if(element._id == item._id){
                continue;
            } else {
            newList.push(element)
            }

        }

        this.setState({
            displayedItems : newList,
            test:12345
        })

    }


    
    render() {



        console.log("Rendering inv")
        console.log(this.state.displayedItems)
        console.log(this.state.test)



        return (
          <div className="container col-sm-12">
            <h2 className="col-sm-10 col-sm-push-1">Inventory</h2>
            <div className="container col-sm-12">
                <div className="col-sm-2">
                    <label for="lname">Search:</label>
                  <input type="text" id="lname" name="lname"  value={this.state.search} onChange={this.handleSearch}></input><br></br>
                </div>
                <div className="col-sm-2 col-sm-push-8">
                    <input className="lightmargin" type="button" value="Create new item" onClick={this.handleCreateNewItemButton}></input>
                </div>
            </div>
            <div className=" col-sm-11 col-sm-push-2" > 
                <EditForm editing={this.state.editingItem}  selectedItem={this.state.selectedItem} formStyle={this.state.editFormStyle} onEditOk={this.handleEditReturn}></EditForm>
                <ItemForm editing={this.state.editingItem}  selectedItem={this.state.selectedItem} formStyle={this.state.createFormStyle} onNewItem={this.handleNewItem} userdata={this.state.userdata}></ItemForm>
            </div> 

            <div> 
                <ItemContainer handleEdit={this.handleEdit} handleRemove={this.handleRemove} displayedItems={this.state.displayedItems} editView={true}></ItemContainer>
            </div>

          </div>
        );
      }
  }
  
  export default Inventory;