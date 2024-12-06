import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get(`http://localhost:4000/posts/${id}`);
            setPost(response.data);
        };

        const fetchComments = async () => {
            const response = await axios.get(`http://localhost:4000/comments/post/${id}`);
            setComments(response.data);
        };

        fetchPost();
        fetchComments();
    }, [id]);

    const addComment = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `http://localhost:4000/comments/post/${id}`,
                { content: comment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setComments([...comments, response.data]);
            setComment("");
        } catch (error) {
            console.error("Failed to add comment:", error.message);
        }
    };

    return (
        <div>
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <p>by {post.author.username}</p>
                </>
            )}
            <hr />
            <h2>Comments</h2>
            {comments.map((c) => (
                <div key={c._id}>
                    <p>{c.content}</p>
                    <small>by {c.author.username}</small>
                </div>
            ))}
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
            />
            <button onClick={addComment}>Add Comment</button>
        </div>
    );
};

export default Post;
