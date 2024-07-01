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
            .get("http://192.168.254.113:4002/api/requests")
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
            .post(`http://192.168.254.113:4002/api/requests/${id}/approve`)
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
            return null; // Return null to render nothing if carsQty is not available
        }

        let parsedCarsQty;
        try {
            parsedCarsQty = JSON.parse(carsQty);
        } catch (error) {
            console.error("Error parsing carsQty:", error);
            return <p>Invalid data format</p>; // Handle JSON parse errors gracefully
        }

        const carEntries = Object.entries(parsedCarsQty).filter(([type, models]) => models);

        if (carEntries.length === 0) {
            return null; // Return null to render nothing if no valid car entries are found
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
        // if (req.ticketType === 0) {
        //     // Make sure this matches how you determine if a ticket is for facilities.
        //     return null; // Do not display any details if it's a facilities ticket.
        // }

        const parseAndFilter = (json) => {
            let parsedJson;
            try {
                parsedJson = JSON.parse(json);
            } catch (error) {
                console.error("JSON Parse error:", error);
                return []; // Return an empty array on JSON parse error
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

        // if (req.carsQty && req.ticketType !== 0) {
        //     // Check if carsQty exists and ticket is not for facilities
        //     allDetails.push([<RenderCarsQty carsQty={req.carsQty} />]);
        // }

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
        <section
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "auto",
                fontSize: "14px",
            }}
        >
            <h2 style={{ textAlign: "center", padding: "20px" }}>Requested Facilities</h2>
            <div style={{ maxHeight: "80vh", height: "100%", overflowY: "scroll" }}>
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
                            <th>Time of Use</th>
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
                                {console.log(req.ticket)}
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
                                    <p className="fw-bold mb-1">{req.timeOfUseStart} - {req.timeOfUseEnd}</p>
                                </td>
                                <td>
                                    {
                                        req.ticket === 0 ? renderRequestDetails(req) : RenderCarsQty(req)
                                        // renderRequestDetails(req)
                                    }
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
                                                    backgroundColor: "darkgreen",
                                                }}
                                                onClick={() => handleApprove(req.id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                style={{
                                                    maxWidth: "130px",
                                                    width: "200px",
                                                    border: 0,
                                                    padding: "10px",
                                                    borderRadius: "18px",
                                                    color: "white",
                                                    backgroundColor: "darkRed",
                                                }}
                                                onClick={() => handleDisapprove(req.id)}
                                            >
                                                Disapprove
                                            </button>
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
