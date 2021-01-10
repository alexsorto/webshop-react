
import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class EditForm extends React.Component {


  
    constructor(props) {
      super(props);
      this.state = {
        name: this.props.itemname,
        description:this.props.selectedItem.description,
        price:this.props.selectedItem.price,
        selectedItem:this.props.selectedItem,
        editing:this.props.editing,
        loginError:false,
        creationOk:false,
        formHeader:"Editing Item",
        formStyle:this.props.formStyle
      }
     
      

      
  
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }
    
    
    handleNameChange(event) {
        this.setState({name: event.target.value});
      }
      
    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
        
      }

    handlePriceChange(event) {
        this.setState({price: event.target.value});
    }
    handleEditing() {
      this.setState(
        {name: "test"});
    }

    handleSubmit(event) {
      console.log("Trying to submit item")

      let data = {
        "ownerId":"2",
        "name":this.state.name, 
        "description":this.state.description, 
        "price":this.state.price,
        "type":"item"}

      fetch('http://127.0.0.1:8000/api/createItem', {
          method: "POST",
          body: JSON.stringify(data),
          headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then((json) => {          
          if(json.OK == true){
              console.log(json.message)
              this.setState({
                  loginError:false,
                  creationOk:true,
                  name:"",
                  description:"",
                  price:""
              })

          } else {
              console.log(json.message)
              this.setState({
                  loginError:true,
                  creationOk:false,
              })            
          }
        
        
        }); 
    }


    render() {


        console.log("Redering edit form")
        console.log(this.state.selectedItem)

        let loginErrorTagStyle = {display:"none", color:"darkred"}
        let creationOkTagStyle = {display:"none", color:"darkgreen"}


        if(this.state.loginError) {
            loginErrorTagStyle = {display:"block", color:"darkred"}
            creationOkTagStyle = {display:"none", color:"darkgreen"}
        }





        return (
          <div style={this.state.formStyle} className="col-sm-8 itemform">
            <h2>Editing Item</h2>
            <form>
              <label for="fname">Name:</label><br></br>
              <input type="text" id="fname" name="fname" value={this.state.name} onKeyUp={this.handleNameChange}></input><br></br>
              <label for="lname">Description:</label><br></br>
              <input type="text" id="lname" name="lname"  value={this.state.description} onKeyUp={this.handleDescriptionChange}></input><br></br>
              <label for="lname">Price:</label><br></br>
              <input type="text" id="lname" name="lname"  value={this.state.price} onKeyUp={this.handlePriceChange}></input><br></br>
              <p style={loginErrorTagStyle}> Error, empty field</p><br></br>
              <p style={creationOkTagStyle}> Creation OK, Please reload page</p><br></br>

              <input  type="button" value="Submit" disabled={this.state.buttondisabled} onClick={this.handleSubmit}></input>
            </form>
          </div>
        );
      }
  }
  
  export default EditForm;