import React, { useEffect, useState } from 'react'
import { token } from './utils/token';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NoteDetail = () => {
    const [ note, setNote] = useState({})
    const navigate= useNavigate()
    const { slug }= useParams()

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

    return (
        <div className='note_detail'>
            <Container className='mt-5'>
                <Row>
                    <Col>
                        <h3>{note.title}</h3>
                        <p>{note.description}</p>
                        <Button 
                            variant='outline-primary' 
                            onClick={() => navigate('/dashboard')}
                        >
                            Note List
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default NoteDetail
