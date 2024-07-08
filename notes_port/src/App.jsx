import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { nanoid } from 'nanoid';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Navbar from './Navbar';
import Search from './Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './ThemeContext';
import NotesList from './NotesList';
import Profile from './Profile';
import LandingPage from './LandingPage';
import AddNote from './AddNote';
import ProductivityTechnique from './ProductivityTechnique';
import NoteTakingTips from './NoteTakingTips';
import { auth } from './firebase';

const Home = ({ notes, handleAddNote, handleDeleteNote, handleSearchNote }) => (
  <>
    <Search handleSearchNote={handleSearchNote} />
    <NotesList notes={notes} handleAddNote={handleAddNote} handleDeleteNote={handleDeleteNote} />
  </>
);

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState('path/to/profile-picture.jpg');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
    setLoading(false);

    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
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

    setNotes(prevNotes => [...prevNotes, newNote]);
  };

  const deleteNote = (idToDelete) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== idToDelete));
  };

  const handleSignup = () => setIsAuthenticated(true);
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  const handleSearchNote = (term) => setSearchTerm(term);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <ThemeProvider>
      <Router>
        <div className={`container ${isAuthenticated ? 'authenticated' : ''}`}>
          <Navbar isAuthenticated={isAuthenticated} profilePicture={profilePicture} />
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Home
                    notes={filteredNotes}
                    handleAddNote={addNote}
                    handleDeleteNote={deleteNote}
                    handleSearchNote={handleSearchNote}
                  />
                ) : (
                  <LandingPage onLogin={handleLogin} onSignup={handleSignup} />
                )
              }
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
            <Route path="/profile" element={<Profile profilePicture={profilePicture} setProfilePicture={setProfilePicture} />} />
            <Route path="/logout" element={<button onClick={handleLogout}>Logout</button>} />
            {/* Other routes */}
          </Routes>
          {isAuthenticated && (
            <>
              <div className="add-note-container">
                <AddNote handleAddNote={addNote} />
              </div>
              <div className="recent-notes">
                <h2>Recent Notes</h2>
                <NotesList notes={filteredNotes.slice(0, 6)} handleDeleteNote={deleteNote} />
              </div>
            </>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
