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
    FullDayEvent,
    Category,
  } = props.data;

  const fixDesc = (description) => {
    //in the 1st regexp we remove the extra spaces, tabs
    //in the second we remove the new lines!
    return description.replace(/\s\s+/g, " ").replace(/[\r\n]/gm, "");
  };

  const event = {
    title: Title,
    startTime: EventStartDate,
    endTime: EventEndDate,
    location: AddressLine1 + ", " + City + ", " + PostCode + ", " + Country,
  };

  if (FullDayEvent === "TRUE") {
    /*In order for the all day event to work in calendar
     we need to have no endTime field and also
     instead of  the following format -> DTSTART: 20221223T200000Z we need
     --> DTSTART;VALUE=DATE:20221223
     SO I GIVE AN INVALID VALUE TO startTime and I overwrite it 
     in the rawContent */
    delete event.endTime;
    event.startTime = " ";
  }

  const rawContent = `X-ALT-DESC;FMTTYPE=text/html: ${fixDesc(
    Description
  )}\nCATEGORIES:${Category}\nDTSTART;VALUE=DATE:${EventStartDate.slice(0, 10).replaceAll(
    "-",
    ""
  )}`;

  return (
    <ICalendarLink rawContent={rawContent} event={event} className={styles.btn}>
      Add to Calendar
    </ICalendarLink>
  );
}
