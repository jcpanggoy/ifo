import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
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
    font-size: ${(props) =>
        props.fontSize || "14px"}; /* Default font size is 16px */
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
        if (
            !value ||
            (typeof value === "object" && Object.keys(value).length === 0)
        ) {
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
        <>
            <FilterCase onFilterChange={handleFilterChange} />

            <section
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    overflowX: "auto",
                }}
            >
                <div
                    style={{
                        marginTop: "50px",
                        width: "auto",
                    }}
                >
                    <div>
                        <h2 style={{ textAlign: "center" }}>
                            Facility Usage Logs
                        </h2>
                        <div
                            style={{
                                borderBottom: "1px solid lightgray",
                                width: "100%",
                                marginBottom: "20px",
                            }}
                        ></div>

                        <div
                            style={{
                                borderBottom: "1px solid lightgray",
                                width: "100%",
                                marginBottom: "20px",
                            }}
                        ></div>

                        <table className="table">
                            <thead style={{ margin: "0", padding: "0" }}>
                                <tr style={{ margin: "0", padding: "0" }}>
                                    <TableHeader>ID</TableHeader>
                                    <TableHeader>Requester Name</TableHeader>
                                    <TableHeader>Department</TableHeader>
                                    <TableHeader>Purpose</TableHeader>
                                    <TableHeader>Date of Filing</TableHeader>
                                    <TableHeader>Date of Use</TableHeader>
                                    <TableHeader>Time of Use</TableHeader>
                                    <TableHeader>Status</TableHeader>
                                    <TableHeader>Request Details</TableHeader>
                                    <TableHeader>Created At</TableHeader>
                                    <TableHeader>Actions</TableHeader>
                                </tr>
                            </thead>
                            <tbody className="tableContent">
                                {logs.map((log) => (
                                    <tr key={log.id}>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {log.id}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {renderValue(log.requestorName)}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {renderValue(log.dept)}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {renderValue(log.purpose)}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {formatDate(log.dateOfFiling)}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {formatDate(log.dateOfUse)}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {renderValue(log.timeOfUse)}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {renderValue(log.status)}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {renderRequestDetails(log)}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {formatDate(log.created_at)}
                                        </TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>
                                            {/* Actions column empty */}
                                        </TableCell>
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
