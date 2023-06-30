import React from "react";
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
  const dailyLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dailyData = {
    labels: dailyLabels,
    datasets: [
      {
        backgroundColor: "#324544",
        borderRadius: 6,
        data: [10, 20, 30, 40, 50, 60, 70],
      },
    ],
  };

  // Weekly quiz data
  const weeklyLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  const weeklyData = {
    labels: weeklyLabels,
    datasets: [
      {
        backgroundColor: "#324544",
        borderRadius: 6,
        data: [10, 20, 30, 40, 50, 60, 70],
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
        <div className={styles.chartSubHeader}>Productivity of this month</div>
        <Bar options={options} data={weeklyData} />
      </div>
    </div>
  );
};

export default Barchart;
