import React from 'react';
import {Card,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function OrderCard(props) {
    const {complexId,_id, CreatedBy, createdAt,status} = props.order;
    console.log(CreatedBy)
    return (
        <Card style={{marginBottom:'10px', textAlign:'center'}}>
        <Card.Header>{createdAt}</Card.Header>
        <Card.Body>
            <Card.Title>{complexId.name}</Card.Title>
            <Card.Text>
            <span>{CreatedBy.firstName} - </span><span>{status === 'ordering'? 'Por enviar': status === 'ordered'?'enviado':'closed'}</span>
            </Card.Text>
            <Link to={`/customer/service/${_id}/edit`}><Button variant="primary">Ver envio</Button></Link>
            {
                status==='ordering'?(
                    <Button onClick={props.onDelete} style={{marginLeft:'5px'}} variant='danger'>Borrar</Button>
                ):('')
            }
        </Card.Body>
        </Card>
    )
}
