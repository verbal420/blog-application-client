import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", { email, password });
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post("http://localhost:5000/api/user/register", { username, email, password });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};