import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:4000/posts",
                { title, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Post created successfully!");
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;
