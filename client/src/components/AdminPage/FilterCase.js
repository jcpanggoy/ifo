import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FilterContainer = styled.div`
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 20px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    background-color: #f8f8f8;
`;

const CategoryList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 0;
`;

const CategoryItem = styled.li`
    display: flex;
    align-items: center;
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
            .get("http://10.10.4.44:4000/api/category_counts")
            .then((response) => {
                setDepartments(response.data.departments);
                setStatuses(response.data.statuses);
            })
            .catch((error) => {
                console.error("There was an error fetching the category counts!", error);
            });
    }, []);

    const handleDepartmentChange = (department) => {
        setSelectedDepartment(department);
        setSelectedStatuses([]); // Clear selected statuses when department changes
        axios
            .get(`http://10.10.4.44:4000/api/category_counts?department=${department}`)
            .then((response) => {
                setStatuses(response.data.statuses);
                onFilterChange({ department, statuses: [] });
            })
            .catch((error) => {
                console.error("There was an error fetching the status counts!", error);
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
        <FilterContainer>
            <Dropdown>
                <Dropdown.Toggle
                    // variant="primary"
                    id="dropdown-basic"
                    style={{ backgroundColor: "#103B7B" }}
                >
                    {selectedDepartment || "Department"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {departments.map((department, index) => (
                        <Dropdown.Item
                            key={index}
                            onClick={() => handleDepartmentChange(department.department)}
                        >
                            {department.department} ({department.count})
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <CategoryList>
                {statuses.map((status, index) => (
                    <CategoryItem key={index}>
                        <Checkbox
                            type="checkbox"
                            checked={selectedStatuses.includes(status.status)}
                            onChange={() => handleStatusChange(status.status)}
                        />
                        <label>
                            {status.status} ({status.count})
                        </label>
                    </CategoryItem>
                ))}
            </CategoryList>
        </FilterContainer>
    );
};

export default FilterCase;
