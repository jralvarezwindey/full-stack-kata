import React from "react"
import styles from "./Paginator.module.css"

export default function Paginator({pages, currentPage, getCars}) {
  return (
      <div className={styles.paginator}> 
        {
          pages.map(pageNumber => {
            return (
              <button 
                onClick={() => getCars(pageNumber)} 
                key={pageNumber}
                className={styles.pageNumber}
                id={pageNumber === currentPage && styles.selectedPageNumber}
              >
                {pageNumber}
              </button>
            )
          })
        }
      </div>
  )
}
