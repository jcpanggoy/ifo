import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterCase from "./FilterCase";
import "./requestsStyle.css";

const TableHeader = styled.th`
    border: 1px solid;
    font-size: 24px;
    padding: 4px;
    width: 150px;
    margin: 0;
    text-align: center;
`;

const TableCell = styled.td`
    border: 1px solid;
    padding: 4px;
    text-align: center;
`;

const RequestsComponent = () => {
    const [requests, setRequests] = useState([]);
    const [newRequest, setNewRequest] = useState({
        date: "",
        dateOfFile: "",
        request: "",
        dateRequested: "",
        status: "Pending",
        name: "",
        departmentHead: "",
        department: "",
        remarks: "",
    });
    const [disapproveIndex, setDisapproveIndex] = useState(null);

    useEffect(() => {
        axios
            .get("http://192.168.254.113:4002/api/requests")
            .then((response) => {
                console.log(response.data);
                setRequests(response.data);
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the requests!",
                    error
                );
            });
    }, []);

    const handleApprove = (id) => {
        axios
            .post(`http://192.168.254.113:4002/api/requests/${id}/approve`)
            .then((response) => {
                const updatedRequests = requests.map((req) =>
                    req.id === id
                        ? { ...req, status: "Approved", remarks: "" }
                        : req
                );
                setRequests(updatedRequests);
            })
            .catch((error) => {
                console.error(
                    "There was an error approving the request!",
                    error
                );
            });
    };

    const handleDisapprove = (id) => {
        setDisapproveIndex(id);
    };

    const handleDisapproveSubmit = (id) => {
        const request = requests.find((req) => req.id === id);
        const remarks = request.remarks;
        axios
            .post(`http://192.168.254.113:4002/api/requests/${id}/disapprove`, {
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
                console.error(
                    "There was an error disapproving the request!",
                    error
                );
            });
    };

    const handleRemarksChange = (id, value) => {
        const updatedRequests = requests.map((req) =>
            req.id === id ? { ...req, remarks: value } : req
        );
        setRequests(updatedRequests);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRequest({ ...newRequest, [name]: value });
    };

    const handleCreateRequest = () => {
        axios
            .post("http://localhost:4002/api/requests", newRequest)
            .then((response) => {
                setRequests([...requests, response.data]);
                setNewRequest({
                    date: "",
                    dateOfFile: "",
                    request: "",
                    dateRequested: "",
                    status: "Pending",
                    name: "",
                    departmentHead: "",
                    department: "",
                    remarks: "",
                });
            })
            .catch((error) => {
                console.error(
                    "There was an error creating the request!",
                    error
                );
            });
    };

    const pendingRequests = requests.filter((req) => req.status === "Pending");

    const renderRequestDetails = (log) => {
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

        const schoolBuildingDetails = parseAndFilter(log.schoolBuilding);
        const othersDetails = parseAndFilter(log.others);
        const adminBuildingDetails = parseAndFilter(log.adminBuilding);
        const furnituresDetails = parseAndFilter(log.furnitures);
        const quantitiesDetails = parseAndFilter(log.quantities);
        const deviceDetails = parseAndFilter(log.device);
        const cquantitiesDetails = parseAndFilter(log.cquantities);
        const televDetails = parseAndFilter(log.telev);
        const tquantitiesDetails = parseAndFilter(log.tquantities);
        const micQtyDetails = parseAndFilter(log.micQty);
        const speakerQtyDetails = parseAndFilter(log.speakerQty);
        const accessoriesQtyDetails = parseAndFilter(log.accessoriesQty);
        const sportsEquipmentDetails = parseAndFilter(log.sportsEquipment);
        const otherEquipmentDetails = parseAndFilter(log.otherEquipment);

        const allDetails = [
            ...schoolBuildingDetails,
            ...othersDetails,
            ...adminBuildingDetails,
            ...furnituresDetails,
            ...quantitiesDetails,
            ...deviceDetails,
            ...cquantitiesDetails,
            ...televDetails,
            ...tquantitiesDetails,
            ...micQtyDetails,
            ...speakerQtyDetails,
            ...accessoriesQtyDetails,
            ...sportsEquipmentDetails,
            ...otherEquipmentDetails,
        ];

        if (allDetails.length === 0) {
            return "N/A";
        }

        return (
            <ul>
                {allDetails.map(([key, value]) => (
                    <li key={key}>
                        {key}: {typeof value === "boolean" ? "Yes" : value}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <section
            style={{
                display: "flex",
                justifyContent: "center",
                width: "auto",
                fontSize: "14px",
            }}
        >
            <div>
                <h2 style={{ textAlign: "center", padding: "20px" }}>
                    Requested Facilities
                </h2>
                <div
                    style={{
                        borderBottom: "1px solid lightgray",
                        width: "100%",
                        marginBottom: "20px",
                    }}
                ></div>
                <table className="table">
                    <thead>
                        <tr>
                            <TableHeader>Date of Filing</TableHeader>
                            <TableHeader>Date of Use</TableHeader>
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
                                <TableCell>{req.dateOfFiling}</TableCell>
                                <TableCell>{req.dateOfUse}</TableCell>
                                <TableCell>
                                    {renderRequestDetails(req)}
                                </TableCell>
                                <TableCell>{req.purpose}</TableCell>
                                <TableCell>{req.status}</TableCell>
                                <TableCell>{req.requestorName}</TableCell>
                                <TableCell>{req.dept}</TableCell>
                                <TableCell>
                                    {req.status === "Disapproved" ||
                                    disapproveIndex === req.id ? (
                                        <input
                                            type="text"
                                            value={req.remarks}
                                            onChange={(e) =>
                                                handleRemarksChange(
                                                    req.id,
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter remarks"
                                        />
                                    ) : (
                                        req.remarks
                                    )}
                                </TableCell>
                                <TableCell>
                                    {req.status === "Pending" && (
                                        <div className="button-container">
                                            <button
                                                className="button approve"
                                                onClick={() =>
                                                    handleApprove(req.id)
                                                }
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="button disapprove"
                                                onClick={() =>
                                                    handleDisapprove(req.id)
                                                }
                                            >
                                                Disapprove
                                            </button>
                                            {disapproveIndex === req.id && (
                                                <button
                                                    className="button"
                                                    onClick={() =>
                                                        handleDisapproveSubmit(
                                                            req.id
                                                        )
                                                    }
                                                >
                                                    Submit
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </TableCell>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default RequestsComponent;
