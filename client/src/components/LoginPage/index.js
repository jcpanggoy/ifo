import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import styled from "styled-components";
import MCMLogo from "../../img/MMCM_Logo.svg";
import MCMBg from "../../img/MMCM_Bg.jpg";

// Styled components for the login page
const Body = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${MCMBg});
    background-size: cover;
    background-position: center;
`;

const Wrapper = styled.div`
    width: 400px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SidebarImgWrapper = styled.div`
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-content: center;
`;

const Input = styled.input`
    padding: 12px;
    width: 100%;
    border: none;
    border-bottom: 1px solid gray;
    margin-left: 10px;
    &:focus {
        outline: none;
        border-bottom: 2px solid #144691;
    }
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    width: 100%;
    margin-bottom: 24px;
`;

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    color: white;
    background-color: #144691;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
        background-color: #ab0f11;
    }
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Icon = styled.span`
    font-size: 18px;
`;

const Message = styled.div`
    color: red;
    font-size: 14px;
    margin-bottom: 16px;
`;

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login, isLoggedIn, user, logout } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://10.10.4.44:4000/login", {
                username: username.trim(), // Ensure no extra spaces
                password: password.trim(),
            });

            setMessage("Login successful");
            const { user, token, expiry } = response.data;

            // Attach the token to the user object
            const userWithToken = { ...user, token };

            // Store user and token in local storage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userWithToken));

            // Call login from AuthContext
            login(userWithToken, Math.floor((new Date(expiry) - new Date()) / 1000));

            if (user.isAdmin) {
                navigate("/admin", { state: { user } });
            } else {
                navigate("/requestor", { state: { user } });
            }
        } catch (error) {
            setMessage("Invalid username or password");
            console.error("There was an error logging in!", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);

        if (isLoggedIn && user) {
            if (user.isAdmin) {
                navigate("/admin", { state: { user } });
            } else {
                navigate("/requestor", { state: { user } });
            }
        }
    }, [isLoggedIn, user, navigate]);

    // Logout function to be called on logout button click or other trigger
    const handleLogout = () => {
        logout();
        navigate("/login"); // Redirect to login page after logging out
    };

    return (
        <Body>
            <Wrapper>
                <SidebarImgWrapper>
                    <img
                        src={MCMLogo}
                        style={{ width: "65%", height: "auto" }}
                    />
                </SidebarImgWrapper>
                <h2 style={{ marginBottom: "24px", color: "#144691" }}>Login</h2>
                <InputContainer>
                    <InputWrapper>
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Type your username            👤"
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Type your password            🔒"
                        />
                    </InputWrapper>
                </InputContainer>
                {message && <Message>{message}</Message>}
                <ButtonWrapper>
                    <Button onClick={handleLogin}>Sign in</Button>
                </ButtonWrapper>
            </Wrapper>
        </Body>
    );
};

export default LoginPage;
