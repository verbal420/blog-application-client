import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "../styling/Navbar.css";

const Navbar = () => {
    const { user, logout } = useContext(UserContext);

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">MyBlog</Link>
                <div className="nav-links">
                    <Link to="/" className="nav-item">Home</Link>
                    {user ? (
                        <>
                            <Link to="/create" className="nav-item">Create Post</Link>
                            <Link to="/messages" className="nav-item">Messages</Link>
                            <button onClick={logout} className="nav-button">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-item">Login</Link>
                            <Link to="/register" className="nav-item">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
