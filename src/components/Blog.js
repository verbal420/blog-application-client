import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div>
      <h2>
        <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      </h2>
      <p>By: {blog.author}</p>
    </div>
  );
};

export default Blog;