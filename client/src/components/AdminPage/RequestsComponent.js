import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { MDBBadge, MDBBtn } from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";

const FullScreenContainer = styled.section`
    width: auto;
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

    th,
    td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
        font-size: large;
    }

    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }

    @media screen and (max-width: 768px) {
        display: block;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;

        th,
        td {
            font-size: 12px;
        }
    }
`;

const Content = styled.div`
    margin-left: 15vw;
    padding: 20px;
    box-sizing: border-box;
    height: 100%;

    @media screen and (max-width: 768px) {
        margin-left: 0;
        padding: 20px;
    }
`;

const RequestsComponent = () => {
    const [requests, setRequests] = useState([]);
    const [disapproveIndex, setDisapproveIndex] = useState(null);

    useEffect(() => {
        axios
            .get("http://10.10.4.44:4000/api/requests")
            .then((response) => {
                setRequests(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the requests!", error);
            });
    }, []);

    const handleApprove = (id) => {
        axios
            .post(`http://10.10.4.44:4000/api/requests/${id}/approve`)
            .then((response) => {
                const updatedRequests = requests.map((req) =>
                    req.id === id ? { ...req, status: "Approved", remarks: "" } : req
                );
                setRequests(updatedRequests);
            })
            .catch((error) => {
                console.error("There was an error approving the request!", error);
            });
    };

    const handleDisapprove = (id) => {
        setDisapproveIndex(id);
    };

    const handleDisapproveSubmit = (id) => {
        const request = requests.find((req) => req.id === id);
        const remarks = request.remarks;
        axios
            .post(`http://10.10.4.44:4000/api/requests/${id}/disapprove`, {
                remarks,
            })
            .then((response) => {
                const updatedRequests = requests.map((req) =>
                    req.id === id ? { ...req, status: "Disapproved" } : req
                );
                setRequests(updatedRequests);
                setDisapproveIndex(null);
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
            return <p>Invalid data format</p>;
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

    const renderRequestDetails = (req) => {
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <FullScreenContainer>
            <FullScreenWrapper>
                <h2 style={{ textAlign: "center", padding: "20px" }}>Requested Facilities</h2>
                <HorizontalLine />

                <StyledTable>
                    <thead>
                        <tr>
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
                        </tr>
                    </thead>
                    <tbody>
                        {pendingRequests.map((req) => (
                            <tr key={req.id}>
                                <td>
                                    <p className="fw-bold mb-1">{renderTicketType(req.ticket)}</p>
                                </td>
                                <td>
                                    <p className="fw-bold mb-1">{formatDate(req.dateOfFiling)}</p>
                                </td>
                                <td>
                                    <p className="fw-bold mb-1">{formatDate(req.dateOfUse)}</p>
                                </td>
                                <td>
                                    <p className="fw-bold mb-1">
                                        {req.timeOfUseStart} - {req.timeOfUseEnd}
                                    </p>
                                </td>
                                <td>
                                    {req.ticket === 0 ? (
                                        renderRequestDetails(req)
                                    ) : (
                                        <RenderCarsQty carsQty={req.carsQty} />
                                    )}
                                </td>
                                <td>
                                    <p className="fw-normal mb-1">{req.purpose}</p>
                                </td>
                                <td>{renderStatusBadge(req.status)}</td>
                                <td>
                                    <p className="fw-bold mb-1">{req.requestorName}</p>
                                </td>
                                <td>
                                    <p className="fw-normal mb-1">{req.dept}</p>
                                </td>
                                <td>
                                    {req.status === "Disapproved" || disapproveIndex === req.id ? (
                                        <input
                                            type="text"
                                            value={req.remarks}
                                            onChange={(e) => handleRemarksChange(req.id, e.target.value)}
                                            placeholder="Enter remarks"
                                        />
                                    ) : (
                                        <p className="text-muted mb-0">{req.remarks}</p>
                                    )}
                                </td>
                                <td>
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </FullScreenWrapper>
        </FullScreenContainer>
    );
};

export default RequestsComponent;
