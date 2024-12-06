import React from "react";
import { createRoot } from "react-dom/client"; // New import for React 18
import App from "./App";
import { UserProvider } from "./contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container); // Create React 18 root

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>           
                <App />           
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);
