import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/server/blogs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchBlogs();
  }, [token]);

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/server/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const deleteComment = async (blogId, commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/server/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlogs(
        blogs.map((blog) =>
          blog._id === blogId
            ? { ...blog, comments: blog.comments.filter((c) => c._id !== commentId) }
            : blog
        )
      );
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <p>By: {blog.author}</p>
          <button onClick={() => deleteBlog(blog._id)}>Delete Blog</button>
          <h3>Comments:</h3>
          {blog.comments.map((comment) => (
            <div key={comment._id}>
              <p>{comment.text}</p>
              <small>By: {comment.author}</small>
              <button onClick={() => deleteComment(blog._id, comment._id)}>
                Delete Comment
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
