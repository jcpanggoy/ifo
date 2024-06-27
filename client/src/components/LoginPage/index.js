import React from "react";
import styled from "styled-components";

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
    width: 200px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid;
`;

const InputWrapper = styled.div`
    display: flex;
`;

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 40px;
    align-items: center;
    flex-direction: column;
    gap: 40px;
`;

const Button = styled.button`
    width: 200px;
    height: 50px;
    padding: 12px;
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: none;
    cursor: pointer;

    &:hover {
        background-color: black;
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
    position: absolute;
    margin: 10px 0px 0px 4px;
    font-size: 14px;
`;

const LoginPage = () => {
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
                        {/* <LoginHeader>Login</LoginHeader> */}

                        <InputContainer>
                            <InputWrapper>
                                <Label>Username</Label>
                                <Input />
                            </InputWrapper>

                            <InputWrapper>
                                <Label>Password</Label>
                                <Input type="password" />
                            </InputWrapper>
                        </InputContainer>

                        <ButtonContainer>
                            <ButtonWrapper>
                                <Button>Sign in</Button>
                            </ButtonWrapper>
                            <ButtonWrapper style={{ alignItems: "end" }}>
                                {/* <TicketButton>Get a request ticket</TicketButton> */}
                            </ButtonWrapper>
                        </ButtonContainer>
                    </SidebarWrapper>
                </Sidebar>
            </Wrapper>
        </Body>
    );
};

export default LoginPage;
