import React from "react";
import styled from "styled-components";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Overlay = styled.section`
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Modal = styled.div`
    width: 70vw;
    height: 70vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    opacity: 1;
    position: relative;
    border-radius: 4px;
`;

const CloseIcon = styled(FontAwesomeIcon)`
    align-self: end;
    cursor: pointer;
`;

const CalendarModal = ({ handleCalendarModal, requests, selectedDate }) => {
    return (
        <Overlay>
            <Modal>
                <CloseIcon
                    icon={faXmark}
                    size="xl"
                    onClick={handleCalendarModal}
                    style={{ padding: "12px" }}
                />
                <div style={{}}>
                    <h3>{selectedDate.toDateString()}</h3>
                    {requests.map((request, index) => (
                        <div
                            key={index}
                            style={{
                                display: "grid",
                                gridTemplateColumns: ".5fr .5fr .5fr .5fr .5fr",
                                // gridTemplateRows: ".4fr",
                                textAlign: "center",
                                fontSize: "18px",
                                // alignContent: "center",
                                // justifyContent: "center",
                            }}
                        >
                            <p>{request.timeOfUse}</p>
                            <p>{request.requestorName}</p>
                            <p>{request.dept}</p>
                            <p>{request.request}</p>
                            <p>{request.purpose}</p>
                        </div>
                    ))}
                </div>
            </Modal>
        </Overlay>
    );
};

export default CalendarModal;
