import React from 'react';
import { Button, Badge } from 'react-bootstrap'; // Import Button and Badge from react-bootstrap (if used)

const NotesList = ({ notes, deleteNote }) => {
    return (
        <div className="notes-list">
            {notes.length > 0 ? (
                notes.map((note) => (
                    <div key={note.id} className="note">
                        <h3>{note.title}</h3>
                        <p>{note.text}</p>
                        {note.date && <p>Date: {note.date}</p>}
                        {note.time && <p>Time: {note.time}</p>}
                        <Button variant="danger" onClick={() => deleteNote(note.id)}>Delete</Button>
                    </div>
                ))
            ) : (
                <div className="empty-notes">
                    <Badge variant="info">No notes available</Badge>
                </div>
            )}
        </div>
    );
};

export default NotesList;