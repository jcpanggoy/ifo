import React from "react";
import styled from "styled-components";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Overlay = styled.section`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Modal = styled.div`
    width: 80vw;
    height: 80vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    opacity: 1;
    position: relative;
    border-radius: 4px;
    padding: 20px;
    overflow-y: auto;
    z-index: 99999;
`;

const CloseIcon = styled(FontAwesomeIcon)`
    align-self: end;
    cursor: pointer;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const DateInfo = styled.div`
    font-size: 1.5em;
    font-weight: bold;
`;

const RequestContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const RequestItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
`;

const CalendarModal = ({ handleCalendarModal, requests, selectedDate }) => {
    const dayOfWeek = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
    });
    const formattedDate = selectedDate.toLocaleDateString();

    return (
        <Overlay>
            <Modal>
                <Header>
                    <DateInfo>
                        {dayOfWeek}, {formattedDate}
                    </DateInfo>
                    <CloseIcon
                        icon={faXmark}
                        size="xl"
                        onClick={handleCalendarModal}
                        style={{ padding: "12px" }}
                    />
                </Header>
                {requests && requests.map((request, index) => (
                    <RequestContainer key={index}>
                        <RequestItem>
                            <span>{request.timeOfUse}</span>
                            <span>{request.requestorName}</span>
                            <span>{request.dept}</span>
                            <span>{request.request}</span>
                            <span>{request.purpose}</span>
                        </RequestItem>
                    </RequestContainer>
                ))}
            </Modal>
        </Overlay>
    );
};

export default CalendarModal;
