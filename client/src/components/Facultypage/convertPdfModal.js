import React, { useState } from "react";
import styled from "styled-components";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalContainer = styled.section`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(128, 128, 128, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    max-width: 70vw;
    max-height: 80vh;
    background-color: white;
    border-radius: 24px;
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const MainContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    margin: 18px;
    font-size: 18px;
    /* text-align: center; */
`;

const MainGridWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const CloseButtonWrapper = styled.div`
    align-self: flex-end;
    padding: 18px;
    cursor: pointer;
`;

const PrintButtonWrapper = styled.div`
    align-self: flex-end;
    padding: 18px;
    cursor: pointer;
    margin-bottom: 30px;
    margin-right: 20px;
`;

const PrintButton = styled.button`
    background-color: #ab0f11;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 18px;
    font-size: 18px;
    width: 80px;
`;

const ConvertPdfModal = ({ handlePdfModal }) => {
    const [schoolBldg, setSchoolBldg] = useState({});
    const [adminBldg, setAdminBldg] = useState({});
    const [sportsEquipment, setSportsEquipment] = useState({});
    const [otherEquipment, setOtherEquipment] = useState({});
    const [vehicles, setVehicles] = useState({});

    const [name, setName] = useState("");
    const [dept, setDept] = useState("");
    const [status, setStatus] = useState(false);
    const [deptHead, setDeptHead] = useState("");

    const [dateOfFilling, setDateOfFiling] = useState("");
    const [dateOfUse, setDateOfUse] = useState("");
    // const []

    return (
        <>
            <ModalContainer>
                <ModalWrapper>
                    <CloseButtonWrapper onClick={handlePdfModal}>
                        <FontAwesomeIcon
                            icon={faXmark}
                            size="xl"
                        />
                    </CloseButtonWrapper>

                    {/* --------------------- */}

                    <MainContent>
                        <MainGridWrapper>
                            <span>Name: {}</span>
                            <span>Department: {}</span>
                        </MainGridWrapper>

                        <MainGridWrapper>
                            <span>Date of Filing: {}</span>
                            <span>Date of Use: {}</span>
                            <span>Time of Use: {}</span>
                        </MainGridWrapper>

                        <MainGridWrapper>
                            <span>School Building</span>
                        </MainGridWrapper>

                        <MainGridWrapper>
                            <span>Admin Building</span>
                        </MainGridWrapper>

                        <MainGridWrapper style={{ gridColumnStart: "3" }}>
                            <span>Sports Equipment</span>
                        </MainGridWrapper>

                        <MainGridWrapper>
                            <span>Other Equipment</span>
                        </MainGridWrapper>

                        <MainGridWrapper>
                            <span>Status: {}</span>
                            <span>Department Head: {}</span>
                        </MainGridWrapper>

                        <MainGridWrapper style={{ gridColumnStart: "3" }}>
                            <span>Vehicles {}</span>
                        </MainGridWrapper>
                    </MainContent>

                    {/* --------------------- */}

                    <PrintButtonWrapper>
                        <PrintButton>Print</PrintButton>
                    </PrintButtonWrapper>
                </ModalWrapper>
            </ModalContainer>
        </>
    );
};

export default ConvertPdfModal;
