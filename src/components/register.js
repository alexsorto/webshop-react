
import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Register extends React.Component {


  
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password:'',
        email:'',
        repeatpassword:'',
        passmatchstyle:{display:"none"},
        buttondisabled:true,
        loginError:false

      }

      
  
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
      this.handleRegister = this.handleRegister.bind(this);

    }
    
    
    handleUsernameChange(event) {
        this.setState({username: event.target.value});
      }
      
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
        
      }

    handleRepeatPasswordChange(event) {
        this.setState({repeatpassword: event.target.value});

        if(this.state.password == event.target.value) {

          
          this.setState({
            passmatchstyle:{display:"none"},
            buttondisabled:false
        });
        }

        else {
          this.state.passmatchstyle = {display:"block", color:"darkred"}
        }
    }
    
    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }
    
    handleRegister(event) {
      console.log("Trying to login")

      let data = {"username":this.state.username, "password":this.state.password, "email":this.state.email}

      fetch('http://127.0.0.1:8000/api/registeruser', {
          method: "POST",
          body: JSON.stringify(data),
          headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then((json) => {          
          if(json.OK == true){
              console.log(json.message)
              this.setState({
                  loginError:false
              })

          } else {
              console.log(json.message)
              this.setState({
                  loginError:true
              })            
          }
        
        
        }); 
    }


    render() {

        let loginErrorTagStyle = {display:"none", color:"darkred"}

        if(this.state.loginError) {
            loginErrorTagStyle = {display:"block", color:"darkred"}
            
        }

        return (
          <div>
            <h2>Register</h2>
            <form>
              <label for="fname">Username:</label><br></br>
              <input type="text" id="fname" name="fname" value={this.state.username} onChange={this.handleUsernameChange}></input><br></br>
              <label for="lname">Email:</label><br></br>
              <input type="text" id="lname" name="lname"  value={this.state.email} onChange={this.handleEmailChange}></input><br></br>
              <label for="lname">Password:</label><br></br>
              <input type="text" id="lname" name="lname"  value={this.state.password} onChange={this.handlePasswordChange}></input><br></br>
              <label for="lname">Repeat password:</label><br></br>
              <input type="text" id="lname" name="lname"  value={this.state.repeatpassword} onChange={this.handleRepeatPasswordChange}></input><br></br>
              <p id="registerstatus" style={loginErrorTagStyle}> Error, empty field or existing user</p>

              <b style= {this.state.passmatchstyle} className="passmatcher"> Password dont match </b><br></br>
              <input  type="button" value="Submit" disabled={this.state.buttondisabled} onClick={this.handleRegister}></input>
            </form>
          </div>
        );
      }
  }
  
  export default Register;