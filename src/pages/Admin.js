import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/server/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/server/comments");
        setComments(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchBlogs();
    fetchComments();
  }, []);

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/server/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/server/comments/${id}`);
      setComments(comments.filter((comment) => comment._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Manage Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <button onClick={() => deleteBlog(blog._id)}>Delete</button>
        </div>
      ))}
      <h2>Manage Comments</h2>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.text}</p>
          <button onClick={() => deleteComment(comment._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Admin;