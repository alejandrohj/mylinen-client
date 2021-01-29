import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {API_URL} from '../../config';
import {Card,Form,Button} from 'react-bootstrap';

import LaundryNavbar from './LaundryNavbar';

export default function Users(props) {

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [users, setUsers] = useState(null);
    const [complexes, setComplexes] = useState(null);

    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggedInUser(result.data)
        })
        axios.get(`${API_URL}/user/all`,{withCredentials: true})
        .then((response)=>{
            setUsers(response.data)
        })
        axios.get(`${API_URL}/complexes`,{withCredentials: true})
        .then((response)=>{
            setComplexes(response.data)
        })
    },[])

    const handleModifyUser = (e,id) =>{
        e.preventDefault();
        console.log(e)
        const {firstName, email, userType, complex} = e.currentTarget;
        axios.post(`${API_URL}/user/${id}/edit`,{firstName: firstName.value, email: email.value, userType: userType.value,
        complex: complex?complex.value: null},{withCredentials: true})
        .then((response)=>{
            const UsersClone = JSON.parse(JSON.stringify(users));
            UsersClone.map((elem)=>{
                if(elem._id===id){
                    return response.data
                }
                else{return elem}
            })
            setUsers(UsersClone)
        }) 
    }
    const handleDisableUser = (id) =>{

    }
    console.log(users)
    if(!users || !loggedInUser || !complexes) return <p>Loading...</p>
    return (
        <>
            <LaundryNavbar logOut = {props.logOut}/>
            <div className='usersComplexCards'>
            {
               users.map((elem,i)=>{
                    return (
                        <div className='userComplexCard'>
                        <Card  key ={'user' + i} style={{ width: '18rem', margin: '10px' }}>
                            <Card.Body>
                                <Form onSubmit={(e)=>handleModifyUser(e,elem._id)}>
                                <Form.Group>
                                <Form.Label className="admin-card-title">Nombre</Form.Label>
                                <Form.Control name="firstName" type="text" defaultValue={elem.firstName} />
                                </Form.Group>

                                <Form.Group>
                                <Form.Label className="admin-card-title">Email</Form.Label>
                                <Form.Control name="email" type="email" defaultValue={elem.email} />
                                </Form.Group>

                                <Form.Group>
                                <Form.Label className="admin-card-title">Acceso</Form.Label>
                                <Form.Control name="userType" type="text" defaultValue={elem.userType} />
                                </Form.Group>
                                {
                                elem.userType==='gobernanta'?(
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label className="admin-card-title">Complejo</Form.Label>
                                <Form.Control name="complex" as="select">
                                <option>{elem.complex? elem.complex.name: 'Elige una categoría'}</option>
                                {
                                    complexes.map((elem, i) => {
                                    return <option key={'complexId' + i} value={elem._id}>{elem.name}</option>
                                    })
                                }
                                </Form.Control>
                            </Form.Group>
                                ): ''
                                }
                            <div className= 'buttonCouple'>
                                <Button onClick={props.handleError} className="general-btn" variant="primary" type="submit">
                                    Modificar
                                </Button>
                                <Button variant="warning" onClick={handleDisableUser(elem._id)}>{elem.disable?'Abilitar':'Desabilitar'}</Button>
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
