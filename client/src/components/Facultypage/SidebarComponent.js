import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import MCMLogo from "../../img/MMCM_Logo.svg";


const Sidebar = styled.section`
    width: 12vw;
    min-width: 100px; // Ensure minimum width for better responsiveness
    height: 100%; // Change height to auto to match the content height
    background-color: #fafafa;
    color: black;
    box-shadow: 5px 0px 12px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 5px 0px 12px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 5px 0px 12px 0px rgba(0, 0, 0, 0.75);
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed; // Make sidebar fixed to ensure it stays in place
    /* top: 0;
    left: 0;
    bottom: 0; */
`;

const SidebarContainer = styled.div`
    flex: 1; // Allow sidebar container to grow and fill available space
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto; // Allow scrolling if content overflows
`;

const SidebarImgContainer = styled.div`
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-content: center;
`;

const SidebarMainContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 50vh;
    width: 100%;
    margin-top: 20px;
`;



const IconLabel = styled.span`
    margin-left: 8px;
`;

const LogoutButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
`;

const LogoutButton = styled.button`
    font-size: large;
    font-weight: 500;
    width: 100%;
    height: 50px;
    padding: 12px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #ab0f11;
        color: white;
    }
`;

const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // localStorage.removeItem("timeLeft");

    window.location.reload();
};

const SidebarComponent = ({ openLogs, openCalendar, openRequests, activeItem }) => {
    return (
        <Sidebar>
            <SidebarContainer>
                <SidebarImgContainer>
                    <img
                        src={MCMLogo}
                        style={{ width: "150px", height: "auto" }}
                        alt="MMCM Logo"
                    />
                </SidebarImgContainer>
                <SidebarMainContent>

                </SidebarMainContent>
            </SidebarContainer>
            <LogoutButtonContainer>
                <LogoutButton onClick={handleLogout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} /> <IconLabel>Logout</IconLabel>
                </LogoutButton>
            </LogoutButtonContainer>
        </Sidebar>
    );
};

export default SidebarComponent;
