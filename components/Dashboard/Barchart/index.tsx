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
  weekNumber: number;
  totalValue: number;
}

interface dailyScores {
  dayNumber: number;
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

  useEffect(() => {
    const date = new Date();
    const dailyLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const DailyDataFetch = async () => {
      try {
        const res = fetch(
          `${BASE_URL}/quiz_mark/last-7-day-summery/DAY/2/${auth.id}`
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
  }, [auth.id]);

  const dailyData = {
    labels: dailyScoreLabels,
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

  useEffect(() => {
    const weeklyDataFetch = async () => {
      try {
        const res = fetch(
          `${BASE_URL}/quiz_mark/last-7-day-summery/WEEK/1/${auth.id}`
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
    labels: weeklyScores?.map((week) => `Week ${week.weekNumber}`),
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
