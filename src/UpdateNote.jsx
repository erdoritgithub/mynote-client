import React, {useState, useEffect} from 'react'
import axios from "axios";
import { token } from './utils/token';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';

const UpdateNote = () => {
    const [ note, setNote] = useState({
        title: '',
        description: ''
    })
    const { slug }= useParams()
    const navigate= useNavigate()

    useEffect(() => {
        if(token()){
            const configuration = {
                method: "get",
                url: `http://localhost:3001/note/${slug}`,
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
            };
        
            axios(configuration)
            .then((result) => {
                setNote({
                title: result.data[0].title,
                description: result.data[0].description,
                author: result.data[0].author
                })
            })
            .catch((error) => {
                error = new Error();
            });

        }else{
            navigate('/')
            setTimeout(() => {
                alert('Youre not login')
            }, 100)
        }
    }, [])

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // make a popup alert showing the "submitted" text
        const configuration = {
        method: "put",
        url: `http://localhost:3001/notes/user/update/${slug}`,
        data: {
           title: note.title,
           description: note.description
        },
        headers: {
            Authorization: `Bearer ${token()}`,
        },
        };

        axios(configuration)
        .then((result) => {navigate('/dashboard')})
        .catch((error) => {console.log(error)})
    }

    function handleChange(event) {
		setNote({ ...note, [event.target.name]: event.target.value });
	}

    return (
        <div>
        <NavbarComponent />
        <Container className='mt-4'>
        <h3 className='mb-3'>Update New Note</h3>
            <Row>
            <Col>
                <Form onSubmit={(e) => handleSubmit(e)} >
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="title"
                    placeholder='Title'
                    value={note.title}
                    onChange={handleChange}
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
                    value={note.description}
                    onChange={handleChange} 
                    autoComplete='off'
                    />
                </Form.Group>
                <Button type='submit' onClick={(e) => handleSubmit(e)}>Update</Button>
                </Form>
            </Col>
            </Row>
        </Container>
        </div>
    )
}

export default UpdateNote
