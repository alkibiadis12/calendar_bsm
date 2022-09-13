import React from "react";
import ReactHtmlParser from "react-html-parser";
import { isEmptyField } from "../Dialog/DialogWindow";
import styles from "./Description.module.css";

export default function Description(props) {
  const { Description } = props.data;

  return (
    <main className={isEmptyField(Description) ? styles.no_desc : ""}>
      {!isEmptyField(Description) ? (
        <article className={`${styles.desc} `}>
          <header>
            <span className={styles.desc_section_title}>DESCRIPTION</span>
          </header>

          <div className={styles.parsedContainer}>{ReactHtmlParser(Description)}</div>
        </article>
      ) : (
        <div>
          <span>No Description</span>
        </div>
      )}
    </main>
  );
}
