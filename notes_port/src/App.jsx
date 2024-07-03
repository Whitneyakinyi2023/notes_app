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
import ProductivityTechnique from './ProductivityTechnique'; // Import the ProductivityTechnique component
import NoteTakingTips from './NoteTakingTips'; // Import the NoteTakingTips component
import { auth, firestore } from './firebase';

const Home = ({ notes, deleteNote, handleSearchNote }) => (
  <>
    <Search handleSearchNote={handleSearchNote} />
    <NotesList notes={notes} deleteNote={deleteNote} />
  </>
);

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
        const snapshot = await firestore.collection('notes').get();
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

  const handleSignup = () => setIsAuthenticated(true);
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    auth.signOut().then(() => {
      setIsAuthenticated(false);
    }).catch(error => {
      console.error('Error signing out: ', error);
    });
  };

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
            <Route path="/productivity-tips" element={<ProductivityTipsPage />} />
            <Route path="/note-taking-tips" element={<NoteTakingTipsPage />} />
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

const ProductivityTipsPage = () => (
  <div className="container">
    <h1>Boost Your Productivity</h1>
    <ProductivityTechnique
      title="Eat the Frog"
      description='"Eat the Frog" is a productivity technique that encourages tackling the most important or challenging task first thing in the morning. By writing down your tasks the night before, you can identify your "frog" and prioritize it for the next day.'
      buttonText="Learn More"
      onClick={() => alert('Eat the Frog means tackling your most important task first. Write down your tasks the night before and identify your "frog" for the next day.')}
    />
    <ProductivityTechnique
      title="Pomodoro Technique"
      description="The Pomodoro Technique is a time management method that involves working in focused intervals, usually 25 minutes, followed by a short break. Use note-taking to jot down tasks and track your progress during each Pomodoro session."
      buttonText="Learn More"
      onClick={() => alert('The Pomodoro Technique involves working in 25-minute intervals, followed by a 5-minute break. Use note-taking to track tasks and progress.')}
    />
  </div>
);

const NoteTakingTipsPage = () => (
  <div className="container">
    <h1>Effective Note-Taking Tips</h1>
    <NoteTakingTips />
  </div>
);

export default App;
