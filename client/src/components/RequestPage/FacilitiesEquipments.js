import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import "./Requestpage.css";
import logo from "../../img/MMCM_Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faL } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

const MainContainer = styled.section`
    background: linear-gradient(to top, #cdcdcd, #dcdcdc, #e5e5e5);
    display: flex;
    justify-content: center;
    padding: 20px;
    min-height: 100vh;
`;

const FormContainer = styled.div`
    background-color: #fafafa;
    padding: 50px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 25px;
`;

const GridContainer = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto auto auto auto auto auto;
    gap: 20px;
    position: relative;
`;

const RequestForm = styled.div`
    grid-row-start: 1;
    grid-column: 1 / span 3;
    justify-items: center;
    grid-template-columns: auto auto;
    margin: 0;
    padding: 0;
`;

const BackArrowButton = styled(FontAwesomeIcon)`
    cursor: pointer;
    color: #090e35;
    width: 100px;
    height: 40px;
`;

const HeaderLogo = styled.img`
    width: 100px;
    height: auto;
`;

const RequestFormHeader = styled.h1`
    display: block;
    grid-column: 1;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const RequestFormContent = styled.div`
    grid-row-start: 1;
`;

const FormInstructions = styled.p`
    font-size: 16px;
    padding: 0;
    margin: 0px 0px 0px 25px;
`;

const Divider = styled.div`
    border-bottom: 1px solid lightgray;
    width: 95%;
    margin-bottom: 20px;
    margin-left: 25px;
`;

const FormGroupContainer = styled.div`
    /* margin-left: 25px; */
    font-size: 16px;
    margin: 0px 0px 0px 25px;
    padding: 0;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 20px;
    width: 100%;
`;

const FormLabel = styled.label`
    font-size: 16px;
    margin-bottom: auto;
    font-weight: bold;
`;

const FormInput = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 50px;
    width: auto;
`;

const ConflictTable = styled.table``;

const TableHeader = styled.th`
    font-size: 14px;
    border: 1px solid;
`;

const TableHead = styled.thead``;

const TableBody = styled.tbody``;

const TableDetails = styled.td`
    font-size: 12px;
    border: 1px solid;
`;

const TableRow = styled.tr``;

const ChecklistHeader = styled.h2`
    grid-column: 1 / span 3;
    text-align: left;
    margin: 0;
    padding: 0;
    margin-left: 25px;
`;

const FormGridContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 50px 50px 50px 50px;
    align-content: center;
    align-items: center;
`;

const FormGridHeader = styled.span`
    font-size: 26px;
    font-weight: 600;
`;

const CheckContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
    position: relative;
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    border-color: ${({ disabled }) => (disabled ? "red" : "#090e35")};

    border-radius: 4px;
    box-sizing: border-box;
    transition: all 0.3s ease;

    &:disabled {
        cursor: not-allowed;
    }
