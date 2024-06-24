import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import Sidebar from "./Sidebar";
import Main from "./Main";
import Signup from "./Signup";
import Login from "./Login";
import './Login.css';

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNote, setActiveNote] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication
  const [showSignup, setShowSignup] = useState(true); // State to toggle between signup and login

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
    const updateNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updateNotesArray);
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
    if (activeNote === idToDelete) {
      setActiveNote(false);
    }
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setShowSignup(false); // Hide signup form after successful signup
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowSignup(true); // Show signup form after logout
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <>
          {showSignup ? (
            <Signup onSignup={handleSignup} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
          <button onClick={() => setShowSignup(!showSignup)}>
            {showSignup ? "Switch to Login" : "Switch to Signup"}
          </button>
        </>
      ) : (
        <>
          <button className="toggle-button" onClick={() => setShowNotes(!showNotes)}>
            {showNotes ? "Hide Notes" : "Show Notes"}
          </button>
          <button onClick={handleLogout}>Logout</button>
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
        </>
      )}
    </div>
  );
}

export default App;
