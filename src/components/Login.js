import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from "react"
import axios from 'axios'

import {TOKEN,AUTHORIZION} from './Constants/constant';
import Histroy from './Constants/History';

class Login extends Component {
  state = {
    user:{
      email: '',
      password: ''
    }
  }
  handleClick = () => {

  }
  handleChange = ({ currentTarget: input }) => {
    const user = { ...this.state.user };
    user[input.name] = input.value;
    this.setState({ user });
  };
  handleSubmit = event => {
    event.preventDefault();
    const {user}=this.state;
    console.log(user);
    
    axios
      .post('http://localhost:3009/api/v1/employees/signin', user)
      .then(res => {
        console.log(res);
       localStorage.setItem(TOKEN,res.data.token)
       localStorage.setItem(AUTHORIZION,res.data.status)
        // this.clearField();
    Histroy.push('/index')
    window.location.reload()
      })
      .catch(error => {
        console.log(error);
        // alert("There is an error in API call....");
      });
  };
  render() {
    return (
      <div className="auth-wrapper">
      <div className="auth-inner">
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Login"
            />
            <TextField
              hintText="Enter your Email"
              floatingLabelText="E-mail"
              id="email"
              //placeholder="Enter username"
              name="email"
              required
              autoFocus="true"
              value={this.state.user.email}
              onChange={this.handleChange}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              id="password"
              //placeholder="Enter password"
              name="password"
              required
              autoFocus="true"
              value={this.state.user.password}
              onChange={this.handleChange}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={this.handleSubmit}  />
          </div>
        </MuiThemeProvider>
      </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Login;