import React, { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteText, setNoteText] = useState('');
    const characterLimit = 500;

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'title') {
            setNoteTitle(value);
        } else if (name === 'text') {
            if (value.length <= characterLimit) {
                setNoteText(value);
            }
        }
    };

    const handleSaveClick = () => {
        if (noteTitle.trim().length > 0 && noteText.trim().length > 0) {
            handleAddNote(noteTitle.trim(), noteText.trim());
            setNoteTitle('');
            setNoteText('');
        }
    };

    return (
        <div className="note new">
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={noteTitle}
                onChange={handleChange}
            />
            <textarea
                name="text"
                rows="8"
                cols="10"
                placeholder="Type to add a note"
                value={noteText}
                onChange={handleChange}
            ></textarea>
            <div className="note-footer">
                <small>{characterLimit - noteText.length} Remaining</small>
                <button className="save" onClick={handleSaveClick}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddNote;
