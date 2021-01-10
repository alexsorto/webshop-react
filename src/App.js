import logo from './webshop.png';
import Square from './components/testlist'
import Login from './components/login'
import Register from './components/register'
import Storefront from './components/storefront'
import Inventory from './components/inventory'

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



import './App.css';


class App extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      loggedIn:false,
      userData:{},
      loggedInvisibleStyle:{display:"block"},
      loggedVisibleStyle:{display:"none"}

    }
    this.logUserIn = this.logUserIn.bind(this);

  }

  logUserIn(userdata) {
    console.log("Reported login!");
    console.log(userdata)
    this.setState({
      loggedIn:true,
      loggedInvisibleStyle:{display:"none"},
      loggedVisibleStyle:{display:"block"}

    })
  }

render() {



  return (
    
    <div className="App">
    <Router>
      <div className="container-fluid header_1">
          <div className="col-sm-12 text-center welcome">
            <h1 >Welcome</h1>
          </div>

          <div className="col-sm-2  col-sm-push-10 creds">
          <ul  className="headerlist">


          <li style={this.state.loggedInvisibleStyle}>
            <Link to="/">Sign-in</Link>
          </li>
          <li style={this.state.loggedInvisibleStyle}>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/storefront">Store Front</Link>
          </li>
          <li  style={this.state.loggedVisibleStyle}>
            <Link to="/inventory">My Inventory</Link>
          </li>
          </ul>
          </div>
          <div className="col-sm-3 col-sm-pull-2 ">
            <img className="storelogo" src={logo}/>
          </div>
        </div>
      <br></br>
    <div  className="container col-sm-12 text-center"  >
      <Switch >
          <Route exact path="/">
            <Login app_atlogin={this.logUserIn}/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/storefront">
            <Storefront />
          </Route>
          <Route path="/inventory">
            <Inventory />
          </Route>
      </Switch>
      </div>
      </Router>

      
    </div>
  );
}
}



export default App;
