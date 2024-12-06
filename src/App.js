import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Logout from "./pages/Logout";
import Notes from "./pages/Notes";
import Message from "./pages/Message";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/messages" element={<Message />} />
            </Routes>
        </Router>
    );
};

export default App;
