import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogList from "../components/BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/server/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Blog Posts</h1>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default Home;