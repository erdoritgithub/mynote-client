import React, { useEffect, useState } from 'react'
import { token } from './utils/token'
import { useNavigate } from 'react-router-dom'
import { Col, Container, Row, Button } from 'react-bootstrap'
import NavbarComponent from './components/Navbar'

const Home = () => {
  const navigate= useNavigate()

  useEffect(() => {
    if(token()){
      navigate('/dashboard')
      setTimeout(() => {
        alert('Youre not login')
      }, 100)
    }
  }, [])

  return (
    <div>
        <NavbarComponent />
        <Container >
          <Row className='mt-5'>
            <Col className='mt-5 pt-5 text-center'>
              <h1 className='h1 display-4'>Welcome to Mynote</h1>
              <p className='text-secondary fs-4'>Mynote is note app to help your daily activities</p>
              <Button variant="primary" className='mx-1' onClick={() => navigate('/register')}>
                  Register
              </Button> 
              <Button variant="outline-primary" className='mx-1' onClick={() => navigate('/login')}>
                  Login
              </Button>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Home