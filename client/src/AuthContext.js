import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await fetch("http://10.10.4.44:4000/validate_token", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.valid) {
                            const storedUser = JSON.parse(localStorage.getItem("user"));
                            setIsLoggedIn(true);
                            setTimeLeft(Math.floor((new Date(data.expiry) - new Date()) / 1000));
                            setUser({ ...storedUser, token }); // Ensure user includes the token and all details
                        } else {
                            logout();
                        }
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error("Error during token validation:", error);
                    logout();
                }
            }
        };

        validateToken();

        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime > 1) {
                        return prevTime - 1;
                    } else {
                        clearInterval(interval);
                        logout();
                        return 0;
                    }
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timeLeft]);

    const login = (user, expiryTime) => {
        setIsLoggedIn(true);
        setTimeLeft(expiryTime);
        setUser(user);
        localStorage.setItem("token", user.token);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setTimeLeft(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // Remove user from local storage on logout
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, timeLeft, user, login, logout }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
