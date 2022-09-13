import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import DateParser from "../Functional/DateParser";
import styles from "./EventItem.module.css";
import DialogWindow from "../Dialog/DialogWindow";

export default function EventItem(props) {
  const { Title, EventStartDate } = props.data;
  const [isDatePassed, setIsDatePassed] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  //checks if the date of an event has passed
  const checkDateHandler = (isPassed) => {
    setIsDatePassed(isPassed);
  };

  const buttonHandler = () => {
    setButtonClicked(true);
  };

  const resetButtonHandler = (isReset) => {
    setButtonClicked(isReset);
  };

  //If the date has passed it returns an empty fragment
  //Else it returns the upcoming event
  if (isDatePassed) {
    return <React.Fragment></React.Fragment>;
  } else {
    return (
      <React.Fragment>
        <li className={styles.list_item}>
          <button onClick={buttonHandler} className={styles.link}>
            <span>
              {Title + " - "}

              <DateParser date={EventStartDate} onCheckDate={checkDateHandler} />
            </span>
          </button>
        </li>
        {buttonClicked &&
          ReactDOM.createPortal(
            <DialogWindow
              hidden={!buttonClicked}
              onResetButton={resetButtonHandler}
              data={props.data}
            />,
            document.querySelector("#dialog-root")
          )}
      </React.Fragment>
    );
  }
}
