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
                    backgroundColor: "gray",
                }}
            >
                <div
                    style={{
                        width: "60%",
                        height: "60%",
                        backgroundColor: "white",
                        borderRadius: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <h2 style={{ textAlign: "center", padding: "20px" }}>
                            Hello, Mapúa Malayan!
                        </h2>
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
