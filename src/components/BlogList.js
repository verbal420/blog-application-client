import React from "react";
import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <Link to={`/blogs/${blog._id}`}>
            <h2>{blog.title}</h2>
          </Link>
          <p>By: {blog.author}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;