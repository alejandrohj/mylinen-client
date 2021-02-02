import React from 'react'
import {Nav, Button, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {PUBLIC_URL} from '../../config';

export default function HomeNavbar(props) {
    const backgroundWaterStyle ={
        backgroundImage: `url(${PUBLIC_URL}/water-background.jpg)`, 
        backgroundSize: 'cover'
    }
    return (
      <>
      <Navbar sticky='top' className="general-nav" expand="lg" style={{backgroundColor:'#04c3fe'}}>
        <Link to="/"><img src={`${PUBLIC_URL}/white-logo.png`} style={{width: '150px'}} alt="logo"/></Link>
        <div style={{justifySelf: 'self-end'}}>
        </div>
      </Navbar>
      </>     
    )
}
