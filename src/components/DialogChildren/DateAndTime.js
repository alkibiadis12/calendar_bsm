import React from "react";
import styles from "./DateAndTime.module.css";
import ICSlink from "./ICSlink";

export default function DateAndTime(props) {
  const { EventStartDate, FullDayEvent, EventEndDate } = props.data;

  let formatStartDate = String(new Date(EventStartDate)).slice(0, 15);
  formatStartDate = formatStartDate.slice(0, 3) + ", " + formatStartDate.slice(4, 15);

  let formatEndDate = String(new Date(EventEndDate)).slice(0, 21);
  formatEndDate = formatEndDate.slice(0, 3) + ", " + formatEndDate.slice(4, 21);

  return (
    <div className={styles.date_time_container}>
      <span className={styles.section_title}>DATE AND TIME</span>
      <span>
        {formatStartDate + " - "} {FullDayEvent ? "Full Day Event" : formatEndDate}
      </span>
      <ICSlink data={props.data} />
    </div>
  );
}
