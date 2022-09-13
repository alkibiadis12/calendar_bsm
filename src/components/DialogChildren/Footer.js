import React from "react";
import styles from "./Footer.module.css";
import { isEmptyField } from "../Dialog/DialogWindow";
import { dateFullformat } from "../Functional/DateParser";

export default function Footer(props) {
  const { Author, Editor, Created, Modified } = props.data;

  //it removes unicode block character
  //it is used in author and creator
  const removeUnicodeBlock = (text) => {
    return text.replace(/[\u{0080}-\u{FFFF}]/gu, "");
  };

  const createdByJSX = !isEmptyField(Author) ? (
    <span>
      Created by {removeUnicodeBlock(Author)} on {dateFullformat(Created)} at{" "}
      {Created.slice(11, 16)}
    </span>
  ) : (
    <span>
      Created by unknown author on {dateFullformat(Created)} at {Created.slice(11, 16)}
    </span>
  );

  let modifiedByJSX = "";
  if (!isEmptyField(Editor) && !isEmptyField(Modified)) {
    modifiedByJSX = (
      <span>
        Modified by {removeUnicodeBlock(Editor)} on {dateFullformat(Modified)} at{" "}
        {Modified.slice(11, 16)}
      </span>
    );
  } else if (isEmptyField(Editor) && !isEmptyField(Modified)) {
    modifiedByJSX = (
      <span>
        Modified by unknown editor on {dateFullformat(Modified)} at {Modified.slice(11, 16)}
      </span>
    );
  } else if (!isEmptyField(Editor) && isEmptyField(Modified)) {
    modifiedByJSX = <span>Modified by {removeUnicodeBlock(Editor)}</span>;
  }

  return (
    <footer className={styles.footer_style}>
      {createdByJSX}
      {modifiedByJSX}
    </footer>
  );
}
