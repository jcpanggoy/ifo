// src/components/LoginPage.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../AuthContext";
import MCMLogo from "../../img/MMCM_Logo.svg";
import MCMBg from "../../img/MMCM_Bg.jpg";

const Body = styled.div`
    width: 100%;
    height: 100vh;
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
`;

const Hero = styled.div`
    background-color: gray;
    width: 100%;
`;

const Img = styled.img`
    background-position: center;
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
`;

const Sidebar = styled.div`
    width: 20vw;
    height: 100%;
    box-shadow: -4px 0px 7px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: -4px 0px 7px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -4px 0px 7px 0px rgba(0, 0, 0, 0.75);
`;

const SidebarWrapper = styled.div`
    height: 100%;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`;

const SidebarImgWrapper = styled.div`
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-content: center;
`;

const Input = styled.input`
    padding: 12px;
    width: 250px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid;
    border-radius: 10px;
    margin-left: 10px;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    width: 100%;
`;

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 40px;
    margin-left: 150px;
    align-items: center;
    flex-direction: column;
    gap: 40px;
`;

const Button = styled.button`
    width: 200px;
    height: 100px;
    padding: 12px;
    color: white;
    background-color: #144691;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: none;
    border-radius: 30px;
    cursor: pointer;

    &:hover {
        background-color: #ab0f11;
        color: white;
    }
`;

const ButtonWrapper = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const LoginHeader = styled.h3`
    padding: 0;
    margin: 0;
`;

const ButtonContainer = styled.div`
    height: 40%;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const TicketButton = styled.button`
    font-size: 12px;
    background-color: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        text-decoration: underline;
    }
`;

const Label = styled.label`
    margin-bottom: 4px;
    font-size: 20px;
    font-weight: bold;
`;

const Message = styled.div`
    color: red;
    font-size: 14px;
`;

const Icon = styled(FontAwesomeIcon)`
    position: absolute;
    left: 20px;
    top: 70%;
    transform: translateY(-50%);
    color: #999;
`;

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://192.168.254.113:4002/login", { username, password });
            setMessage("Login successful");
            const user = response.data.user;

            localStorage.setItem("user", JSON.stringify(user));
            login(user, 3600);

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
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            if (user.isAdmin) {
                navigate("/admin", { state: { user } });
            } else {
                navigate("/requestor", { state: { user } });
            }
        }
    }, []);

    return (
        <Body>
            <Wrapper>
                <Hero>
                    <Img src={MCMBg} />
                </Hero>

                <Sidebar>
                    <SidebarWrapper>
                        <SidebarImgWrapper>
                            <img
                                src={MCMLogo}
                                style={{ width: "65%", height: "auto" }}
                            />
                        </SidebarImgWrapper>

                        <InputContainer>
                            <InputWrapper>
                                <Label>Username</Label>
                                <Icon icon={faUser} />
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Type your username"
                                />
                            </InputWrapper>

                            <InputWrapper>
                                <Label>Password</Label>
                                <Icon icon={faLock} />
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Type your password"
                                />
                            </InputWrapper>
                        </InputContainer>

                        {message && <Message>{message}</Message>}

                        <ButtonContainer>
                            <ButtonWrapper>
                                <Button onClick={handleLogin}>Sign in</Button>
                            </ButtonWrapper>
                        </ButtonContainer>
                    </SidebarWrapper>
                </Sidebar>
            </Wrapper>
        </Body>
    );
};

export default LoginPage;
