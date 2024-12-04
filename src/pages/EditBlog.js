import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EditBlog = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/server/blogs/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error(err.response?.data || "An error occurred");
      }
    };
    fetchBlog();
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/server/blogs/${id}`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      alert("Blog updated successfully!");
      navigate("/blogs");
    } catch (err) {
      console.error(err.response?.data || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Blog</h2>
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
      ></textarea>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditBlog;
