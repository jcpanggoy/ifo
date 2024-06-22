import React from "react";
import styled from "styled-components";

const Timeline = () => {
    return (
        <>
            <section
                style={{
                    width: "100%",
                    maxWidth: "50vw",
                }}
            >
                <div class="calendar">
                    <div class="timeline">
                        <div class="spacer"></div>
                        <div class="time-marker">9 AM</div>
                        <div class="time-marker">10 AM</div>
                        <div class="time-marker">11 AM</div>
                        <div class="time-marker">12 PM</div>
                        <div class="time-marker">1 PM</div>
                        <div class="time-marker">2 PM</div>
                        <div class="time-marker">3 PM</div>
                        <div class="time-marker">4 PM</div>
                        <div class="time-marker">5 PM</div>
                        <div class="time-marker">6 PM</div>
                        <div class="time-marker">7 PM</div>
                        <div class="time-marker">8 PM</div>
                        <div class="time-marker">9 PM</div>
                    </div>
                    <div class="days">
                        <div class="day mon">
                            <div class="events">
                                <div class="event start-2 end-5 securities">
                                    <p class="title">R501</p>
                                    <p class="time">2 PM - 5 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Timeline;
