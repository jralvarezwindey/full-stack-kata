import React from "react";
import styles from "./Car.module.css";

export default function Car(props) {
  const { model, make, year, color, thumbnail } = props.data
  return (
    <div className={styles.container}> 
      <header className={styles.header}> 
        { model } 
      </header>
      <img src={thumbnail} alt="car"/>
      <div className={styles.footer}>
        <div id={styles.make}> 
          { make } 
        </div>
        <div id={styles.year}> 
          { year } 
        </div>
        <div id={styles.color}> 
          { color } 
        </div>
      </div>
    </div>
  )
}
