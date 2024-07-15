import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { MDBBadge, MDBBtn } from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";

const FullScreenContainer = styled.section`
    width: 80%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin-left: 15vw;

    @media screen and (max-width: 768px) {
        margin-left: 0;
        padding: 20px;
    }
`;

const FullScreenWrapper = styled.div``;

const HorizontalLine = styled.div`
    border-bottom: 1px solid lightgray;
    width: 100%;
    margin-bottom: 20px;
`;

const DisapproveButton = styled.button`
    background-color: #ab0f11;
    color: white;
    border: 0;
    padding: 10px;
    border-radius: 18px;
    max-width: 130px;
    width: 100%;

    &:hover {
        background-color: darkred;
    }
`;

const ApproveButton = styled.button`
    background-color: #144691;
    color: white;
    border: 0;
    padding: 10px;
    border-radius: 18px;
    max-width: 100px;
    width: 100%;

    &:hover {
        background-color: darkgreen;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
`;

const TableHeader = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    font-size: large;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 16px;
    text-align: left;

    th {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
        font-size: large;
        background-color: #f2f2f2;
        font-weight: bold;
    }

    @media screen and (max-width: 768px) {
        display: block;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;

        th,
        TableData {
            font-size: 12px;
        }
    }
`;

const TableRow = styled.tr``;

const TableData = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    font-size: large;
`;

const StyledP = styled.p`
    font-weight: bold;
    margin-bottom: 0.25rem; /* 1 rem = 16px, 0.25 rem = 4px */
`;

const Header = styled.h2`
    text-align: center;
    padding: 20px;
`;

