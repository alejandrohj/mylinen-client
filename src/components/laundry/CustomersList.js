import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {API_URL} from '../../config';

import CustomerCard from './CutomerCard'
import LaundryNavbar from './LaundryNavbar';
import CreateComplex from './CreateComplex';

export default function CustomersList(props) {

    const [complexes, setComplexes] = useState(null)

    useEffect(() => {
        axios.get(`${API_URL}/complexes`, {withCredentials: true})
            .then((res)=>{
                setComplexes(res.data);
            })
    }, [])
    if(!complexes) return (<p>Loading...</p>)
    return (
        <>
            
            <LaundryNavbar logOut = {props.logOut}/>
            <CreateComplex/>
            <hr/>
            <CustomerCard complexes = {complexes}/>
        </>
    )
}
