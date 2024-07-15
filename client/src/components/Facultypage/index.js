import React, { useState } from "react";
import styled from "styled-components";
import SidebarComponent from "./SidebarComponent";
import RequestsComponent from "./RequestsComponent";
import { useLocation } from "react-router-dom";


const Main = styled.main`
    max-width: 100vw;
    max-height: 100vh;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgb(248, 248, 248);
`;

const MainContainer = styled.div`
    display: flex;
    width: 100vw;
    flex-direction: row;
    /* width: max-content; */
`;

const FacultyAdmin = () => {
    const [requestActive, setRequestActive] = useState(true);
    const location = useLocation();
    const user = location.state?.user;

    console.log(user.fullname);
    const openRequests = () => {
        setRequestActive(true);
    };

    return (
        <Main>
            <MainContainer>
                <SidebarComponent  openRequests={openRequests} />
                {requestActive && 
                (<RequestsComponent 
                user={user}/>)}
            </MainContainer>
        </Main>
    );
};

export default FacultyAdmin;
