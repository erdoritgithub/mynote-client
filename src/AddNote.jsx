import React, {useState} from 'react'
import axios from "axios";
import { token } from './utils/token';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';

const AddNote = () => {
  const navigate= useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    const configuration = {
      method: "post",
      url: "http://localhost:3001/notes/add",
      data: {
        title,
        description
      },
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    };

    axios(configuration)
    .then((result) => {navigate('/dashboard')})
    .catch((error) => {console.log(error)})
  }
  return (
    <div className='add_note'>
      <NavbarComponent />
      <Container className='mt-4'>
      <h3 className='mb-3'>Create New Note</h3>
        <Row>
          <Col>
            <Form onSubmit={(e) => handleSubmit(e)} >
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  type="text" 
                  name="title"
                  placeholder='Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoComplete='off'
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={5}
                  name="description" 
                  placeholder='Description' 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} 
                  autoComplete='off'
                />
              </Form.Group>
              <Button type='submit' onClick={(e) => handleSubmit(e)}>Add +</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AddNote