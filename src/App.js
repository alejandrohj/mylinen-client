import React, { Component } from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {API_URL} from './config'

//#region Components

import SignIn from './components/auth/SignIn';
import Navbar from './components/main/Navbar';

//#endregion Components

import 'bootstrap/dist/css/bootstrap.css'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';


class App extends Component {

  state = {
    loggedInUser: null
  }

  componentDidMount = () =>{
    if(!this.loggedInUser){
      axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          this.setState({
            loggedInUser: result.data
          })
        })
    }
  }

  handleSignIn = (e) =>{
    e.preventDefault();
    const {email, password} = e.currentTarget;

    axios.post(`${API_URL}/signin`,{email: email.value, password: password.value},  {withCredentials: true})
      .then((res)=>{
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/')
        })
      })
  }

  render() {
    return (
      <>
      <Navbar loggedInUser = {this.loggedInUser}/>
      <Switch>
        <Route path="/" render ={()=>{
          return <SignIn onSignIn = {this.handleSignIn} loggedInUser={this.loggedInUser}/>
        }}/>
      </Switch>
      </>
    )
  }
}

export default withRouter(App)