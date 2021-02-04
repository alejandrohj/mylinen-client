import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL} from '../../config';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';


import HotelNavbar from './HotelNavbar';
import OrderCard from './OrderCard';

export default function HotelHome(props) {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [redirecting,setRedirecting] = useState (false);
    const [orders, setOrders] = useState(null);
    const [redirectToOrder, setRedirectToOrder] = useState(false);
    const [lastOrderId, setLastOrderId] = useState(null);

    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggedInUser(result.data)
        }).catch(() => {
            setRedirecting(true)
        })
        axios.get(`${API_URL}/customer/orders`,{withCredentials: true})
        .then((response)=>{
            setOrders(response.data)
        })
    },[])
    const handleOpenNewService = () =>{
        console.log(loggedInUser);
        const complexId = loggedInUser.complex;
        const CreatedBy = loggedInUser._id;
        axios.post(`${API_URL}/customer/neworder`,{complexId, CreatedBy, status: 'ordering'}, {withCredentials: true})
        .then((result) => {
            setLastOrderId(result.data._id)
            setRedirectToOrder(true)
            
        })
    }
    console.log(orders)
    if(redirecting) return <Redirect to={'/'}/>
    if(!loggedInUser || !orders) return <p>Loading...</p>
    if(redirectToOrder) return(<Redirect to={`/customer/service/${lastOrderId}/edit`}/>)
    return (
        <>
            <HotelNavbar loggedInUser={loggedInUser} logOut = {props.logOut}/>
            <div style={{textAlign: 'center', margin:'10px'}}>
            <Button onClick={handleOpenNewService}>Nuevo servicio</Button>
            <hr/>
            </div>
            {
                orders.map((elem,i)=>{
                    return <OrderCard key={'order'+i} order={elem}/>
                })
            }
        </>
    )
}
