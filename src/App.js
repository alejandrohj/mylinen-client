import React, { Component } from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {API_URL} from './config'

//#region Components

import SignIn from './components/auth/SignIn';
import LaundryHome from './components/laundry/LaundryHome';
import HotelHome from './components/hotel/HotelHome';
import Customers from './components/laundry/CustomersList';

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
        })
        window.location.reload(false);
      })
  }

  handleLogOut = () =>{
    axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
    .then(()=>{
      this.setState({
        loggedInUser: null
      }, ()=>{
        this.props.history.push('/')
      })
    })
  }

  render() {
    return (
      <>
      <Switch>
        <Route exact path="/" render ={()=>{
          return <SignIn onSignIn = {this.handleSignIn} loggedInUser={this.loggedInUser}/>
        }}/>
        <Route path="/laundry/home" render ={()=>{
          return <LaundryHome loggedInUser={this.loggedInUser} logOut = {this.handleLogOut}/>
        }}/>
        <Route path="/hotel/home" render ={()=>{ 
          return <HotelHome loggedInUser={this.loggedInUser} logOut = {this.handleLogOut}/>
        }}/>
        <Route path="/laundry/complexes" render ={()=>{ 
          return <Customers loggedInUser={this.loggedInUser} logOut = {this.handleLogOut}/>
        }}/>
      </Switch>
      </>
    )
  }
}

export default withRouter(App)