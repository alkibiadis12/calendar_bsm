import React, { useEffect, useState } from "react";

//FixData fixes wrong EventEndDate, EventStartDate formats
//and sorts the data based on EventEndDate
export default function FixData(props) {
  const [isExecuted, setIsExecuted] = useState(false);

  useEffect(() => {
    if (!isExecuted) {
      //We fix wrong EventEndDate
      const fixedDateArray1 = props.data.map((element) => {
        if (element.EventEndDate.length > 20) {
          //we keep the first 20 chars and we replace
          //the 20th char ':' with Z to get valid format
          let fixedDate = "";
          fixedDate = element.EventEndDate.slice(0, 19);
          fixedDate = fixedDate + "Z";
          return { ...element, EventEndDate: fixedDate };
        } else if (element.EventEndDate.length < 20) {
          //SOS it doesn't happen with our Data but I should cover it
          return element;
        } else {
          return element;
        }
      });

      //We fix wrong EventStart
      const fixedDateArray2 = fixedDateArray1.map((element) => {
        if (element.EventStartDate.length > 20) {
          //we keep the first 20 chars and we replace
          //the 20th char ':' with Z to get valid format
          let fixedDate = "";
          fixedDate = element.EventStartDate.slice(0, 19);
          fixedDate = fixedDate + "Z";
          return { ...element, EventStartDate: fixedDate };
        } else if (element.EventStartDate.length < 20) {
          //SOS it doesn't happen with our Data but I should cover it
          return element;
        } else {
          return element;
        }
      });

      //We filter array and we keep only the upcoming events
      let dateNow = new Date().toISOString();
      const dummyArrayFiltered = fixedDateArray2.filter((el) => {
        return el.EventStartDate > dateNow;
      });

      //We sort the array based on EventStartDate
      dummyArrayFiltered.sort((a, b) => {
        const keyA = new Date(a.EventStartDate);
        const keyB = new Date(b.EventStartDate);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      //We pass the data
      props.onSendFixedData(dummyArrayFiltered);

      setIsExecuted(true);
    }
  }, [props, isExecuted]);

  return <React.Fragment></React.Fragment>;
}
