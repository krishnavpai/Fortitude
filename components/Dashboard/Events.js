import React, { useState } from "react";
import styles from "../../styles/Dashboard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const Events = () => {
  const [events, setEvents] = useState([
    { name: "Appointment with Dr. Pai", time: "12:30 Am" },
    { name: "Healthy Mind Event", time: "2:30 Am" },
  ]);
  const [chosen, setchosen] = useState("today");
  return (
    <div className={styles.events}>
      <div>
        <h1 className=" text-center">Events</h1>
      </div>
      <div className="p-3 pt-1 ">
        <div className="flex justify-content-around mb-2 ">
          <div
            className={chosen == "today" ? styles.chosen : ""}
            onClick={() => setchosen("today")}
          >
            Today
          </div>
          <div
            className={chosen == "upcoming" ? styles.chosen : ""}
            onClick={() => setchosen("upcoming")}
          >
            Upcoming
          </div>
        </div>
        <div className="flex flex-column gap-2 pt-2">
          {events.map((e) => {
            return (
              <div className="flex justify-content-between gap-2 align-items-center bg-[#eaeaea]/40 p-2 rounded-lg">
                <FontAwesomeIcon icon={faCalendar} />
                <div className="font-bold test-center">{e.name}</div>
                <div>{e.time}</div>
              </div>
            );
          })}
          {!events.length && (
            <div className="text-center p-4">No Upcoming events!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
