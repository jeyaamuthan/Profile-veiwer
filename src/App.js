
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login";

import SignUp from "./components/Register";
import Index from './components/Index';
import {AUTHORIZION,TOKEN} from './components/Constants/constant';
import History from './components/Constants/History';

function logOut(){
 
  localStorage.removeItem(AUTHORIZION);
  localStorage.removeItem(TOKEN);
  History.push('/')
  window.location.reload()
    }
  
function App() {


  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand">Profile Viewer</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                
                {localStorage.getItem(AUTHORIZION)&&<a onClick={logOut}>Logout</a>}
              </li>
              
              <li className="nav-item">
              {!localStorage.getItem(AUTHORIZION)&& <Link className="nav-link" to={"/sign-up"}><a>Sign up</a></Link>}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/index" component={Index} />
      

            
          </Switch>
     
    </div>
    
  );
}

export default App;