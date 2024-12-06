import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Logout from "./pages/Logout";
import Message from "./pages/Message";
import Notes from "./pages/Notes"
import Navbar from "./components/Navbar";


function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/message" element={<Message />} />
                <Route path="/note" element={<Notes />} />
            </Routes>
        </div>
    );
}

export default App;
