import React, { useState } from "react";
import "./Requestpage.css";
import FacilitiesEquipments from "./FacilitiesEquipments";
import RequestModal from "./RequestModal";
import CarBooking from "./CarBooking";
import { useLocation } from "react-router-dom";

const Requestpage = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [showEquipment, setShowEquipment] = useState(false);
    const [showCar, setShowCar] = useState(false);
    const location = useLocation();
    const user = location.state?.user;
    console.log(user);

    const handleModal = () => {
        setIsModalVisible((prev) => !prev);
    };

    const handleEquipment = () => {
        setShowEquipment((prev) => !prev);
        handleModal();
    };

    const handleCar = () => {
        setShowCar((prev) => !prev);
        handleModal();
    };

    const disableCarWindow = () => {
        setShowCar(false);
        setShowEquipment(false);
        setIsModalVisible(true);
    };

    const disableFacilitiesWindow = () => {
        setShowCar(false);
        setShowEquipment(false);
        setIsModalVisible(true);
    };

    return (
        <>
            {isModalVisible && (
                <RequestModal
                    handleCar={handleCar}
                    handleEquipment={handleEquipment}
                />
            )}
            {showCar && (
                <CarBooking
                    user={user}
                    disableCarWindow={disableCarWindow}
                />
            )}
            {showEquipment && (
                <FacilitiesEquipments
                    user={user}
                    disableFacilitiesWindow={disableFacilitiesWindow}
                />
            )}
        </>
    );
};

export default Requestpage;
