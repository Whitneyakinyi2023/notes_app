import { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');
    const characterLimit = 200;

    const handleChange = (event) => {
        const { value } = event.target;
        if (value.length <= characterLimit) {
            setNoteText(value);
        }
    };

    const handleSaveClick = () => {
        const trimmedText = noteText.trim();
        if (trimmedText.length > 0) {
            handleAddNote(trimmedText);
            setNoteText('');
        }
    };

    return (
        <div className='note new'>
            <textarea
                rows='8'
                cols='10'
                placeholder='Type to get started...'
                value={noteText}
                onChange={handleChange}
            />
            <div className='note-footer'>
                <small>{characterLimit - noteText.length} Remaining</small>
                <button className='save' onClick={handleSaveClick}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddNote;