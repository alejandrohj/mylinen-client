import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {API_URL} from '../../config';
import {Card, Form, Row,Col, Button} from 'react-bootstrap';

import CustomerCard from './CutomerCard'
import LaundryNavbar from './LaundryNavbar';
import CreateComplex from './CreateComplex';

export default function CustomersList(props) {

    const [complexes, setComplexes] = useState(null);
    let categories = ['laundry','renting']

    const handleCreateComplex = (e) =>{
        e.preventDefault();
        const {name,adress,services}= e.currentTarget;
        console.log(name,adress,services)
        axios.post(`${API_URL}/complex/create`,{name: name.value,adress: adress.value,services: services.value}, {withCredentials: true})
            .then((complex)=>{
                let complexesClone = JSON.parse(JSON.stringify(complexes));
                complexesClone.push(complex.data);
                setComplexes(complexesClone);
            })
    }
    useEffect(() => {

        axios.get(`${API_URL}/complexes`, {withCredentials: true})
            .then((res)=>{
                setComplexes(res.data)
            })
    }, [])

    const handleDisableComplex = (id) =>{

    }

    if(!complexes) return (<p>Loading...</p>)
    console.log(complexes)
    return (
        <>
            <LaundryNavbar logOut = {props.logOut}/>
            <CreateComplex onCreateComplex = {handleCreateComplex}/>
            <hr/>
            <div className='usersComplexCards'>
            {
                complexes.map((elem,i)=>{
                    return(
                    <div className='userComplexCard'>
                        <Card key ={'complex' + i} style={{ width: '18rem', margin: '10px' }}>
                                <Card.Body>
                                <Form onSubmit={props.onCreateComplex} >
            <Row>
                <Col>
              <Form.Group>
                <Form.Label className="admin-card-title">Name</Form.Label>
                <Form.Control name="name" type="text" defaultValue={elem.name} />
              </Form.Group>
  
              <Form.Group>
                <Form.Label className="admin-card-title">Address</Form.Label>
                <Form.Control name="adress" type="text" defaultValue={elem.adress} maxLength="100"/>
              </Form.Group>
              
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="admin-card-title">Category</Form.Label>
                  <Form.Control name="services" as="select">
                    <option>{elem.services}</option>
                    {
                      categories.map((elem, i) => {
                      return <option key={'category' + i} value={elem}>{elem}</option>
                      })
                    }
                  </Form.Control>
                </Form.Group>
                </Col>
              </Row>
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div className= 'buttonCouple'>
                    <Button onClick={props.handleError} className="general-btn" variant="primary" type="submit">
                        Modificar
                    </Button>
                    <Button variant="warning" onClick={handleDisableComplex(elem._id)}>{elem.disable?'Abilitar':'Desabilitar'}</Button>
                </div>
              </div>
            </Form>
                                </Card.Body>
                        </Card>
                    </div>
                    )
               }) 
            }
        </div>
        </>
    )
}
