import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {API_URL} from '../../config';
import { Redirect } from 'react-router-dom';

import LaundryNavbar from './LaundryNavbar';

export default function LaundryHome(props) {

    const [loggedInUser, setLoggedInUser] = useState (null);
    const [redirecting,setRedirecting] = useState (false);

    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
            console.log(result.data)
          setLoggedInUser(result.data)
        }).catch(() => {
            setRedirecting(true)
        })
    },[])
    if(redirecting) return <Redirect to={'/'}/>
    return (
        <>
            <LaundryNavbar logOut = {props.logOut}/>
        </>
    )
}
