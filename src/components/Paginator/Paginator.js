import React from "react"
import styles from "./Paginator.module.css"

export default function Paginator({pages, currentPage, onPaginatorButtonClick}) {
  return (
      <div className={styles.paginator}> 
        {
          pages.map(pageNumber => {
            return (
              <button 
                onClick={() => onPaginatorButtonClick(pageNumber)} 
                key={pageNumber}
                className={pageNumber === currentPage ? styles.selectedPageNumber : styles.pageNumber}
              > {pageNumber} </button>
            )
          })
        }
      </div>
  )
}
