import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

const Note = ({ id, title, text, date, handleDeleteNote }) => {
    const handleDeleteClick = () => {
        handleDeleteNote(id); // Ensure handleDeleteNote is called correctly on delete click
    };

    return (
        <div className="note">
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="note-footer">
                <small>{date}</small>
                <MdDeleteForever
                    onClick={handleDeleteClick}
                    className="delete-icon"
                    size="1.3em"
                />
            </div>
        </div>
    );
};

export default Note;
