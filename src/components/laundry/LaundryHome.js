import React from 'react'
import LaundryNavbar from './LaundryNavbar';

export default function LaundryHome(props) {
    return (
        <>
            <LaundryNavbar logOut = {props.logOut}/>
        </>
    )
}
