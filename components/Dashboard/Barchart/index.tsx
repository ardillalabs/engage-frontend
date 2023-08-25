import React, { useEffect, useRef, useState } from "react";
import type { ChartArea } from "chart.js";
import PropTypes from "prop-types";
import styles from "./index.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useDate from "@/hooks/useDate";
import { RootState } from "@/store";
import { connect } from "react-redux";
import { FaDownload } from "react-icons/fa";

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
        text: "Chart.js Bar Chart",
      },
    },
  };

  // Daily quiz data
  const [dailyScores, setDailyScores] = useState<dailyScores[]>();
  const [dailyScoreLabels, setDailyScoreLabels] = useState<any>();
  const { day, monthNum, year } = useDate();
  console.log(year, monthNum, day)
  
  const date = new Date(); 

  date.setDate(date.getDate() - 7);
  console.log(date);

  const dateObject = new Date(date);

  const yearStart = dateObject.getFullYear();
  const monthStart = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const dayStart = dateObject.getDate().toString().padStart(2, '0');

  const formattedDate = `${yearStart}-${monthStart}-${dayStart}`;
  useEffect(() => {
    const date = new Date();
    console.log(date)
    const dailyLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const DailyDataFetch = async () => {
      try {
        const res = fetch(
          // `${BASE_URL}/quiz_mark/last-7-day-summery/DAY/2/${auth.id}`
          `http://localhost:5000/api/quiz_mark/get-marks-date-range/DAY/2/${auth.id}/${formattedDate}/${year}-${monthNum}-${day}`
        );
        (await res).json().then((days: dailyScores[]) => {
          setDailyScores(days);
          console.log(days)
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

    DailyDataFetch();
  }, [auth.id]);

  const dailyData = {
    labels: dailyScores?.map(day =>  new Date(day.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        backgroundColor: (context: any) => {
          const { ctx, chartArea } = context.chart;
          return createGradient(ctx, chartArea, "#1F2F98", "#2EAAFA");
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
  sevenWeeksAgo.setDate(date.getDate() - (7 * 7)); // Subtract 7 weeks

  const weekObject = new Date(sevenWeeksAgo);
  console.log(weekObject)

  const yearStart1 = weekObject.getFullYear();
  const monthStart1 = (weekObject.getMonth() + 1).toString().padStart(2, '0');
  const dayStart1 = weekObject.getDate().toString().padStart(2, '0');

  const formattedWeek = `${yearStart1}-${monthStart1}-${dayStart1}`;
  useEffect(() => {
    const weeklyDataFetch = async () => {
      try {
        const res = fetch(
          // `${BASE_URL}/quiz_mark/last-7-day-summery/WEEK/1/${auth.id}`
          `http://localhost:5000/api/quiz_mark/get-marks-date-range/WEEK/1/${auth.id}/${formattedWeek}/${year}-${monthNum}-${day}`
        );
        console.log("last-7-day-summery/WEEK - res ", res);
        (await res).json().then((weeks) => {
          setWeeklyScores(weeks);
        });
      } catch (error) {
        console.log(error);
      }
    };
    weeklyDataFetch();
  }, [auth.id]);

  const weeklyData = {
    labels: weeklyScores?.map(week =>  week.weekRange),
    datasets: [
      {
        backgroundColor: (context: any) => {
          const { ctx, chartArea } = context.chart;
          return createGradient(ctx, chartArea, "#007542", "#B3F68A");
        },
        borderRadius: 6,
        data: Array.isArray(weeklyScores)
          ? weeklyScores.map((week) => week.totalValue)
          : [],
      },
    ],
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.chartWrapper}>
        <div className={styles.leftDiv}>
          <div className={styles.chartHeader}>Daily Quiz Score</div>
          
        <button className={styles.downloadButtonDaily}><FaDownload className={styles.icon}/>Download as csv</button>
        </div>
        {/* <div className={styles.rightDiv}>     */}
        {/* </div> */}
        <div className={styles.chartSubHeader}>
          Productivity of the last 7 days
        </div>
        <Bar options={options} data={dailyData} />
      </div>
      <div className={styles.chartWrapper}>
      <div className={styles.leftDiv}>
        <div className={styles.chartHeader}>Weekly Quiz Score</div>
        <button className={styles.downloadButtonWeekly}><FaDownload className={styles.icon}/>Download as csv</button>
        </div>
        <div className={styles.chartSubHeader}>
          Productivity of the last 7 weeks
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
