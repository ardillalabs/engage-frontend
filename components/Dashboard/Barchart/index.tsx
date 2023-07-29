import React, { useEffect, useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface weeklyScores {
  weekNumber: number;
  totalValue: number;
}

interface dailyScores {
  dayNumber: number;
  totalValue: number;
}

const Barchart = () => {
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 90,
        ticks: {
          stepSize: 30,
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

  useEffect(() => {
    const date = new Date();
    const dailyLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const DailyDataFetch = async () => {
      try {
        const res = fetch(
          "http://ec2-54-160-247-159.compute-1.amazonaws.com:5000/api/quiz_mark/last-7-day-summery/DAY/2/11"
        );
        (await res).json().then((days: dailyScores[]) => {
          setDailyScores(days);
          const tempDailyData = [];

          for (let i = 0; i < days.length; i++) {
            date.setDate(days[i].dayNumber);
            tempDailyData.unshift(dailyLabels[date.getDay()]);
          }
          setDailyScoreLabels(tempDailyData);
        });
      } catch (error) {
        console.log(error);
      }
    };

    DailyDataFetch();
  }, []);

  const dailyData = {
    labels: dailyScoreLabels,
    datasets: [
      {
        backgroundColor: "#324544",
        borderRadius: 6,
        data: Array.isArray(dailyScores) ? dailyScores.map((day) => day.totalValue) : [],
      },
    ],
  };

  // Weekly quiz data
  const [weeklyScores, setWeeklyScores] = useState<weeklyScores[]>();

  useEffect(() => {
    const weeklyDataFetch = async () => {
      try {
        const res = fetch(
          "localhost:5000/api/quiz_mark/last-7-day-summery/WEEK/2/11"
        );
        (await res).json().then((weeks) => {
          setWeeklyScores(weeks);
        });
      } catch (error) {
        console.log(error);
      }
    };
    weeklyDataFetch();
  }, []);

  const weeklyData = {
    labels: weeklyScores?.map((week) => `Week ${week.weekNumber}`),
    datasets: [
      {
        backgroundColor: "#324544",
        borderRadius: 6,
        data: Array.isArray(weeklyScores) ? weeklyScores.map((week) => week.totalValue) : [],
      },
    ],
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.chartWrapper}>
        <div className={styles.chartHeader}>Final output of daily quizes</div>
        <div className={styles.chartSubHeader}>
          Productivity of the last 7 days
        </div>
        <Bar options={options} data={dailyData} />
      </div>
      <div className={styles.chartWrapper}>
        <div className={styles.chartHeader}>Final output of weekly quizes</div>
        <div className={styles.chartSubHeader}>
          Productivity of the last 7 weeks
        </div>
        <Bar options={options} data={weeklyData} />
      </div>
    </div>
  );
};

export default Barchart;
