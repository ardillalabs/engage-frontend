import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Calendar = () => {

  interface dateArray {
    day: number,
    weekday: string
  }

  const date = new Date();
  const weekdayNames: any = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  
  const day = date.getDate();
  const weekday = weekdayNames[date.getDay()];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  const forwardDate = new Date();
  const backwardDate = new Date();

  const dateList: dateArray[] = [];

  const generateBackwardDateList = () => {
    for (let i = 0; i < 3; i++) {
      backwardDate.setDate(backwardDate.getDate() - 1);
      dateList.unshift(
        {
          day: backwardDate.getDate(),
          weekday:  weekdayNames[backwardDate.getDay()]
        }
      );
    }
  }

  const generateForwardDateList = () => {
    for (let i = 0; i < 3; i++) {
      dateList.push(
        {
          day: forwardDate.getDate(),
          weekday:  weekdayNames[forwardDate.getDay()]
        }
      );
      forwardDate.setDate(forwardDate.getDate() + 1);
    }
  }

  generateForwardDateList();
  generateBackwardDateList();

  const [newDateList, setNewDateList] = useState(dateList);

  const addToNewDataListBack = () => {
    backwardDate.setDate(newDateList[0].day);
    for (let i = 0; i < 6; i++) {
      backwardDate.setDate(backwardDate.getDate() - 1);
      let date = backwardDate.getDate();
      let weekday = backwardDate.getDay();
      setNewDateList(prevState => [
        {
          day: date,
          weekday:  weekdayNames[weekday]
        },
        ...prevState
      ]);
    };
  }

  const addToNewDataListFront = () => {
    forwardDate.setDate(newDateList.slice(-1)[0].day);
    for (let i = 0; i < 6; i++) {
      forwardDate.setDate(forwardDate.getDate() + 1);
      let date = forwardDate.getDate();
      let weekday = forwardDate.getDay();
      setNewDateList(prevState => [
        ...prevState,
        {
          day: date,
          weekday:  weekdayNames[weekday]
        }
      ]);
    };
  }

  const [scrollValue, setScrollValue] = useState<number>(0);

  const backwardIconClicked = () => {
    if (scrollValue === 0) {
      addToNewDataListBack();
    } else {
      setScrollValue(scrollValue + 1);
    }
  }
  const forwardIconClicked = () => {
    addToNewDataListFront();
    setScrollValue(scrollValue - 1);
  }

  console.log(newDateList);

  return (
    <div className={styles.mainDiv}>
        <div className={styles.topDiv}>
            <BsChevronLeft 
              className={styles.chevronIcon}
              onClick={ () => backwardIconClicked() } 
            />
            <span>May 2023</span>
            <BsChevronRight 
              className={styles.chevronIcon}
              onClick={ () => forwardIconClicked() } 
            />
        </div>
        <div className={styles.bottomDiv}>
          <div 
            className={styles.dateDivContainer}
            style={{transform: `translateX(${scrollValue * 450}px)`}}
          >
            {newDateList.map((dayObject: any, i: number) => (
              <div key={i} className={styles.dateDiv}>
                <span className={styles.weekdayText}>{dayObject.weekday}</span>
                <span className={styles.dayText}>{dayObject.day}</span>
              </div>
            ))}

          </div>
          
        </div>
    </div>
  )
}

export default Calendar;