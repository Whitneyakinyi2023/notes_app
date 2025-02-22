function Sidebar({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
}) {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

    return (
        <div className="app-sidebar">
            <div className="app-sidebar-header">
                <h1>Your Notes</h1>
                <button onClick={onAddNote} className="add-button">Add</button>
            </div>
            <div className="app-sidebar-notes">
                {sortedNotes.map((note) => (
                    <div
                        key={note.id}
                        className={`app-sidebar-note ${note.id === activeNote ? "active" : ""}`}
                        onClick={() => setActiveNote(note.id)}
                    >
                        <div className="sidebar-note-title">
                            <strong>{note.title}</strong>
                            <button onClick={(e) => { e.stopPropagation(); onDeleteNote(note.id); }} className="delete-button">Delete</button>
                        </div>
                        <p>{note.body && note.body.substr(0, 100) + "..."}</p>
                        <small className="note-meta">
                            Last modified {new Date(note.lastModified).toLocaleDateString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