const RequestsComponent = ({ user }) => {
    const [requests, setRequests] = useState([]);
    const [disapproveIndex, seTableDataisapproveIndex] = useState(null);
    console.log(user.username);

    useEffect(() => {
        axios
            .post("http://172.20.10.11:4000/api/requestsFilter", { dept: user.username })
            .then((response) => {
                setRequests(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the requests!", error);
            });
    }, [requests]);

    const handleApprove = (id) => {
        axios
            .post(`http://172.20.10.11:4000/api/requests/${id}/approve`, { status: "Pending" })
            .then((response) => {
                const updatedRequests = requests.map((req) =>
                    req.id === id ? { ...req, status: "Pending", remarks: "None" } : req
                );
                setRequests(updatedRequests);
            })
            .catch((error) => {
                console.error("There was an error approving the request!", error);
            });
    };

    const handleDisapprove = (id) => {
        seTableDataisapproveIndex(id);
    };

    const handleDisapproveSubmit = (id) => {
        const request = requests.find((req) => req.id === id);
        const remarks = request.remarks;
        axios
            .delete(`http://172.20.10.11:4000/api/requests/${id}/disapproveOten`, {
                remarks,
            })
            .then((response) => {
                const updatedRequests = requests.map((req) =>
                    req.id === id ? { ...req, status: "Disapproved" } : req
                );
                setRequests(updatedRequests);
                seTableDataisapproveIndex(null);
            })
            .catch((error) => {
                console.error("There was an error disapproving the request!", error);
            });
    };

    const handleRemarksChange = (id, value) => {
        const updatedRequests = requests.map((req) => (req.id === id ? { ...req, remarks: value } : req));
        setRequests(updatedRequests);
    };

    const pendingRequests = requests.filter((req) => req.status === "Pending");

    const RenderCarsQty = ({ carsQty }) => {
        if (!carsQty) {
            return null;
        }

        let parsedCarsQty;
        try {
            parsedCarsQty = JSON.parse(carsQty);
        } catch (error) {
            console.error("Error parsing carsQty:", error);
            return <StyledP>Invalid data format</StyledP>;
        }

        const carEntries = Object.entries(parsedCarsQty).filter(([type, models]) => models);

        if (carEntries.length === 0) {
            return null;
        }

        return (
            <div>
                {carEntries.map(([type, models]) => (
                    <div key={type}>
                        {type}:{" "}
                        {Object.entries(models)
                            .map(([model, details]) =>
                                details.checked && details.qty > 0 ? `${model}: ${details.qty}` : null
                            )
                            .filter((item) => item)
                            .join(", ")}
                    </div>
                ))}
            </div>
        );
    };

    const renderRequesTableDataetails = (req) => {
        const parseAndFilter = (json) => {
            let parsedJson;
            try {
                parsedJson = JSON.parse(json);
            } catch (error) {
                console.error("JSON Parse error:", error);
                return [];
            }
            return Object.entries(parsedJson).filter(([key, value]) => value);
        };

        const allDetails = [
            ...parseAndFilter(req.schoolBuilding),
            ...parseAndFilter(req.others),
            ...parseAndFilter(req.adminBuilding),
            ...parseAndFilter(req.furnitures),
            ...parseAndFilter(req.quantities),
            ...parseAndFilter(req.device),
            ...parseAndFilter(req.cquantities),
            ...parseAndFilter(req.telev),
            ...parseAndFilter(req.tquantities),
            ...parseAndFilter(req.micQty),
            ...parseAndFilter(req.speakerQty),
            ...parseAndFilter(req.accessoriesQty),
            ...parseAndFilter(req.sportsEquipment),
            ...parseAndFilter(req.otherEquipment),
        ];

        if (allDetails.length === 0) {
            return "N/A";
        }

        return (
            <div>
                {allDetails.map(([key, value]) => (
                    <div key={key}>
                        {key}: {typeof value === "boolean" ? "" : value}
                    </div>
                ))}
            </div>
        );
    };

    const renderStatusBadge = (status) => {
        const statusColor = {
            Pending: "warning",
            Approved: "success",
            Disapproved: "danger",
        };

        return (
            <MDBBadge
                color={statusColor[status]}
                pill
            >
                {status}
            </MDBBadge>
        );
    };

    const renderTicketType = (ticket) => {
        return ticket === 0 ? "Facilities" : "Car";
    };

    const formaTableDataate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <FullScreenContainer>
            <FullScreenWrapper>
                <Header>Requested Facilities</Header>
                <HorizontalLine />

                <StyledTable>
                    <thead>
                        <TableRow>
                            <TableHeader>Ticket</TableHeader>
                            <TableHeader>Date of Filing</TableHeader>
                            <TableHeader>Date of Use</TableHeader>
                            <TableHeader>Time of Use</TableHeader>
                            <TableHeader>Request</TableHeader>
                            <TableHeader>Purpose</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Department</TableHeader>
                            <TableHeader>Remarks</TableHeader>
                            <TableHeader>Actions</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        {pendingRequests.map((req) => (
                            <TableRow key={req.id}>
                                <TableData>
                                    <StyledP>{renderTicketType(req.ticket)}</StyledP>
                                </TableData>
                                <TableData>
                                    <StyledP>{formaTableDataate(req.dateOfFiling)}</StyledP>
                                </TableData>
                                <TableData>
                                    <StyledP>{formaTableDataate(req.dateOfUse)}</StyledP>
                                </TableData>
                                <TableData>
                                    <StyledP>
                                        {req.timeOfUseStart} - {req.timeOfUseEnd}
                                    </StyledP>
                                </TableData>
                                <TableData>
                                    {req.ticket === 0 ? (
                                        renderRequesTableDataetails(req)
                                    ) : (
                                        <RenderCarsQty carsQty={req.carsQty} />
                                    )}
                                </TableData>
                                <TableData>
                                    <StyledP>{req.purpose}</StyledP>
                                </TableData>
                                <TableData>{renderStatusBadge(req.status)}</TableData>
                                <TableData>
                                    <StyledP>{req.requestorName}</StyledP>
                                </TableData>
                                <TableData>
                                    <StyledP>{req.dept}</StyledP>
                                </TableData>
                                <TableData>
                                    {req.status === "Disapproved" || disapproveIndex === req.id ? (
                                        <input
                                            type="text"
                                            value={req.remarks}
                                            onChange={(e) => handleRemarksChange(req.id, e.target.value)}
                                            placeholder="Enter remarks"
                                        />
                                    ) : (
                                        <StyledP>{req.remarks}</StyledP>
                                    )}
                                </TableData>
                                <TableData>
                                    {req.status === "Pending" && (
                                        <ButtonContainer>
                                            <ApproveButton onClick={() => handleApprove(req.id)}>Approve</ApproveButton>
                                            <DisapproveButton onClick={() => handleDisapprove(req.id)}>
                                                Disapprove
                                            </DisapproveButton>
                                            {disapproveIndex === req.id && (
                                                <MDBBtn
                                                    className="me-1"
                                                    color="success"
                                                    size="sm"
                                                    onClick={() => handleDisapproveSubmit(req.id)}
                                                >
                                                    Submit
                                                </MDBBtn>
                                            )}
                                        </ButtonContainer>
                                    )}
                                </TableData>
                            </TableRow>
                        ))}
                    </tbody>
                </StyledTable>
            </FullScreenWrapper>
        </FullScreenContainer>
    );
};

export default RequestsComponent;
