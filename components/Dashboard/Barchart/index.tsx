import React, { useEffect, useRef, useState } from 'react';
import type { ChartArea } from 'chart.js';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useDate from '@/hooks/useDate';
import { RootState } from '@/store';
import { connect } from 'react-redux';
import { FaDownload } from 'react-icons/fa';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  auth: any;
}

interface weeklyScores {
  weekRange: string;
  // weekNumber: number;
  totalValue: number;
}

interface dailyScores {
  day: Date;
  // dayNumber: number;
  totalValue: number;
}

const Barchart = ({ auth }: Props) => {
  const createGradient = (
    ctx: CanvasRenderingContext2D,
    area: ChartArea,
    bottomColor: string,
    topColor: string
  ) => {
    const gradient = ctx.createLinearGradient(0, 210, 0, 40);
    gradient.addColorStop(0, bottomColor);
    gradient.addColorStop(1, topColor);

    return gradient;
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        // max: 50,
        ticks: {
          // stepSize: 10,
        },
      },
      x: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        // position: "top" as const,
        display: false,
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  // Daily quiz data
  const [dailyScores, setDailyScores] = useState<dailyScores[]>();
  const [dailyScoreLabels, setDailyScoreLabels] = useState<any>();
  const { day, monthNum, year } = useDate();
  console.log(year, monthNum, day);

  const date = new Date();

  date.setDate(date.getDate() - 7);
  console.log(date);

  const dateObject = new Date(date);

  const yearStart = dateObject.getFullYear();
  const monthStart = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const dayStart = dateObject.getDate().toString().padStart(2, '0');

  const formattedDate = `${yearStart}-${monthStart}-${dayStart}`;
  const todayDate = `${year}-${monthNum}-${day}`;

  let formattedMonthNum = monthNum;
  let todayFormattedDate = todayDate;
  if (monthNum === "010" || monthNum === "011" || monthNum === "012") {
    formattedMonthNum = monthNum.substring(1); // Remove the first character
    todayFormattedDate = `${year}-${formattedMonthNum}-${day}`;
  }
  console.log(todayDate);
  // const date = new Date();
  console.log(date);
  const dailyLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const DailyDataFetch = async (formattedDate: string, todayFormattedDate: string) => {
    try {
      console.log(`${year}-${monthNum}-${day}`)
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let timeZoneReplace = timeZone.replace('/', '-');
      console.log('timeZoneReplace', timeZoneReplace)

      const res = fetch(
        // `${BASE_URL}/quiz_mark/last-7-day-summery/DAY/2/${auth.id}`
        `https://backend.stayengaged.io/api/quiz_mark/get-marks-date-range/DAY/2/${auth.id}/${formattedDate}/${todayFormattedDate}/${timeZoneReplace}`
      );
      (await res).json().then((days: dailyScores[]) => {
        setDailyScores(days);
        console.log(days);
        // const tempDailyData = [];

        // for (let i = 0; i < days.length; i++) {
        //   // date.setDate(scoreDate[i]);
        //   tempDailyData.unshift(date.getDay());
        //   console.log(tempDailyData)
        // }
        // setDailyScoreLabels(tempDailyData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    DailyDataFetch(formattedDate, todayDate);
  }, [auth.id]);


  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log('timeZone', timeZone)

  const dailyData = {
    labels: dailyScores?.map((day) =>
      new Date(new Date(day.day).setDate(new Date(day.day).getDate() + 1)).toLocaleDateString('en-US', {
        timeZone: timeZone,
        month: 'short',
        day: 'numeric',
      })
    ),
    datasets: [
      {
        backgroundColor: (context: any) => {
          const { ctx, chartArea } = context.chart;
          return createGradient(ctx, chartArea, '#1F2F98', '#2EAAFA');
        },
        borderRadius: 6,
        data: Array.isArray(dailyScores)
          ? dailyScores.map((day) => day.totalValue)
          : [],
      },
    ],
  };

  // Weekly quiz data
  const [weeklyScores, setWeeklyScores] = useState<weeklyScores[]>();

  const sevenWeeksAgo = new Date(date);
  sevenWeeksAgo.setDate(date.getDate() - (7 * 6)); // Subtract 7 weeks

  const weekObject = new Date(sevenWeeksAgo);
  console.log(weekObject);

  const yearStart1 = weekObject.getFullYear();
  const monthStart1 = (weekObject.getMonth() + 1).toString().padStart(2, '0');
  const dayStart1 = weekObject.getDate().toString().padStart(2, '0');

  const formattedWeek = `${yearStart1}-${monthStart1}-${dayStart1}`;
  console.log(formattedWeek)

  const weeklyDataFetch = async (formattedWeek: string, todayFormattedDate: string) => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let timeZoneReplace = timeZone.replace('/', '-');
      console.log('timeZoneReplace', timeZoneReplace)

      const res = fetch(
        // `${BASE_URL}/quiz_mark/last-7-day-summery/WEEK/1/${auth.id}`
        `https://backend.stayengaged.io/api/quiz_mark/get-marks-date-range/WEEK/1/${auth.id}/${formattedWeek}/${todayFormattedDate}/${timeZoneReplace}`
      );
      console.log('last-7-day-summery/WEEK - res ', res);
      (await res).json().then((weeks) => {
        setWeeklyScores(weeks);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    weeklyDataFetch(formattedWeek, todayDate);
  }, [auth.id]);

  const weeklyData = {
    labels: weeklyScores?.map((week) => week.weekRange),
    datasets: [
      {
        backgroundColor: (context: any) => {
          const { ctx, chartArea } = context.chart;
          return createGradient(ctx, chartArea, '#007542', '#B3F68A');
        },
        borderRadius: 6,
        data: Array.isArray(weeklyScores)
          ? weeklyScores.map((week) => week.totalValue)
          : [],
      },
    ],
  };

  console.log(weeklyScores?.[0]);
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];

  // const [value, onChange] = useState<Value>([new Date(), new Date()]);

  // console.log(Array.isArray(value)? value[0]: []);
  const formatDate = (newDate: any) => {
    const dateObject = new Date(newDate);
    const yearStart = dateObject.getFullYear();
    const monthStart = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const dayStart = dateObject.getDate().toString().padStart(2, '0');
    const formattedDate = `${yearStart}-${monthStart}-${dayStart}`;

    return formattedDate;
  };

  const [date1, setDate1] = useState(todayDate);
  const [date2, setDate2] = useState(formattedDate);
  const [date3, setDate3] = useState(formattedWeek);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(start, end);
    const initialDate = formatDate(start);
    const lastDate = formatDate(end);
    console.log(initialDate, lastDate);
    DailyDataFetch(initialDate, lastDate);
    weeklyDataFetch(initialDate, lastDate);
    setDate1(lastDate);
    setDate2(initialDate);
    setDate3(initialDate);
  };

  console.log('dates', date1, date2, date3);

  const downloadBlob = (blob: any, filename: string) => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const onClickDailyScore = () => {
    try {
      axios({
        method: 'get',
        url: `https://backend.stayengaged.io/api/quiz_mark/csv-file-download/DAY/2/${auth.id}/${date3}/${date1}`,
        responseType: 'blob',
        headers: {
          Accept: 'text/csv',
        },
      }).then((response) => {
        downloadBlob(response.data, `daily scores ${date3} ${date1}.csv`);
      });
      // downloadBlob(res, 'weekly scores.csv');
      // console.log('last-7-day-summery/WEEK - res ', res);
    } catch (error) {
      console.log(error);
    }
  };

  const dayCount = Math.round((+new Date(date1) - +new Date(date2)) / (24 * 60 * 60 * 1000))
  const weekCount = Math.round((+new Date(date1) - +new Date(date3)) / (24 * 60 * 60 * 1000 * 7))
  console.log(dayCount, weekCount)

  const onClickWeeklyScore = () => {
    try {
      axios({
        method: 'get',
        url: `https://backend.stayengaged.io/api/quiz_mark/csv-file-download/WEEK/1/${auth.id}/${date3}/${date1}`,
        responseType: 'blob',
        headers: {
          Accept: 'text/csv',
        },
      }).then((response) => {
        downloadBlob(response.data, `weekly scores ${date3} ${date1}.csv`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.chartWrapper}>
        <div className={styles.filterText}>Filter scores with date range</div>
        <DatePicker
          showIcon
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date()}
          selectsRange
          className={styles.datePicker}
          placeholderText='Filter by Date'
        />
      </div>
      <div className={styles.chartWrapper}>
        <div className={styles.leftDiv}>
          <div className={styles.chartHeader}>Daily Quiz</div>

          <button
            className={styles.downloadButtonDaily}
            onClick={onClickDailyScore}
          >
            <FaDownload className={styles.icon} />
            Download as csv
          </button>
        </div>
        {/* <div className={styles.rightDiv}>     */}
        {/* </div> */}
        <div className={styles.chartSubHeader}>
          Scores from the last {dayCount ? dayCount : 'few'} days
        </div>
        <Bar options={options} data={dailyData} />
      </div>
      <div className={styles.chartWrapper}>
        <div className={styles.leftDiv}>
          <div className={styles.chartHeader}>Weekly Quiz</div>
          <button
            className={styles.downloadButtonWeekly}
            onClick={onClickWeeklyScore}
          >
            <FaDownload className={styles.icon} />
            Download as csv
          </button>
        </div>
        <div className={styles.chartSubHeader}>
          Scores from the last {weekCount ? weekCount + 1 : 'few'} weeks
        </div>
        <Bar options={options} data={weeklyData} />
      </div>
    </div>
  );
};

Barchart.propTypes = {
  // getSupportGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  // supportGroup: state.supportGroup,
});

export default connect(mapStateToProps, {
  // getSupportGroup,
})(Barchart);
