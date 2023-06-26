import { useEffect, useState } from 'react';
import './App.css';
import Register from './Register';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Dashboard from './Dashboard'
import AddNote from './AddNote';
import NoteDetail from './NoteDetail';

function App() {
  const [data, setData] = useState([])

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/addNote' element={<AddNote /> } />
          <Route path='/note/:slug' element={<NoteDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
