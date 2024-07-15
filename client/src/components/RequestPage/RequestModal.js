import React from "react";
import styled, { keyframes } from "styled-components";
import "./Requestpage.css";

const RequestModal = ({ handleCar, handleEquipment }) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.reload();
    };

    const Button = styled.button`
        background-color: #144691;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        cursor: pointer;

        &:hover {
            background-color: #ab0f11;
            color: white;
        }
    `;

    const gradientAnimation = keyframes`
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
`;

    const MainContainer = styled.section`
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(45deg, #0b0e4e, #0a3c8c, #ffffff, #d99c9a, #b51e1e, #8d1d1d);
        background-size: 600% 600%;
        animation: ${gradientAnimation} 15s ease infinite;
    `;

    const RequestWindow = styled.div`
        width: 60%;
        height: 60%;
        background-color: #fafafa;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    `;

    const RequestWrapper = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    `;

    const Header = styled.h2`
        font-style: italic;
        text-align: center;
        padding: 20px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    `;

    const RequestTextWrapper = styled.div`
        text-align: center;
        display: flex;
        flex-direction: column;
    `;

    const Span = styled.span``;

    const HorizontalLine = styled.div`
        border-bottom: 1px solid lightgray;
        width: 100%;
        margin-bottom: 20px;
    `;

    const ButtonWrapper = styled.div`
        display: flex;
        gap: 10px;
        width: 300px;
        justify-content: center;
        flex-wrap: wrap;
    `;

    return (
        <>
            <MainContainer>
                <RequestWindow>
                    <RequestWrapper>
                        <Header>Hello, Mapúa Malayan!</Header>

                        <RequestTextWrapper>
                            <Span>
                                Through this system, you can easily book facilities, equipments, or vehicles from the
                                school.
                            </Span>

                            <Span>Simply select the type of resource you need and complete the form.</Span>
                        </RequestTextWrapper>

                        <HorizontalLine />

                        <ButtonWrapper>
                            <Button onClick={handleEquipment}>Facilities</Button>
                            <Button onClick={handleCar}>Vehicles</Button>
                            <Button onClick={handleLogout}>Logout</Button>
                        </ButtonWrapper>
                    </RequestWrapper>
                </RequestWindow>
            </MainContainer>
        </>
    );
};

export default RequestModal;
