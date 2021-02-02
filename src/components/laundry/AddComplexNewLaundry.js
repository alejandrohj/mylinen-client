import React, {useEffect,useState} from 'react'
import {Form, Button, Modal} from 'react-bootstrap';

export default function AddLaundry(props) {
    //let categories = ['linen','clothes']

    const [showCreate, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

  
    return (
      <>
        <div className="create-laundryitem-btn" style={{textAlign: 'center'}}>
        <Button onClick={handleOpen} className="general-btn createbtn">Añadir artículo</Button>
        </div>
        <Modal centered show={showCreate} onHide={handleClose}>
  
          <Modal.Header closeButton>
            <Modal.Title className="admin-card-title">Nuevo artículo</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
          <h6>{props.complex.name}</h6>
            <Form onSubmit={props.AddLaundry} >
              <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="admin-card-title">Prenda</Form.Label>
                  <Form.Control name="laundry" as="select">
                    <option>Selecciona el artículo</option>
                    {
                      props.laundries.map((elem, i) => {
                      return <option key={'laundry' + i} value={elem._id}>{elem.code}-{elem.name}</option>
                      })
                    }
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                <Form.Label className="admin-card-title">Precio</Form.Label>
                <Form.Control name="price" type="number" step='any' placeholder="5,34" />
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