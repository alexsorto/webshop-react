
import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class EditAccount extends React.Component {


  
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password:'',
        email:'',
        repeatpassword:'',
        oldpassword:'',
        passmatchstyle:{display:"none"},
        buttondisabled:true,
        loginError:false,
        signedup:false,
        userdata:{}
      }

      
  
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
      this.handleRegister = this.handleRegister.bind(this);
      this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);

    }
    
    
    handleUsernameChange(event) {
        this.setState({username: event.target.value});
      }
      
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
        
      }

    handleOldPasswordChange(event) {
        this.setState({oldpassword: event.target.value});
        
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

      let data = {"username":this.props.userinfo.username, "password":this.state.oldpassword, "newpassword":this.state.password}

      fetch('http://127.0.0.1:8000/api/changepassword', {
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
                  signedup:true
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

        let loginErrorTagStyle = this.state.loginError ? {display:"block", color:"darkred"} :{display:"none", color:"darkred"} 
        let registerOkayStyle =  this.state.signedup ? {display:"block", color:"darkgreen"} : {display:"none", color:"darkgreen"}


        return (
          <div>
            <h2>Account Information</h2>
            <form>
              <label for="fname">Username:</label><br></br>
              <input type="text" id="fname" name="fname" value={this.props.userinfo.username} onChange={this.handleUsernameChange}></input><br></br>
              <label for="lname">Email:</label><br></br>
              <input type="text" id="lname" name="lname"  value={this.props.userinfo.email} onChange={this.handleEmailChange}></input><br></br>
              <p className="cpasswordlabel"> Change password </p><br></br>

              <label for="lname">Old Password:</label><br></br>
              <input type="text" id="lname" name="lname"  value={this.state.oldpassword} onChange={this.handleOldPasswordChange}></input><br></br>
              <label for="lname">New password:</label><br></br>
              <input type="text" id="lname" name="lname"  value={this.state.password} onChange={this.handlePasswordChange}></input><br></br>
              <label for="lname">Repeat new password:</label><br></br>
              <input type="text" id="lname" name="lname"  value={this.state.repeatpassword} onChange={this.handleRepeatPasswordChange}></input><br></br>
              <p id="registerstatus" style={loginErrorTagStyle}> Error, wrong password</p>
              <p style={registerOkayStyle}> Change OK, you can now login!</p>

              <b style= {this.state.passmatchstyle} className="passmatcher"> Password dont match </b><br></br>
              <input  type="button" value="Submit" disabled={this.state.buttondisabled} onClick={this.handleRegister}></input>
            </form>
          </div>
        );
      }
  }
  
  export default EditAccount;