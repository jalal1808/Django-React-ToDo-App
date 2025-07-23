import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        setIsLoading(true);
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err))
            .finally(() => setIsLoading(false));
    };

    const deleteNote = (id) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            api
                .delete(`/api/notes/delete/${id}/`)
                .then((res) => {
                    if (res.status === 204) {
                        alert("Note deleted successfully! 🗑️");
                        getNotes();
                    } else {
                        alert("Failed to delete note.");
                    }
                })
                .catch((error) => alert(error));
        }
    };

    const createNote = (e) => {
        e.preventDefault();
        setIsLoading(true);
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    alert("Note created successfully! ✨");
                    setTitle("");
                    setContent("");
                    getNotes();
                } else {
                    alert("Failed to create note.");
                }
            })
            .catch((err) => alert(err))
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="home-container">
            <div className="notes-section">
                <h2 className="section-title">📒 Your Notes</h2>
                {isLoading ? (
                    <div className="loading-message">Loading notes...</div>
                ) : notes.length === 0 ? (
                    <div className="empty-state">No notes yet. Create one below! 👇</div>
                ) : (
                    <div className="notes-grid">
                        {notes.map((note) => (
                            <Note note={note} onDelete={deleteNote} key={note.id} />
                        ))}
                    </div>
                )}
            </div>

            <div className="create-note-section">
                <h2 className="section-title">✏️ Create a Note</h2>
                <form onSubmit={createNote} className="note-form">
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="Note title..."
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your note here..."
                            rows="5"
                            disabled={isLoading}
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Note ✨"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Home;