import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate("/");
    }, [logout, navigate]);

    return <div>Logging out...</div>;
};

export default Logout;
