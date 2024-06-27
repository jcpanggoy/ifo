import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = styled.div`
    width: auto;
    height: 100vh;
    padding: 20px;
    display: flex;
    align-items: center;
`;

const FilterContainer = styled.div`
    height: auto;
    background-color: #f8f8f8;
    margin-bottom: 20px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    padding: 8px;
    font-size: 14px;
`;

const CategoryList = styled.ul`
    list-style: none;
    padding: 0;
`;

const CategoryItem = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const Checkbox = styled.input`
    margin-right: 10px;
`;

const FilterCase = ({ onFilterChange }) => {
    const [departments, setDepartments] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    useEffect(() => {
        axios
            .get("http://192.168.254.113:4002/api/category_counts")
            .then((response) => {
                console.log("Response data:", response.data);
                setDepartments(response.data.departments);
                setStatuses(response.data.statuses);
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the category counts!",
                    error
                );
            });
    }, []);

    const handleDepartmentChange = (department) => {
        setSelectedDepartment(department);
        setSelectedStatuses([]); // Clear selected statuses when department changes
        axios
            .get(
                `http://192.168.254.113:4002/api/category_counts?department=${department}`
            )
            .then((response) => {
                setStatuses(response.data.statuses);
                onFilterChange({ department, statuses: [] });
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the status counts!",
                    error
                );
            });
    };

    const handleStatusChange = (status) => {
        const updatedStatuses = selectedStatuses.includes(status)
            ? selectedStatuses.filter((s) => s !== status)
            : [...selectedStatuses, status];
        setSelectedStatuses(updatedStatuses);
        onFilterChange({
            department: selectedDepartment,
            statuses: updatedStatuses,
        });
    };

    return (
        <Sidebar>
            <FilterContainer>
                <h4 style={{ fontSize: "20px", textAlign: "center" }}>
                    Search Filter
                </h4>
                <Dropdown>
                    <Dropdown.Toggle
                        variant="secondary"
                        style={{ fontSize: "18px", padding: "4px 8px" }}
                        id="dropdown-basic"
                    >
                        {selectedDepartment || "Department"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {departments.map((department, index) => (
                            <Dropdown.Item
                                key={index}
                                onClick={() =>
                                    handleDepartmentChange(
                                        department.department
                                    )
                                }
                            >
                                {department.department} ({department.count})
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <hr />
                <CategoryList>
                    {statuses.map((status, index) => (
                        <CategoryItem key={index}>
                            <Checkbox
                                type="checkbox"
                                checked={selectedStatuses.includes(
                                    status.status
                                )}
                                onChange={() =>
                                    handleStatusChange(status.status)
                                }
                            />
                            <label>
                                {status.status} ({status.count})
                            </label>
                        </CategoryItem>
                    ))}
                </CategoryList>
            </FilterContainer>
        </Sidebar>
    );
};

export default FilterCase;
