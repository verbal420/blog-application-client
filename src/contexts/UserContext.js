import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const userData = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
            setUser(userData);
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("token", token);
        setUser(userData);
        navigate("/");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
