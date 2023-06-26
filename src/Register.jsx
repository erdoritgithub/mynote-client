import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { token } from './utils/token';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';

const Register = () => {
  const navigate= useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if(token()){
      navigate('/dashboard')
      setTimeout(() => {
        alert('Youre already login')
      }, 100)
    }
  }, [])


  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    const configuration = {
      method: "post",
      url: "http://localhost:3001/users/register",
      data: {
        username,
        email,
        password,
        confirmPassword
      },
    };

    axios(configuration)
    .then((result) => {navigate('/login')})
    .catch((error) => {console.log(error);})
    
  }

  return (
    <div className='register'>
      <NavbarComponent />
      <Container className='mt-5'>
        <Row>
          <Col>
            <Form onSubmit={(e) => handleSubmit(e)} >
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  name='username' 
                  placeholder='username' 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete='off'
                />
              </Form.Group>
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
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                   type="text" 
                   name='password' 
                   placeholder='password' 
                   value={password} 
                   onChange={(e) => setPassword(e.target.value)} 
                   autoComplete='off'
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type="text" 
                  name='confirmPassword' 
                  placeholder='confirm password' 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  autoComplete='off'
                />
              </Form.Group>
              <Button type='submit' onClick={(e) => handleSubmit(e)}>Register</Button>
            </Form>
            <p className='mt-3'>Already have account ?  <a href="/login">Please login !!</a></p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register