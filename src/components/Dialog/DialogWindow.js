import * as React from "react";
import { Dialog, DialogType } from "@fluentui/react/lib/Dialog";
import { useId } from "@fluentui/react-hooks";
import styles from "./DialogWindow.module.css";
import { useState } from "react";
import { initializeIcons } from "@fluentui/react/lib/Icons";
//display components
import EventPreview from "../DialogChildren/Preview";
import EventImage from "../DialogChildren/Image";
import EventDescription from "../DialogChildren/Description";
import DialogEventDateAndTime from "../DialogChildren/DateAndTime";
import DialogEventLocation from "../DialogChildren/Location";
import Footer from "../DialogChildren/Footer";

initializeIcons();

//************************************ */
//STYLES
//************************************ */
// const dialogStyles = {
//   root: {
//     backgroundColor: "rgb(243,242,241)",
//     width: "100%",
//     height: "100vh",
//     position: "relative",
//     margin: "0",
//   },
//   main: {
//     minWidth: "70% !important",
//     position: "absolute",
//     left: "50%",
//     top: "50%",
//     transform: "translate(-50%, -50%)",
//     borderRadius: "10px",
//     overflow: "hidden",
//   },
//   ".ms-Dialog-inner": { margin: "0 !important", padding: "0 !important" },
// };

const dialogStyles = {
  root: {
    backgroundColor: "rgb(243,242,241)",
    width: "100%",
    height: "100vh",
    position: "relative",
    margin: "0",
  },
  main: {
    minWidth: "70% !important",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    overflow: "hidden",
  },
};

//************************************ */
//COMPONENT
//************************************ */
const DialogWindow = (props) => {
  const [hideDialog, setHideDialog] = useState(false);

  //************************************ */
  //FLUENT UI REQUIRED
  //************************************ */
  const headerJSX = (
    <div className={styles.headerContainer}>
      <EventImage data={props.data} />
      <EventPreview data={props.data} />
    </div>
  );

  const dialogContentProps = {
    type: DialogType.close,
    title: headerJSX,
    showCloseButton: true,
  };

  const labelId = useId("dialogLabel");
  const subTextId = useId("subTextLabel");

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
    }),
    [labelId, subTextId]
  );

  //************************************ */
  // FUNCTIONS
  //************************************ */

  const toggleHideDialog = () => {
    setHideDialog(!hideDialog);
    props.onResetButton(false);
  };

  //************************************ */
  // JSX
  //************************************ */

  return (
    <div className='styles.reset'>
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <div className={styles.grid}>
          <EventDescription data={props.data} className={styles.desc} />

          <aside className={styles.date_time_loc_container}>
            <DialogEventDateAndTime data={props.data} onToggleButton={toggleHideDialog} />
            <DialogEventLocation data={props.data} />
          </aside>

          <Footer data={props.data} />
        </div>
      </Dialog>
    </div>
  );
};

//************************************ */
// EXPORTED FUNCTION
//************************************ */

export function isEmptyField(stringValue) {
  if (stringValue === "") {
    return true;
  } else {
    return false;
  }
}

export default DialogWindow;
