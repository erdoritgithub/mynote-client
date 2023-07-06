import {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { token } from './utils/token';
import { Button, Container, Row, Col } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';
import { Form } from 'react-bootstrap';

axios.defaults.withCredentials = true;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate= useNavigate()

    useEffect(() => {
        if(token()){
            navigate('/dashboard')
            setTimeout(() => {
                alert('Youre already loggedin')
            }, 100)
        }
    }, [])
    

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        const configuration = {
            method: "post",
            url: "http://localhost:3001/users/login",
            data: {
              username,
              password
            }
        };

        axios(configuration)
        .then((result) => {
            navigate('/dashboard')
        })
        .catch((error) => {console.log(error)})
    }    

    return (
        <div className='login'>
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
                            <Button type='submit' onClick={(e) => handleSubmit(e)}>Login</Button>
                        </Form>
                        <p className='mt-3'>Don't have an account ?  
                            <a href="/register"> Please Register !!</a>
                        </p>
                        <p><a href="/forgetPassword">forgetPassword ?</a></p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login

