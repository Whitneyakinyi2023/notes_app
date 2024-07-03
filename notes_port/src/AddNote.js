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
        let formattedText = noteText;

        switch (format) {
            case 'bold':
                formattedText = toggleFormat(noteText, '**');
                break;
            case 'italic':
                formattedText = toggleFormat(noteText, '_');
                break;
            case 'underline':
                formattedText = toggleFormat(noteText, '<u>', '</u>');
                break;
            case 'bullet':
                formattedText = `• ${noteText.replace(/\n/g, '\n• ')}`;
                break;
            default:
                break;
        }

        setNoteText(formattedText);
    };

    const toggleFormat = (text, tagStart, tagEnd = tagStart) => {
        if (text.startsWith(tagStart) && text.endsWith(tagEnd)) {
            return text.substring(tagStart.length, text.length - tagEnd.length);
        }
        return `${tagStart}${text}${tagEnd}`;
    };

    const handleClear = () => {
        setNoteTitle('');
        setNoteText('');
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
                maxLength={characterLimit}
            />
            <div className='note-footer'>
                <button className='save' onClick={handleSaveClick}>
                    Save
                </button>
                <div className='format-buttons'>
                    <button onClick={() => handleFormat('bold')}>
                        <b>B</b>
                    </button>
                    <button onClick={() => handleFormat('italic')}>
                        <i>I</i>
                    </button>
                    <button onClick={() => handleFormat('underline')}>
                        <u>U</u>
                    </button>
                    <button onClick={() => handleFormat('bullet')}>
                        &bull; Bullets
                    </button>
                </div>
                <button className='clear' onClick={handleClear}>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default AddNote;
