import React from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {PUBLIC_URL} from '../../config';


export default function SignIn(props) {
    return (
        <>
        <div className="signin" >
        <p style={{textAlign: 'center', padding: '30px', marginLeft:'5%', marginRight:'5%',color: '#036C9C', fontWeight:'600', fontSize: '25px'}}><em>Ordena y organiza tu lencería con myLinen</em></p>
        <Form noValidate className="admin-signinform" onSubmit={props.onSignIn} style={{display: 'flex',flexDirection: 'column' ,justifyContent: 'center', alignItems: 'center' ,textAlign: 'center'}}>
            <Form.Group style={{width:'50%'}} controlId="formBasicEmail">
            <Form.Label style={{color: '#036C9C', fontWeight:'600'}}>Email address</Form.Label>
            <Form.Control  name="email" type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>

            <Form.Group style={{width:'50%'}} controlId="formBasicPassword">
            <Form.Label style={{color: '#036C9C', fontWeight:'600'}}>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" />
            <Form.Text className="text-muted">
                Password needs to have a number, a character, a lowercase and uppercase letter and needs to have at least 8 characters.
            </Form.Text>
            </Form.Group>
            {
            props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
            }
            <Button style={{fontSize: '20px'}} className="general-btn" variant="primary" type="submit">
            Sign In
            </Button>
        </Form>
        </div>
        </>
    )
}
