import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const FullScreenContainer = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin-left: 15vw;
    @media screen and (max-width: 768px) {
        margin-left: 0;
        padding: 20px;
    }
`;

const FullScreenWrapper = styled.div`
    width: 100%;
`;

const StyledCalendar = styled(Calendar)`
    /* width: 100%;
    height: 100%; */
    width: 98%;
    /* max-width: 100%; */
    /* border-collapse: collapse;
    margin: 20px 0;
    font-size: 16px;
    text-align: left; */

    .react-calendar {
        background-color: #fff; // Light background for calendar
        color: #090e35; // Black text color
        border: none;
        font-family: Arial, Helvetica, sans-serif;
    }

    .react-calendar__navigation button {
        padding: 20px;
        color: #090e35;
        font-weight: bold;
    }

    .react-calendar__month-view__weekdays {
        background-color: #ab0f11;
        color: #fff;
    }

    .react-calendar__month-view__days {
        display: grid !important;
        grid-template-columns: repeat(7, 1fr); // Ensure seven columns
        grid-template-rows: repeat(5, 1fr); // Ensure five rows
    }

    .react-calendar__tile {
        background: #fff;
        border: 1px solid #ab0f11;
        border-radius: 4px;
        color: #090e35;
        padding: 10px;
        height: 120px; // Increase height
        min-width: 120px; // Increase width
        box-sizing: border-box;
        position: relative;
    }

    .react-calendar__tile--now {
        background: #c49494;
        color: #090e35;
    }

    .react-calendar__tile--active {
        background: #144691;
        color: #fff;
    }

    .react-calendar__tile-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
    }

    .react-calendar__tile .date {
        position: absolute;
        top: 5px;
        left: 5px;
        font-size: 0.8em;
        font-weight: bold;
    }

    .react-calendar__tile .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .highlighted-tile {
        color: #fff;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 14px;
        flex-shrink: 1;
    }
`;

const CalendarComponent = ({ sendDataToParent }) => {
    const [value, onChange] = useState(new Date());
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [selectedDateRequests, setSelectedDateRequests] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios
            .get("http://172.20.10.11:4000/api/requests?status=Approved")
            .then((response) => {
                setAcceptedRequests(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the accepted requests!", error);
            });
    }, []);

    const getRequestsForDate = (date) => {
        return acceptedRequests.filter((request) => new Date(request.dateOfUse).toDateString() === date.toDateString());
    };

    const handleTileClick = (date) => {
        const requestsForDate = getRequestsForDate(date);
        setSelectedDateRequests(requestsForDate);
        setSelectedDate(date);
        setIsModalOpen(true);
        sendDataToParent(date, requestsForDate); // Pass the selected date and requests to the parent
    };

    const closeCalendarModal = () => {
        setIsModalOpen(false);
    };

    return (
        <FullScreenContainer>
            <FullScreenWrapper>
                {/* <div style={{ width: "100%" }}> */}
                <h2 style={{ textAlign: "center", padding: "20px" }}>Facility Booking Calendar</h2>
                <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
                    <StyledCalendar
                        value={value}
                        onChange={onChange}
                        calendarType="hebrew"
                        tileContent={({ date, view }) =>
                            view === "month" && (
                                <div
                                    className={`content ${
                                        getRequestsForDate(date).length > 0 ? "highlighted-tile" : ""
                                    }`}
                                    onClick={() => handleTileClick(date)}
                                >
                                    {getRequestsForDate(date).map((request, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                display: "flex",
                                                borderRadius: "4px",
                                                gap: "12px",
                                                flexDirection: "column",
                                                backgroundColor: "darkgreen",
                                                padding: "4px",
                                            }}
                                        >
                                            <span>{request.dept}</span>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                        formatDay={(locale, date) => <div className="date">{date.getDate()} </div>}
                    />
                    {/* {isModalOpen && (
                        <CalendarModal
                            handleCalendarModal={closeCalendarModal}
                            requests={selectedDateRequests}
                            selectedDate={selectedDate}
                        />
                    )} */}
                </div>
                {/* </div> */}
            </FullScreenWrapper>
        </FullScreenContainer>
    );
};

export default CalendarComponent;
