
import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Login extends React.Component {


  
    constructor(props) {
      super(props);
      this.state = {
        username: 'uanem',
        password:'pass',
        loginError:false};

      
  
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);

    }
    
    handleUsernameChange(event) {
        this.setState({username: event.target.value});
      }
      
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
      }
    
    handleLogin(event) {
        console.log("Trying to login")

        let data = {"username":this.state.username, "password":this.state.password}

        fetch('http://127.0.0.1:8000/api/login', {
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

                this.props.app_atlogin(json)
            } else {
                console.log(json.message)
                this.setState({
                    loginError:true
                })            
            }
          
          
          }); 
      }
      
    
    render() {

        let loginErrorTagStyle = {display:"none"}

        if(this.state.loginError) {
            loginErrorTagStyle = {display:"block"}
        }



        return (
          <div>
            <h2>Log in</h2>
            <form>
              <label for="fname">Username:</label><br></br>
              <input type="text" id="fname" name="fname" value={this.state.username} onChange={this.handleUsernameChange}></input><br></br>
              <label for="lname">Password:</label><br></br>
              <input type="text" id="lname" name="lname"  value={this.state.password} onChange={this.handlePasswordChange}></input><br></br>
              <p id="loginstatus" style={loginErrorTagStyle}> Wrong username or password</p>
              <input type="button" value="Submit" onClick={this.handleLogin}></input>
            </form>
          </div>
        );
      }
  }
  
  export default Login;