`;

const CheckBoxLabel = styled.label`
    position: relative;
    cursor: pointer;
    padding-left: 20px;
    display: inline-block;

    color: ${({ disabled }) => (disabled ? "red" : "black")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    opacity: ${({ disabled }) => (disabled ? "0.6" : "1")};
`;

const EquipmentGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    margin-left: 25px;
    grid-column: 1 / span 3;
`;

const EquipmentGridWrapper = styled.div`
    font-size: 16px;
    margin: 0;
    padding: 0;
`;

const OthersInputWrapper = styled.div`
    font-size: 16px;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const GridInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 25px;
    gap: 10px;
`;

const GridInput = styled.div`
    display: flex;
    align-items: center;
    input[type="number"]:last-child {
        margin-left: auto;
    }
`;

const QuantityInput = styled.input`
    width: 50px;
    margin-left: 10px;
`;

const Remarks = styled.div`
    grid-column: 1 / span 3;
    padding: 10px 0;
    margin-left: 25px;
`;

const ApprovalSection = styled.section`
    grid-column: 1 / span 3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 10px 0;
    font-size: 16px;
    margin-left: 25px;
`;

const ApprovalSectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const ApprovalSectionLabel = styled.label`
    border-bottom: 1px solid black;
    width: 90%;
    margin-bottom: 4px;
    padding-bottom: 8px;
`;

const ApprovalSectionSpan = styled.span`
    display: inline-block;
    text-align: center;
    width: 70%;
    margin: 0 auto;
`;

const ApprovalSectionFooter = styled.p`
    text-align: center;
`;

const FinishButtonWrapper = styled.div`
    grid-column: 1 / span 3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
`;

const FinsihButton = styled.button`
    background-color: #144691;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`;

const TextArea = styled.textarea`
    width: 95%;
    padding: 8px;
    font-size: 16px;
    resize: none;
`;

const RequestDetails = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`;

const Span = styled.span``;

const FacilitiesEquipments = ({ user, disableFacilitiesWindow, currentDept }) => {
    const [requestorName, setRequestorName] = useState("");
    const [dept, setDept] = useState("");
    const [conflicts, setConflicts] = useState([]);
    const [purpose, setPurpose] = useState("");
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

    const [isFacilityDisabled, setIsFacilityDisabled] = useState({
        lectureRoom: false,
        computerLab: false,
        chemistryLab: false,
        drawingRoom: false,
        physicsLab: false,
        engineeringLab: false,
        auditorium1: false,
        auditorium2: false,
        auditorium3: false,
        seminarRoom1: false,
        seminarRoom2: false,
        seminarRoom3: false,
        plaza: false,
        playcourt1: false,
        playcourt2: false,
        playcourt3: false,
        playcourt4: false,
        playcourtRoom1: false,
        playcourtRoom2: false,
        volleyballCourt: false,
        futsal: false,
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

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const getMinDateOfUse = (dateString) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 4);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const [dateOfFiling, setDateOfFiling] = useState(getTodayDate());

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
            const response = await fetch("http://172.20.10.11:4000/saveRequest", {
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
            // ...parseAndFilter(req.furnitures),
            // ...parseAndFilter(req.quantities),
            // ...parseAndFilter(req.device),
            // ...parseAndFilter(req.cquantities),
            // ...parseAndFilter(req.telev),
            // ...parseAndFilter(req.tquantities),
            // ...parseAndFilter(req.micQty),
            // ...parseAndFilter(req.speakerQty),
            // ...parseAndFilter(req.accessoriesQty),
            // ...parseAndFilter(req.sportsEquipment),
            // ...parseAndFilter(req.otherEquipment),
        ];

        if (allDetails.length === 0) {
            return "N/A";
        }

        // console.log(isFacilityDisabled);

        return (
            <RequestDetails>
                {allDetails.map(([key, value]) => (
                    <Span key={key}>{key}</Span>
                ))}
            </RequestDetails>
        );
    };

    useEffect(() => {
        setDept(user.dept);
        setRequestorName(user.fullname);

        const fetchCurrentDateSchedules = async () => {
            try {
                const response = await axios.post("http://172.20.10.11:4000/api/getCurrentDateSched", {
                    dateOfUse,
                });

                if (response.data && response.data.length > 0) {
                    // let newOthers = { ...others };
                    // let newSchoolBuilding = { ...schoolBuilding };
                    // let merged = { ...isFacilityDisabled };

                    // response.data.forEach((item) => {
                    //     const itemOthers = JSON.parse(item.others);
                    //     const itemSchoolBuilding = JSON.parse(item.schoolBuilding);

                    //     newOthers = { ...newOthers, ...itemOthers };
                    //     newSchoolBuilding = { ...newSchoolBuilding, ...itemSchoolBuilding };
                    // });

                    // updateOthersState(newOthers);
                    // updateSchoolBuildingState(newSchoolBuilding);
                    // console.log(isFacilityDisabled);

                    setConflicts(response.data);
                } else {
                    setConflicts([]);

                    setOthers({
                        playcourt1: false,
                        playcourt2: false,
                        playcourt3: false,
                        playcourt4: false,
                        playcourtRoom1: false,
                        playcourtRoom2: false,
                        volleyballCourt: false,
                        futsal: false,
                    });

                    setSchoolBuilding({
                        lectureRoom: false,
                        drawingRoom: false,
                        computerLab: false,
                        physicsLab: false,
                        chemistryLab: false,
                        engineeringLab: false,
                    });

                    setAdminBuilding({
                        auditorium1: false,
                        auditorium2: false,
                        auditorium3: false,
                        seminarRoom1: false,
                        seminarRoom2: false,
                        seminarRoom3: false,
                        plaza: false,
                        otherAdmin: "",
                    });
                }
            } catch (error) {
                console.error("There was an error checking for conflicts:", error);
            }
        };

        const disableFacilitiesInUse = () => {
            conflicts.forEach((item) => {
                if (timeOfUseStart === item.timeOfUseStart) {
                    const itemOthers = JSON.parse(item.others);
                    const itemSchoolBuilding = JSON.parse(item.schoolBuilding);
                    const itemAdminBuilding = JSON.parse(item.adminBuilding);
                    let merged = { ...itemOthers, ...itemSchoolBuilding, ...itemAdminBuilding };
                    console.log(merged);

                    setIsFacilityDisabled((prevState) => ({
                        ...prevState,
                        ...merged,
                    }));
                } else {
                    setIsFacilityDisabled({
                        lectureRoom: false,
                        computerLab: false,
                        chemistryLab: false,
                        drawingRoom: false,
                        physicsLab: false,
                        engineeringLab: false,
                        auditorium1: false,
                        auditorium2: false,
                        auditorium3: false,
                        seminarRoom1: false,
                        seminarRoom2: false,
                        seminarRoom3: false,
                        plaza: false,
                        playcourt1: false,
                        playcourt2: false,
                        playcourt3: false,
                        playcourt4: false,
                        playcourtRoom1: false,
                        playcourtRoom2: false,
                        volleyballCourt: false,
                        futsal: false,
                    });
                }
            });
        };

        // Call fetchCurrentDateSchedules when dateOfUse changes
        if (dateOfUse) fetchCurrentDateSchedules();

        if (timeOfUseStart) disableFacilitiesInUse();
    }, [dateOfUse, timeOfUseStart]);

    return (
        <MainContainer>
            <FormContainer>
                <FormHeader>
                    <BackArrowButton
                        icon={faArrowLeft}
                        onClick={disableFacilitiesWindow}
                    />
                    <HeaderLogo
                        src={logo}
                        alt="Logo"
                    />
                </FormHeader>

                <GridContainer>
                    <RequestForm>
                        <RequestFormHeader>PERMIT TO USE FACILITIES AND EQUIPMENTS</RequestFormHeader>

                        {/* Instructions */}
                        <RequestFormContent>
                            <FormInstructions>
                                1. This form must be accomplished in 3 days prior to the use of any MMCM facility or
                                equipment(s).
                            </FormInstructions>
                            <FormInstructions>
                                2. The use of such facility or equipment(s) is subject to the discretion of MMCM.
                            </FormInstructions>
                            <FormInstructions>
                                3. The requester shall be held accountable in case of breakage and/or loss of item(s)
                                during the time of use.
                            </FormInstructions>
                            <FormInstructions>
                                4. The requester must return the borrowed equipment(s) at the end of the requested time
                                of use.
                            </FormInstructions>
                            <Divider />
                        </RequestFormContent>
                    </RequestForm>

                    <FormGroupContainer>
                        <FormGroup>
                            <FormLabel>Requester</FormLabel>
                            <FormInput
                                value={user.fullname}
                                onChange={(e) => setRequestorName(e.target.value)}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Office/Dept/College</FormLabel>
                            <FormInput
                                value={dept}
                                onChange={(e) => setDept(e.target.value)}
                                disabled
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Purpose</FormLabel>
                            <FormInput
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                placeholder="e.g. Webinar"
                            />
                        </FormGroup>
                    </FormGroupContainer>

                    <FormGroupContainer>
                        <FormGroup>
                            <FormLabel>Date of Filing</FormLabel>
                            <FormInput
                                type="date"
                                value={dateOfFiling}
                                onChange={(e) => setDateOfFiling(e.target.value)}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Date of Use</FormLabel>
                            <FormInput
                                type="date"
                                value={dateOfUse}
                                min={getMinDateOfUse(dateOfFiling)}
                                onChange={(e) => setDateOfUse(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Time of Use (Start)</FormLabel>
                            <FormInput
                                type="time"
                                value={timeOfUseStart}
                                onChange={(e) => setTimeOfUseStart(e.target.value)}
                                step={1}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Time of Use (End)</FormLabel>
                            <FormInput
                                type="time"
                                value={timeOfUseEnd}
                                onChange={(e) => setTimeOfUseEnd(e.target.value)}
                                step={1}
                            />
                        </FormGroup>
                    </FormGroupContainer>

                    <FormGroupContainer>
                        <FormGroup>
                            <FormLabel>Conflicts Found</FormLabel>
                            <ConflictTable>
                                <TableHead>
                                    <TableRow>
                                        <TableHeader>Facility</TableHeader>
                                        <TableHeader>Time Of Use (Start)</TableHeader>
                                        <TableHeader>Time Of Use (End)</TableHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {conflicts.map((conflict, index) => (
                                        <TableRow key={index}>
                                            <TableDetails>{renderRequestDetails(conflict)}</TableDetails>
                                            <TableDetails>{conflict.timeOfUseStart}</TableDetails>
                                            <TableDetails>{conflict.timeOfUseEnd}</TableDetails>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </ConflictTable>
                        </FormGroup>
                    </FormGroupContainer>

                    {/******************* Facilities Checklist *******************/}
                    <ChecklistHeader>Facilities Checklist</ChecklistHeader>

                    {/* School Building Contents */}
                    <FormGroupContainer>
                        <FormGridHeader>School Building</FormGridHeader>
                        <FormGridContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="lectureRoom"
                                    name="lectureRoom"
                                    checked={
                                        isFacilityDisabled.lectureRoom
                                            ? !isFacilityDisabled.lectureRoom
                                            : schoolBuilding.lectureRoom
                                    }
                                    onChange={(e) =>
                                        setSchoolBuilding({
                                            ...schoolBuilding,
                                            lectureRoom: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.lectureRoom}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.lectureRoom}>Lecture Room</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="drawingRoom"
                                    name="drawingRoom"
                                    checked={
                                        isFacilityDisabled.drawingRoom
                                            ? !isFacilityDisabled.drawingRoom
                                            : schoolBuilding.drawingRoom
                                    }
                                    onChange={(e) =>
                                        setSchoolBuilding({
                                            ...schoolBuilding,
                                            drawingRoom: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.drawingRoom}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.drawingRoom}>Drawing Room</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="computerLab"
                                    name="computerLab"
                                    checked={
                                        isFacilityDisabled.computerLab
                                            ? !isFacilityDisabled.computerLab
                                            : schoolBuilding.computerLab
                                    }
                                    onChange={(e) =>
                                        setSchoolBuilding({
                                            ...schoolBuilding,
                                            computerLab: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.computerLab}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.computerLab}>Computer Lab</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="physicsLab"
                                    name="physicsLab"
                                    checked={
                                        isFacilityDisabled.physicsLab
                                            ? !isFacilityDisabled.physicsLab
                                            : schoolBuilding.physicsLab
                                    }
                                    onChange={(e) =>
                                        setSchoolBuilding({
                                            ...schoolBuilding,
                                            physicsLab: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.physicsLab}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.physicsLab}>Physics Lab</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="chemistryLab"
                                    name="chemistryLab"
                                    checked={
                                        isFacilityDisabled.chemistryLab
                                            ? !isFacilityDisabled.chemistryLab
                                            : schoolBuilding.chemistryLab
                                    }
                                    onChange={(e) =>
                                        setSchoolBuilding({
                                            ...schoolBuilding,
                                            chemistryLab: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.chemistryLab}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.chemistryLab}>Chemistry Lab</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="engineeringLab"
                                    name="engineeringLab"
                                    checked={
                                        isFacilityDisabled.engineeringLab
                                            ? !isFacilityDisabled.engineeringLab
                                            : schoolBuilding.engineeringLab
                                    }
                                    onChange={(e) =>
                                        setSchoolBuilding({
                                            ...schoolBuilding,
                                            engineeringLab: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.engineeringLab}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.engineeringLab}>
                                    Engineering Lab
                                </CheckBoxLabel>
                            </CheckContainer>
                        </FormGridContainer>
                    </FormGroupContainer>

                    {/* Admin Building Contents */}
                    <FormGroupContainer>
                        <FormGridHeader>Admin Building</FormGridHeader>
                        <FormGridContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="auditorium1"
                                    name="auditorium1"
                                    checked={
                                        isFacilityDisabled.auditorium1
                                            ? !isFacilityDisabled.auditorium1
                                            : adminBuilding.auditorium1
                                    }
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            auditorium1: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.auditorium1}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.auditorium1}>Auditorium 1</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="auditorium2"
                                    name="auditorium2"
                                    checked={
                                        isFacilityDisabled.auditorium2
                                            ? !isFacilityDisabled.auditorium2
                                            : adminBuilding.auditorium2
                                    }
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            auditorium2: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.auditorium2}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.auditorium2}>Auditorium 2</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="auditorium3"
                                    name="auditorium3"
                                    checked={
                                        isFacilityDisabled.auditorium3
                                            ? !isFacilityDisabled.auditorium3
                                            : adminBuilding.auditorium3
                                    }
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            auditorium3: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.auditorium3}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.auditorium3}>Auditorium 3</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="seminarRoom1"
                                    name="seminarRoom1"
                                    checked={
                                        isFacilityDisabled.seminarRoom1
                                            ? !isFacilityDisabled.seminarRoom1
                                            : adminBuilding.seminarRoom1
                                    }
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            seminarRoom1: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.seminarRoom1}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.seminarRoom1}>Seminar Room 1</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="seminarRoom2"
                                    name="seminarRoom2"
                                    checked={
                                        isFacilityDisabled.seminarRoom2
                                            ? !isFacilityDisabled.seminarRoom2
                                            : adminBuilding.seminarRoom2
                                    }
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            seminarRoom2: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.seminarRoom2}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.seminarRoom2}>Seminar Room 2</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="seminarRoom3"
                                    name="seminarRoom3"
                                    checked={
                                        isFacilityDisabled.seminarRoom3
                                            ? !isFacilityDisabled.seminarRoom3
                                            : adminBuilding.seminarRoom3
                                    }
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            seminarRoom3: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.seminarRoom3}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.seminarRoom3}>Seminar Room 3</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="plaza"
                                    name="plaza"
                                    checked={isFacilityDisabled.plaza ? !isFacilityDisabled.plaza : adminBuilding.plaza}
                                    onChange={(e) =>
                                        setAdminBuilding({
                                            ...adminBuilding,
                                            plaza: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.plaza}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.plaza}>Plaza</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
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
                            </CheckContainer>
                        </FormGridContainer>
                    </FormGroupContainer>

                    {/* Others Contents */}

                    <FormGroupContainer>
                        <FormGridHeader>Others</FormGridHeader>
                        <FormGridContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="playcourt1"
                                    name="playcourt1"
                                    checked={
                                        isFacilityDisabled.playcourt1
                                            ? !isFacilityDisabled.playcourt1
                                            : others.playcourt1
                                    }
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            playcourt1: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.playcourt1}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.playcourt1}>Playcourt 1</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="playcourt2"
                                    name="playcourt2"
                                    checked={
                                        isFacilityDisabled.playcourt2
                                            ? !isFacilityDisabled.playcourt2
                                            : others.playcourt2
                                    }
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            playcourt2: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.playcourt2}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.playcourt2}>Playcourt 2</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="playcourt3"
                                    name="playcourt3"
                                    checked={
                                        isFacilityDisabled.playcourt3
                                            ? !isFacilityDisabled.playcourt3
                                            : others.playcourt3
                                    }
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            playcourt3: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.playcourt3}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.playcourt3}>Playcourt 3</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="playcourt4"
                                    name="playcourt4"
                                    checked={
                                        isFacilityDisabled.playcourt4
                                            ? !isFacilityDisabled.playcourt4
                                            : others.playcourt4
                                    }
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            playcourt4: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.playcourt4}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.playcourt4}>Playcourt 4</CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="playcourtRoom1"
                                    name="playcourtRoom1"
                                    checked={
                                        isFacilityDisabled.playcourtRoom1
                                            ? !isFacilityDisabled.playcourtRoom1
                                            : others.playcourtRoom1
                                    }
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            playcourtRoom1: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.playcourtRoom1}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.playcourtRoom1}>
                                    Playcourt Room 1
                                </CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="playcourtRoom2"
                                    name="playcourtRoom2"
                                    checked={
                                        isFacilityDisabled.playcourtRoom2
                                            ? !isFacilityDisabled.playcourtRoom2
                                            : others.playcourtRoom2
                                    }
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            playcourtRoom2: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.playcourtRoom2}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.playcourtRoom2}>
                                    Playcourt Room 2
                                </CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="volleyballCourt"
                                    name="volleyballCourt"
                                    checked={
                                        isFacilityDisabled.volleyballCourt
                                            ? !isFacilityDisabled.volleyballCourt
                                            : others.volleyballCourt
                                    }
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            volleyballCourt: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.volleyballCourt}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.volleyballCourt}>
                                    Volleyball Court
                                </CheckBoxLabel>
                            </CheckContainer>
                            <CheckContainer>
                                <CheckBox
                                    type="checkbox"
                                    id="futsal"
                                    name="futsal"
                                    checked={isFacilityDisabled.futsal ? !isFacilityDisabled.futsal : others.futsal}
                                    onChange={(e) =>
                                        setOthers({
                                            ...others,
                                            futsal: e.target.checked,
                                        })
                                    }
                                    disabled={isFacilityDisabled.futsal}
                                />
                                <CheckBoxLabel disabled={isFacilityDisabled.futsal}>Futsal</CheckBoxLabel>
                            </CheckContainer>
                        </FormGridContainer>
                    </FormGroupContainer>

                    {/******************* Equipment Checklist *******************/}
                    <ChecklistHeader>Equipment Checklist</ChecklistHeader>

                    {/* Equipment Checklists DIV */}
                    <EquipmentGrid>
                        {/* Furnitures */}
                        <EquipmentGridWrapper>
                            <FormGridHeader>Furnitures</FormGridHeader>
                            <CheckContainer>
                                <GridInput>
                                    <CheckBox
                                        type="checkbox"
                                        id="chairs"
                                        name="chairs"
                                        value="chairs"
                                        checked={furnitures.chairs}
                                        onChange={handleFurnitureChange}
                                    />
                                    <CheckBoxLabel>Chairs</CheckBoxLabel>
                                </GridInput>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            id="rabami"
                                            name="rabami"
                                            value="rabami"
                                            checked={furnitures.rabami}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.chairs}
                                        />
                                        <CheckBoxLabel>Rabami</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="rabami"
                                            value={quantities.rabami}
                                            onChange={handleQuantityChange}
                                            min="0"
                                            disabled={!furnitures.rabami}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            id="monobloc"
                                            name="monobloc"
                                            value="monobloc"
                                            checked={furnitures.monobloc}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.chairs}
                                        />
                                        <CheckBoxLabel htmlFor="monobloc">Monobloc</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="monobloc"
                                            value={quantities.monobloc}
                                            onChange={handleQuantityChange}
                                            min="0"
                                            disabled={!furnitures.monobloc}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            id="stool"
                                            name="stool"
                                            value="stool"
                                            checked={furnitures.stool}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.chairs}
                                        />
                                        <CheckBoxLabel>Stool</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="stool"
                                            value={quantities.stool}
                                            onChange={handleQuantityChange}
                                            min="0"
                                            disabled={!furnitures.stool}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>
                            <Divider />
                            <CheckContainer>
                                <GridInput>
                                    <CheckBox
                                        type="checkbox"
                                        id="tables"
                                        name="tables"
                                        value="tables"
                                        checked={furnitures.tables}
                                        onChange={handleFurnitureChange}
                                    />
                                    <CheckBoxLabel>Tables</CheckBoxLabel>
                                </GridInput>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            id="trapezoid"
                                            name="trapezoid"
                                            value="trapezoid"
                                            checked={furnitures.trapezoid}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.tables}
                                        />
                                        <CheckBoxLabel>Trapezoid</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="trapezoid"
                                            value={quantities.trapezoid}
                                            onChange={handleQuantityChange}
                                            min="0"
                                            disabled={!furnitures.trapezoid}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            id="training"
                                            name="training"
                                            value="training"
                                            checked={furnitures.training}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.tables}
                                        />
                                        <CheckBoxLabel>Training (long)</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="training"
                                            value={quantities.training}
                                            onChange={handleQuantityChange}
                                            min="0"
                                            disabled={!furnitures.training}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            id="round"
                                            name="round"
                                            value="round"
                                            checked={furnitures.round}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.tables}
                                        />
                                        <CheckBoxLabel>Round (small, big)</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="round"
                                            value={quantities.round}
                                            onChange={handleQuantityChange}
                                            min="0"
                                            disabled={!furnitures.round}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            id="foldable"
                                            name="foldable"
                                            value="foldable"
                                            checked={furnitures.foldable}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.tables}
                                        />
                                        <CheckBoxLabel>Foldable (small)</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="foldable"
                                            value={quantities.foldable}
                                            onChange={handleQuantityChange}
                                            min="0"
                                            disabled={!furnitures.foldable}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            id="cocktail"
                                            name="cocktail"
                                            value="cocktail"
                                            checked={furnitures.cocktail}
                                            onChange={handleFurnitureChange}
                                            disabled={!furnitures.tables}
                                        />
                                        <CheckBoxLabel>Cocktail</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="cocktail"
                                            value={quantities.cocktail}
                                            onChange={handleQuantityChange}
                                            min="0"
                                            disabled={!furnitures.tables}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>
                        </EquipmentGridWrapper>

                        {/* Audio Visual */}
                        <EquipmentGridWrapper>
                            <FormGridHeader>Audio Visual</FormGridHeader>
                            <CheckContainer>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
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
                                        <CheckBoxLabel>TV</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            value={tquantities.tv}
                                            onChange={handleTvQtyChange}
                                            min={"0"}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>
                            <Divider />
                            <CheckContainer>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            id="computer"
                                            name="computer"
                                            value="computer"
                                            checked={device.computer}
                                            onChange={handleDeviceChange}
                                        />
                                        <CheckBoxLabel htmlFor="computer">Computer</CheckBoxLabel>
                                    </GridInput>
                                </GridInputWrapper>

                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            id="windows"
                                            name="windows"
                                            value="windows"
                                            checked={device.windows}
                                            onChange={handleDeviceChange}
                                            disabled={!device.computer}
                                        />
                                        <CheckBoxLabel>Windows</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="windows"
                                            value={cquantities.windows}
                                            onChange={handleCQuantityChange}
                                            min="0"
                                            disabled={!device.windows}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            id="mac"
                                            name="mac"
                                            value="mac"
                                            checked={device.mac}
                                            onChange={handleDeviceChange}
                                            disabled={!device.computer}
                                        />
                                        <CheckBoxLabel htmlFor="mac">Mac</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="mac"
                                            value={cquantities.mac}
                                            onChange={handleCQuantityChange}
                                            min="0"
                                            disabled={!device.mac}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>

                            <Divider />

                            <CheckContainer>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            id="projector"
                                            name="projector"
                                            value="projector"
                                            checked={device.projector}
                                            onChange={handleDeviceChange}
                                        />
                                        <CheckBoxLabel>Projector</CheckBoxLabel>
                                    </GridInput>
                                </GridInputWrapper>

                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
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
                                        <CheckBoxLabel>Wired</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="wired"
                                            value={micQty.wired}
                                            onChange={handleProjQtyChange}
                                            min="0"
                                            disabled={!micQty.wired}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
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
                                        <CheckBoxLabel>Wireless</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="wireless"
                                            value={micQty.wireless}
                                            onChange={handleProjQtyChange}
                                            min="0"
                                            disabled={!micQty.wireless}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>

                            <Divider />

                            <CheckContainer>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            id="speaker"
                                            name="speaker"
                                            value="speaker"
                                            checked={device.speaker}
                                            onChange={handleDeviceChange}
                                        />
                                        <CheckBoxLabel>Portable Speaker</CheckBoxLabel>
                                    </GridInput>
                                </GridInputWrapper>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
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
                                        <CheckBoxLabel htmlFor="small">Small</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="small"
                                            value={speakerQty.small}
                                            onChange={handleSpeakerQtyChange}
                                            min="0"
                                            disabled={!speakerQty.small}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
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
                                        <CheckBoxLabel htmlFor="big">Big</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="big"
                                            value={speakerQty.big}
                                            onChange={handleSpeakerQtyChange}
                                            min="0"
                                            disabled={!speakerQty.big}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>
                        </EquipmentGridWrapper>

                        {/* Accessories */}
                        <EquipmentGridWrapper>
                            <FormGridHeader>Accessories/Others</FormGridHeader>
                            <CheckContainer>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
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
                                        <CheckBoxLabel>Podium</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="podium"
                                            value={accessoriesQty.podium}
                                            onChange={handleAccessoriesQtyChange}
                                            min="0"
                                            disabled={!accessoriesQty.podium}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
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
                                        <CheckBoxLabel htmlFor="flags">Flags</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="flags"
                                            value={accessoriesQty.flags}
                                            onChange={handleAccessoriesQtyChange}
                                            min="0"
                                            disabled={!accessoriesQty.flags}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
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
                                        <CheckBoxLabel htmlFor="extensionWires">Extension Wires</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="extensionWires"
                                            value={accessoriesQty.extensionWires}
                                            onChange={handleAccessoriesQtyChange}
                                            min="0"
                                            disabled={!accessoriesQty.extensionWires}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
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
                                        <CheckBoxLabel htmlFor="speakerStand">Speaker Stand</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="speakerStand"
                                            value={accessoriesQty.speakerStand}
                                            onChange={handleAccessoriesQtyChange}
                                            min="0"
                                            disabled={!accessoriesQty.speakerStand}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
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
                                        <CheckBoxLabel htmlFor="micStand">Mic Stand</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="micStand"
                                            value={accessoriesQty.micStand}
                                            onChange={handleAccessoriesQtyChange}
                                            min="0"
                                            disabled={!accessoriesQty.micStand}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
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
                                        <CheckBoxLabel htmlFor="mixer">Mixer</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="mixer"
                                            value={accessoriesQty.mixer}
                                            onChange={handleAccessoriesQtyChange}
                                            min="0"
                                            disabled={!accessoriesQty.mixer}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
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
                                        <CheckBoxLabel htmlFor="clicker">Clicker</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="clicker"
                                            value={accessoriesQty.clicker}
                                            onChange={handleAccessoriesQtyChange}
                                            min="0"
                                            disabled={!accessoriesQty.clicker}
                                        />
                                    </GridInput>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            id="internetAccess"
                                            name="internetAccess"
                                            value="Internet Access"
                                        />
                                        <CheckBoxLabel htmlFor="internetAccess">Internet Access</CheckBoxLabel>
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>
                        </EquipmentGridWrapper>
                    </EquipmentGrid>

                    {/* Sports Equipment */}
                    <OthersInputWrapper>
                        <FormGridHeader>Sports Equipment</FormGridHeader>
                        <GridInputWrapper>
                            <FormInput
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
                            <FormInput
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
                            <FormInput
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
                        </GridInputWrapper>
                    </OthersInputWrapper>

                    {/* Others */}
                    <OthersInputWrapper>
                        <FormGridHeader>Others</FormGridHeader>
                        <GridInputWrapper>
                            <FormInput
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
                            <FormInput
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
                            <FormInput
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
                        </GridInputWrapper>
                    </OthersInputWrapper>
                </GridContainer>

                {/******************* Remarks/Special Instructions *******************/}
                <ChecklistHeader>Remarks/Special Instructions</ChecklistHeader>
                <Remarks>
                    <TextArea rows={4} />
                </Remarks>

                {/******************* Approval Section *******************/}
                <ApprovalSection>
                    <ApprovalSectionWrapper>
                        <ApprovalSectionLabel>
                            Prepared by:
                            <ApprovalSectionSpan>
                                <b>{user.fullname}</b>
                            </ApprovalSectionSpan>
                        </ApprovalSectionLabel>

                        <ApprovalSectionLabel style={{ borderBottom: "none" }}>
                            <ApprovalSectionFooter>Requester </ApprovalSectionFooter>
                        </ApprovalSectionLabel>
                    </ApprovalSectionWrapper>
                    <ApprovalSectionWrapper>
                        <ApprovalSectionLabel style={{ display: "flex" }}>
                            Recommended by:{" "}
                            <ApprovalSectionSpan>
                                <b>{currentDept}</b>
                            </ApprovalSectionSpan>
                        </ApprovalSectionLabel>

                        <ApprovalSectionLabel style={{ borderBottom: "none" }}>
                            <ApprovalSectionFooter>Adviser/Principal/Pgm Chair/Dean/Dept. Head</ApprovalSectionFooter>
                        </ApprovalSectionLabel>
                    </ApprovalSectionWrapper>
                    <ApprovalSectionWrapper>
                        <ApprovalSectionLabel>Verified by:</ApprovalSectionLabel>
                        <ApprovalSectionLabel style={{ borderBottom: "none" }}>
                            <ApprovalSectionFooter>Laboratory Assistant</ApprovalSectionFooter>
                        </ApprovalSectionLabel>
                    </ApprovalSectionWrapper>
                    <ApprovalSectionWrapper>
                        <ApprovalSectionLabel>Approved by:</ApprovalSectionLabel>
                        <ApprovalSectionLabel style={{ borderBottom: "none" }}>
                            <ApprovalSectionFooter>IFO-TLF Officer</ApprovalSectionFooter>
                        </ApprovalSectionLabel>
                    </ApprovalSectionWrapper>
                </ApprovalSection>

                {/* Divider and Finish Button */}
                <FinishButtonWrapper>
                    <Divider />
                    <FinsihButton onClick={handleSubmit}>Finish</FinsihButton>
                </FinishButtonWrapper>
            </FormContainer>
        </MainContainer>
    );
};

export default FacilitiesEquipments;
