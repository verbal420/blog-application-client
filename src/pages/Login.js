import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/users/login", {
                email,
                password,
            });
            login(response.data.user, response.data.token);
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
