import React,{useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../../config';
import {Table,Button, Form} from 'react-bootstrap';

import LaundryNavbar from './LaundryNavbar';
import AddLaundry from './AddComplexNewLaundry';

export default function ComplexLaundries(props) {
    let id = props.match.params.id;

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [redirecting,setRedirecting] = useState (false);
    const [laundries, setLaundries] = useState(null);
    const [complex, setComplex] = useState(null);

    useState(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggedInUser(result.data)
        })
        axios.get(`${API_URL}/laundries`, {withCredentials: true})
            .then((res)=>{
                setLaundries(res.data)
            })
        axios.get(`${API_URL}/complex/${id}/details`,{withCredentials: true})
            .then((response)=>{
                setComplex(response.data)
            })
    },[])

    const handleAddLaundry = (e) =>{
        e.preventDefault();
        const {laundry, price} = e.currentTarget;
        let updatedLinen;
        if(complex.linen)
        {
            const linenClone = JSON.parse(JSON.stringify(complex.linen));
            const newArticle = {laundry: laundry.value, price: price.value};
            linenClone.push(newArticle);
            updatedLinen = linenClone;
        }
        else{
            updatedLinen= [{laundry: laundry.value,price: price.value}]
        }
        console.log(updatedLinen);
        axios.post(`${API_URL}/complex/${id}/updatelinen`,{linen: updatedLinen},{withCredentials: true})
            .then((res)=>{
                window.location.reload(false);
            })
    }

    const handleEditPrice = (e,laundryId) =>{
        e.preventDefault();
        const {price} = e.currentTarget;
        const complexClone = JSON.parse(JSON.stringify(complex));
        const UpdatedComplex = complexClone.linen.map((elem)=>{
            console.log(laundryId, 'id');
            console.log(elem.laundry._id, 'laundryId')
            if(elem.laundry._id ===laundryId){
                elem.price=price.value
            }
            return elem
        })
        console.log(UpdatedComplex)
        axios.post(`${API_URL}/complex/${id}/updatelinen`,{linen: UpdatedComplex},{withCredentials: true})
            .then((res)=>{
                console.log(res.data)
        })
    }
    console.log(complex)
    if(redirecting) return <Redirect to={'/'}/>
    if(!laundries || !complex || !loggedInUser) return <p>Loading...</p>
    return (
        <div>
            <LaundryNavbar logOut = {props.logOut} loggedInUser={loggedInUser}/>
            <h4 style={{textAlign: 'center', margin: '10px'}}>{complex.name}</h4>
            <hr/>
            <AddLaundry laundries={laundries} complex={complex} AddLaundry={handleAddLaundry}/>
            <hr/>
            <div id='ComplexLaundries'>
            <Table striped bordered hover style={{marginTop:'10px'}} id='ComplexLaundriesTable'  >
                        <thead>
                            <tr>
                            <th>Código</th>
                            <th>Artículo</th>
                            <th>Precio</th>
                            </tr>
                        </thead>
            {
                complex.linen? (complex.linen.map((elem,i)=>{
                    
                    return(
                        <tbody key={i+'laundry'}>
                            <tr>
                            
                                <td>{elem.laundry.code}</td>
                                <td>{elem.laundry.name}</td>
                                <td style={{width:'200px', padding: '0px'}}>
                                <Form onSubmit={(e)=>handleEditPrice(e,elem.laundry._id)} style={{display: 'flex', justifyContent:' space-around', alignItems:'center', padding: '5px'}}>
                                <Form.Control style= {{width: '80px', textAlign: 'left'}} name="price" type="number" step='any' defaultValue={elem.price}/>€
                                <Button variant="secondary" type="submit">Editar</Button>
                                </Form>
                                </td>
                            
                            </tr>
                        </tbody>
                        
                    )
                })):''
            }
            </Table>
            </div>
        </div>
    )
}
