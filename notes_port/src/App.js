import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import Sidebar from "./Sidebar";
import Main from "./Main";

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.notes) || []);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
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
        return updatedNote
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

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
