import React from "react";
import ICalendarLink from "react-icalendar-link";
import styles from "./ICSlink.module.css";

export default function ICSlink(props) {
  const {
    Title,
    Description,
    EventEndDate,
    EventStartDate,
    AddressLine1,
    City,
    PostCode,
    Country,
  } = props.data;

  const fixDesc = (description) => {
    //we remove the html tags from the description with the 1st reg exp
    //we the second regexp we remove the extra spaces, tabs
    //the 3rd removes the new lines!
    return description
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\s\s+/g, " ")
      .replace(/[\r\n]/gm, "");
  };

  const event = {
    title: Title,
    description: fixDesc(Description),
    startTime: EventStartDate,
    endTime: EventEndDate,
    location: AddressLine1 + ", " + City + ", " + PostCode + ", " + Country,
  };

  return (
    <ICalendarLink event={event} className={styles.btn}>
      Add to Calendar
    </ICalendarLink>
  );
}
