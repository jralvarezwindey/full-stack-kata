import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import Cars from "../Cars/Cars.js";
import Paginator from "../Paginator/Paginator.js";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [error, setError] = useState(null);

  async function getCars(pageNumber) {
    try {
      setLoading(true);
      const response = await axios({
        url: "/api/cars",
        method: "get",
        params: {
          p: pageNumber
        }
      });
      const {data, currentPage, totalPages} = response.data;
      let pages = [];

      for (let i=1; i<=totalPages; i++) {
        pages.push(i)
      }

      setCars(data);
      setPages(pages);
      setCurrentPage(currentPage);
      setError(null);
      setLoading(false);
    } catch(error) { 
      setError(error.message);
      setLoading(false);
      console.error(error);
    } 
  }

  useEffect(() => {
    getCars(1);
  }, []);

  if (loading) return <div> Fetching... </div>

  else if (error) return <div>{error}</div>

  else return (
    <div className={styles.container}>
      <Paginator pages={pages} currentPage={currentPage} getCars={getCars}/>

      <Cars cars={cars}/>

      <Paginator pages={pages} currentPage={currentPage} getCars={getCars}/>
    </div>
  )
}
