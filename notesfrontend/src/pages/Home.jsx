import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState(null);

    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const res = await API.get("notesapi/notes/");
            setNotes(res.data);
        } catch (err) {
            console.error(err);

            if (err.response?.status === 401) {
                logout();
            }
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await API.put(`notesapi/notes/${editingId}/`, {
                    title,
                    content,
                });
            } else {
                await API.post("notesapi/notes/", {
                    title,
                    content,
                });
            }

            setTitle("");
            setContent("");
            setEditingId(null);

            fetchNotes();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (note) => {
        setEditingId(note.id);
        setTitle(note.title);
        setContent(note.content);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this note?")) return;

        try {
            await API.delete(`notesapi/notes/${id}/`);
            fetchNotes();
        } catch (err) {
            console.error(err);
        }
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
    };

    return (
    <div
        style={{
            minHeight: "100vh",
            background: "#0f172a",
            color: "#fff",
            padding: "40px",
            fontFamily: "Arial, sans-serif",
        }}
    >
        <div
            style={{
                maxWidth: "900px",
                margin: "0 auto",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                }}
            >
                <div>
                    <h1 style={{ margin: 0,color:"red"}}>📝 Notes App</h1>
                    <p style={{ color: "#94a3b8" }}>
                        Manage your notes easily.
                    </p>
                </div>

                <button
                    onClick={logout}
                    style={{
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#ef4444",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    Logout
                </button>
            </div>

            {/* Form */}

            <form
                onSubmit={handleSubmit}
                style={{
                    background: "#1e293b",
                    padding: "20px",
                    borderRadius: "12px",
                    marginBottom: "30px",
                    boxShadow: "0 5px 15px rgba(0,0,0,.3)",
                }}
            >
                <h2>
                    {editingId ? "Update Note" : "Create Note"}
                </h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        borderRadius: "8px",
                        border: "none",
                        outline: "none",
                        fontSize: "16px",
                    }}
                />

                <textarea
                    rows="5"
                    placeholder="Write your note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        borderRadius: "8px",
                        border: "none",
                        outline: "none",
                        resize: "none",
                        fontSize: "15px",
                    }}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "14px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#2563eb",
                        color: "white",
                        fontSize: "16px",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    {editingId ? "Update Note" : "Add Note"}
                </button>
            </form>

            {/* Notes */}

            {notes.length === 0 ? (
                <div
                    style={{
                        textAlign: "center",
                        padding: "40px",
                        background: "#1e293b",
                        borderRadius: "12px",
                    }}
                >
                    <h2>No Notes Yet</h2>
                    <p>Create your first note.</p>
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(280px,1fr))",
                        gap: "20px",
                    }}
                >
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            style={{
                                background: "#1e293b",
                                borderRadius: "12px",
                                padding: "20px",
                                boxShadow:
                                    "0 5px 12px rgba(0,0,0,.3)",
                            }}
                        >
                            <h3>{note.title}</h3>

                            <p
                                style={{
                                    color: "#cbd5e1",
                                    minHeight: "70px",
                                }}
                            >
                                {note.content}
                            </p>

                            <small
                                style={{
                                    color: "#94a3b8",
                                }}
                            >
                                {note.created_at}
                            </small>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "20px",
                                }}
                            >
                                <button
                                    onClick={() => handleEdit(note)}
                                    style={{
                                        flex: 1,
                                        padding: "10px",
                                        border: "none",
                                        borderRadius: "8px",
                                        background: "#3b82f6",
                                        color: "white",
                                        cursor: "pointer",
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(note.id)
                                    }
                                    style={{
                                        flex: 1,
                                        padding: "10px",
                                        border: "none",
                                        borderRadius: "8px",
                                        background: "#dc2626",
                                        color: "white",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);
}

export default Home;