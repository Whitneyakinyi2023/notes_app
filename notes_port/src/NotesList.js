import Note from './Note';
import AddNote from './AddNote';

const List = ({ notes, handleAddNote, handleDeleteNote }) => {
    return (
        <div className='notes-list'>
            {notes.length > 0 ? (
                notes.map((note) => (
                    <Note
                        key={note.id} // Added key prop for better performance
                        id={note.id}
                        text={note.text}
                        date={note.date}
                        handleDeleteNote={handleDeleteNote}
                    />
                ))
            ) : (
                <div className='no-notes'>No notes available. Add your first note!</div>
            )}
            <AddNote handleAddNote={handleAddNote} />
        </div>
    );
};

export default List;
