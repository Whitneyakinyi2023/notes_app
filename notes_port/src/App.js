import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import PDFViewer from './PDFViewer';
import Navbar from './Navbar';
import Search from './Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { ThemeProvider } from './ThemeContext';
import NotesList from './NotesList';
import Profile from './Profile';
import LandingPage from './LandingPage';
import AddNote from './AddNote';

const Home = ({ isAuthenticated, notes, deleteNote, handleSearchNote }) => {
  if (isAuthenticated) {
    return (
      <>
        <Search handleSearchNote={handleSearchNote} />
        <NotesList notes={notes} deleteNote={deleteNote} />
      </>
    );
  } else {
    return <LandingPage />;
  }
};

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      title: 'First Note',
      text: 'This is my first note!',
      date: '2021-04-15',
      time: '10:00 AM',
    },
    {
      id: nanoid(),
      title: 'Second Note',
      text: 'This is my second note!',
      date: '2021-04-21',
      time: '3:30 PM',
    },
    {
      id: nanoid(),
      title: 'Third Note',
      text: 'This is my third note!',
      date: '2021-04-28',
      time: '12:15 PM',
    },
    {
      id: nanoid(),
      title: 'New Note',
      text: 'This is my new note!',
      date: '2021-04-30',
      time: '9:45 AM',
    },
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

  const addNote = (title, text) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleString('en-US', { weekday: 'long' })}, ${currentDate.toLocaleString('en-US', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    const newNote = {
      id: nanoid(),
      title,
      text,
      date: formattedDate,
      time: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (idToDelete) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== idToDelete));
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleSearchNote = (term) => {
    setSearchTerm(term);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider>
      <Router>
        <div className='container'>
          <Navbar isAuthenticated={isAuthenticated} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  isAuthenticated={isAuthenticated}
                  notes={filteredNotes}
                  deleteNote={deleteNote}
                  handleSearchNote={handleSearchNote}
                />
              }
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
            <Route path="/pdf-viewer" element={<PDFViewer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<button onClick={handleLogout}>Logout</button>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <div className="add-note-container">
            <AddNote handleAddNote={addNote} />
          </div>
          <div className="youtube-api">
            {/* Placeholder for YouTube API Integration */}
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
