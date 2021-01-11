
import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class ItemForm extends React.Component {


  
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        description:'',
        price:'',
        selectedItem:{},
        editing:this.props.editing,
        loginError:false,
        creationOk:false,
        formStyle:{display:"block"},
        userdata: {}
      }

      console.log(this.props.editing);


      
  
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

    componentDidMount(){

      this.setState({
        userdata:this.props.userdata,
        formStyle:this.props.formStyle
      })
      
  }
    
    handleSubmit(event) {
      console.log("SUBMITTING")
      let data = {
        "ownerId":this.props.userdata._id,
        "name":this.state.name, 
        "description":this.state.description, 
        "price":this.state.price,
        "type":"item"
      }


      fetch('https://murmuring-wave-81772.herokuapp.com/api/createItem', {
          method: "POST",
          body: JSON.stringify(data),
          headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then((json) => {          
          if(json.OK == true){

              this.props.onNewItem(json)
            
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


        let loginErrorTagStyle = {display:"none", color:"darkred"}
        let creationOkTagStyle = {display:"none", color:"darkgreen"}

        let fromHeader = "Create Item"
        let newStyle = this.props.editing? {display:"none"} : {display:"block"}

        console.log("Itemfrom")
        console.log(this.props.editing)

        if(this.state.loginError) {
            loginErrorTagStyle = {display:"block", color:"darkred"}
            creationOkTagStyle = {display:"none", color:"darkgreen"}
        }




        return (
          <div style={newStyle} className="col-sm-8 itemform">
            <h2>{fromHeader}</h2>
            <form>
              <label for="fname">Name:</label><br></br>
              <input type="text" id="fname" name="fname" value={this.state.name} onChange={this.handleNameChange}></input><br></br>
              <label for="lname">Description:</label><br></br>
              <input type="text" id="lname" name="lname"  value={this.state.description} onChange={this.handleDescriptionChange}></input><br></br>
              <label for="lname">Price:</label><br></br>
              <input type="text" id="lname" name="lname"  value={this.state.price} onChange={this.handlePriceChange}></input><br></br>
              <p style={loginErrorTagStyle}> Error, empty field</p><br></br>
              <p style={creationOkTagStyle}> Creation OK, Please reload page</p><br></br>

              <input  type="button" value="Submit" disabled={this.state.buttondisabled} onClick={this.handleSubmit}></input>
            </form>
          </div>
        );
      }
  }
  
  export default ItemForm;