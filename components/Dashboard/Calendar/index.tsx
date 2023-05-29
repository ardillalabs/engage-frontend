import React, { useState, useEffect } from 'react';
import styles from "./index.module.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Calendar = () => {

  const date = new Date();
  const weekdayNames: any = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const reversedWeekdayNames = weekdayNames.toReversed();

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
  const day = date.getDate();
  const weekday = weekdayNames[date.getDay()];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  const forwardDate = new Date();
  const backwardDate = new Date();
  const [newDateList, setNewDateList]: any = useState([
    {
      day: forwardDate.getDate() - 3,
      weekday:  weekdayNames[forwardDate.getDay() - 3]
    },
    {
      day: forwardDate.getDate() - 2,
      weekday:  reversedWeekdayNames[forwardDate.getDay() - 1]
    },
    {
      day: forwardDate.getDate() - 1,
      weekday:  reversedWeekdayNames[forwardDate.getDay() + 5]
    },
    {
      day: forwardDate.getDate(),
      weekday:  weekdayNames[forwardDate.getDay()]
    },
    {
      day: forwardDate.getDate() + 1,
      weekday:  weekdayNames[forwardDate.getDay() + 1]
    },
    {
      day: forwardDate.getDate() + 2,
      weekday:  weekdayNames[forwardDate.getDay() + 2]
    }
  ]);

  const generateBackwardDateList = () => {
    for (let i = 0; i < 6; i++) {
      backwardDate.setDate(backwardDate.getDate() - 1);
      setNewDateList([
        {
          day: backwardDate.getDate(),
          weekday:  weekdayNames[backwardDate.getDay()]
        },
        ...newDateList
      ]);
    }
  }

  const generateForwardDateList = () => {
    for (let i = 0; i < 6; i++) {
      setNewDateList([
        ...newDateList,
        {
          day: forwardDate.getDate(),
          weekday:  weekdayNames[forwardDate.getDay()]
        }
      ]);
      forwardDate.setDate(forwardDate.getDate() + 1);
    }
  }

  const generateDateList = () => {
    generateBackwardDateList();
    generateForwardDateList();
  }

  console.log(forwardDate.getDay() - 1);

  // generateDateList(); // Getting initial date values  
  
  return (
    <div className={styles.mainDiv}>
        <div className={styles.topDiv}>
            <BsChevronLeft 
              className={styles.chevronIcon}
              onClick={ () => generateBackwardDateList() } 
            />
            <span>May 2023</span>
            <BsChevronRight 
              className={styles.chevronIcon}
              onClick={ () => generateForwardDateList() } 
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