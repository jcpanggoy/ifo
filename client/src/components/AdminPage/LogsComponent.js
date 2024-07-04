import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import FilterCase from "./FilterCase";
import { MDBBadge } from "mdb-react-ui-kit";

const TableHeader = styled.th`
    border: 1px solid;
    font-size: 24px;
    padding: 4px;
    text-align: center;
    background-color: #f2f2f2;
`;

const TableCell = styled.td`
    border: 1px solid;
    padding: 4px;
    text-align: center;
    font-size: ${(props) => props.fontSize || "14px"};
`;

const LogsContainer = styled.section`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    margin-left: 15vw;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const LogsWrapper = styled.div`
    margin-top: 20px;
    width: auto;

    @media (max-width: 768px) {
        width: 90%;
    }
`;

const TableWrapper = styled.div`
    overflow-y: auto;
    max-height: 80vh;
`;

const Table = styled.table`
    width: 95%;
    border-collapse: collapse;
    font-size: 16px;
    text-align: left;
    min-width: 1200px;

    @media (max-width: 768px) {
        min-width: 100%;
        display: block;
        overflow-x: auto;
    }
`;

const HorizontalLine = styled.div`
    border-bottom: 1px solid lightgray;
    width: 95%;
    margin-bottom: 20px;
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
            .get(`http://10.10.4.44:4000/api/logs?${query.toString()}`)
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
            <LogsContainer>
                <LogsWrapper>
                    <h2 style={{ textAlign: "center", padding: "10px" }}>Facility Usage Logs</h2>
                    <HorizontalLine />
                    <FilterCase onFilterChange={handleFilterChange} />
                    <TableWrapper>
                        <Table>
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
                                    {/* <TableHeader>Actions</TableHeader> */}
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log) => (
                                    <tr key={log.id}>
                                        <TableCell>{renderTicketType(log.ticket)}</TableCell>
                                        <TableCell>{log.dept}</TableCell>
                                        <TableCell>{renderValue(log.requestorName)}</TableCell>
                                        <TableCell>{renderValue(log.DeptHead)}</TableCell>
                                        <TableCell>{renderValue(log.purpose)}</TableCell>
                                        <TableCell>{formatDate(log.dateOfFiling)}</TableCell>
                                        <TableCell>{formatDate(log.dateOfUse)}</TableCell>
                                        <TableCell>
                                            {renderValue(log.timeOfUseStart)} - {renderValue(log.timeOfUseEnd)}
                                        </TableCell>
                                        <TableCell>{renderStatusBadge(renderValue(log.status))}</TableCell>
                                        <TableCell>{renderRequestDetails(log)}</TableCell>
                                        <TableCell>{renderValue(log.remarks)}</TableCell>
                                        {/* <TableCell>Actions column empty</TableCell> */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </TableWrapper>
                </LogsWrapper>
            </LogsContainer>
        </>
    );
};

export default LogsComponent;
