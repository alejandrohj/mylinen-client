import React,{useEffect,useState} from 'react'
import {Form, Button, Table} from 'react-bootstrap';
import axios from 'axios';
import {API_URL} from '../../config';
import {Redirect, Link} from 'react-router-dom';


export default function NewService(props) {
    let id = props.match.params.id;

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [redirecting,setRedirecting] = useState (false);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
          setLoggedInUser(result.data)
        }).catch(() => {
            setRedirecting(true)
        })
        axios.get(`${API_URL}/customer/order/${id}`, {withCredentials: true})
        .then((result) => {
          setOrder(result.data)
        })
    }, [])

    if(redirecting) return <Redirect to={'/'}/>
    if(!loggedInUser || !order) return <p>Loading...</p>
    console.log(order)
    return (
        <>
        <h6>Código de pedido: {order._id}</h6>
        <h5>Cliente: {order.complexId.name}</h5>
        <h6>Creado por: {order.CreatedBy.firstName}</h6>
        <h5>Estado: {order.status==='ordering'? 'Por enviar':order.status==='ordered'?'Enviado':'cerrado'}</h5>
        <Table striped bordered hover style={{marginTop:'10px'}} id='ComplexLaundriesTable'  >
                        <thead>
                            <tr>
                            <th>Catidad de repaso</th>
                            <th>Artículo</th>
                            <th>Cantidad</th>
                            </tr>
                        </thead>
            {
                order.complexId.linen? (order.complexId.linen.map((elem,i)=>{ 
                    return(
                        <tbody key={i+'laundry'}>
                            <tr>
                            
                                <td>{elem.laundry.code}</td>
                                <td>{elem.laundry.name}</td>
                                <td style={{width:'200px', padding: '0px'}}>
                                <Form onSubmit={(e)=>props.handleEditAmount(e,elem.laundry._id)} style={{display: 'flex', justifyContent:' space-around', alignItems:'center', padding: '5px'}}>
                                <Form.Control style= {{width: '80px', textAlign: 'left'}} name="price" type="number"/>
                                </Form>
                                </td>
                            
                            </tr>
                        </tbody>
                        
                    )
                })):'There isnt any linen uploaded in this'
            }
            </Table>
        <Link to={'/hotel/home'}><Button>Atrás</Button></Link>
        </>
    )
}