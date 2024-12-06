import React, { useState } from "react";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState("");

    const addNote = () => {
        if (note.trim()) {
            setNotes([...notes, note]);
            setNote("");
        }
    };

    return (
        <div>
            <h1>Personal Notes</h1>
            <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write a note..."
            />
            <button onClick={addNote}>Add Note</button>
            <ul>
                {notes.map((n, index) => (
                    <li key={index}>{n}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;
