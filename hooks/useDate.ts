import React, { useMemo } from "react";

const useDate = () => {
  const date = new Date();
  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const dayWithSyntax =
    day === 1 ? "1st" : day === 2 ? "2nd" : day === 3 ? "3rd" : `${day}th`;
  const weekday = weekdayNames[date.getDay()];
  const month = monthNames[date.getMonth()];
  const monthNum =
    date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const year = date.getFullYear();
  const dateString = date.toDateString();

  return useMemo(
    () => ({
      dateString,
      day,
      dayWithSyntax,
      weekday,
      month,
      monthNum,
      year,
    }),
    [dateString, day, dayWithSyntax, weekday, month, monthNum, year]
  );
};

export default useDate;
