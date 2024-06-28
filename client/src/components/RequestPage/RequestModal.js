import React from "react";
import styled from "styled-components";
import "./Requestpage.css";

const RequestModal = ({ handleCar, handleEquipment }) => {
    return (
        <>
            <section
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "gray",
                    background:
                        "linear-gradient(45deg, #0B0E4E, #0A3C8C, #FFFFFF, #D99C9A, #B51E1E, #8D1D1D)",
                    backgroundSize: "600% 600%",
                    animation: "gradientAnimation 15s ease infinite",
                }}
            >
                <div
                    style={{
                        width: "60%",
                        height: "60%",
                        backgroundColor: "#fafafa",
                        borderRadius: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <h2
                            style={{
                                fontStyle: "italic",
                                textAlign: "center",
                                padding: "20px",
                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            Hello, Mapúa Malayan!
                        </h2>

                        <div style={{ textAlign: "center" }}>
                            <p>
                                Through this system, you can easily book
                                facilities, equipments, or vehicles from the
                                school.
                                <br />
                                Simply select the type of resource you need and
                                complete the form.
                            </p>
                        </div>

                        <div
                            style={{
                                borderBottom: "1px solid lightgray",
                                width: "100%",
                                marginBottom: "20px",
                            }}
                        ></div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button
                                onClick={handleEquipment}
                                className="finish-button"
                            >
                                Facilities
                            </button>
                            <button
                                onClick={handleCar}
                                className="finish-button"
                            >
                                Vehicles
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RequestModal;
