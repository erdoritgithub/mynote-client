import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { token } from './utils/token';
import { Col, Container, Row, Card, Accordion } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';
import AddCircle from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WidgetsIcon from '@mui/icons-material/Widgets';
import EditIcon from '@mui/icons-material/Edit';
import createExcerpt from './utils/createExcerpt';
import { Form } from 'react-bootstrap';

const Dashboard = () => {
  const [ notes, setNotes] = useState([])
  const [ id, setId ] = useState([])
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
            error = new Error(error);
            console.log(error)
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

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    const strId= id.join('&')
    
    const configuration = {
      method: "delete",
      url: `http://localhost:3001/notes/user/delete/${strId}`,
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    };

    axios(configuration)
    .then(() => {
      window.location.reload(false);
    })
    .catch((error) => {console.log(error)})
  }

  const deleteNote = (e, slug) => {
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    const configuration = {
      method: "delete",
      url: `http://localhost:3001/note/user/delete/${slug}`,
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    };

    axios(configuration)
    .then(() => {
      window.location.reload(false);
    })
    .catch((error) => {console.log(error)})
  }

  return (
      <div>
        <NavbarComponent/>
        <Container>
          <Row className='mt-4 mb-2'>
            <Col>
              <div className='d-flex justify-space-between align-items-center'>
                <h3 style={{flex: '1'}}>
                  Your Note List
                </h3>
                <AddCircle onClick={() => navigate('/addNote')} className='mx-1' />
                <DeleteIcon className='mx-1' onClick={(e) => handleSubmit(e)} /> 
                <WidgetsIcon className='me-2' />
              </div>
            </Col>
          </Row>
          <Row className='mb-5'>
            <Col>
              {notes.map((note, i) => (
                <Accordion key={i}>
                  <Accordion.Item eventKey="0" className='position-relative'>
                    <Form 
                      method='get'
                      className='d-flex align-items-center justify-content-center position-absolute'
                      style={{zIndex: '10', top: '0.9rem', left: '1rem'}}
                    >
                        <Form.Check // prettier-ignore
                          type={`checkbox`}
                          id={`default-checkbox`}
                          value={note.slug}
                          onChange={(e) => {
                            const { checked, value } = e.currentTarget;
                            setId(prev => checked 
                            ? [...prev, value] : 
                            prev.filter(val => val !== value)
                          )}
                          }
                        />
                    </Form>
                    <div 
                      className='d-flex align-items-center justify-content-between position-absolute me-2'
                      style={{zIndex: '10', top: '0.9rem', right: '3rem', width: '8%'}}
                    >
                      <EditIcon color='primary' onClick={() => navigate(`/updateNote/${note.slug}`)} />
                      <DeleteIcon 
                        color='primary' 
                        onClick={(e) => deleteNote(e, note.slug) } 
                      />
                      <MoreVertIcon color='primary' />
                    </div>
                    <Accordion.Header>
                      <span className='ps-4'>{note.title}</span>
                    </Accordion.Header>
                    <Accordion.Body 
                      onClick={() => navigate(`/note/${note.slug}`)}
                      style={{cursor: 'pointer'}}
                    >
                    {createExcerpt(note.description, 100)}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                ))}
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default Dashboard
