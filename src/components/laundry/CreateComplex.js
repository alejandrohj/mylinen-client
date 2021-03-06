import React, {useEffect,useState} from 'react'
import {Form, Button, Row, Col, Modal} from 'react-bootstrap';

export default function CreateComplex(props) {
    let categories = ['laundry','renting']

    const [showCreate, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);
  
    return (
      <>
        <p style={{textAlign: 'center', marginTop: '20px', color: '#328CB6', fontWeight: '600', fontSize: '20px'}}>Clientes</p>
        <div className="create-laundryitem-btn" style={{textAlign: 'center'}}>
        <Button onClick={handleOpen} className="general-btn createbtn">Crear nuevo</Button>
        </div>
        <Modal centered show={showCreate} onHide={handleClose}>
  
          <Modal.Header closeButton>
            <Modal.Title className="admin-card-title">Nuevo cliente</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
            <Form onSubmit={props.onCreateComplex} >
            <Row>
                <Col>
              <Form.Group>
                <Form.Label className="admin-card-title">Name</Form.Label>
                <Form.Control name="name" type="text" placeholder="Enter name" />
              </Form.Group>
  
              <Form.Group>
                <Form.Label className="admin-card-title">Address</Form.Label>
                <Form.Control name="adress" type="text" placeholder="Enter description" maxLength="100"/>
              </Form.Group>
              
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="admin-card-title">Category</Form.Label>
                  <Form.Control name="services" as="select">
                    <option>Choose a service</option>
                    {
                      categories.map((elem, i) => {
                      return <option key={'category' + i} value={elem}>{elem}</option>
                      })
                    }
                  </Form.Control>
                </Form.Group>
                </Col>
              </Row>
  
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
