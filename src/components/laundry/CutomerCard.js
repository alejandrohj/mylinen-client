import React from 'react'
import {Card} from 'react-bootstrap'

export default function CutomerCrad(props) {
    return (
        <div>
            {
               props.complexes.map((elem,i)=>{
                    return (
                        <>
                        <Card key ={'complex' + i} style={{ width: '18rem', margin: '10px' }}>
                            <Card.Body>
                                <h5>{elem.name}</h5>
                                <p>{elem.services}</p>
                                <p>{elem.adress}</p>
                            </Card.Body>
                        </Card>
                            
                        </>
                    )
               }) 
            }
        </div>
    )
}
