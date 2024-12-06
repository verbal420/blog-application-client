import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styling/Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/posts"); // Ensure your backend API is correct
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("An error occurred while fetching posts.");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <div className="hero">
        <h1 className="hero-title">MyBlog</h1>
        <p className="hero-subtitle">Your daily dose of insightful articles</p>
      </div>

      <div className="posts-container">
        {loading ? (
          <div className="loading">Loading posts...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="post-card">
                <Link to={`/post/${post._id}`} className="post-title">
                  <h2>{post.title}</h2>
                </Link>
                <p className="post-author">by {post.author.username}</p>
                <p className="post-excerpt">{post.excerpt}</p>
              </div>
            ))
          ) : (
            <div>No posts available.</div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;