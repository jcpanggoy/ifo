import React, { useState } from "react";
import styled from "styled-components";

import SidebarComponent from "./SidebarComponent";
import RequestsComponent from "./RequestsComponent";
import CalendarComponent from "./CalendarComponent";
import LogsComponent from "./LogsComponent";
import CalendarModal from "./CalendarModal";
import ConvertPdfModal from "./convertPdfModal";

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
`;

const AdminPage = () => {
    const [logsActive, setLogActive] = useState(true);
    const [requestActive, setRequestActive] = useState(false);
    const [calendarActive, setCalendarActive] = useState(false);
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateRequests, setSelectedDateRequests] = useState([]);

    const openLogs = () => {
        setLogActive(true);
        setCalendarActive(false);
        setRequestActive(false);
    };

    const openCalendar = () => {
        setCalendarActive(true);
        setLogActive(false);
        setRequestActive(false);
    };

    const openRequests = () => {
        setCalendarActive(false);
        setLogActive(false);
        setRequestActive(true);
    };

    const handleCalendarModal = () => {
        setShowCalendarModal(!showCalendarModal);
    };

    const sendDataToParent = (date, requests) => {
        setSelectedDate(date);
        setSelectedDateRequests(requests);
        setShowCalendarModal(true);
    };

    const handlePdfModal = () => {
        setShowPdfModal(!showPdfModal);
    };

    return (
        <Main>
            {showCalendarModal && (
                <CalendarModal
                    handleCalendarModal={handleCalendarModal}
                    requests={selectedDateRequests}
                    selectedDate={selectedDate}
                />
            )}

            {showPdfModal && <ConvertPdfModal handlePdfModal={handlePdfModal} />}
            <MainContainer>
                <SidebarComponent
                    openLogs={openLogs}
                    openCalendar={openCalendar}
                    openRequests={openRequests}
                    activeItem={logsActive ? "logs" : calendarActive ? "calendar" : "requests"}
                />
                {/* <div
                    style={{
                        display: "flex",
                        height: "100%",
                        width: "100%",
                        // justifyContent: "center",
                        // backgroundColor: "#f8f8f8",
                    }}
                > */}
                {requestActive && <RequestsComponent />}
                {calendarActive && <CalendarComponent sendDataToParent={sendDataToParent} />}
                {logsActive && <LogsComponent />}
                {/* </div> */}
            </MainContainer>
        </Main>
    );
};

export default AdminPage;
