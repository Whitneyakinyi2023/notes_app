 ```javascript
import React, { useEffect, useState } from 'react'; // Import necessary React hooks
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Import routing components
import { nanoid } from 'nanoid'; // Import nanoid for generating unique IDs
import './App.css'; // Import CSS for styling
import Signup from './Signup'; // Import Signup component
import Login from './Login'; // Import Login component
import Navbar from './Navbar'; // Import Navbar component
import Search from './Search'; // Import Search component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { ThemeProvider } from './ThemeContext'; // Import custom ThemeProvider
import NotesList from './NotesList'; // Import NotesList component
import Profile from './Profile'; // Import Profile component
import LandingPage from './LandingPage'; // Import LandingPage component
import AddNote from './AddNote'; // Import AddNote component
import ProductivityTechnique from './ProductivityTechnique'; // Import ProductivityTechnique component
import NoteTakingTips from './NoteTakingTips'; // Import NoteTakingTips component
import { auth } from './firebase'; // Import Firebase authentication

// Home component to display Search and NotesList components
const Home = ({ notes, handleAddNote, handleDeleteNote, handleSearchNote }) => (
  <>
    <Search handleSearchNote={handleSearchNote} />
    <NotesList notes={notes} handleAddNote={handleAddNote} handleDeleteNote={handleDeleteNote} />
  </>
);

const App = () => {
  const [notes, setNotes] = useState([]); // State for storing notes
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication status
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [loading, setLoading] = useState(true); // State for loading status
  const [profilePicture, setProfilePicture] = useState('path/to/profile-picture.jpg'); // State for profile picture

  // useEffect to load notes from localStorage and check authentication status on mount
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
    setLoading(false);

    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  // useEffect to update localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Function to add a new note
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

  // Function to delete a note by its ID
  const deleteNote = (idToDelete) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== idToDelete));
  };

  // Handlers for authentication
  const handleSignup = () => setIsAuthenticated(true);
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  // Handler for searching notes
  const handleSearchNote = (term) => setSearchTerm(term);

  // Filtered notes based on the search term
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>; // Show loading message while fetching data
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