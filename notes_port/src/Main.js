import ReactMarkdown from "react-markdown";
function Main({ activeNote, onUpdateNote }) {
    const onEditField = (key, value) => {

        onUpdateNote({
            ...activeNote,
            [key]: value,
            lastModified: Date.now()
        })


    };

    if (!activeNote) return <div className="no-active-note">No note selected!(Do you want to select a note)</div>
    return (
        <div className="app-main">
            <div className="app-main-note-edit">
                <input
                    type="text"
                    id="title"
                    onChange={(e) => onEditField("title", e.target.value)}
                    autoFocus
                    value={activeNote.title}

                />
                <textarea
                    id="body"
                    placeholder="New Note"
                    value={activeNote.body}
                    onChange={(e) => onEditField("body", e.target.value)}

                />
            </div>
            <div className="app-main-note-preview">
                <h1 className="preview-title">{activeNote ? activeNote.title : 'Select a note to preview'}</h1>
                <ReactMarkdown className="markdown preview">{activeNote ? activeNote.body : 'No content to preview'}
                </ReactMarkdown>
            </div >
        </div >
    );
}

export default Main;