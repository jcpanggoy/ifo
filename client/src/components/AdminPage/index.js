import React, { useState } from "react";
import styled from "styled-components";

import SidebarComponent from "./SidebarComponent";
import RequestsComponent from "./RequestsComponent";
import CalendarComponent from "./CalendarComponent";
import LogsComponent from "./LogsComponent";
import CalendarModal from "./CalendarModal";

const Main = styled.main`
    min-width: 100vw;
    min-height: 100vh;
`;

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const AdminPage = () => {
    const [logsActive, setLogActive] = useState(false);
    const [requestActive, setRequestActive] = useState(true);
    const [calendarActive, setCalendarActive] = useState(false);
    const [showCalendarModal, setShowCalendarModal] = useState(false);
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

    return (
        <Main>
            {showCalendarModal && (
                <CalendarModal
                    handleCalendarModal={handleCalendarModal}
                    requests={selectedDateRequests}
                    selectedDate={selectedDate}
                />
            )}
            <MainContainer>
                <SidebarComponent
                    openLogs={openLogs}
                    openCalendar={openCalendar}
                    openRequests={openRequests}
                    activeItem={
                        logsActive
                            ? "logs"
                            : calendarActive
                            ? "calendar"
                            : "requests"
                    }
                />
                <div
                    style={{
                        display: "flex",
                        height: "100%",
                        width: "100%",
                        justifyContent: "center",
                    }}
                >
                    {requestActive && <RequestsComponent />}
                    {calendarActive && (
                        <CalendarComponent
                            sendDataToParent={sendDataToParent}
                        />
                    )}
                    {logsActive && <LogsComponent />}
                </div>
            </MainContainer>
        </Main>
    );
};

export default AdminPage;
