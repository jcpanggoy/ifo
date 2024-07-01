import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import FilterCase from "./FilterCase";
import "./requestsStyle.css";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
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
    font-size: ${(props) => props.fontSize || "14px"}; /* Default font size is 16px */
`;

const LogsComponent = () => {
    const [logs, setLogs] = useState([]);
    const [filter, setFilter] = useState({});

    useEffect(() => {
        fetchLogs(filter);
    }, [filter]);

    const fetchLogs = (filter) => {
        let query = new URLSearchParams();
        if (filter.department) {
            query.append("department", filter.department);
        }
        if (filter.statuses && filter.statuses.length > 0) {
            query.append("statuses", filter.statuses.join(","));
        }
        axios
            .get(`http://192.168.254.113:4002/api/logs?${query.toString()}`)
            .then((response) => {
                setLogs(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the logs!", error);
            });
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const renderJsonAsTable = (json) => {
        let parsedJson;
        try {
            parsedJson = JSON.parse(json);
        } catch (error) {
            console.error("JSON Parse error:", error);
            return <div>Error parsing JSON</div>;
        }

        const filteredEntries = Object.entries(parsedJson).filter(
            ([key, value]) => value !== false && value !== 0 && value !== ""
        );

        if (filteredEntries.length === 0) {
            return <div>N/A</div>;
        }

        return (
            <table>
                <tbody>
                    {filteredEntries.map(([key, value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const renderValue = (value) => {
        if (!value || (typeof value === "object" && Object.keys(value).length === 0)) {
            return "N/A";
        }
        if (typeof value === "string") {
            try {
                const parsedJson = JSON.parse(value);
                return renderJsonAsTable(value);
            } catch (error) {
                return value;
            }
        }
        return value;
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

    return (
        <>
            <FilterCase onFilterChange={handleFilterChange} />

            <section
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        marginTop: "50px",
                        width: "auto",
                    }}
                >
                    <h2 style={{ textAlign: "center" }}>Facility Usage Logs</h2>
                    <div style={{ maxHeight: "80vh", height: "100%", overflowY: "scroll" }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <TableHeader>Ticket</TableHeader>
                                    <TableHeader>Department</TableHeader>
                                    <TableHeader>Requester Name</TableHeader>
                                    <TableHeader>Department Head</TableHeader>
                                    <TableHeader>Purpose</TableHeader>
                                    <TableHeader>Date of Filing</TableHeader>
                                    <TableHeader>Date of Use</TableHeader>
                                    <TableHeader>Time of Use</TableHeader>
                                    <TableHeader>Status</TableHeader>
                                    <TableHeader>Request Details</TableHeader>
                                    <TableHeader>Remarks </TableHeader>
                                    <TableHeader>Actions</TableHeader>
                                </tr>
                            </thead>
                            <tbody className="tableContent">
                                {logs.map((log) => (
                                    <tr key={log.id}>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {renderTicketType(log.ticket)}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{log.dept}</TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {renderValue(log.requestorName)}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{renderValue(log.DeptHead)}</TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{renderValue(log.purpose)}</TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {formatDate(log.dateOfFiling)}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{formatDate(log.dateOfUse)}</TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{renderValue(log.timeOfUseStart)} - {renderValue(log.timeOfUseEnd)}</TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {renderStatusBadge(renderValue(log.status))}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{renderRequestDetails(log)}</TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{renderValue(log.remarks)}</TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{/* Actions column empty */}</TableCell>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LogsComponent;
