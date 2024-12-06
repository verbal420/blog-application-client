import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
    const { user, logout } = useContext(UserContext);

    return (
        <nav>
            <Link to="/">Home</Link>
            {user ? (
                <>
                    <Link to="/create">Create Post</Link>
                    <Link to="/messages">Message</Link>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
