import React, { useState } from "react";
import styled from "styled-components";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = () => {
    const [value, onChange] = useState(new Date());

    return (
        <>
            <section>
                <Calendar
                    value={value}
                    onChange={onChange}
                    calendarType="hebrew"
                />
            </section>
        </>
    );
};

export default CalendarComponent;
