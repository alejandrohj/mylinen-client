import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {API_URL} from '../../config';
import {Card, Form, Row,Col, Button} from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom';

import LaundryNavbar from './LaundryNavbar';
import CreateLaundry from './CreateLaundry';

export default function CustomersList(props) {

    const [laundries, setLaundries] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState (null);
    const [redirecting,setRedirecting] = useState (false);

    //let categories = ['linen','clothes']

    const handleCreateLaundry = (e) =>{
        e.preventDefault();
        const {name,code}= e.currentTarget;
        axios.post(`${API_URL}/laundry/create`,{name: name.value,code: code.value}, {withCredentials: true})
            .then((laundry)=>{
                let laundriesClone = JSON.parse(JSON.stringify(laundries));
                laundriesClone.push(laundry.data);
                setLaundries(laundriesClone);
            })
    }
    useEffect(() => {

        axios.get(`${API_URL}/laundries`, {withCredentials: true})
            .then((res)=>{
                setLaundries(res.data)
            })
            axios.get(`${API_URL}/user`, {withCredentials: true})
            .then((result) => {
              setLoggedInUser(result.data)
            })
            .catch(() => {
                setRedirecting(true)
            })
    }, [])

    const handleUpdateLaundry = (e,id) =>{
        e.preventDefault();
        const {name,code}= e.currentTarget;
        axios.post(`${API_URL}/laundry/${id}/update`,{name: name.value,code: code.value}, {withCredentials: true})
        .then((response)=>{
            const laundriesClone = JSON.parse(JSON.stringify(laundries));
            laundriesClone.map((elem)=>{
                if(elem._id===id){
                    return response.data
                }
                else{return elem}
            })
            setLaundries(laundriesClone)
        }) 
    }
    const handleDeleteLaundry = (id) =>{

    }
    if(redirecting) return <Redirect to={'/'}/>
    if(!laundries || !loggedInUser) return (<p>Loading...</p>)
    return (
        <>
            <LaundryNavbar logOut = {props.logOut} loggedInUser={loggedInUser}/>
            <CreateLaundry onCreateLaundry = {handleCreateLaundry}/>
            <hr/>
            <div className='usersComplexCards'>
            {
                laundries.map((elem,i)=>{
                    return(
                    <div className='userComplexCard'>
                        <Card key ={'complex' + i} style={{ width: '18rem', margin: '10px' }}>
                        <Card.Body>
                        <Form onSubmit={(e)=>handleUpdateLaundry(e,elem._id)} >
                        <Form.Group>
                            <Form.Label className="admin-card-title">Nombre</Form.Label>
                            <Form.Control name="name" type="text" defaultValue={elem.name} />
                        </Form.Group>
  
                        <Form.Group>
                            <Form.Label className="admin-card-title">Código</Form.Label>
                            <Form.Control name="code" type="text" defaultValue={elem.code} maxLength="100"/>
                        </Form.Group>

                        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <div className= 'buttonCouple'>
                                <Button onClick={props.handleError} className="general-btn" variant="primary" type="submit">
                                    Modificar
                                </Button>
                                <Button variant="danger">Eliminar</Button>
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