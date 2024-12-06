import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get("http://localhost:4000/posts");
            setPosts(response.data);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((post) => (
                <div key={post._id}>
                    <Link to={`/post/${post._id}`}>
                        <h2>{post.title}</h2>
                    </Link>
                    <p>by {post.author.username}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
