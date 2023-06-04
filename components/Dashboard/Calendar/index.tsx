import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import useDate from '@/hooks/useDate';
import { dateArray } from '@/tsc-types/calendarTypes';

const Calendar = () => {

  const { year, month, day } = useDate();
  const weekdayNames: Array<string> = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const monthNames: Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  
  const forwardDate = new Date();
  const backwardDate = new Date();

  const dateList: dateArray[] = [];
  const [monthYear, setMonthYear] = useState(`${month} ${year}`);

  // generating initial date values: today backwards
  const generateBackwardDateList = () => {
    for (let i = 0; i < 3; i++) {
      backwardDate.setDate(backwardDate.getDate() - 1);
      dateList.unshift(
        {
          day: backwardDate.getDate(),
          weekday:  weekdayNames[backwardDate.getDay()],
          monthNum: backwardDate.getMonth(),
          month: monthNames[backwardDate.getMonth()],
          year: backwardDate.getFullYear()
        }
      );
    }
  }

  // generating initial date values: today onwards
  const generateForwardDateList = () => {
    for (let i = 0; i < 3; i++) {
      dateList.push(
        {
          day: forwardDate.getDate(),
          weekday:  weekdayNames[forwardDate.getDay()],
          monthNum: forwardDate.getMonth(),
          month: monthNames[forwardDate.getMonth()],
          year: forwardDate.getFullYear()
        }
      );
      forwardDate.setDate(forwardDate.getDate() + 1);
    }
  }

  generateForwardDateList();
  generateBackwardDateList();

  const [newDateList, setNewDateList] = useState(dateList);

  // adding new dates when arrows clicked: today backwards
  const addToNewDataListBack = () => {

    // Set date,month,year locally
    backwardDate.setDate(newDateList[0].day);
    backwardDate.setMonth(newDateList[0].monthNum);
    backwardDate.setFullYear(newDateList[0].year);
    for (let i = 0; i < 6; i++) {
      backwardDate.setDate(backwardDate.getDate() - 1);
      let date = backwardDate.getDate();
      let weekday = backwardDate.getDay();
      let month = backwardDate.getMonth();
      let year = backwardDate.getFullYear();
      setNewDateList(prevState => [
        {
          day: date,
          weekday:  weekdayNames[weekday],
          monthNum: month,
          month: monthNames[month],
          year: year
        },
        ...prevState
      ]);
    };
  }

  // adding new dates when arrows clicked: today onwards
  const addToNewDataListFront = () => {

    
    // Set date,month,year locally
    forwardDate.setDate(newDateList.slice(-1)[0].day);
    forwardDate.setMonth(newDateList.slice(-1)[0].monthNum);
    forwardDate.setFullYear(newDateList.slice(-1)[0].year);
    let lastDayOfMonth = new Date(newDateList.slice(-1)[0].year, newDateList.slice(-1)[0].monthNum + 1, 0);
    if (newDateList.slice(-1)[0].day === lastDayOfMonth.getDate()) {
      forwardDate.setDate(newDateList.slice(-1)[0].day - 1);
    }

    for (let i = 0; i < 6; i++) {
      forwardDate.setDate(forwardDate.getDate() + 1);
      let date = forwardDate.getDate();
      let weekday = forwardDate.getDay();
      let month = forwardDate.getMonth();
      let year = forwardDate.getFullYear();
      setNewDateList(prevState => [
        ...prevState,
        {
          day: date,
          weekday:  weekdayNames[weekday],
          monthNum: month,
          month: monthNames[month],
          year: year
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

  // Updating month and year
  useEffect(() => {
    setMonthYear(`${(newDateList[(scrollValue >= 0 ? 0 : -scrollValue) * 6 + 5].month)} ${(newDateList[(scrollValue >= 0 ? 0 : -scrollValue) * 6 + 5].year)}`);
  }, [newDateList, scrollValue]);

  return (
    <div className={styles.mainDiv}>
        <div className={styles.topDiv}>
            <BsChevronLeft 
              className={styles.chevronIcon}
              onClick={ () => backwardIconClicked() } 
            />
            <span className={styles.monthYear}>{monthYear}</span>
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
            {newDateList.map((dayObject: dateArray, i: number) => (
              <div key={i} className={dayObject.day !== day ? styles.dateDiv : styles.dateDivToday}>
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