import React,{useEffect,useState} from 'react'
import {Form, Button,Modal} from 'react-bootstrap';
import axios from 'axios';
import {API_URL} from '../../config';

export default function NewService(props) {
    let categories = ['repuesto','consumible'];
    let subcategories = ['electrico','mecanico','correa','protección','filtro'];
    let units = ['metros','unidades','litros','kilos'];

    const [showCreate, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);
    const [warehouses,setWarehouses] =useState(null);

    useEffect(() => {
      axios.get(`${API_URL}/gmao/warehouses`, {withCredentials: true})
      .then((response)=>{
          setWarehouses(response.data)
      })
    }, [])
    if(!warehouses) return <p>Loading...</p>
    console.log(warehouses)
    return (
        <>
            <div style={{textAlign: 'center'}} className="create-laundryitem-btn">
            <Button id='createBtn' onClick={handleOpen} className="general-btn createbtn">Crear un nuevo artículo</Button>
            </div>
            <hr/>
        <Modal centered show={showCreate} onHide={handleClose}>

        <Modal.Header closeButton>
        <Modal.Title className="admin-card-title">Crear un nuevo item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form onSubmit={props.onCreate} >
            <Form.Group>
            <Form.Label className="admin-card-title">Nombre</Form.Label>
            <Form.Control name="name" type="text" placeholder="p.e. almacén de repuestos" />
            </Form.Group>
            {
            props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
            } 
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Button onClick={props.handleError} className="general-btn" variant="primary" type="submit">
            Crear
            </Button>
            {
            props.createSucces ? <Button className="general-btn" onClick={handleClose}>Volvera listas</Button>: <></>
            }
            </div>
        </Form>

        </Modal.Body>
        
    </Modal>
    </>
    )
}