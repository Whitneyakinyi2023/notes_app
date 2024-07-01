import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import PDFViewer from './PDFViewer';
import Navbar from './Navbar';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from './ThemeContext';
import NotesList from './NotesList';
import Search from './Search';
import Header from './Header';
import Profile from './Profile';
import LandingPage from './LandingPage';

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: 'This is my first note!',
      date: '15/04/2021',
    },
    {
      id: nanoid(),
      text: 'This is my second note!',
      date: '21/04/2021',
    },
    {
      id: nanoid(),
      text: 'This is my third note!',
      date: '28/04/2021',
    },
    {
      id: nanoid(),
      text: 'This is my new note!',
      date: '30/04/2021',
    },
  ]);

  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(true);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text,
      date: date.toLocaleDateString(),
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setShowSignup(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowSignup(true);
    setShowNotes(false);
    setShowPDFViewer(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className={darkMode ? 'dark-mode' : ''}>
          <div className='container'>
            <Navbar isAuthenticated={isAuthenticated} />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
              <Route path="/notes" element={<NotesList notes={notes} handleAddNote={addNote} handleDeleteNote={deleteNote} />} />
              <Route path="/pdf-viewer" element={<PDFViewer />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<button onClick={handleLogout}>Logout</button>} />
            </Routes>
            <div className="youtube-api">
              {/* Placeholder for YouTube API Integration */}
            </div>
            <div className="theme-selector">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
