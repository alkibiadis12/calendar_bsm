import React from "react";
import styles from "./Image.module.css";
import { isEmptyField } from "../Dialog/DialogWindow";
import { useState } from "react";

export default function Image(props) {
  const { BannerUrl } = props.data;
  const [loadError, setLoadError] = useState(false);

  const errorHandler = () => {
    setLoadError(true);
  };

  let output = "";
  if (!loadError && !isEmptyField(BannerUrl)) {
    output = (
      <img
        src={BannerUrl}
        alt=''
        className={styles.image}
        width={800}
        height={600}
        onError={errorHandler}
      />
    );
  } else if (!loadError && isEmptyField(BannerUrl)) {
    output = (
      <div className={styles.no_image}>
        <span>No Image URL</span>
      </div>
    );
  } else if (loadError) {
    output = (
      <div className={styles.no_image}>
        <span>Error loading image</span>
      </div>
    );
  }

  return <header className={(styles.image_container, styles.loading)}>{output}</header>;
}
