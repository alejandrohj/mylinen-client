import React, {useEffect,useState} from 'react'
import {Form, Button, Row, Col, Modal} from 'react-bootstrap';

export default function CreateUser(props) {
    let userType = ['gobernanta','empaquetador','admin','revisador','direccion'];

    const [showCreate, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);
    return (
      <>
        <p style={{textAlign: 'center', marginTop: '20px', color: '#328CB6', fontWeight: '600', fontSize: '20px'}}>Usuarios</p>
        <div className="create-laundryitem-btn" style={{textAlign: 'center'}}>
        <Button onClick={handleOpen} className="general-btn createbtn">Crear nuevo</Button>
        </div>
        <Modal centered show={showCreate} onHide={handleClose}>
  
          <Modal.Header closeButton>
            <Modal.Title className="admin-card-title">Nuevo usuario</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
          <Form onSubmit={props.handleCreateUser}>
                                <Form.Group>
                                <Form.Label className="admin-card-title">Nombre</Form.Label>
                                <Form.Control name="firstName" type="text" placeholder='Nombre' />
                                </Form.Group>

                                <Form.Group>
                                <Form.Label className="admin-card-title">Nombre</Form.Label>
                                <Form.Control name="userName" type="text" placeholder='Nombre de usuario' />
                                </Form.Group>

                                <Form.Group>
                                <Form.Label className="admin-card-title">Email</Form.Label>
                                <Form.Control name="email" type="email" placeholder='email' />
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label className="admin-card-title">Category</Form.Label>
                                <Form.Control name="userType" as="select">
                                    <option>Tipo de usuario</option>
                                    {
                                    userType.map((elem, i) => {
                                    return <option key={'userType' + i} value={elem}>{elem}</option>
                                    })
                                    }
                                </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label className="admin-card-title">Complejo</Form.Label>
                                <Form.Control name="complex" as="select">
                                <option>Seleciona un complejo</option>
                                {
                                    props.complexes.map((elem, i) => {
                                    return <option key={'complexId' + i} value={elem._id}>{elem.name}</option>
                                    })
                                }
                                </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="admin-card-title">Contraseña</Form.Label>
                                    <Form.Control name="password" type="password" placeholder='Contraseña'/>
                                </Form.Group>
                            <div className= 'buttonCouple'>
                                <Button onClick={props.handleError} className="general-btn" variant="primary" type="submit">
                                    Crear
                                </Button>
                            </div>
                                    </Form>
  
          </Modal.Body>
          
        </Modal>
      </>
    )
}
