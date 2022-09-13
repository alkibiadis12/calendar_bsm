import React from "react";
import styles from "./Location.module.css";
import { isEmptyField } from "../Dialog/DialogWindow";

export default function Location(props) {
  const { AddressLine1, AddressLine2, City, PostCode, Country } = props.data;
  const mapLink = String(AddressLine1 + " " + City + " " + PostCode + " " + Country)
    .replaceAll("  ", " ")
    .replaceAll(",", "%2C")
    .replaceAll(" ", "+");
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + mapLink;

  return (
    <div className={styles.loc_container}>
      <span className={styles.section_title}>LOCATION</span>
      <div className={styles.loc_container__span}>
        {!isEmptyField(AddressLine1) && <span className={styles.loc_span}>{AddressLine1}</span>}
        {!isEmptyField(AddressLine2) && <span className={styles.loc_span}>{AddressLine2}</span>}
        {!isEmptyField(City) && <span className={styles.loc_span}>{City}</span>}
        {!isEmptyField(PostCode) && <span className={styles.loc_span}>{PostCode}</span>}
        {!isEmptyField(Country) && <span className={styles.loc_span}>{Country}</span>}
      </div>
      {!isEmptyField(AddressLine1) &&
        !isEmptyField(City) &&
        !isEmptyField(PostCode) &&
        !isEmptyField(Country) && (
          <a href={mapUrl} className={styles.link}>
            View Map
          </a>
        )}
    </div>
  );
}
