import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./Requestpage.css";
import logo from "../../img/MMCM_Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MainContainer = styled.section``;

const FormContainer = styled.div``;

const GridContainer = styled.div``;

const FacilitiesEquipments = ({ user, disableFacilitiesWindow }) => {
    console.log("username:" + user.username);
    const [requestorName, setRequestorName] = useState("");
    const [dept, setDept] = useState("");

    const [purpose, setPurpose] = useState("");
    const [dateOfFiling, setDateOfFiling] = useState("");
    const [dateOfUse, setDateOfUse] = useState("");
    const [timeOfUseStart, setTimeOfUseStart] = useState("");
    const [timeOfUseEnd, setTimeOfUseEnd] = useState("");
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
        setTelev((prev) => ({ ...prev, [name]: Number(value) }));
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
            timeOfUseStart,
            timeOfUseEnd,
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
            user: user.fullname,
            ticket: 0,
            carsQty: "",
        };

        try {
            const response = await fetch("http://10.10.4.44:4000/saveRequest", {
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
                <div
                    className="grid-container"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "25px",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        style={{ cursor: "pointer", color: "#090E35", width: "100px", height: "40px" }}
                        onClick={disableFacilitiesWindow}
                    />
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "100px", height: "auto" }}
                    />
                </div>

                <div className="grid-container">
                    <div className="requestFormFacis">
                        <h1
                            style={{
                                display: "block",
                                gridColumn: "1",
                                textAlign: "center",
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            PERMIT TO USE FACILITIES AND EQUIPMENTS
                        </h1>

                        {/* Instructions */}
                        <div style={{ gridRow: "2 " }}>
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
                                placeholder="e.g. Webinar"
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

                    {/******************* Facilities Checklist *******************/}
                    <h2 className="facilities-checklist-header">Facilities Checklist</h2>

                    {/* School Building Contents */}
                    <div className="school-building">
                        <h3>School Building</h3>
                        <div className="school-building-grid">
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="lectureRoom"
                                    name="lectureRoom"
                                    checked={schoolBuilding.lectureRoom}
                                    onChange={(e) =>
                                        setSchoolBuilding({
                                            ...schoolBuilding,
                                            lectureRoom: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="lectureRoom">Lecture Room</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="drawingRoom"
                                    name="drawingRoom"
                                    checked={schoolBuilding.drawingRoom}
                                    onChange={(e) =>
                                        setSchoolBuilding({
                                            ...schoolBuilding,
                                            drawingRoom: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="drawingRoom">Drawing Room</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="computerLab"
                                    name="computerLab"
                                    checked={schoolBuilding.computerLab}
                                    onChange={(e) =>
                                        setSchoolBuilding({
                                            ...schoolBuilding,
                                            computerLab: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="computerLab">Computer Lab</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="physicsLab"
                                    name="physicsLab"
                                    checked={schoolBuilding.physicsLab}
                                    onChange={(e) =>
                                        setSchoolBuilding({
                                            ...schoolBuilding,
                                            physicsLab: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="physicsLab">Physics Lab</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="chemistryLab"
                                    name="chemistryLab"
                                    checked={schoolBuilding.chemistryLab}
                                    onChange={(e) =>
                                        setSchoolBuilding({
                                            ...schoolBuilding,
                                            chemistryLab: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="chemistryLab">Chemistry Lab</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="engineeringLab"
                                    name="engineeringLab"
                                    checked={schoolBuilding.engineeringLab}
                                    onChange={(e) =>
                                        setSchoolBuilding({
                                            ...schoolBuilding,
                                            engineeringLab: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="engineeringLab">Engineering Lab</label>
                            </div>
                        </div>
                    </div>
                    <div></div>

                    {/* Others Contents */}
                    <div className="others">
                        <h3>Others</h3>
                        <div className="others-grid">
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="playcourt1"
                                    name="playcourt1"
                                    checked={others.playcourt1}
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            playcourt1: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="playcourt1">Playcourt 1</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="playcourt2"
                                    name="playcourt2"
                                    checked={others.playcourt2}
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            playcourt2: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="playcourt2">Playcourt 2</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="playcourt3"
                                    name="playcourt3"
                                    checked={others.playcourt3}
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            playcourt3: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="playcourt3">Playcourt 3</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="playcourt4"
                                    name="playcourt4"
                                    checked={others.playcourt4}
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            playcourt4: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="playcourt4">Playcourt 4</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="playcourtRoom1"
                                    name="playcourtRoom1"
                                    checked={others.playcourtRoom1}
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            playcourtRoom1: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="playcourtRoom1">Playcourt Room 1</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="playcourtRoom2"
                                    name="playcourtRoom2"
                                    checked={others.playcourtRoom2}
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            playcourtRoom2: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="playcourtRoom2">Playcourt Room 2</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="volleyballCourt"
                                    name="volleyballCourt"
                                    checked={others.volleyballCourt}
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            volleyballCourt: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="volleyballCourt">Volleyball Court</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="futsal"
                                    name="futsal"
                                    checked={others.futsal}
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            futsal: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="futsal">Futsal</label>
                            </div>
                        </div>
                    </div>

                    {/* Admin Building Contents */}
                    <div className="admin-building">
                        <h3>Admin Building</h3>
                        <div className="admin-building-grid">
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="auditorium1"
                                    name="auditorium1"
                                    checked={adminBuilding.auditorium1}
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            auditorium1: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="auditorium1">Auditorium 1</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="auditorium2"
                                    name="auditorium2"
                                    checked={adminBuilding.auditorium2}
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            auditorium2: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="auditorium2">Auditorium 2</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="auditorium3"
                                    name="auditorium3"
                                    checked={adminBuilding.auditorium3}
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            auditorium3: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="auditorium3">Auditorium 3</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="seminarRoom1"
                                    name="seminarRoom1"
                                    checked={adminBuilding.seminarRoom1}
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            seminarRoom1: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="seminarRoom1">Seminar Room 1</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="seminarRoom2"
                                    name="seminarRoom2"
                                    checked={adminBuilding.seminarRoom2}
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            seminarRoom2: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="seminarRoom2">Seminar Room 2</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="seminarRoom3"
                                    name="seminarRoom3"
                                    checked={adminBuilding.seminarRoom3}
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            seminarRoom3: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="seminarRoom3">Seminar Room 3</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="plaza"
                                    name="plaza"
                                    checked={adminBuilding.plaza}
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            plaza: e.target.checked,
                                        })
                                    }
                                />
                                <label htmlFor="plaza">Plaza</label>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="text"
                                    id="otherAdmin"
                                    name="otherAdmin"
                                    value={adminBuilding.otherAdmin}
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            otherAdmin: e.target.value,
                                        })
                                    }
                                    placeholder="Others, please specify"
                                />
                            </div>
                        </div>
                    </div>

                    {/******************* Equipment Checklist *******************/}
                    <h2 className="equipment-checklist-header">Equipment Checklist</h2>

                    {/* Equipment Checklists DIV */}
                    <div className="equipment-checklists">
                        {/* Furnitures */}
                        <div className="furniture">
                            <h3>Furnitures</h3>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="chairs"
                                    name="chairs"
                                    value="chairs"
                                    checked={furnitures.chairs}
                                    onChange={handleFurnitureChange}
                                />
                                <label htmlFor="chairs">Chairs</label>
                                <div style={{ width: "100%" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div style={{}}>
                                            <input
                                                type="checkbox"
                                                id="rabami"
                                                name="rabami"
                                                value="rabami"
                                                checked={furnitures.rabami}
                                                onChange={handleFurnitureChange}
                                                disabled={!furnitures.chairs}
                                            />
                                            <label htmlFor="rabami">Rabami</label>
                                        </div>
                                        <input
                                            type="number"
                                            name="rabami"
                                            value={quantities.rabami}
                                            className="quantity-input"
                                            onChange={handleQuantityChange}
                                            min="0"
                                            placeholder="Qty"
                                            disabled={!furnitures.rabami}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="monobloc"
                                            name="monobloc"
                                            value="monobloc"
                                            checked={furnitures.monobloc}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.chairs}
                                        />
                                        <label htmlFor="monobloc">Monobloc</label>
                                        <input
                                            type="number"
                                            name="monobloc"
                                            value={quantities.monobloc}
                                            className="quantity-input"
                                            onChange={handleQuantityChange}
                                            min="0"
                                            placeholder="Qty"
                                            disabled={!furnitures.monobloc}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="stool"
                                            name="stool"
                                            value="stool"
                                            checked={furnitures.stool}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.chairs}
                                        />
                                        <label htmlFor="stool">Stool</label>
                                        <input
                                            type="number"
                                            name="stool"
                                            value={quantities.stool}
                                            className="quantity-input"
                                            onChange={handleQuantityChange}
                                            min="0"
                                            placeholder="Qty"
                                            disabled={!furnitures.stool}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="tables"
                                    name="tables"
                                    value="tables"
                                    checked={furnitures.tables}
                                    onChange={handleFurnitureChange}
                                />
                                <label htmlFor="tables">Tables</label>
                                <div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="trapezoid"
                                            name="trapezoid"
                                            value="trapezoid"
                                            checked={furnitures.trapezoid}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.tables}
                                        />
                                        <label htmlFor="trapezoid">Trapezoid</label>
                                        <input
                                            type="number"
                                            name="trapezoid"
                                            value={quantities.trapezoid}
                                            className="quantity-input"
                                            onChange={handleQuantityChange}
                                            min="0"
                                            placeholder="Qty"
                                            disabled={!furnitures.trapezoid}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="training"
                                            name="training"
                                            value="training"
                                            checked={furnitures.training}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.tables}
                                        />
                                        <label htmlFor="training">Training (long)</label>
                                        <input
                                            type="number"
                                            name="training"
                                            value={quantities.training}
                                            className="quantity-input"
                                            onChange={handleQuantityChange}
                                            min="0"
                                            placeholder="Qty"
                                            disabled={!furnitures.training}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="round"
                                            name="round"
                                            value="round"
                                            checked={furnitures.round}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.tables}
                                        />
                                        <label htmlFor="round">Round (small, big)</label>
                                        <input
                                            type="number"
                                            name="round"
                                            value={quantities.round}
                                            className="quantity-input"
                                            onChange={handleQuantityChange}
                                            min="0"
                                            placeholder="Qty"
                                            disabled={!furnitures.round}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="foldable"
                                            name="foldable"
                                            value="foldable"
                                            checked={furnitures.foldable}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.tables}
                                        />
                                        <label htmlFor="foldable">Foldable (small)</label>
                                        <input
                                            type="number"
                                            name="foldable"
                                            value={quantities.foldable}
                                            className="quantity-input"
                                            onChange={handleQuantityChange}
                                            min="0"
                                            placeholder="Qty"
                                            disabled={!furnitures.foldable}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="cocktail"
                                            name="cocktail"
                                            value="cocktail"
                                            checked={furnitures.cocktail}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.tables}
                                        />
                                        <label htmlFor="cocktail">Cocktail</label>
                                        <input
                                            type="number"
                                            name="cocktail"
                                            className="quantity-input"
                                            value={quantities.cocktail}
                                            onChange={handleQuantityChange}
                                            min="0"
                                            placeholder="Qty"
                                            disabled={!furnitures.tables}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Audio Visual */}
                        <div className="audio-visual">
                            <h3>Audio Visual</h3>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="tv"
                                    name="tv"
                                    value="tv"
                                    checked={telev.tv}
                                    onChange={(e) =>
                                        setTelev((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.checked,
                                        }))
                                    }
                                />
                                <label htmlFor="tv">TV</label>
                                <input
                                    type="number"
                                    className="quantity-input"
                                    value={tquantities.tv}
                                    onChange={handleTvQtyChange}
                                    min={"0"}
                                />
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="computer"
                                    name="computer"
                                    value="computer"
                                    checked={device.computer}
                                    onChange={handleDeviceChange}
                                />
                                <label htmlFor="computer">Computer</label>
                                <ul>
                                    <li>
                                        <input
                                            type="checkbox"
                                            id="windows"
                                            name="windows"
                                            value="windows"
                                            checked={device.windows}
                                            onChange={handleDeviceChange}
                                            disabled={!device.computer}
                                        />
                                        <label htmlFor="windows">Windows</label>
                                        <input
                                            type="number"
                                            name="windows"
                                            value={cquantities.windows}
                                            className="quantity-input"
                                            onChange={handleCQuantityChange}
                                            min="0"
                                            placeholder="Qty"
                                            disabled={!device.windows}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="checkbox"
                                            id="mac"
                                            name="mac"
                                            value="mac"
                                            checked={device.mac}
                                            onChange={handleDeviceChange}
                                            disabled={!device.computer}
                                        />
                                        <label htmlFor="mac">Mac</label>
                                        <input
                                            type="number"
                                            name="mac"
                                            value={cquantities.mac}
                                            className="quantity-input"
                                            onChange={handleCQuantityChange}
                                            min="0"
                                            placeholder="Qty"
                                            disabled={!device.mac}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="projector"
                                    name="projector"
                                    value="projector"
                                    checked={device.projector}
                                    onChange={handleDeviceChange}
                                />
                                <label htmlFor="projector">Projector</label>
                                <ul>
                                    <li>
                                        <input
                                            type="checkbox"
                                            id="wired"
                                            name="wired"
                                            value="wired"
                                            checked={micQty.wired}
                                            onChange={(e) =>
                                                setMicQty((prev) => ({
                                                    ...prev,
                                                    [e.target.name]: e.target.checked,
                                                }))
                                            }
                                            disabled={!device.projector}
                                        />
                                        <label htmlFor="wired">Wired Microphone</label>
                                        <input
                                            type="number"
                                            name="wired"
                                            value={micQty.wired}
                                            className="quantity-input"
                                            onChange={handleProjQtyChange}
                                            min="0"
                                            placeholder="Qty"
                                            disabled={!micQty.wired}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="checkbox"
                                            id="wireless"
                                            name="wireless"
                                            value="wireless"
                                            checked={micQty.wireless}
                                            onChange={(e) =>
                                                setMicQty((prev) => ({
                                                    ...prev,
                                                    [e.target.name]: e.target.checked,
                                                }))
                                            }
                                            disabled={!device.projector}
                                        />
                                        <label htmlFor="wireless">Wireless Microphone</label>
                                        <input
                                            type="number"
                                            name="wireless"
                                            value={micQty.wireless}
                                            className="quantity-input"
                                            onChange={handleProjQtyChange}
                                            min="0"
                                            placeholder="Qty"
                                            disabled={!micQty.wireless}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="speaker"
                                    name="speaker"
                                    value="speaker"
                                    checked={device.speaker}
                                    onChange={handleDeviceChange}
                                />
                                <label htmlFor="speaker">Portable Speaker</label>
                                <ul>
                                    <li>
                                        <input
                                            type="checkbox"
                                            id="small"
                                            name="small"
                                            value="small"
                                            checked={speakerQty.small}
                                            onChange={(e) =>
                                                setSpeakerQty((prev) => ({
                                                    ...prev,
                                                    [e.target.name]: e.target.checked,
                                                }))
                                            }
                                            disabled={!device.speaker}
                                        />
                                        <label htmlFor="small">Small</label>
                                        <input
                                            type="number"
                                            name="small"
                                            value={speakerQty.small}
                                            className="quantity-input"
                                            onChange={handleSpeakerQtyChange}
                                            min="0"
                                            placeholder="Qty"
                                            disabled={!speakerQty.small}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="checkbox"
                                            id="big"
                                            name="big"
                                            value="big"
                                            checked={speakerQty.big}
                                            onChange={(e) =>
                                                setSpeakerQty((prev) => ({
                                                    ...prev,
                                                    [e.target.name]: e.target.checked,
                                                }))
                                            }
                                            disabled={!device.speaker}
                                        />
                                        <label htmlFor="big">Big</label>
                                        <input
                                            type="number"
                                            name="big"
                                            value={speakerQty.big}
                                            className="quantity-input"
                                            onChange={handleSpeakerQtyChange}
                                            min="0"
                                            placeholder="Qty"
                                            disabled={!speakerQty.big}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Accessories */}
                        <div className="accessories">
                            <h3>Accessories/Others</h3>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="podium"
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
                                <label htmlFor="podium">Podium</label>
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
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="flags"
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
                                <label htmlFor="flags">Flags</label>
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
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="extensionWires"
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
                                <label htmlFor="extensionWires">Extension Wires</label>
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
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="speakerStand"
                                    name="speakerStand"
                                    value="speakerStand"
                                    checked={accessoriesQty.speakerStand}
                                    onChange={(e) =>
                                        SetAccessoriesQty((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.checked,
                                        }))
                                    }
                                />
                                <label htmlFor="speakerStand">Speaker Stand</label>
                                <input
                                    type="number"
                                    name="speakerStand"
                                    value={accessoriesQty.speakerStand}
                                    className="quantity-input"
                                    onChange={handleAccessoriesQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!accessoriesQty.speakerStand}
                                />
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="micStand"
                                    name="micStand"
                                    value="micStand"
                                    checked={accessoriesQty.micStand}
                                    onChange={(e) =>
                                        SetAccessoriesQty((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.checked,
                                        }))
                                    }
                                />
                                <label htmlFor="micStand">Mic Stand</label>
                                <input
                                    type="number"
                                    name="micStand"
                                    value={accessoriesQty.micStand}
                                    className="quantity-input"
                                    onChange={handleAccessoriesQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!accessoriesQty.micStand}
                                />
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="mixer"
                                    name="mixer"
                                    value="mixer"
                                    checked={accessoriesQty.mixer}
                                    onChange={(e) =>
                                        SetAccessoriesQty((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.checked,
                                        }))
                                    }
                                />
                                <label htmlFor="mixer">Mixer</label>
                                <input
                                    type="number"
                                    name="mixer"
                                    value={accessoriesQty.mixer}
                                    className="quantity-input"
                                    onChange={handleAccessoriesQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!accessoriesQty.mixer}
                                />
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="clicker"
                                    name="clicker"
                                    value="clicker"
                                    checked={accessoriesQty.clicker}
                                    onChange={(e) =>
                                        SetAccessoriesQty((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.checked,
                                        }))
                                    }
                                />
                                <label htmlFor="clicker">Clicker</label>
                                <input
                                    type="number"
                                    name="clicker"
                                    value={accessoriesQty.clicker}
                                    className="quantity-input"
                                    onChange={handleAccessoriesQtyChange}
                                    min="0"
                                    placeholder="Qty"
                                    disabled={!accessoriesQty.clicker}
                                />
                            </div>
                            <div className="CheckContainer">
                                <input
                                    type="checkbox"
                                    id="internetAccess"
                                    name="internetAccess"
                                    value="Internet Access"
                                />
                                <label htmlFor="internetAccess">Internet Access</label>
                            </div>
                        </div>

                        {/* Sports Equipment */}
                        <div className="sports-equipment">
                            <h3>Sports Equipment</h3>
                            <div style={{ margin: "5px" }}>
                                <input
                                    className="Input"
                                    id="equipment1"
                                    name="equipment1"
                                    value={sportsEquipment.equipment1}
                                    onChange={(e) =>
                                        setSportsEquipment({
                                            ...sportsEquipment,
                                            equipment1: e.target.value,
                                        })
                                    }
                                    placeholder="Equipment 1"
                                />
                            </div>
                            <div style={{ margin: "5px" }}>
                                <input
                                    className="Input"
                                    id="equipment2"
                                    name="equipment2"
                                    value={sportsEquipment.equipment2}
                                    onChange={(e) =>
                                        setSportsEquipment({
                                            ...sportsEquipment,
                                            equipment2: e.target.value,
                                        })
                                    }
                                    placeholder="Equipment 2"
                                />
                            </div>
                            <div style={{ margin: "5px" }}>
                                <input
                                    className="Input"
                                    id="equipment3"
                                    name="equipment3"
                                    value={sportsEquipment.equipment3}
                                    onChange={(e) =>
                                        setSportsEquipment({
                                            ...sportsEquipment,
                                            equipment3: e.target.value,
                                        })
                                    }
                                    placeholder="Equipment 3"
                                />
                            </div>
                        </div>

                        {/* Others */}
                        <div className="others-equipment">
                            <h3>Others</h3>
                            <div style={{ margin: "5px" }}>
                                <input
                                    className="Input"
                                    id="other1"
                                    name="other1"
                                    value={otherEquipment.other1}
                                    onChange={(e) =>
                                        setOtherEquipment({
                                            ...otherEquipment,
                                            other1: e.target.value,
                                        })
                                    }
                                    placeholder="Please specify"
                                />
                            </div>
                            <div style={{ margin: "5px" }}>
                                <input
                                    className="Input"
                                    id="other2"
                                    name="other2"
                                    value={otherEquipment.other2}
                                    onChange={(e) =>
                                        setOtherEquipment({
                                            ...otherEquipment,
                                            other2: e.target.value,
                                        })
                                    }
                                    placeholder="Please specify"
                                />
                            </div>
                            <div style={{ margin: "5px" }}>
                                <input
                                    className="Input"
                                    id="other3"
                                    name="other3"
                                    value={otherEquipment.other3}
                                    onChange={(e) =>
                                        setOtherEquipment({
                                            ...otherEquipment,
                                            other3: e.target.value,
                                        })
                                    }
                                    placeholder="Please specify"
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
                            <label>
                                Prepared by:&nbsp; <b>{requestorName}</b>
                            </label>
                            <label style={{ borderBottom: "none" }}>
                                <p style={{ textAlign: "center" }}>Requester</p>
                            </label>
                        </div>
                        <div>
                            <label style={{ display: "flex" }}>
                                Recommended by:&nbsp;&nbsp; <b>{user.fullname}</b>
                            </label>

                            <label style={{ borderBottom: "none" }}>
                                <p style={{ textAlign: "center" }}>Adviser/Principal/Pgm Chair/Dean/Dept. Head</p>
                            </label>
                        </div>
                        <div>
                            <label>Verified by:</label>
                            <label style={{ borderBottom: "none" }}>
                                <p style={{ textAlign: "center" }}>Laboratory Assistant</p>
                            </label>
                        </div>
                        <div>
                            <label>Approved by:</label>
                            <label style={{ borderBottom: "none" }}>
                                <p style={{ textAlign: "center" }}>IFO-TLF Officer</p>
                            </label>
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

export default FacilitiesEquipments;
