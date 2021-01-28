import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {API_URL} from '../../config';

import CustomerCard from './CutomerCard'
import LaundryNavbar from './LaundryNavbar';
import CreateComplex from './CreateComplex';

export default function CustomersList(props) {

    const [complexes, setComplexes] = useState(null);

    const handleCreateComplex = (e) =>{
        e.preventDefault();
        const {name,adress,services}= e.currentTarget;
        console.log(name,adress,services)
        axios.post(`${API_URL}/complex/create`,{name: name.value,adress: adress.value,services: services.value}, {withCredentials: true})
            .then((complex)=>{
                const updatedComplexes = complexes.push(complex);
                setComplexes(updatedComplexes);
            })
    }
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
            <CreateComplex onCreateComplex = {handleCreateComplex}/>
            <hr/>
            <CustomerCard complexes = {complexes}/>
        </>
    )
}
