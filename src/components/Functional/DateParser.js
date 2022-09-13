import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const relativeTime = require("dayjs/plugin/relativeTime");
//Using strict time values!
const config = {
  thresholds: [
    { l: "s", r: 59, d: "second" },
    { l: "m", r: 1 },
    { l: "mm", r: 59, d: "minute" },
    { l: "h", r: 1 },
    { l: "hh", r: 23, d: "hour" },
    { l: "d", r: 1 },
    { l: "dd", r: 29, d: "day" },
    { l: "M", r: 1 },
    { l: "MM", r: 11, d: "month" },
    { l: "y" },
    { l: "yy", d: "year" },
  ],
  rounding: Math.floor,
};

dayjs.extend(relativeTime, config);

//Exported function
export function dateFullformat(stringDate) {
  const newStringDate = new Date(stringDate);
  return dayjs(String(newStringDate.toISOString()).slice(0, 10)).format("DD/MM/YYYY");
}

export default function DateParser(props) {
  const [output, setOutput] = useState(props.date);

  useEffect(() => {
    let eventDate = props.date;
    //****** */
    //For testing purposes
    // let eventDate = "2022-09-11T12:44:10Z";
    //****** */
    const timeToX = dayjs().to(new Date(eventDate));

    //We check if the remaining time before the event is under a day
    let secMinHours = false; //seconds minutes and hours
    if (timeToX.includes("second") || timeToX.includes("minute") || timeToX.includes("hour")) {
      secMinHours = true;
      //We use friendly format
      setOutput(timeToX);
    }

    //timeToX format is like this string --> 'in 3 days'
    //All the formats --> https://day.js.org/docs/en/customization/relative-time
    //In the following code I get the number of days from the string
    let numOfDays = "";
    if (timeToX.includes("day")) {
      [, numOfDays, ,] = timeToX.split(" ");
      //When a day remains it will display 'in a day'. We cover this case
      if (numOfDays === "a") {
        numOfDays = 1;
      }

      //If the upcoming event is coming in less than a week
      //we keep the friendly format
      if (Number(numOfDays) <= 7) {
        setOutput(timeToX);
      } else {
        //If the upcoming event is coming in MORE than a week
        //we change to full format fe --> 23/09/2022
        setOutput(dateFullformat(eventDate));
      }
    }

    //We change format of upcoming events which are coming after months or years
    //to the full format fe --> 23/09/2022
    if (numOfDays === "" && secMinHours === false) {
      setOutput(dateFullformat(eventDate));
    }
  }, [props]);

  return <React.Fragment>{output}</React.Fragment>;
}
