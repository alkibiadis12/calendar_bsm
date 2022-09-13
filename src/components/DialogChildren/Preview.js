import React from "react";
import { isEmptyField } from "../Dialog/DialogWindow";
import styles from "./Preview.module.css";

export default function Preview(props) {
  const { EventStartDate, Title, Category } = props.data;
  return (
    <header className={styles.event_preview}>
      <div className={styles.event_start_date}>
        <span>
          {new Date(EventStartDate)
            .toLocaleString("en-US", { month: "long" })
            .slice(0, 3)
            .toUpperCase()}
        </span>
        <span>{EventStartDate.slice(5, 7)}</span>
      </div>
      {!isEmptyField(Title) ? (
        <h2 className={styles.title}>{Title}</h2>
      ) : (
        <h2 className={styles.title}>No Title</h2>
      )}
      {!isEmptyField(Category) ? (
        <span className={styles.category}>{Category}</span>
      ) : (
        <span className={styles.category}>No category</span>
      )}
    </header>
  );
}
