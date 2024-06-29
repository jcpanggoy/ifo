// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, timeLeft } = useAuth();

    if (!isLoggedIn || timeLeft <= 0) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
