
import React, { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteText, setNoteText] = useState('');
    const characterLimit = 1000;

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'title') {
            setNoteTitle(value);
        } else if (name === 'text') {
            setNoteText(value.slice(0, characterLimit));
        }
    };

    const handleSaveClick = () => {
        const trimmedTitle = noteTitle.trim();
        const trimmedText = noteText.trim();
        if (trimmedTitle && trimmedText) {
            handleAddNote(trimmedTitle, trimmedText);
            setNoteTitle('');
            setNoteText('');
        } else {
            alert('Please enter both title and note content.');
        }
    };

    const handleFormat = (format) => {
        // Implement formatting logic based on 'format' parameter
    };

    return (
        <div className='note new'>
            <label htmlFor='title'>Title:</label>
            <input
                type='text'
                name='title'
                id='title'
                placeholder='Title'
                value={noteTitle}
                onChange={handleChange}
            />
            <label htmlFor='text'>Note:</label>
            <textarea
                name='text'
                id='text'
                rows='8'
                cols='10'
                placeholder='Type to get started...'
                value={noteText}
                onChange={handleChange}
            />
            <div className='note-footer'>
                <button className='save' onClick={handleSaveClick}>
                    Save
                </button>
                <div className='format-buttons'>
                    <button onClick={() => handleFormat('bold')}>
                        <i className="fas fa-bold"></i>
                    </button>
                    <button onClick={() => handleFormat('italic')}>
                        <i className="fas fa-italic"></i>
                    </button>
                    <button onClick={() => handleFormat('underline')}>
                        <i className="fas fa-underline"></i>
                    </button>
                    <button onClick={() => handleFormat('bullet')}>
                        <i className="fas fa-list-ul"></i>
                    </button>
                </div>
                <button className='clear' onClick={() => { setNoteTitle(''); setNoteText(''); }}>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default AddNote;
