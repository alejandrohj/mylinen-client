import React from 'react';


import HotelNavbar from './HotelNavbar';

export default function HotelHome(props) {
    return (
        <>
            <HotelNavbar logOut = {props.logOut}/>
        </>
    )
}
