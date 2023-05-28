import React from 'react';
import styles from "./index.module.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Calendar = () => {
  return (
    <div className={styles.mainDiv}>
        <div className={styles.topDiv}>
            <BsChevronLeft />
            <span>May 2023</span>
            <BsChevronRight />
        </div>
        <div className={styles.bottomDiv}>
            
        </div>
    </div>
  )
}

export default Calendar;