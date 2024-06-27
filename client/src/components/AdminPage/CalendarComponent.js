import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarModal from "./CalendarModal";

const FullScreenContainer = styled.section`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8; /* Light background */
`;

const StyledCalendar = styled(Calendar)`
    width: 100%;
    height: 100%;

    .react-calendar {
        background-color: #fff; /* Light background for calendar */
        color: #000; /* Black text color */
        border: none;
        font-family: Arial, Helvetica, sans-serif;
    }

    .react-calendar__navigation button {
        color: #000;
    }

    .react-calendar__month-view__weekdays {
        background-color: #f0f0f0;
        color: #000;
    }

    .react-calendar__month-view__days {
        display: grid !important;
        grid-template-columns: repeat(7, 1fr); /* Ensure seven columns */
        grid-template-rows: repeat(5, 1fr); /* Ensure five rows */
    }

    .react-calendar__tile {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        color: #000;
        padding: 10px;
        height: 120px; /* Increase height */
        min-width: 120px; /* Increase width */
        box-sizing: border-box;
        position: relative;
    }

    .react-calendar__tile--now {
        background: #e0e0e0;
    }

    .react-calendar__tile--active {
        background: #c0c0c0;
        color: #000;
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
        /* margin-top: 20px;  */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* width: 100%;
        height: 100%; */
    }

    .highlighted-tile {
        /* background-color: #007bff; */
        color: #fff;
        /* border: 1px solid #0056b3; */
        /* border-radius: 4px; */
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 14px;
        flex-shrink: 1;
    }
`;

const CalendarComponent = ({ handleCalendarModal, sendDataToParent }) => {
    const [value, onChange] = useState(new Date());
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [selectedDateRequests, setSelectedDateRequests] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal Test State

    useEffect(() => {
        axios
            .get("http://192.168.254.113:4002/api/requests?status=Approved")
            .then((response) => {
                setAcceptedRequests(response.data);
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the accepted requests!",
                    error
                );
            });
    }, []);

    const getRequestsForDate = (date) => {
        return acceptedRequests.filter(
            (request) =>
                new Date(request.dateOfUse).toDateString() ===
                date.toDateString()
        );
    };

    // const handleTileClick = (date) => {
    //     const requestsForDate = getRequestsForDate(date);
    //     setSelectedDateRequests(requestsForDate);
    //     setSelectedDate(date);
    //     setIsModalOpen(true);
    // };

    const handleTileClick = (date) => {
        const requestsForDate = getRequestsForDate(date);
        setSelectedDateRequests(requestsForDate);
        setSelectedDate(date);
        setIsModalOpen(true);
        sendDataToParent(date); // Pass the selected date to the parent
    };

    const closeCalendarModal = () => {
        setIsModalOpen(false);
    };

    const passToParent = (date) => {
        // Pass to parent
        setIsModalOpen(true);
        sendDataToParent(date, isModalOpen);
        // console.log(date);
    };

    return (
        <FullScreenContainer>
            <StyledCalendar
                value={value}
                onChange={onChange}
                calendarType="hebrew"
                tileContent={({ date, view }) =>
                    view === "month" && (
                        <div
                            className={`content ${
                                getRequestsForDate(date).length > 0
                                    ? "highlighted-tile"
                                    : ""
                            }`}
                            // onClick={() => handleTileClick(date)}
                            onClick={passToParent(date)}
                            // key={date.length}
                        >
                            {getRequestsForDate(date).map((request, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        borderRadius: "4px",
                                        gap: "12px",
                                        flexDirection: "column",
                                        backgroundColor: "#007bff",
                                        padding: "4px",
                                    }}
                                >
                                    <span>{request.dept}</span>
                                </div>
                            ))}
                        </div>
                    )
                }
                formatDay={(locale, date) => (
                    <div className="date">{date.getDate()} </div>
                )}
            />
            {isModalOpen && (
                <CalendarModal
                    handleCalendarModal={closeCalendarModal}
                    requests={selectedDateRequests}
                    selectedDate={selectedDate}
                />
            )}
        </FullScreenContainer>
    );
};

export default CalendarComponent;
