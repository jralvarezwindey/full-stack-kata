import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import Cars from "../Cars/Cars.js";
import Paginator from "../Paginator/Paginator.js";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [sort, setSort] = useState(false);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  async function getCars() {
    try {
      setLoading(true);
      const response = await axios({
        url: "/api/cars",
        method: "get",
        params: {
          p: currentPage,
          sort: sort
        }
      });
      const totalPages = response.data.totalPages

      let data = response.data.data;
      if (sort) {
        for (let i=0; i<data.length; i++) {
          const [prevMake, currentMake] = [data[i-1]?.make, data[i].make];
          if (prevMake !== currentMake) {
            data = [
              ...data.slice(0,i),
              {
                make: currentMake,
                isSeparator: true
              },
              ...data.slice(i)
            ];
          }
        }
      }

      let pages = [];
      for (let i=1; i<=totalPages; i++) {
        pages.push(i)
      }

      setCars(data);
      setPages(pages);
      setError(null);
      setLoading(false);

    } catch(error) { 
      setError(error.message);
      setCurrentPage(1);
      setSort(false);
      setLoading(false);
      console.error(error);
    } 
  }

  function onPaginatorButtonClick(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function onSortButtonClick() {
    setSort(prevSortState => !prevSortState);
  }

  useEffect(() => {
    getCars();
  }, [currentPage, sort])

  if (loading) return <div> Fetching... </div>

  else if (error) return <div>{error}</div>

  else return (
    <div className={styles.container}>
      <Paginator pages={pages} currentPage={currentPage} onPaginatorButtonClick={onPaginatorButtonClick}/>

      <button
        onClick={onSortButtonClick}
        id={sort ? styles.clicked : styles.notClicked}
      > Sort by make </button>

      <Cars cars={cars}/>

      <Paginator pages={pages} currentPage={currentPage} onPaginatorButtonClick={onPaginatorButtonClick}/>
    </div>
  )
}
