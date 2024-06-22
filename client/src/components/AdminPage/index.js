import React from "react";
import styled from "styled-components";

import SidebarComponent from "./SidebarComponent";
import Requests from "./Requests";
import Navbar from "./Navbar";
import Timeline from "./Timeline";
import CalendarComponent from "./CalendarComponent";

const Main = styled.main`
    min-width: 100vw;
    min-height: 100vh;
`;

const MainContainer = styled.div`
    width: 100%;
    height: 95vh;
    display: flex;
    flex-direction: column;
    /* margin-bottom: 2rem; */
`;

const AdminPage = () => {
    return (
        <Main>
            <MainContainer>
                {/* <Navbar /> */}
                <div
                    style={{
                        display: "flex",
                        height: "100%",
                        width: "100%",
                        justifyContent: "space-evenly",
                        alignItems: "end",
                    }}
                >
                    <CalendarComponent />
                    <Timeline />
                </div>
            </MainContainer>
        </Main>
    );
};

export default AdminPage;
