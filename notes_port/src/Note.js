import { MdDeleteForever } from 'react-icons/md';

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
                    <MdDeleteForever size='1.5em' />
                </button>
            </div>
        </div>
    );
};

export default Note;
