import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../img/MMCM_Logo.svg";

const CheckContainer = styled.div`
    display: flex;
    align-items: center;
`;

const FormContainer = styled.div`
    background-color: #fafafa;
    padding: 50px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
    background-color: #fafafa;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 20px;
`;

const Label = styled.label`
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: bold;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 24px;
`;

const PageContainer = styled.div`
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    padding: 20px;
    min-height: 100vh;
`;

const Requestpage = () => {
    const [requestorName, setRequestorName] = useState("");
    const [dept, setDept] = useState("");
    const [purpose, setPurpose] = useState("");
    const [dateOfFiling, setDateOfFiling] = useState("");
    const [dateOfUse, setDateOfUse] = useState("");
    const [timeOfUse, setTimeOfUse] = useState("");

    return (
        <PageContainer>
            <FormContainer>
                <div
                    style={{
                        display: "grid",
                        justifyContent: "center",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gridTemplateRows: "auto auto auto auto auto auto auto",
                        gap: "20px",
                        position: "relative",
                    }}
                >
                    {/* Logo */}
                    <div
                        style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                        }}
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ width: "100px", height: "auto" }}
                        />
                    </div>
                    {/* Revision No. and Date */}
                    <div
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            textAlign: "right",
                            fontSize: "20px",
                        }}
                    >
                        <p style={{ margin: "0" }}>
                            REVISION NO: <strong>002</strong>
                        </p>
                        <p style={{ margin: "0" }}>
                            REVISION DATE: <strong>30-Aug-23</strong>
                        </p>
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        justifyContent: "center",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gridTemplateRows: "auto auto auto auto auto auto auto",
                        gap: "20px",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            gridRowStart: "1",
                            gridColumn: "1 / span 3",
                            justifyItems: "center",
                            display: "grid",
                            gridTemplateColumns: "auto auto",
                            margin: "0",
                            padding: "0",
                        }}
                        className="requestForm"
                    >
                        <h1
                            style={{
                                gridColumn: "1 /span 2",
                                textAlign: "center",
                            }}
                        >
                            PERMIT TO USE FACILITIES AND EQUIPMENT
                        </h1>

                        {/* Instructions */}
                        <div>
                            <p
                                style={{
                                    fontSize: "16px",
                                }}
                            >
                                1. This form must be accomplished in 3 copies
                                prior to the use of any MMCM facilities. <br />
                                2. The use of such equipment/facilities is
                                subject to the discretion of MMCM. <br />
                                3. The requester shall be held accountable in
                                case of breakage and/or loss of items during the
                                time of use. <br />
                                The requester agrees to replace the item(s) with
                                the same brand or its equivalent. <br />
                                4. The requester must return the borrowed
                                item(s) at the end of the requested time of use.
                            </p>
                        </div>
                    </div>

                    <div style={{ marginLeft: "25px" }}>
                        <FormGroup>
                            <Label>Requester</Label>
                            <Input
                                value={requestorName}
                                onChange={(e) =>
                                    setRequestorName(e.target.value)
                                }
                                placeholder="Lastname, Firstname, Middle Initial"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Office/Dept/College</Label>
                            <Input
                                value={dept}
                                onChange={(e) => setDept(e.target.value)}
                                placeholder="e.g. CCIS"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Purpose</Label>
                            <Input
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                placeholder="e.g. Webinar"
                            />
                        </FormGroup>
                    </div>

                    <div>
                        <FormGroup>
                            <Label>Date of Filing</Label>
                            <Input
                                type="date"
                                value={dateOfFiling}
                                onChange={(e) =>
                                    setDateOfFiling(e.target.value)
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Date of Use</Label>
                            <Input
                                type="date"
                                value={dateOfUse}
                                onChange={(e) => setDateOfUse(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Time of Use</Label>
                            <Input
                                type="time"
                                value={timeOfUse}
                                onChange={(e) => setTimeOfUse(e.target.value)}
                            />
                        </FormGroup>
                    </div>

                    {/******************* Facilities Checklist *******************/}
                    <h2
                        style={{
                            gridRowStart: "3",
                            gridColumn: "1 / span 3",
                            textAlign: "left",
                            margin: "0",
                            padding: "0",
                            marginLeft: "25px",
                        }}
                    >
                        Facilities Checklist
                    </h2>

                    {/* School Building Contents */}
                    <div
                        style={{
                            gridRowStart: "4",
                            fontSize: "16px",
                            margin: "0",
                            padding: "0",
                            marginLeft: "25px",
                        }}
                    >
                        <div>
                            <h3>School Building</h3>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "auto auto",
                                    gridTemplateRows: "50px 50px 50px",
                                    alignContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Lecture Room</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Drawing Room</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Computer Lab</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Physics Lab</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Chemistry Lab</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Engineering Lab</label>
                                </CheckContainer>
                            </div>
                        </div>
                    </div>

                    {/* Others Contents */}
                    <div
                        style={{
                            gridRowStart: "4",
                            gridColumnStart: "3",
                            fontSize: "16px",
                            margin: "0",
                            padding: "0",
                            marginLeft: "25px",
                        }}
                    >
                        <div>
                            <h3>Others</h3>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "auto auto",
                                    gridTemplateRows: "50px 50px 50px 50px",
                                    alignContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Playcourt 1</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Playcourt 2</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Playcourt 3</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Playcourt 4</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Playcourt Room 1</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Playcourt Room 2</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Volleyball Court</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Futsal</label>
                                </CheckContainer>
                            </div>
                        </div>
                    </div>

                    {/* Admin Building Contents */}
                    <div
                        style={{
                            gridRowStart: "4",
                            gridColumnStart: "2",
                            fontSize: "16px",
                            margin: "0",
                            padding: "0",
                            marginLeft: "25px",
                        }}
                    >
                        <div>
                            <h3>Admin Building</h3>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "150px auto",
                                    gridTemplateRows: "50px 50px 50px 50px",
                                    alignContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Auditorium 1</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Auditorium 2</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Auditorium 3</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Seminar Room 1</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Seminar Room 2</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Seminar Room 3</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <input type="checkbox" />
                                    <label>Plaza</label>
                                </CheckContainer>
                                <CheckContainer>
                                    <Input placeholder="Others, please specify" />
                                </CheckContainer>
                            </div>
                        </div>
                    </div>

                    {/******************* Equipment Checklist *******************/}
                    <h2
                        style={{
                            gridRowStart: "5",
                            gridColumn: "1 / span 3",
                            textAlign: "left",
                            margin: "0",
                            padding: "0",
                            marginLeft: "25px",
                        }}
                    >
                        Equipment Checklist
                    </h2>

                    {/* Equipment Checklists DIV */}
                    <div
                        style={{
                            gridRowStart: "6",
                            gridColumn: "1 / span 3",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gridGap: "20px",
                            marginLeft: "25px",
                        }}
                    >
                        {/* Furnitures */}
                        <div
                            style={{
                                fontSize: "16px",
                                margin: "0",
                                padding: "0",
                            }}
                        >
                            <h3>Furnitures</h3>
                            <div>
                                <input type="checkbox" />
                                <label>chairs</label>
                                <ul>
                                    <li>rabami</li>
                                    <li>monobloc</li>
                                    <li>stool</li>
                                </ul>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>tables</label>
                                <ul>
                                    <li>trapezoid</li>
                                    <li>training (long)</li>
                                    <li>round (small, big)</li>
                                    <li>foldable (small)</li>
                                    <li>cocktail (small)</li>
                                </ul>
                            </div>
                        </div>

                        {/* Audio Visual */}
                        <div
                            style={{
                                fontSize: "16px",
                                margin: "0",
                                padding: "0",
                            }}
                        >
                            <h3>Audio Visual</h3>
                            <div>
                                <input type="checkbox" />
                                <label>TV</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>Computer</label>
                                <ul>
                                    <li>Windows</li>
                                    <li>MAC</li>
                                </ul>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>Projector</label>
                                <ul>
                                    <li>Wired Microphone</li>
                                    <li>Wireless Microphone</li>
                                </ul>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>Portable Speaker</label>
                                <ul>
                                    <li>Small</li>
                                    <li>Big</li>
                                </ul>
                            </div>
                        </div>

                        {/* Accessories */}
                        <div
                            style={{
                                fontSize: "16px",
                                margin: "0",
                                padding: "0",
                            }}
                        >
                            <h3>Accessories/Others</h3>
                            <div>
                                <input type="checkbox" />
                                <label>podium</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>flags</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>extension wires</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>speaker stand</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>mic stand</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>mixer</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>clicker</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>Internet access</label>
                            </div>
                        </div>

                        {/* Sports Equipment */}
                        <div
                            style={{
                                fontSize: "16px",
                                margin: "0",
                                padding: "0",
                            }}
                        >
                            <h3>Sports Equipment</h3>
                            <div style={{ margin: "5px" }}>
                                <Input placeholder="Equipment 1" />
                            </div>
                            <div style={{ margin: "5px" }}>
                                <Input placeholder="Equipment 2" />
                            </div>
                            <div style={{ margin: "5px" }}>
                                <Input placeholder="Equipment 3" />
                            </div>
                        </div>

                        {/* Others */}
                        <div
                            style={{
                                fontSize: "16px",
                                margin: "0",
                                padding: "0",
                            }}
                        >
                            <h3>Others</h3>
                            <div style={{ margin: "5px" }}>
                                <Input placeholder="Please specify" />
                            </div>
                            <div style={{ margin: "5px" }}>
                                <Input placeholder="Please specify" />
                            </div>
                            <div style={{ margin: "5px" }}>
                                <Input placeholder="Please specify" />
                            </div>
                        </div>

                        <div
                            style={{
                                fontSize: "16px",
                                width: "300px",
                                gridColumn: "3",
                                // marginLeft: "25px",
                            }}
                        >
                            <p>
                                <i>
                                    Note: For activities/events requiring chairs
                                    and tables, please submit a floor
                                    plan/layout together with this form.
                                </i>
                            </p>
                        </div>
                    </div>

                    {/******************* Remarks/Special Instructions *******************/}
                    <h2
                        style={{
                            gridRowStart: "9",
                            gridColumn: "1 / span 3",
                            textAlign: "left",
                            margin: "0",
                            padding: "0",
                            marginLeft: "25px",
                        }}
                    >
                        Remarks/Special Instructions
                    </h2>
                    <div
                        style={{
                            gridRowStart: "10",
                            gridColumn: "1 / span 3",
                            padding: "10px 0",
                            marginLeft: "25px",
                        }}
                    >
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
<div
    style={{
        gridRowStart: "11",
        gridColumn: "1 / span 3",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        padding: "10px 0",
        fontSize: "16px",
        marginLeft: "25px",
    }}
>
    <div>
        <label>Prepared by:</label>
        <div
            style={{
                borderBottom: "1px solid black",
                padding: "8px 0",
                width: "95%",
            }}
        ></div>
        <p>Requester</p>
    </div>
    <div>
        <label>Recommended by:</label>
        <div
            style={{
                borderBottom: "1px solid black",
                padding: "8px 0",
                width: "95%",
            }}
        ></div>
        <p>Adviser/Principal/Pgm Chair/Dean/Dept. Head</p>
    </div>
    <div>
        <label>Verified by:</label>
        <div
            style={{
                borderBottom: "1px solid black",
                padding: "8px 0",
                width: "95%",
            }}
        ></div>
        <p>Laboratory Assistant</p>
    </div>
    <div>
        <label>Approved by:</label>
        <div
            style={{
                borderBottom: "1px solid black",
                padding: "8px 0",
                width: "95%",
            }}
        ></div>
        <p>IFO-TLF Officer</p>
    </div>
</div>

{/* Divider and Finish Button */}
<div
    style={{
        gridRowStart: "12",
        gridColumn: "1 / span 3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px",
    }}
>
    <div
        style={{
            borderBottom: "1px solid lightgray",
            width: "95%",
            marginBottom: "20px",
        }}
    ></div>
    <button
        style={{
            backgroundColor: "#144691",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
        }}
    >
        Finish
    </button>

                    </div>
                </div>
            </FormContainer>
        </PageContainer>
    );
};

export default Requestpage;
