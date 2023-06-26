import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Row, Col, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { token } from '../utils/token';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
    const navigate= useNavigate()
    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
  
        const configuration = {
            method: "delete",
            url: "http://localhost:3001/logout",
            headers: {
              Authorization: `Bearer ${token()}`,
            },
        };
  
        axios(configuration)
        .then((result) => {
            navigate('/')
        })
        .catch((error) => {console.log(error);})
      }    
  return (
   
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">MYNOTE</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#link">Getting Started</Nav.Link>
                    <Nav.Link href="#link">Documentation</Nav.Link>
                    <Nav.Link href="#link">About Us</Nav.Link>              
                </Nav>
                {token() && 
                    <Button 
                        variant='outline-primary' 
                        onClick={(e) => handleSubmit(e)}
                        className='ms-auto'
                    >
                        Logout
                    </Button>
                }
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
  );
}

export default NavbarComponent;