import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/server/blogs/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchBlogs();
  }, [token]);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // Update blog
        await axios.put(
          `http://localhost:5000/server/blogs/${editing}`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBlogs(blogs.map((blog) => (blog._id === editing ? { ...blog, title, content } : blog)));
        setEditing(null);
      } else {
        // Create blog
        const res = await axios.post(
          "http://localhost:5000/server/blogs",
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBlogs([...blogs, res.data]);
      }
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleEdit = (blog) => {
    setEditing(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/server/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <form onSubmit={handleCreateOrUpdate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">{editing ? "Update Blog" : "Create Blog"}</button>
      </form>
      <h2>Your Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <button onClick={() => handleEdit(blog)}>Edit</button>
          <button onClick={() => handleDelete(blog._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;