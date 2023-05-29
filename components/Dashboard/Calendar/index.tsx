import React from 'react';
import styles from "./index.module.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Calendar = () => {

  const date = new Date();
  const weekdayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  
  const day = date.getDate();
  const weekday = weekdayNames[date.getDay()];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  const forwardDate = new Date();
  const backwardDate = new Date();
  const newDateList: any = [];

  const generateBackwardDateList = (n: number) => {
    for (let i = 0; i < n; i++) {
      backwardDate.setDate(backwardDate.getDate() - 1);
      newDateList.unshift({
        day: backwardDate.getDate(),
        weekday:  weekdayNames[backwardDate.getDay()]
      });
    }
  }

  const generateForwardDateList = (n: number) => {
    for (let i = 0; i < n; i++) {
      newDateList.push({
        day: forwardDate.getDate(),
        weekday:  weekdayNames[forwardDate.getDay()]
      });
      forwardDate.setDate(forwardDate.getDate() + 1);
    }
  }

  const generateDateList = () => {
    generateBackwardDateList(3);
    generateForwardDateList(3);
  }

  generateDateList(); // Getting initial date values  

  return (
    <div className={styles.mainDiv}>
        <div className={styles.topDiv}>
            <BsChevronLeft 
              className={styles.chevronIcon}
              onClick={ () => generateBackwardDateList(6) } 
            />
            <span>May 2023</span>
            <BsChevronRight 
              className={styles.chevronIcon}
              onClick={ () => generateForwardDateList(6) } 
            />
        </div>
        <div className={styles.bottomDiv}>
            {newDateList.map((dayObject: any, i: number) => (
              <div key={i} className={styles.dateDiv}>
                <span className={styles.weekdayText}>{dayObject.weekday}</span>
                <span className={styles.dayText}>{dayObject.day}</span>
              </div>
            ))}
        </div>
    </div>
  )
}

export default Calendar;