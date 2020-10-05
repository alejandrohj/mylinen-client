import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

//#region Components

import SignIn from './components/auth/SignIn';
import Navbar from './components/main/Navbar';

//#endregion Components

import 'bootstrap/dist/css/bootstrap.css'

export default class App extends Component {

  handleSignIn = () =>{

  }

  render() {
    return (
      <>
      <Navbar/>
      <Switch>
        <Route exact path="/" render ={()=>{
          return <SignIn/>
        }}/>
      </Switch>
      </>
    )
  }
}
