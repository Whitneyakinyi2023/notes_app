import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import firebase, { firestore, auth } from './firebase';

const Home = ({ notes, deleteNote, handleSearchNote }) => {
  return (
    <>
      <Search handleSearchNote={handleSearchNote} />
      <NotesList notes={notes} deleteNote={deleteNote} />
    </>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState('path/to/profile-picture.jpg');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesCollection = firestore.collection('notes');
        const snapshot = await notesCollection.get();
        const loadedNotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNotes(loadedNotes);
      } catch (error) {
        console.error('Error fetching notes: ', error);
      }
    };

    fetchNotes();
  }, []);

  const addNote = async (title, text) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleString('en-US', { weekday: 'long' })}, ${currentDate.toLocaleString('en-US', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    const newNote = {
      id: nanoid(),
      title,
      text,
      date: formattedDate,
      time: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    try {
      const docRef = await firestore.collection('notes').add(newNote);
      const savedNote = { id: docRef.id, ...newNote };
      setNotes(prevNotes => [...prevNotes, savedNote]);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const deleteNote = async (idToDelete) => {
    try {
      await firestore.collection('notes').doc(idToDelete).delete();
      setNotes(prevNotes => prevNotes.filter(note => note.id !== idToDelete));
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setIsAuthenticated(false);
    }).catch(error => {
      console.error('Error signing out: ', error);
    });
  };

  const handleSearchNote = (term) => {
    setSearchTerm(term);
  };

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
                    deleteNote={deleteNote}
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          {isAuthenticated && (
            <>
              <div className="add-note-container">
                <AddNote handleAddNote={addNote} />
              </div>
              <div className="recent-notes">
                <h2>Recent Notes</h2>
                <NotesList notes={filteredNotes.slice(0, 5)} deleteNote={deleteNote} />
              </div>
            </>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
