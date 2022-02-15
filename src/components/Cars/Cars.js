import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Car from "../Car/Car.js";
import styles from "./Cars.module.css";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  async function getCars() {
    try {
      const response = await axios.get("/api/cars");
      const cars = response.data.slice(0,10);
      setCars(cars);
    } catch(error) { 
      setError(error.message);
      console.error(error);
    } 
  }

  useEffect(() => {
    getCars();
  }, []);

  if (error) return <div>{error}</div>
  else if (!cars.length > 0) return <div> Fetching... </div>
  else return (
    <ul className={styles.container}>
      { 
        cars.map(car => {
          return (
            <li key={car.index}> 
              <Car data={ car }/>
            </li>
          )
        })
      }
    </ul>
  )
}
