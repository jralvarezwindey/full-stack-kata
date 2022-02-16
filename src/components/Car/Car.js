import React from "react";
import styles from "./Car.module.css";

export default function Car({data}) {
  const { model, make, year, color, thumbnail, isSeparator } = data;
  if (isSeparator) {
    return (
      <div className={styles.separatorContainer}> 
        <span id={styles.separatorMake}> 
          { make } 
        </span>
      </div>
    )
  } else return (
    <div className={styles.container}> 
      <header className={styles.header}> 
        { model } 
      </header>

      <img src={thumbnail} alt="car"/>

      <div className={styles.footer}>
        <span id={styles.make}> { make } </span>
        <span id={styles.year}> { year } </span>
        <span id={styles.color}> { color } </span>
      </div>
    </div>
  )
}
