import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import "./requestsStyle.css";

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
            .get("http://10.15.15.194:4002/api/requests")
            .then((response) => {
                console.log(response.data);
                setRequests(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the requests!", error);
            });
    }, []);

    const handleApprove = (id) => {
        axios
            .post(`http://10.15.15.194:4002/api/requests/${id}/approve`)
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
            .post(`http://10.15.15.194:4002/api/requests/${id}/disapprove`, {
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
        const parsedCarsQty = JSON.parse(carsQty);
        const filteredCars = Object.keys(parsedCarsQty)
            .filter((key) => parsedCarsQty[key].checked)
            .map((key) => ({
                name: key,
                qty: parsedCarsQty[key].qty,
            }));

        return (
            <div>
                {filteredCars.length > 0 ? (
                    <ul>
                        {filteredCars.map((car, index) => (
                            <li key={index}>
                                {car.name}: {car.qty}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No cars selected</p>
                )}
            </div>
        );
    };

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

        const allDetails = [
            ...parseAndFilter(log.schoolBuilding),
            ...parseAndFilter(log.others),
            ...parseAndFilter(log.adminBuilding),
            ...parseAndFilter(log.furnitures),
            ...parseAndFilter(log.quantities),
            ...parseAndFilter(log.device),
            ...parseAndFilter(log.cquantities),
            ...parseAndFilter(log.telev),
            ...parseAndFilter(log.tquantities),
            ...parseAndFilter(log.micQty),
            ...parseAndFilter(log.speakerQty),
            ...parseAndFilter(log.accessoriesQty),
            ...parseAndFilter(log.sportsEquipment),
            ...parseAndFilter(log.otherEquipment),
        ];

        if (log.carsQty) {
            allDetails.push(["Cars", <RenderCarsQty carsQty={log.carsQty} />]);
        }

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
        <section
            style={{
                display: "flex",
                justifyContent: "center",
                width: "auto",
                fontSize: "14px",
            }}
        >
            <div>
                <h2 style={{ textAlign: "center", padding: "20px" }}>Requested Facilities</h2>
                <div
                    style={{
                        borderBottom: "1px solid lightgray",
                        width: "100%",
                        marginBottom: "20px",
                    }}
                ></div>
                <MDBTable align="middle">
                    <MDBTableHead>
                        <tr>
                            <th>Ticket</th>
                            <th>Date of Filing</th>
                            <th>Date of Use</th>
                            <th>Request</th>
                            <th>Purpose</th>
                            <th>Status</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Remarks</th>
                            <th>Actions</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
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
                                <td>{renderRequestDetails(req)}</td>
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
                                        <div className="button-container">
                                            {/* <MDBBtn
                                                className="me-1"
                                                size="sm"
                                                color="success"
                                                onClick={() =>
                                                    handleApprove(req.id)
                                                }
                                            >
                                                Approve
                                            </MDBBtn> */}
                                            <button
                                                style={{
                                                    maxWidth: "100px",
                                                    width: "140px",
                                                    border: 0,
                                                    padding: "10px",
                                                    borderRadius: "18px",
                                                    color: "white",
                                                    backgroundColor: "gdarkreen",
                                                }}
                                                onClick={() => handleApprove(req.id)}
                                            >
                                                Approve
                                            </button>
                                            <MDBBtn
                                                rippleColor="secondary"
                                                className="me-1"
                                                color="danger"
                                                size="sm"
                                                onClick={() => handleDisapprove(req.id)}
                                            >
                                                Disapprove
                                            </MDBBtn>
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
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </MDBTableBody>
                </MDBTable>
            </div>
        </section>
    );
};

export default RequestsComponent;
