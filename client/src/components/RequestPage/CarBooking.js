import React, { useState, useEffect } from "react";
import "./Requestpage.css";
import logo from "../../img/MMCM_Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";

const CarBooking = ({ user, disableCarWindow }) => {
    const [requestorName, setRequestorName] = useState("");
    const [dept, setDept] = useState("");
    const [purpose, setPurpose] = useState("");
    const [dateOfFiling, setDateOfFiling] = useState("");
    const [dateOfUse, setDateOfUse] = useState("");
    const [timeOfUseStart, setTimeOfUseStart] = useState("");
    const [timeOfUseEnd, setTimeOfUseEnd] = useState("");
    const [carsQty, setCarsQty] = useState({
        //Sedan: Civic, Corolla, BMW
        //Van: Sienna, Odyssey, Transit
        //Bus: Transit Bus, Express, T-Liner

        sedan: {
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
        },
        van: {
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
        },
        bus: {
            transitBus: {
                checked: false,
                qty: 0,
            },
            express: {
                checked: false,
                qty: 0,
            },
            tLiner: {
                checked: false,
                qty: 0,
            },
        },
    });

    const handleCarsQtyChange = (e) => {
        const { name, value, type, checked } = e.target;
        const [carType, carModel] = name.split("_");

        setCarsQty((prev) => ({
            ...prev,
            [carType]: {
                ...prev[carType],
                [carModel]: {
                    ...prev[carType][carModel],
                    ...(type === "checkbox" ? { checked } : { qty: Number(value) }),
                },
            },
        }));
    };

    const handleSubmit = async () => {
        const formData = {
            requestorName,
            dept,
            purpose,
            dateOfFiling,
            dateOfUse,
            timeOfUseStart,
            timeOfUseEnd,
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

            user: user.fullnaname,
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

    useEffect(() => {
        setDept(user.username);
    }, [user.username]);

    return (
        <div className="PageContainer">
            <div className="FormContainer">
                <FontAwesomeIcon
                    icon={faBackspace}
                    style={{ position: "relative", justifySelf: "start", cursor: "pointer" }}
                    size="xl"
                    onClick={disableCarWindow}
                />
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
                            <label className="Label">Time of Use (Start)</label>
                            <input
                                type="time"
                                className="Input"
                                value={timeOfUseStart}
                                onChange={(e) => setTimeOfUseStart(e.target.value)}
                            />
                        </div>
                        <div className="FormGroup">
                            <label className="Label">Time of Use (End)</label>
                            <input
                                type="time"
                                className="Input"
                                value={timeOfUseEnd}
                                onChange={(e) => setTimeOfUseEnd(e.target.value)}
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

                            {/*---------- CIVIC -----------------*/}
                            <div>
                                <input
                                    type="checkbox"
                                    name="sedan_civic"
                                    checked={carsQty.sedan.civic.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>Civic</label>
                                <input
                                    type="number"
                                    name="sedan_civic"
                                    value={carsQty.sedan.civic.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    disabled={!carsQty.sedan.civic.checked}
                                />
                            </div>

                            {/* -------------------------------- */}
                            {/* ----------Corolla----------- */}

                            <div>
                                <input
                                    type="checkbox"
                                    name="sedan_corolla"
                                    checked={carsQty.sedan.corolla.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>Toyota Corolla</label>
                                <input
                                    type="number"
                                    name="sedan_corolla"
                                    value={carsQty.sedan.corolla.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    disabled={!carsQty.sedan.corolla.checked}
                                />
                            </div>

                            {/* -------------------------------- */}
                            <div>
                                <input
                                    type="checkbox"
                                    name="sedan_bmw"
                                    checked={carsQty.sedan.bmw.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>BMW 3 Series</label>
                                <input
                                    type="number"
                                    name="sedan_bmw"
                                    value={carsQty.sedan.bmw.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    disabled={!carsQty.sedan.bmw.checked}
                                />
                            </div>
                        </div>

                        {/* Van */}
                        <div className="sports-equipment">
                            <h3>Van</h3>
                            <div>
                                <input
                                    type="checkbox"
                                    name="van_sienna"
                                    checked={carsQty.van.sienna.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>Toyota Sienna</label>
                                <input
                                    type="number"
                                    name="van_sienna"
                                    value={carsQty.van.sienna.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    disabled={!carsQty.van.sienna.checked}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="van_odyssey"
                                    checked={carsQty.van.odyssey.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>Honda Odyssey</label>
                                <input
                                    type="number"
                                    name="van_odyssey"
                                    value={carsQty.van.odyssey.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    disabled={!carsQty.van.odyssey.checked}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="van_transit"
                                    checked={carsQty.van.transit.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>Ford Transit</label>
                                <input
                                    type="number"
                                    name="van_transit"
                                    value={carsQty.van.transit.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    disabled={!carsQty.van.transit.checked}
                                />
                            </div>
                        </div>

                        {/* Bus */}
                        <div className="sports-equipment">
                            <h3>Bus</h3>
                            <div>
                                <input
                                    type="checkbox"
                                    name="bus_transitBus"
                                    checked={carsQty.bus.transitBus.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>Ford Transit Bus</label>
                                <input
                                    type="number"
                                    name="bus_transitBus"
                                    value={carsQty.bus.transitBus.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    disabled={!carsQty.bus.transitBus.checked}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="bus_express"
                                    checked={carsQty.bus.express.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>Chevrolet Express</label>
                                <input
                                    type="number"
                                    name="bus_express"
                                    value={carsQty.bus.express.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    disabled={!carsQty.bus.express.checked}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="bus_tLiner"
                                    checked={carsQty.bus.tLiner.checked}
                                    onChange={handleCarsQtyChange}
                                />
                                <label>T-Built Saf-T-Liner</label>
                                <input
                                    type="number"
                                    name="bus_tLiner"
                                    value={carsQty.bus.tLiner.qty}
                                    className="quantity-input"
                                    onChange={handleCarsQtyChange}
                                    min="0"
                                    disabled={!carsQty.bus.tLiner.checked}
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
