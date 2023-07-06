import React, {useState} from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SendToken = () => {
    const [email, setEmail] = useState('')
    const navigate= useNavigate()

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // make a popup alert showing the "submitted" text
        const configuration = {
          method: "post",
          url: `http://localhost:3001/forgetPassword`,
          data: {
           email
          },
        };
    
        axios(configuration)
        .then((result) => {
            navigate('/login')
            alert('Please Check Your Email')
        })
        .catch((error) => {console.log(error);})
        
    }

  return (
    <div>
      <Container className='mt-5'>
      <h3>Send Token to Email</h3>
        <Row className='mt-4'>
          <Col>
          <Form onSubmit={(e) => handleSubmit(e)} >
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="text" 
                  name='email' 
                  placeholder='email' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  autoComplete='off'
                />
              </Form.Group>
              
              <Button type='submit' onClick={(e) => handleSubmit(e)}>Create Password</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SendToken
