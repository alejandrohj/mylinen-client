import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL} from '../../config';


import HotelNavbar from './HotelNavbar';

export default function HotelHome(props) {
    const [loggedInUser, setLoggedInUser] = useState(null);
    useEffect(()=>{
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggedInUser(result.data)
        })
    })
    return (
        <>
            <HotelNavbar loggedInUser={loggedInUser} logOut = {props.logOut}/>
        </>
    )
}
