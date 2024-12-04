import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Blog from "../components/Blog";

const Blogs = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/server/blogs", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBlogs(res.data);
      } catch (err) {
        console.error(err.response?.data || "An error occurred");
      }
    };

    fetchBlogs();
  }, [user]);

  return (
    <div>
      <h1>All Blogs</h1>
      {blogs.map((blog) => (
        <Blog key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
