import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import uuid from 'react-uuid';
import './App.css';
import Sidebar from "./Sidebar";
import Main from "./Main";
import Signup from "./Signup";
import Login from "./Login";
import PDFViewer from './PDFViewer';
import Profile from './Profile'; // Assuming you have a Profile component
import Navbar from './Navbar'; // Import the new Navbar component
import { Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from './ThemeContext';

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNote, setActiveNote] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(true);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "New Note",
      body: "",
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === activeNote ? updatedNote : note
    );
    setNotes(updatedNotes);
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
    if (activeNote === idToDelete) {
      setActiveNote(null);
    }
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
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
        <div className={`App`}>
          <Navbar />
          {!isAuthenticated ? (
            <>
              {showSignup ? (
                <Signup onSignup={handleSignup} />
              ) : (
                <Login onLogin={handleLogin} />
              )}
              <Alert variant='secondary'>Why focused study?</Alert>
              <Button className="custom-button">SomaSoma</Button>
              <button className="switch-button" onClick={() => setShowSignup(!showSignup)}>
                {showSignup ? "Switch to Login" : "Switch to Signup"}
              </button>
            </>
          ) : (
            <>
              <button className="toggle-button" onClick={() => setShowNotes(!showNotes)}>
                {showNotes ? "Hide Notes" : "Show Notes"}
              </button>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
              <button className="toggle-pdf-button" onClick={() => setShowPDFViewer(!showPDFViewer)}>
                {showPDFViewer ? "Hide PDF Viewer" : "Show PDF Viewer"}
              </button>
              {showNotes && (
                <div className="NotesContainer">
                  <Sidebar
                    notes={notes}
                    onAddNote={onAddNote}
                    onDeleteNote={onDeleteNote}
                    activeNote={activeNote}
                    setActiveNote={setActiveNote}
                  />
                  <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
                </div>
              )}
              {showPDFViewer && (
                <div className="PDFViewerContainer">
                  <PDFViewer />
                </div>
              )}
            </>
          )}
          <div className="youtube-api">
            {/* Placeholder for YouTube API Integration */}
          </div>
          <div className="theme-selector">
            <h3>Select Theme:</h3>
            <ThemeToggle /> {/* Render the ThemeToggle component here */}
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
