import React from 'react'
import {Nav, Button, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {PUBLIC_URL} from '../../config';

export default function LaundryNavbar(props) {
    const backgroundWaterStyle ={
        backgroundImage: `url(${PUBLIC_URL}/water-background.jpg)`, 
        backgroundSize: 'cover'
    }
    return (
        <Navbar style={{backgroundColor:'#04c3fe'}} collapseOnSelect expand="lg" sticky="top">
        <Navbar.Brand href="/"><img src={`${PUBLIC_URL}/white-logo.png`} alt='logo' height='50'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/laundry/complexes">Complejos</Nav.Link>
            <Nav.Link href="/laundry/users">Usuarios</Nav.Link>
            </Nav>
            {
            props.loggedInUser? (<Nav>
            <Nav><Button onClick={props.logOut}>LogOut </Button></Nav>
            </Nav>) : (<Nav>
            <Nav><Link to={'/signin'}> <Button>Registrarse</Button></Link></Nav>
            </Nav>)
            }
            
        </Navbar.Collapse>
    </Navbar>   
    )
}
