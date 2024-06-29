import React, { useState, useEffect } from "react";
import "./Requestpage.css";
import logo from "../../img/MMCM_Logo.svg";

const CarBooking = ({ user }) => {
    const [requestorName, setRequestorName] = useState("");
    const [dept, setDept] = useState("");
    const [purpose, setPurpose] = useState("");
    const [dateOfFiling, setDateOfFiling] = useState("");
    const [dateOfUse, setDateOfUse] = useState("");
    const [timeOfUse, setTimeOfUse] = useState("");
    const [carsQty, setCarsQty] = useState({
        //Sedan: Civic, Corolla, BMW
        //Van: Sienna, Odyssey, Transit
        //Bus: Transit Bus, Express, T-Liner
        sedan: {
            checked: false,
            qty: 0,
        },
        civic: {
            checked: false,
            qty: 0,
        },
        corolla: {
            checked: false,
            qty: 0,
        },
        bmw: {
            checked: false,
            qty: 0,
        },
        van: {
            checked: false,
            qty: 0,
        },
        sienna: {
            checked: false,
            qty: 0,
        },
        odyssey: {
            checked: false,
            qty: 0,
        },
        transit: {
            checked: false,
            qty: 0,
        },
        transitBus: {
            checked: false,
            qty: 0,
        },
        express: {
            checked: false,
            qty: 0,
        },
        t_Liner: {
            checked: false,
            qty: 0,
        },
    });

    const handleCarsQtyChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCarsQty((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? { ...prev[name], checked } : { ...prev[name], qty: Number(value) },
        }));
    };

    useEffect(() => {
        setDept(user.username);
    }, [user.username]);

    const handleSubmit = async () => {
        const formData = {
            requestorName,
            dept,
            purpose,
            dateOfFiling,
            dateOfUse,
            timeOfUse,
            schoolBuilding: "",
            others: "",
            adminBuilding: "",
            furnitures: "",
            quantities: "",
            device: "",
            cquantities: "",
            telev: "",
            tquantities: "",
            micQty: "",
            speakerQty: "",
            accessoriesQty: "",
            sportsEquipment: "",
            otherEquipment: "",

            user: user.username,
            ticket: 1,
            carsQty,
        };

        try {
            const response = await fetch("http://192.168.254.113:4002/saveCRequest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Request saved successfully!");
            } else {
                alert("Failed to save request.");
            }
        } catch (error) {
            console.error("Error saving request:", error);
            alert("An error occurred while saving the request.");
        }
    };

    return (
        <div className="PageContainer">
            <div className="FormContainer">
                <div className="grid-container">
                    {/* Logo */}
                    <div className="logo-container">
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ width: "100px", height: "auto" }}
                        />
                    </div>
                    {/* Revision No. and Date */}
                    <div className="revision-container">
                        <p style={{ margin: "0" }}>
                            REVISION NO: <strong>002</strong>
                        </p>
                        <p style={{ margin: "0" }}>
                            REVISION DATE: <strong>30-Aug-23</strong>
                        </p>
                    </div>
                </div>

                <div className="grid-container">
                    <div className="requestForm">
                        <h1
                            style={{
                                gridColumn: "1 /span 2",
                                textAlign: "center",
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            PERMIT TO USE VEHICLES
                        </h1>

                        {/* Instructions */}
                        <div>
                            <p className="instructions">
                                1. This form must be accomplished in 3 copies prior to the use of any MMCM vehicles.{" "}
                                <br />
                                2. The use of such vehicles is subject to the discretion of MMCM. <br />
                                3. The requester shall be held accountable in case of breakage and/or loss of items
                                during the time of use. <br />
                                The requester agrees to replace the item(s) with the same brand or its equivalent.{" "}
                                <br />
                                4. The requester must return the borrowed vehicle(s) at the end of the requested time of
                                use.
                            </p>
                            <div className="divider"></div>
                        </div>
                    </div>

                    <div style={{ marginLeft: "25px" }}>
                        <div className="FormGroup">
                            <label className="Label">Requester</label>
                            <input
                                className="Input"
                                value={requestorName}
                                onChange={(e) => setRequestorName(e.target.value)}
                                placeholder="Lastname, Firstname, Middle Initial"
                            />
                        </div>
                        <div className="FormGroup">
                            <label className="Label">Office/Dept/College</label>
                            <input
                                className="Input"
                                value={dept}
                                onChange={(e) => setDept(e.target.value)}
                                disabled
                            />
                        </div>
                        <div className="FormGroup">
                            <label className="Label">Purpose</label>
                            <input
                                className="Input"
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                placeholder="e.g. Outreach Program"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="FormGroup">
                            <label className="Label">Date of Filing</label>
                            <input
                                type="date"
                                className="Input"
                                value={dateOfFiling}
                                onChange={(e) => setDateOfFiling(e.target.value)}
                            />
                        </div>
                        <div className="FormGroup">
                            <label className="Label">Date of Use</label>
                            <input
                                type="date"
                                className="Input"
                                value={dateOfUse}
                                onChange={(e) => setDateOfUse(e.target.value)}
                            />
                        </div>
                        <div className="FormGroup">
                            <label className="Label">Time of Use</label>
                            <input
                                type="time"
                                className="Input"
                                value={timeOfUse}
                                onChange={(e) => setTimeOfUse(e.target.value)}
                            />
                        </div>
                    </div>

                    {/******************* Vehicles Checklist *******************/}
                    <h2 className="equipment-checklist-header">Vehicles Checklist</h2>

                    {/* Equipment Checklists DIV */}
                    <div className="equipment-checklists">
                        {/* Sedan */}
                        <div className="accessories">
                            <h3>Sedan</h3>
                            <div>
                                <input
                                    type="checkbox"
                                    name="sedan"
                                    checked={carsQty.sedan.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>Honda Civic</label>
                                <input
                                    type="number"
                                    name="civic"
                                    value={carsQty.civic.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!carsQty.sedan.checked}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="civic"
                                    checked={carsQty.civic.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>Toyota Corolla</label>
                                <input
                                    type="number"
                                    name="corolla"
                                    value={carsQty.corolla.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!carsQty.civic.checked}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="corolla"
                                    checked={carsQty.corolla.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>BMW 3 Series</label>
                                <input
                                    type="number"
                                    name="bmw"
                                    value={carsQty.bmw.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    disabled={!carsQty.corolla.checked}
                                />
                            </div>
                        </div>

                        {/* Van */}
                        <div className="sports-equipment">
                            <h3>Van</h3>
                            <div>
                                <input
                                    type="checkbox"
                                    name="van"
                                    checked={carsQty.van.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>Toyota Sienna</label>
                                <input
                                    type="number"
                                    name="sienna"
                                    value={carsQty.sienna.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    disabled={!carsQty.van.checked}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="sienna"
                                    checked={carsQty.sienna.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>Honda Odyssey</label>
                                <input
                                    type="number"
                                    name="odyssey"
                                    value={carsQty.odyssey.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    disabled={!carsQty.sienna.checked}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="odyssey"
                                    checked={carsQty.odyssey.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>Ford Transit</label>
                                <input
                                    type="number"
                                    name="transit"
                                    value={carsQty.transit.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    disabled={!carsQty.odyssey.checked}
                                />
                            </div>
                        </div>

                        {/* Bus */}
                        <div className="sports-equipment">
                            <h3>Bus</h3>
                            <div>
                                <input
                                    type="checkbox"
                                    name="transitBus"
                                    checked={carsQty.transitBus.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>Ford Transit Bus</label>
                                <input
                                    type="number"
                                    name="transitBus"
                                    value={carsQty.transitBus.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!carsQty.transitBus.checked}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="express"
                                    checked={carsQty.express.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>Chevrolet Express</label>
                                <input
                                    type="number"
                                    name="express"
                                    value={carsQty.express.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!carsQty.express.checked}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="t_Liner"
                                    checked={carsQty.t_Liner.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>T-Built Saf-T-Liner</label>
                                <input
                                    type="number"
                                    name="t_Liner"
                                    value={carsQty.t_Liner.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!carsQty.t_Liner.checked}
                                />
                            </div>
                        </div>
                    </div>

                    {/******************* Remarks/Special Instructions *******************/}
                    <h2 className="remarks-header">Remarks/Special Instructions</h2>
                    <div className="remarks">
                        <textarea
                            style={{
                                width: "95%",
                                padding: "8px",
                                fontSize: "16px",
                            }}
                            rows="4"
                        ></textarea>
                    </div>

                    {/******************* Approval Section *******************/}
                    <div className="approval-section">
                        <div>
                            <label>Prepared by:</label>
                            <p>Requester</p>
                        </div>
                        <div>
                            <label style={{ display: "flex" }}>
                                Recommended by: <b>{user.fullname}</b>
                            </label>

                            <p>Adviser/Principal/Pgm Chair/Dean/Dept. Head</p>
                        </div>
                        <div>
                            <label>Verified by:</label>
                            <p>Laboratory Assistant</p>
                        </div>
                        <div>
                            <label>Approved by:</label>
                            <p>IFO-TLF Officer</p>
                        </div>
                    </div>

                    {/* Divider and Finish Button */}
                    <div className="divider-finish-button">
                        <div className="divider"></div>
                        <button
                            className="finish-button"
                            onClick={handleSubmit}
                        >
                            Finish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarBooking;
