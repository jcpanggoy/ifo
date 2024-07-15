import React, { useEffect, useState } from "react";
import "./Requestpage.css";
import FacilitiesEquipments from "./FacilitiesEquipments";
import RequestModal from "./RequestModal";
import CarBooking from "./CarBooking";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Requestpage = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [showEquipment, setShowEquipment] = useState(false);
    const [showCar, setShowCar] = useState(false);
    const location = useLocation();
    const user = location.state?.user;
    const [currentDept, setCurrentDept] = useState();
    console.log("Requests: " + user.fullname);

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

    const adminOtentification = () => {
        axios
            .post("http://172.20.10.11:4000/getDeanForUser", {
                dept: user.dept,
            })
            .then((res) => {
                const test = res.data;

                if (Array.isArray(test) && test.length > 0) {
                    const deanName = test[0].fullname;
                    console.log("Dean's fullname:", deanName);
                    setCurrentDept(deanName);
                } else {
                    console.log("Dean not found or response is not in expected format.");
                }
            })
            .catch((error) => {
                console.error("There was an error fetching the dean!", error);
            });
    };

    useEffect(() => {
        adminOtentification();
    }, []);

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
                    currentDept={currentDept}
                />
            )}
            {showEquipment && (
                <FacilitiesEquipments
                    user={user}
                    disableFacilitiesWindow={disableFacilitiesWindow}
                    currentDept={currentDept}
                />
            )}
        </>
    );
};

export default Requestpage;
