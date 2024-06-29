// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loginState = localStorage.getItem("loggedIn");
        const timer = localStorage.getItem("timeLeft");

        if (loginState && timer) {
            const parsedTimer = parseInt(timer, 10);
            setTimeLeft(parsedTimer);

            if (parsedTimer > 0) {
                setIsLoggedIn(true);
                setUser(JSON.parse(localStorage.getItem("user")));
            }
        }

        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime > 1) {
                        localStorage.setItem("timeLeft", prevTime - 1);
                        return prevTime - 1;
                    } else {
                        clearInterval(interval);
                        localStorage.removeItem("loggedIn");
                        localStorage.removeItem("timeLeft");
                        localStorage.removeItem("user");
                        setIsLoggedIn(false);
                        setUser(null);
                        return 0;
                    }
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timeLeft]);

    const login = (user, timer) => {
        setIsLoggedIn(true);
        setTimeLeft(timer);
        setUser(user);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("timeLeft", timer);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setTimeLeft(null);
        setUser(null);
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("timeLeft");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, timeLeft, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
