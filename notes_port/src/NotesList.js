import React from 'react';
import { Card, Button } from 'react-bootstrap'; // Import Card and Button from react-bootstrap (if used)

const NotesList = ({ notes, deleteNote }) => {
    return (
        <div className="notes-list">
            {notes.map((note) => (
                <Card key={note.id} className="note-card">
                    <Card.Body>
                        <Card.Title>{note.title}</Card.Title>
                        <Card.Text>{note.text}</Card.Text>
                        <Card.Text>Date: {note.date}</Card.Text>
                        <Card.Text>Time: {note.time}</Card.Text>
                        <Button variant="danger" onClick={() => deleteNote(note.id)}>Delete</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default NotesList;
