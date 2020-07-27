import React, { Component } from "react";

import {  Link } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Histroy from './Constants/History';

import axios from 'axios'


export default class Register extends Component {

    state={
        name:'',
        email:'',
        password:''
    }

    onChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;

        this.setState({
            [name]:value
        })

    }

    onSubmit=()=>{
        const {name,email,password}=this.state;
const data={
    name: name,
    email: email,
    password: password,
}
console.log('ggggggggg')
let url='http://localhost:3009/api/v1/employees/signup';
axios.post(url, data)
.then(res => {
   console.log(res)
   Histroy.push('/')
   window.location.reload()
},error=>{
console.log(error)
})

console.log(data)
    }
    render() {
        const style = {
            margin: 15,
          };
        return (
           
            <div className="auth-wrapper">
            <div className="auth-inner">
            <MuiThemeProvider>
          
            <AppBar
              title="SignUp"
            />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              id="name"
              //placeholder="Enter username"
              name="name"
              required
              autoFocus="true"
              value={this.state.name}
              onChange={this.onChange}
            />
            <br />
            <TextField
              hintText="Enter your Email"
              floatingLabelText="Email"
              id="Email"
              //placeholder="Enter username"
              name="email"
              required
              autoFocus="true"
              value={this.state.email}
              onChange={this.onChange}
            />
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              id="password"
              //placeholder="Enter password"
              name="password"
              required
              autoFocus="true"
              value={this.state.password}
              onChange={this.onChange}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={this.onSubmit}  />
            <Link to="/sign-in">sign in ?</Link> 
          
        </MuiThemeProvider>
        </div>
        </div>
        );
        
    }
    
    
}
