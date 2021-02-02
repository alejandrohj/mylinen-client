import React, {useEffect,useState} from 'react'
import {Form, Button, Modal} from 'react-bootstrap';

export default function CreateLaundry(props) {
    //let categories = ['linen','clothes']

    const [showCreate, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);
  
    return (
      <>
        <p style={{textAlign: 'center', marginTop: '20px', color: '#328CB6', fontWeight: '600', fontSize: '20px'}}>Prendas</p>
        <div className="create-laundryitem-btn" style={{textAlign: 'center'}}>
        <Button onClick={handleOpen} className="general-btn createbtn">Crear nuevo</Button>
        </div>
        <Modal centered show={showCreate} onHide={handleClose}>
  
          <Modal.Header closeButton>
            <Modal.Title className="admin-card-title">Nuevo artículo</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
            <Form onSubmit={props.onCreateLaundry} >
              <Form.Group>
                <Form.Label className="admin-card-title">Nombre</Form.Label>
                <Form.Control name="name" type="text" placeholder="Introduce el nombre de la prenda" />
              </Form.Group>
  
              <Form.Group>
                <Form.Label className="admin-card-title">Código</Form.Label>
                <Form.Control name="code" type="text" placeholder="Introduce un código" maxLength="100"/>
              </Form.Group>
  
              {/* <Form.Group>
                <Form.Label className="admin-card-title">Add an image</Form.Label>
                <Form.File name="image" id="exampleFormControlFile1" />
              </Form.Group> */}
              {
              props.err ? <p style={{color: '#036C9C'}}>{props.errorMessage}</p> : <></>
              } 
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
              <Button onClick={props.handleError} className="general-btn" variant="primary" type="submit">
                Create Item
              </Button>
              {
                props.createSucces ? <Button className="general-btn" onClick={handleClose}>Back to list</Button>: <></>
              }
              </div>
            </Form>
  
          </Modal.Body>
          
        </Modal>
      </>
    )
}