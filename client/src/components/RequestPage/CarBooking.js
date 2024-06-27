import React, { useState } from "react";
import "./Requestpage.css";
import logo from "../../img/MMCM_Logo.svg";

const CarBooking = () => {
    const [requestorName, setRequestorName] = useState("");
    const [dept, setDept] = useState("");
    const [purpose, setPurpose] = useState("");
    const [dateOfFiling, setDateOfFiling] = useState("");
    const [dateOfUse, setDateOfUse] = useState("");
    const [timeOfUse, setTimeOfUse] = useState("");
    const [furnitures, setFurnitures] = useState({
        chairs: false,
        tables: false,
        rabami: false,
        monobloc: false,
        stool: false,
        trapezoid: false,
        training: false,
        round: false,
        foldable: false,
        cocktail: false,
    });

    const [quantities, setQuantities] = useState({
        rabami: 0,
        monobloc: 0,
        stool: 0,
        trapezoid: 0,
        training: 0,
        round: 0,
        foldable: 0,
        cocktail: 0,
    });

    const [device, setDevices] = useState({
        computer: false,
        windows: false,
        mac: false,
        projector: false,
        speaker: false,
    });

    const [schoolBuilding, setSchoolBuilding] = useState({
        lectureRoom: false,
        drawingRoom: false,
        computerLab: false,
        physicsLab: false,
        chemistryLab: false,
        engineeringLab: false,
    });

    const [others, setOthers] = useState({
        playcourt1: false,
        playcourt2: false,
        playcourt3: false,
        playcourt4: false,
        playcourtRoom1: false,
        playcourtRoom2: false,
        volleyballCourt: false,
        futsal: false,
    });

    const [adminBuilding, setAdminBuilding] = useState({
        auditorium1: false,
        auditorium2: false,
        auditorium3: false,
        seminarRoom1: false,
        seminarRoom2: false,
        seminarRoom3: false,
        plaza: false,
        otherAdmin: "",
    });

    const [sportsEquipment, setSportsEquipment] = useState({
        equipment1: "",
        equipment2: "",
        equipment3: "",
    });

    const [otherEquipment, setOtherEquipment] = useState({
        other1: "",
        other2: "",
        other3: "",
    });

    const [cquantities, setCquantities] = useState({
        windows: 0,
        mac: 0,
    });

    const [telev, setTelev] = useState({
        tv: false,
    });

    const [tquantities, setTquantities] = useState({
        tv: 0,
    });

    const [micQty, setMicQty] = useState({
        wired: 0,
        wireless: 0,
    });

    const [speakerQty, setSpeakerQty] = useState({
        small: 0,
        big: 0,
    });

    const [accessoriesQty, SetAccessoriesQty] = useState({
        podium: 0,
        flags: 0,
        extensionWires: 0,
        speakerStand: 0,
        micStand: 0,
        mixer: 0,
        clicker: 0,
    });

    const handleFurnitureChange = (e) => {
        const { name, checked } = e.target;
        if (name === "chairs" && !checked) {
            setFurnitures((prev) => ({
                ...prev,
                chairs: checked,
                rabami: false,
                monobloc: false,
                stool: false,
            }));
            setQuantities((prev) => ({
                ...prev,
                rabami: 0,
                monobloc: 0,
                stool: 0,
            }));
        } else if (name === "tables" && !checked) {
            setFurnitures((prev) => ({
                ...prev,
                tables: checked,
                trapezoid: false,
                training: false,
                round: false,
                foldable: false,
                cocktail: false,
            }));
            setQuantities((prev) => ({
                ...prev,
                trapezoid: 0,
                training: 0,
                round: 0,
                foldable: 0,
                cocktail: 0,
            }));
        } else {
            setFurnitures((prev) => ({
                ...prev,
                [name]: checked,
            }));
            if (!checked) {
                setQuantities((prev) => ({ ...prev, [name]: 0 }));
            }
        }
    };

    const handleQuantityChange = (e) => {
        const { name, value } = e.target;
        setQuantities((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleTvQtyChange = (e) => {
        const { name, value } = e.target;
        setTquantities((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleDeviceChange = (e) => {
        const { name, checked } = e.target;
        if (name === "computer" && !checked) {
            setDevices((prev) => ({
                ...prev,
                computer: checked,
                windows: false,
                mac: false,
            }));
            setCquantities((prev) => ({
                ...prev,
                windows: 0,
                mac: 0,
            }));
        } else {
            setDevices((prev) => ({
                ...prev,
                [name]: checked,
            }));
            if (!checked) {
                setCquantities((prev) => ({ ...prev, [name]: 0 }));
            }
        }
    };

    const handleCQuantityChange = (e) => {
        const { name, value } = e.target;
        setCquantities((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleProjQtyChange = (e) => {
        const { name, value } = e.target;
        setMicQty((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleSpeakerQtyChange = (e) => {
        const { name, value } = e.target;
        setSpeakerQty((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleAccessoriesQtyChange = (e) => {
        const { name, value } = e.target;
        SetAccessoriesQty((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleSubmit = async () => {
        const formData = {
            requestorName,
            dept,
            purpose,
            dateOfFiling,
            dateOfUse,
            timeOfUse,
            schoolBuilding: {
                lectureRoom: schoolBuilding.lectureRoom,
                drawingRoom: schoolBuilding.drawingRoom,
                computerLab: schoolBuilding.computerLab,
                physicsLab: schoolBuilding.physicsLab,
                chemistryLab: schoolBuilding.chemistryLab,
                engineeringLab: schoolBuilding.engineeringLab,
            },
            others: {
                playcourt1: others.playcourt1,
                playcourt2: others.playcourt2,
                playcourt3: others.playcourt3,
                playcourt4: others.playcourt4,
                playcourtRoom1: others.playcourtRoom1,
                playcourtRoom2: others.playcourtRoom2,
                volleyballCourt: others.volleyballCourt,
                futsal: others.futsal,
            },
            adminBuilding: {
                auditorium1: adminBuilding.auditorium1,
                auditorium2: adminBuilding.auditorium2,
                auditorium3: adminBuilding.auditorium3,
                seminarRoom1: adminBuilding.seminarRoom1,
                seminarRoom2: adminBuilding.seminarRoom2,
                seminarRoom3: adminBuilding.seminarRoom3,
                plaza: adminBuilding.plaza,
                otherAdmin: adminBuilding.otherAdmin,
            },
            furnitures: {
                chairs: furnitures.chairs,
                tables: furnitures.tables,
                rabami: furnitures.rabami,
                monobloc: furnitures.monobloc,
                stool: furnitures.stool,
                trapezoid: furnitures.trapezoid,
                training: furnitures.training,
                round: furnitures.round,
                foldable: furnitures.foldable,
                cocktail: furnitures.cocktail,
            },
            quantities: {
                rabami: quantities.rabami,
                monobloc: quantities.monobloc,
                stool: quantities.stool,
                trapezoid: quantities.trapezoid,
                training: quantities.training,
                round: quantities.round,
                foldable: quantities.foldable,
                cocktail: quantities.cocktail,
            },
            device: {
                computer: device.computer,
                windows: device.windows,
                mac: device.mac,
                projector: device.projector,
                speaker: device.speaker,
            },
            cquantities: {
                windows: cquantities.windows,
                mac: cquantities.mac,
            },
            telev: {
                tv: telev.tv,
            },
            tquantities: {
                tv: tquantities.tv,
            },
            micQty: {
                wired: micQty.wired,
                wireless: micQty.wireless,
            },
            speakerQty: {
                small: speakerQty.small,
                big: speakerQty.big,
            },
            accessoriesQty: {
                podium: accessoriesQty.podium,
                flags: accessoriesQty.flags,
                extensionWires: accessoriesQty.extensionWires,
                speakerStand: accessoriesQty.speakerStand,
                micStand: accessoriesQty.micStand,
                mixer: accessoriesQty.mixer,
                clicker: accessoriesQty.clicker,
            },
            sportsEquipment: {
                equipment1: sportsEquipment.equipment1,
                equipment2: sportsEquipment.equipment2,
                equipment3: sportsEquipment.equipment3,
            },
            otherEquipment: {
                other1: otherEquipment.other1,
                other2: otherEquipment.other2,
                other3: otherEquipment.other3,
            },
        };

        try {
            const response = await fetch(
                "http://192.168.254.113:4002/saveRequest",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

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
                            }}
                        >
                            PERMIT TO USE VEHICLES
                        </h1>

                        {/* Instructions */}
                        <div>
                            <p className="instructions">
                                1. This form must be accomplished in 3 copies
                                prior to the use of any MMCM vehicles. <br />
                                2. The use of such vehicles is subject to the
                                discretion of MMCM. <br />
                                3. The requester shall be held accountable in
                                case of breakage and/or loss of items during the
                                time of use. <br />
                                The requester agrees to replace the item(s) with
                                the same brand or its equivalent. <br />
                                4. The requester must return the borrowed
                                vehicle(s) at the end of the requested time of
                                use.
                            </p>
                        </div>
                    </div>

                    <div style={{ marginLeft: "25px" }}>
                        <div className="FormGroup">
                            <label className="Label">Requester</label>
                            <input
                                className="Input"
                                value={requestorName}
                                onChange={(e) =>
                                    setRequestorName(e.target.value)
                                }
                                placeholder="Lastname, Firstname, Middle Initial"
                            />
                        </div>
                        <div className="FormGroup">
                            <label className="Label">Office/Dept/College</label>
                            <input
                                className="Input"
                                value={dept}
                                onChange={(e) => setDept(e.target.value)}
                                placeholder="e.g. CCIS"
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
                                onChange={(e) =>
                                    setDateOfFiling(e.target.value)
                                }
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
                    <h2 className="equipment-checklist-header">
                        Vehicles Checklist
                    </h2>

                    {/* Equipment Checklists DIV */}
                    <div className="equipment-checklists">
                        {/* Sedan */}
                        <div className="accessories">
                            <h3>Sedan</h3>
                            <div>
                                <input
                                    type="checkbox"
                                    name="podium"
                                    value="podium"
                                    checked={accessoriesQty.podium}
                                    onChange={(e) =>
                                        SetAccessoriesQty((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.checked,
                                        }))
                                    }
                                />
                                <label>Honda Civic</label>
                                <input
                                    type="number"
                                    name="podium"
                                    value={accessoriesQty.podium}
                                    className="quantity-input"
                                    onChange={handleAccessoriesQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!accessoriesQty.podium}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="flags"
                                    value="flags"
                                    checked={accessoriesQty.flags}
                                    onChange={(e) =>
                                        SetAccessoriesQty((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.checked,
                                        }))
                                    }
                                />
                                <label>Toyota Corolla</label>
                                <input
                                    type="number"
                                    name="flags"
                                    value={accessoriesQty.flags}
                                    className="quantity-input"
                                    onChange={handleAccessoriesQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!accessoriesQty.flags}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="extensionWires"
                                    value="extensionWires"
                                    checked={accessoriesQty.extensionWires}
                                    onChange={(e) =>
                                        SetAccessoriesQty((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.checked,
                                        }))
                                    }
                                />
                                <label>BMW 3 Series</label>
                                <input
                                    type="number"
                                    name="extensionWires"
                                    value={accessoriesQty.extensionWires}
                                    className="quantity-input"
                                    onChange={handleAccessoriesQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!accessoriesQty.extensionWires}
                                />
                            </div>
                        </div>

                        {/* Van */}
                        <div className="sports-equipment">
                            <h3>Van</h3>
                            <div>
                                <input
                                    type="checkbox"
                                    name="podium"
                                    value="podium"
                                    checked={accessoriesQty.podium}
                                    onChange={(e) =>
                                        SetAccessoriesQty((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.checked,
                                        }))
                                    }
                                />
                                <label>Toyota Sienna</label>
                                <input
                                    type="number"
                                    name="podium"
                                    value={accessoriesQty.podium}
                                    className="quantity-input"
                                    onChange={handleAccessoriesQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!accessoriesQty.podium}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="flags"
                                    value="flags"
                                    checked={accessoriesQty.flags}
                                    onChange={(e) =>
                                        SetAccessoriesQty((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.checked,
                                        }))
                                    }
                                />
                                <label>Honda Odyssey</label>
                                <input
                                    type="number"
                                    name="flags"
                                    value={accessoriesQty.flags}
                                    className="quantity-input"
                                    onChange={handleAccessoriesQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!accessoriesQty.flags}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="extensionWires"
                                    value="extensionWires"
                                    checked={accessoriesQty.extensionWires}
                                    onChange={(e) =>
                                        SetAccessoriesQty((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.checked,
                                        }))
                                    }
                                />
                                <label>Ford Transit</label>
                                <input
                                    type="number"
                                    name="extensionWires"
                                    value={accessoriesQty.extensionWires}
                                    className="quantity-input"
                                    onChange={handleAccessoriesQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!accessoriesQty.extensionWires}
                                />
                            </div>
                        </div>

                        {/* Bus */}
                        <div className="sports-equipment">
                            <h3>Bus</h3>
                            <div>
                                <input
                                    type="checkbox"
                                    name="podium"
                                    value="podium"
                                    checked={accessoriesQty.podium}
                                    onChange={(e) =>
                                        SetAccessoriesQty((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.checked,
                                        }))
                                    }
                                />
                                <label>Ford Transit Bus</label>
                                <input
                                    type="number"
                                    name="podium"
                                    value={accessoriesQty.podium}
                                    className="quantity-input"
                                    onChange={handleAccessoriesQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!accessoriesQty.podium}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="flags"
                                    value="flags"
                                    checked={accessoriesQty.flags}
                                    onChange={(e) =>
                                        SetAccessoriesQty((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.checked,
                                        }))
                                    }
                                />
                                <label>Chevrolet Express</label>
                                <input
                                    type="number"
                                    name="flags"
                                    value={accessoriesQty.flags}
                                    className="quantity-input"
                                    onChange={handleAccessoriesQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!accessoriesQty.flags}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="extensionWires"
                                    value="extensionWires"
                                    checked={accessoriesQty.extensionWires}
                                    onChange={(e) =>
                                        SetAccessoriesQty((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.checked,
                                        }))
                                    }
                                />
                                <label>T-Built Saf-T-Liner</label>
                                <input
                                    type="number"
                                    name="extensionWires"
                                    value={accessoriesQty.extensionWires}
                                    className="quantity-input"
                                    onChange={handleAccessoriesQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!accessoriesQty.extensionWires}
                                />
                            </div>
                        </div>
                    </div>

                    {/******************* Remarks/Special Instructions *******************/}
                    <h2 className="remarks-header">
                        Remarks/Special Instructions
                    </h2>
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
                            <div></div>
                            <p>Requester</p>
                        </div>
                        <div>
                            <label>Recommended by:</label>
                            <div></div>
                            <p>Adviser/Principal/Pgm Chair/Dean/Dept. Head</p>
                        </div>
                        <div>
                            <label>Verified by:</label>
                            <div></div>
                            <p>Laboratory Assistant</p>
                        </div>
                        <div>
                            <label>Approved by:</label>
                            <div></div>
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
