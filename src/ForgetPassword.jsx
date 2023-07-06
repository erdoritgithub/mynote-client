import React, {useState} from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const ForgetPassword = () => {
    const navigate= useNavigate()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { token }= useParams()


    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // make a popup alert showing the "submitted" text
        const configuration = {
          method: "put",
          url: `http://localhost:3001/forgetPassword/${token}`,
          data: {
            password,
            confirmPassword
          },
        };
    
        axios(configuration)
        .then((result) => {navigate('/login')})
        .catch((error) => {console.log(error);})
        
    }

    return (
        <div>
            <Container className='mt-5'>
                <Row>
                    <Col>
                        <h3>Create new password</h3>
                        <Form onSubmit={(e) => handleSubmit(e)} className='mt-4' >
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
                            <Button type='submit' onClick={(e) => handleSubmit(e)}>Create New Password</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ForgetPassword
