import React from "react";
import styles from "./Cars.module.css";
import Car from "../Car/Car.js";

export default function Cars({cars}) {
  return (
    <ul className={styles.carsContainer}>
      { 
        cars.map(car => {
          return (
            <li key={car.id}> 
              <Car data={ car }/>
            </li>
          )
        })
      }
    </ul>
  )
}
