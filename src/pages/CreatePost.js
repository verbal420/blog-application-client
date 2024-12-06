import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token"); // Get token from localStorage

            // Send the POST request to create a blog post
            const response = await fetch("http://localhost:4000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });

            // Check if the response is successful
            if (response.ok) {
                alert("Post created successfully!");
                navigate("/"); // Navigate to the homepage after successful creation
            } else {
                alert("Failed to create post");
            }
        } catch (error) {
            console.error("Error creating post:", error.message);
            alert("An error occurred while creating the post.");
        }
    };

    return (
        <div>
            <h2>Create a New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                    />
                </div>
                <div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        required
                    />
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;