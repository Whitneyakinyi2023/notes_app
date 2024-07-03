import React from 'react';

const Note = ({ id, text, date, handleDeleteNote }) => {
    return (
        <div className='note'>
            <p className='note-text'>{text}</p>
            <div className='note-footer'>
                <small className='note-date'>{date}</small>
                <button
                    aria-label='Delete Note'
                    onClick={() => handleDeleteNote(id)}
                    className='delete-button'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="delete-icon" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Note;
