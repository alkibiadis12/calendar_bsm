import React from "react";
import styles from "./DateAndTime.module.css";
import ICSlink from "./ICSlink";

export default function DateAndTime(props) {
  const { EventStartDate, FullDayEvent, EventEndDate } = props.data;

  //if the event is full day I won't need the time
  let formatStartDate = String(new Date(EventStartDate)).slice(0, 15);
  formatStartDate = formatStartDate.slice(0, 3) + ", " + formatStartDate.slice(4, 15);

  //If the event is not full day I will need the time
  let formatStartDateNoFullDay = String(new Date(EventStartDate)).slice(0, 21);
  formatStartDateNoFullDay =
    formatStartDateNoFullDay.slice(0, 3) + ", " + formatStartDateNoFullDay.slice(4, 21);

  let formatEndDate = String(new Date(EventEndDate)).slice(0, 21);
  formatEndDate = formatEndDate.slice(0, 3) + ", " + formatEndDate.slice(4, 21);

  return (
    <div className={styles.date_time_container}>
      <span className={styles.section_title}>DATE AND TIME</span>
      <span>
        {FullDayEvent === "TRUE"
          ? formatStartDate + " - Full Day Event"
          : formatStartDateNoFullDay + " - " + formatEndDate}
      </span>
      <ICSlink data={props.data} />
    </div>
  );
}
