import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { token } from './utils/token';
import { Button, Col, Container, Row, Card } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';

const Dashboard = () => {
    const [ notes, setNotes] = useState([])
    const navigate= useNavigate()

    useEffect(() => {
        // set configurations for the API call here
        const getAllByUser = () => {
          if(token()){
            const configuration = {
              method: "get",
              url: "http://localhost:3001/notes/user",
              headers: {
                Authorization: `Bearer ${token()}`,
              },
            };
    
            axios(configuration)
            .then((result) => {
                setNotes([...result.data])
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
        } 

        getAllByUser()
      }, [])
     
    return (
        <div>
          <NavbarComponent/>
          <Container>
            <Row className='mt-4 mb-2'>
              <Col>
                <h3>
                  Your Note List
                </h3>
              </Col>
            </Row>
            <Row>
              <Col>
                {notes.map((note, i) => (
                  <div key={i}>
                     <Card className='my-2'>
                      <Card.Body>
                        <Card.Title><a href={`/note/${note.slug}`}>{note.title}</a></Card.Title>
                        <Card.Text>
                          {note.excerpt}
                        </Card.Text>
                        <p>by. <a href={`/dashboard`}>{note.author}</a></p>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
                <Button onClick={() => navigate('/addNote')} className='px-5 mt-3'>Add Note +</Button>
              </Col>
            </Row>
          </Container>
        </div>
    )
}

export default Dashboard
