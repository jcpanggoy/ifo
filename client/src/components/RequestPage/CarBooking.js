import React, { useState, useEffect } from "react";
import "./Requestpage.css";
import logo from "../../img/MMCM_Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLessThan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import styled from "styled-components";

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

const CarBooking = ({ user, disableCarWindow, currentDept }) => {
    console.log(currentDept);

    const [requestorName, setRequestorName] = useState("");
    const [dept, setDept] = useState("");
    const [purpose, setPurpose] = useState("");
    const [dateOfUse, setDateOfUse] = useState("");
    const [timeOfUseStart, setTimeOfUseStart] = useState("");
    const [timeOfUseEnd, setTimeOfUseEnd] = useState("");
    const [conflicts, setConflicts] = useState([]);

    const [carsQty, setCarsQty] = useState({
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

    const [isFacilityDisabled, setIsFacilityDisabled] = useState({
        civic: false,
        corolla: false,
        bmw: false,
        sienna: false,
        odyssey: false,
        transit: false,
        transitBus: false,
        express: false,
        tLiner: false,
    });

    const handleCarsQtyChange = (e) => {
        const { name, value, type, checked } = e.target;
        const [carType, carModel] = name.split("_");
        console.log(carType);
        console.log(carModel);

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

            user: user.fullname,
            ticket: 1,
            carsQty,
        };

        try {
            const response = await fetch("http://172.20.10.11:4000/saveCRequest", {
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
            // ...parseAndFilter(req.schoolBuilding),
            // ...parseAndFilter(req.others),
            // ...parseAndFilter(req.adminBuilding),
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
            ...parseAndFilter(req.carsQty),
        ];

        if (allDetails.length === 0) {
            return "N/A";
        }

        // allDetails.map(([key, value]) => console.log(value[0]));

        return (
            <RequestDetails>
                {allDetails.map(([key, value]) => (
                    <Span key={key}>
                        {Object.entries(value).map(([key, item]) => (
                            <>
                                {key} : {item.qty}
                            </>
                        ))}
                    </Span>
                ))}
            </RequestDetails>
        );
    };

    useEffect(() => {
        setDept(user.dept);
        setRequestorName(user.fullname);

        const fetchCurrentDateSchedules = async () => {
            try {
                const response = await axios.post("http://172.20.10.11:4000/api/getCurrentDateShedCar", {
                    dateOfUse,
                });

                if (response.data && response.data.length > 0) {
                    setConflicts(response.data);
                } else {
                    setConflicts([]);

                    setIsFacilityDisabled({
                        civic: false,
                        corolla: false,
                        bmw: false,
                        sienna: false,
                        odyssey: false,
                        transit: false,
                        transitBus: false,
                        express: false,
                        tLiner: false,
                    });
                }
            } catch (error) {
                console.error("There was an error checking for conflicts:", error);
            }
        };

        const disableFacilitiesInUse = () => {
            conflicts.forEach((item) => {
                if (timeOfUseStart === item.timeOfUseStart) {
                    const itemOthers = JSON.parse(item.carsQty);
                    let merged = { ...itemOthers };

                    setIsFacilityDisabled((prevState) => ({
                        ...prevState,
                        ...merged,
                    }));
                } else {
                    setIsFacilityDisabled({
                        civic: false,
                        corolla: false,
                        bmw: false,
                        sienna: false,
                        odyssey: false,
                        transit: false,
                        transitBus: false,
                        express: false,
                        tLiner: false,
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
                        onClick={disableCarWindow}
                    />
                    <HeaderLogo
                        src={logo}
                        alt="Logo"
                    />
                </FormHeader>

                <GridContainer>
                    <RequestForm>
                        <RequestFormHeader>PERMIT TO USE VEHICLES</RequestFormHeader>

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
                                value={user.dept}
                                onChange={(e) => setDept(e.target.value)}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Purpose</FormLabel>
                            <FormInput
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                placeholder="e.g. Outreach Program"
                            />
                        </FormGroup>
                    </FormGroupContainer>

                    <FormGroupContainer>
                        <FormGroup>
                            <FormGroup>Date of Filing</FormGroup>
                            <FormInput
                                type="date"
                                value={dateOfFiling}
                                onChange={(e) => setDateOfFiling(e.target.value)}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormGroup>Date of Use</FormGroup>
                            <FormInput
                                type="date"
                                value={dateOfUse}
                                min={getMinDateOfUse(dateOfFiling)}
                                onChange={(e) => setDateOfUse(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormGroup>Time of Use (Start)</FormGroup>
                            <FormInput
                                type="time"
                                value={timeOfUseStart}
                                onChange={(e) => setTimeOfUseStart(e.target.value)}
                                step={1}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormGroup>Time of Use (End)</FormGroup>
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

                    {/******************* Vehicles Checklist *******************/}
                    <ChecklistHeader>Vehicles Checklist</ChecklistHeader>

                    {/* Vehicles Checklists DIV */}
                    <EquipmentGrid>
                        {/* Sedan */}
                        <EquipmentGridWrapper>
                            <FormGridHeader>Sedan</FormGridHeader>
                            {/*---------- CIVIC -----------------*/}
                            <CheckContainer>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            name="sedan_civic"
                                            checked={carsQty.sedan.civic.checked}
                                            onChange={handleCarsQtyChange}
                                        />
                                        <CheckBoxLabel>Civic</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="sedan_civic"
                                            value={carsQty.sedan.civic.qty}
                                            onChange={handleCarsQtyChange}
                                            min="0"
                                            disabled={!carsQty.sedan.civic.checked}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>
                            {/* ----------Corolla----------- */}

                            <CheckContainer>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            name="sedan_corolla"
                                            checked={carsQty.sedan.corolla.checked}
                                            onChange={handleCarsQtyChange}
                                        />
                                        <CheckBoxLabel>Toyota Corolla</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="sedan_corolla"
                                            value={carsQty.sedan.corolla.qty}
                                            onChange={handleCarsQtyChange}
                                            min="0"
                                            disabled={!carsQty.sedan.corolla.checked}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>

                            {/* -------------------------------- */}
                            <CheckContainer>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            name="sedan_bmw"
                                            checked={carsQty.sedan.bmw.checked}
                                            onChange={handleCarsQtyChange}
                                        />
                                        <CheckBoxLabel>BMW 3 Series</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="sedan_bmw"
                                            value={carsQty.sedan.bmw.qty}
                                            onChange={handleCarsQtyChange}
                                            min="0"
                                            disabled={!carsQty.sedan.bmw.checked}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>
                        </EquipmentGridWrapper>

                        {/* Van */}
                        <EquipmentGridWrapper>
                            <FormGridHeader>Van</FormGridHeader>
                            <CheckContainer>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            name="van_sienna"
                                            checked={carsQty.van.sienna.checked}
                                            onChange={handleCarsQtyChange}
                                        />
                                        <CheckBoxLabel>Toyota Sienna</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="van_sienna"
                                            value={carsQty.van.sienna.qty}
                                            onChange={handleCarsQtyChange}
                                            min="0"
                                            disabled={!carsQty.van.sienna.checked}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>
                            <CheckContainer>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            name="van_odyssey"
                                            checked={carsQty.van.odyssey.checked}
                                            onChange={handleCarsQtyChange}
                                        />
                                        <CheckBoxLabel>Honda Odyssey</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="van_odyssey"
                                            value={carsQty.van.odyssey.qty}
                                            onChange={handleCarsQtyChange}
                                            min="0"
                                            disabled={!carsQty.van.odyssey.checked}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>
                            <CheckContainer>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            name="van_transit"
                                            checked={carsQty.van.transit.checked}
                                            onChange={handleCarsQtyChange}
                                        />
                                        <CheckBoxLabel>Ford Transit</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="van_transit"
                                            value={carsQty.van.transit.qty}
                                            onChange={handleCarsQtyChange}
                                            min="0"
                                            disabled={!carsQty.van.transit.checked}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>
                        </EquipmentGridWrapper>

                        {/* Bus */}
                        <EquipmentGridWrapper>
                            <FormGridHeader>Bus</FormGridHeader>
                            <CheckContainer>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            name="bus_transitBus"
                                            checked={carsQty.bus.transitBus.checked}
                                            onChange={handleCarsQtyChange}
                                        />
                                        <CheckBoxLabel>Ford Transit Bus</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="bus_transitBus"
                                            value={carsQty.bus.transitBus.qty}
                                            onChange={handleCarsQtyChange}
                                            min="0"
                                            disabled={!carsQty.bus.transitBus.checked}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>
                            <CheckContainer>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            name="bus_express"
                                            checked={carsQty.bus.express.checked}
                                            onChange={handleCarsQtyChange}
                                        />
                                        <CheckBoxLabel>Chevrolet Express</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="bus_express"
                                            value={carsQty.bus.express.qty}
                                            onChange={handleCarsQtyChange}
                                            min="0"
                                            disabled={!carsQty.bus.express.checked}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>
                            <CheckContainer>
                                <GridInputWrapper>
                                    <GridInput>
                                        <CheckBox
                                            type="checkbox"
                                            name="bus_tLiner"
                                            checked={carsQty.bus.tLiner.checked}
                                            onChange={handleCarsQtyChange}
                                        />
                                        <CheckBoxLabel>T-Built Saf-T-Liner</CheckBoxLabel>
                                        <QuantityInput
                                            type="number"
                                            name="bus_tLiner"
                                            value={carsQty.bus.tLiner.qty}
                                            onChange={handleCarsQtyChange}
                                            min="0"
                                            disabled={!carsQty.bus.tLiner.checked}
                                        />
                                    </GridInput>
                                </GridInputWrapper>
                            </CheckContainer>
                        </EquipmentGridWrapper>
                    </EquipmentGrid>

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
                                <ApprovalSectionFooter>
                                    Adviser/Principal/Pgm Chair/Dean/Dept. Head
                                </ApprovalSectionFooter>
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
                </GridContainer>
            </FormContainer>
        </MainContainer>
    );
};

export default CarBooking;
