import React from 'react'
import {Nav, Button, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {PUBLIC_URL} from '../../config';

export default function LaundryNavbar(props) {
    const backgroundWaterStyle = {
        backgroundImage: `url(${PUBLIC_URL}/water-background.jpg)`, 
        backgroundSize: 'cover'
    }
    return (
      <>
      <Navbar sticky='top' className="general-nav" expand="lg" style={{backgroundColor: '#0b56bf'}}>
        <Link to="/"><img src={`${PUBLIC_URL}/white-logo.png`} style={{width: '150px'}} alt="logo"/></Link>
        <Nav.Item>
            <Link><Button style={{border: 'none',backgroundColor: 'transparent', color: 'white'}}>Mis lavados</Button></Link>
        </Nav.Item>
        <div style={{display: 'flex',justifySelf: 'self-end'}}>
                    <Nav.Item>
                        <Button style={{border: 'none',backgroundColor: 'transparent', color: 'white'}} onClick={props.logOut}>Salir</Button>
                    </Nav.Item>
        </div>
      </Navbar>
      </>     
    )
}