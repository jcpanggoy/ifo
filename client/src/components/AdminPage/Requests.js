import React from "react";
import styled from "styled-components";

const MainContent = styled.section`
    width: 100%;
`;

const MainContentContainer = styled.div`
    padding: 24px 34px 24px 34px;
    margin: 24px 34px 24px 34px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    justify-content: center;
`;

const PendingBox = styled.div`
    background-color: gray;
    width: 70%;
    height: 100px;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
`;

const Name = styled.h3`
    padding: 0;
    margin: 0;
`;

const Details = styled.label`
    font-size: 16px;
    padding: 0;
    margin: 0;
`;

const Top = styled.div`
    border-bottom: 1px solid #ffffff;
`;

const Bottom = styled.div`
    display: flex;
    gap: 70px;
`;

const PendingBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin-left: 50px;
    color: white;
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 24px;
    margin-right: 50px;
`;

const ReqButton = styled.button`
    width: 100px;
    height: 50px;
`;

const Requests = () => {
    return (
        <MainContent>
            <MainContentContainer>
                <PendingBox>
                    <PendingBoxContainer>
                        <Top>
                            <Name>Name</Name>
                        </Top>
                        <Bottom>
                            <Details>Facility Requested</Details>
                            <Details>Date</Details>
                            <Details>Time-in</Details>
                            <Details>Timeout</Details>
                        </Bottom>
                    </PendingBoxContainer>

                    <ButtonsContainer>
                        <ReqButton>Approve</ReqButton>
                        <ReqButton>Decline</ReqButton>
                    </ButtonsContainer>
                </PendingBox>

                <PendingBox>
                    <PendingBoxContainer>
                        <Top>
                            <Name>Name</Name>
                        </Top>
                        <Bottom>
                            <Details>Facility Requested</Details>
                            <Details>Date</Details>
                            <Details>Time-in</Details>
                            <Details>Timeout</Details>
                        </Bottom>
                    </PendingBoxContainer>

                    <ButtonsContainer>
                        <ReqButton>Approve</ReqButton>
                        <ReqButton>Decline</ReqButton>
                    </ButtonsContainer>
                </PendingBox>

                <PendingBox>
                    <PendingBoxContainer>
                        <Top>
                            <Name>Name</Name>
                        </Top>
                        <Bottom>
                            <Details>Facility Requested</Details>
                            <Details>Date</Details>
                            <Details>Time-in</Details>
                            <Details>Timeout</Details>
                        </Bottom>
                    </PendingBoxContainer>

                    <ButtonsContainer>
                        <ReqButton>Approve</ReqButton>
                        <ReqButton>Decline</ReqButton>
                    </ButtonsContainer>
                </PendingBox>

                <PendingBox>
                    <PendingBoxContainer>
                        <Top>
                            <Name>Name</Name>
                        </Top>
                        <Bottom>
                            <Details>Facility Requested</Details>
                            <Details>Date</Details>
                            <Details>Time-in</Details>
                            <Details>Timeout</Details>
                        </Bottom>
                    </PendingBoxContainer>

                    <ButtonsContainer>
                        <ReqButton>Approve</ReqButton>
                        <ReqButton>Decline</ReqButton>
                    </ButtonsContainer>
                </PendingBox>
            </MainContentContainer>
        </MainContent>
    );
};

export default Requests;
