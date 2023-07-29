import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import MemberTree from "../MemberTree";
import UserProfile from "../UserProfile";
import Calendar from "../Calendar";
import Link from "next/link";
import useDate from "@/hooks/useDate";
import Barchart from "../Barchart";

// redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { RootState } from "../../../store";
import {
  getSupportGroup,
  deleteSupporter,
} from "../../../actions/SupportGroup";

interface teamMemberArray {
  userID: string;
  userName: string;
  imageURL: string;
  email: string;
}
const DashboardBody = ({ getSupportGroup, auth, supportGroup }: any) => {
  useEffect(() => {
    getSupportGroup(1);
  }, [supportGroup.supportGroup.length]);
  // Test Data
  const [teamMemberData, setTeamMemberData] = useState<any>(null);

  const group: any =
    supportGroup.supportGroup &&
    supportGroup.supportGroup.map((supporter: any, index: any) => {
      const support = {
        userID: auth.id,
        userName: supporter.support_user?.full_name
          ? supporter.support_user?.full_name
          : "unknown Name",
        imageURL: supporter.support_user?.image_url
          ? supporter.support_user.image_url
          : "/dummy450x450.jpg",
        email: supporter?.email,
      };
      return support;
    });
  
  console.log(auth)

  const { day, monthNum, year } = useDate();
  const [dailyMessage, setDailyMessage] = useState("Loading...");
  const [wellnessExcercise, setWellnessExcercise] = useState("Loading...");

  const dailyMessageFetch = async () => {
    try {
      // const res = await fetch(
      //   `https://engage-backend-production.up.railway.app/api/daily_message/${year}-${monthNum}-${day}`
      // );
      const res = await fetch(
        `http://ec2-54-160-247-159.compute-1.amazonaws.com:5000/api/daily_message/${year}-${monthNum}-${day}`
      );

      if (res.ok) {
        return res.json().then(({ daily_message }) => {
          setDailyMessage(daily_message.description);
        });
      }
    } catch (error) {
      setDailyMessage("Have a good day!");
      console.log("Failed to fetch daily message", error);
    }
  };

  const wellnessExcerciseFetch = async () => {
    try {
      // const res = await fetch(
      //   `https://engage-backend-production.up.railway.app/api/daily_message/${year}-${monthNum}-${day}`
      // );
      const res = await fetch(
        `http://ec2-54-160-247-159.compute-1.amazonaws.com:5000/api/wellness_message/${year}-${monthNum}-${day}`
      );

      if (res.ok) {
        return res.json().then(({ wellness_message }) => {
          setWellnessExcercise(wellness_message.description);
        });
      }
    } catch (error) {
      setWellnessExcercise("No excercises available");
      console.log("Failed to fetch weekly excercise", error);
    }
  };

  useEffect(() => {
    dailyMessageFetch();
    wellnessExcerciseFetch();
  }, []);

  const changeTeamMemberData = (data: teamMemberArray[]) => {
    setTeamMemberData(data);
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.leftDiv}>
        {/* Dashboard Top */}
        <div className={styles.dashboardTop}>
          {/* <h3 className={styles.welcomeText}>Hello {auth?.username}</h3> */}
          <span className="body-1">{dailyMessage}</span>
          <div className={styles.dashboardTopMenus}>
            <Link href="/daily-quiz">
              <div className={styles.dashboardTopMenu}>
                <div className={styles.menuImageDiv}>
                  <svg
                    width="34"
                    height="36"
                    viewBox="0 0 34 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5859 14.2636H15.1707L13.8777 10.8931L12.5859 14.2636Z"
                      fill="#212121"
                    />
                    <path
                      d="M8.13181 4.5C6.11199 4.5 4.47461 6.26288 4.47461 8.4375V27.5625C4.47461 29.7371 6.112 31.5 8.13181 31.5H17.3749C16.4738 29.9846 15.9513 28.183 15.9513 26.25C15.9513 25.0624 16.1485 23.9242 16.5097 22.8717H8.13181C7.65087 22.8717 7.26105 22.452 7.26105 21.9342C7.26105 21.4165 7.65087 20.9967 8.13181 20.9967H17.3769C18.9865 18.2923 21.8024 16.5 25.0073 16.5C26.6639 16.5 28.2167 16.9789 29.5526 17.8152V8.4375C29.5526 6.26288 27.9152 4.5 25.8954 4.5H8.13181ZM7.26105 26.4375C7.26105 25.9197 7.65087 25.5 8.13181 25.5H13.7103C14.1912 25.5 14.5811 25.9197 14.5811 26.4375C14.5811 26.9553 14.1912 27.375 13.7103 27.375H8.13181C7.65087 27.375 7.26105 26.9553 7.26105 26.4375ZM13.8772 7.49872C14.2299 7.49866 14.5477 7.72747 14.6822 8.07833L17.9925 16.7078C18.1761 17.1864 17.9646 17.7346 17.5201 17.9322C17.0756 18.1299 16.5664 17.9021 16.3829 17.4236L15.89 16.1386H11.8672L11.3748 17.4233C11.1914 17.902 10.6823 18.1298 10.2377 17.9324C9.79323 17.7349 9.58153 17.1867 9.76502 16.7081L13.0725 8.07862C13.207 7.7277 13.5247 7.49878 13.8772 7.49872ZM22.4107 7.49858C22.8915 7.49858 23.2814 7.91835 23.2814 8.43608V10.5H25.1988C25.6798 10.5 26.0696 10.9197 26.0696 11.4375C26.0696 11.9553 25.6798 12.375 25.1988 12.375H23.2814V14.4362C23.2814 14.954 22.8915 15.3737 22.4107 15.3737C21.9297 15.3737 21.5399 14.954 21.5399 14.4362V12.375H19.6259C19.1449 12.375 18.7551 11.9553 18.7551 11.4375C18.7551 10.9197 19.1449 10.5 19.6259 10.5H21.5399V8.43608C21.5399 7.91835 21.9297 7.49858 22.4107 7.49858Z"
                      fill="#2142B6"
                    />
                    <path
                      d="M32.6702 26.25C32.6702 30.8063 29.2394 34.5 25.0074 34.5C20.7755 34.5 17.3447 30.8063 17.3447 26.25C17.3447 21.6937 20.7755 18 25.0074 18C29.2394 18 32.6702 21.6937 32.6702 26.25ZM25.7041 21C25.7041 20.5858 25.3922 20.25 25.0074 20.25C24.6227 20.25 24.3108 20.5858 24.3108 21V25.5H20.1312C19.7464 25.5 19.4346 25.8358 19.4346 26.25C19.4346 26.6642 19.7464 27 20.1312 27H24.3108V31.5C24.3108 31.9142 24.6227 32.25 25.0074 32.25C25.3922 32.25 25.7041 31.9142 25.7041 31.5V27H29.8837C30.2684 27 30.5803 26.6642 30.5803 26.25C30.5803 25.8358 30.2684 25.5 29.8837 25.5H25.7041V21Z"
                      fill="#2142B6"
                    />
                  </svg>
                </div>
                <span className={styles.topMenuText}>
                  Go to Daily Mood Quiz
                </span>
              </div>
            </Link>
            <Link href="/weekly-quiz">
              <div className={styles.dashboardTopMenu}>
                <div className={styles.menuImageDiv}>
                  <svg
                    width="34"
                    height="36"
                    viewBox="0 0 34 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5859 14.2636H15.1707L13.8777 10.8931L12.5859 14.2636Z"
                      fill="#212121"
                    />
                    <path
                      d="M8.13181 4.5C6.11199 4.5 4.47461 6.26288 4.47461 8.4375V27.5625C4.47461 29.7371 6.112 31.5 8.13181 31.5H17.3749C16.4738 29.9846 15.9513 28.183 15.9513 26.25C15.9513 25.0624 16.1485 23.9242 16.5097 22.8717H8.13181C7.65087 22.8717 7.26105 22.452 7.26105 21.9342C7.26105 21.4165 7.65087 20.9967 8.13181 20.9967H17.3769C18.9865 18.2923 21.8024 16.5 25.0073 16.5C26.6639 16.5 28.2167 16.9789 29.5526 17.8152V8.4375C29.5526 6.26288 27.9152 4.5 25.8954 4.5H8.13181ZM7.26105 26.4375C7.26105 25.9197 7.65087 25.5 8.13181 25.5H13.7103C14.1912 25.5 14.5811 25.9197 14.5811 26.4375C14.5811 26.9553 14.1912 27.375 13.7103 27.375H8.13181C7.65087 27.375 7.26105 26.9553 7.26105 26.4375ZM13.8772 7.49872C14.2299 7.49866 14.5477 7.72747 14.6822 8.07833L17.9925 16.7078C18.1761 17.1864 17.9646 17.7346 17.5201 17.9322C17.0756 18.1299 16.5664 17.9021 16.3829 17.4236L15.89 16.1386H11.8672L11.3748 17.4233C11.1914 17.902 10.6823 18.1298 10.2377 17.9324C9.79323 17.7349 9.58153 17.1867 9.76502 16.7081L13.0725 8.07862C13.207 7.7277 13.5247 7.49878 13.8772 7.49872ZM22.4107 7.49858C22.8915 7.49858 23.2814 7.91835 23.2814 8.43608V10.5H25.1988C25.6798 10.5 26.0696 10.9197 26.0696 11.4375C26.0696 11.9553 25.6798 12.375 25.1988 12.375H23.2814V14.4362C23.2814 14.954 22.8915 15.3737 22.4107 15.3737C21.9297 15.3737 21.5399 14.954 21.5399 14.4362V12.375H19.6259C19.1449 12.375 18.7551 11.9553 18.7551 11.4375C18.7551 10.9197 19.1449 10.5 19.6259 10.5H21.5399V8.43608C21.5399 7.91835 21.9297 7.49858 22.4107 7.49858Z"
                      fill="#2142B6"
                    />
                    <path
                      d="M32.6702 26.25C32.6702 30.8063 29.2394 34.5 25.0074 34.5C20.7755 34.5 17.3447 30.8063 17.3447 26.25C17.3447 21.6937 20.7755 18 25.0074 18C29.2394 18 32.6702 21.6937 32.6702 26.25ZM25.7041 21C25.7041 20.5858 25.3922 20.25 25.0074 20.25C24.6227 20.25 24.3108 20.5858 24.3108 21V25.5H20.1312C19.7464 25.5 19.4346 25.8358 19.4346 26.25C19.4346 26.6642 19.7464 27 20.1312 27H24.3108V31.5C24.3108 31.9142 24.6227 32.25 25.0074 32.25C25.3922 32.25 25.7041 31.9142 25.7041 31.5V27H29.8837C30.2684 27 30.5803 26.6642 30.5803 26.25C30.5803 25.8358 30.2684 25.5 29.8837 25.5H25.7041V21Z"
                      fill="#2142B6"
                    />
                  </svg>
                </div>
                <span className={styles.topMenuText}>
                  Go to Weekly Mood Quiz
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Dashboard support system */}
        <div className={styles.dashboardSupportSystemDiv}>
          {/* <span className={styles.supportSystemText}>
            Depiction of Support System surrounding the patient
          </span> */}
          <div className={styles.memberTreeWrapper}>
            <MemberTree
              teamMemberData={group}
              changeTeamMemberData={changeTeamMemberData}
            />
          </div>
        </div>

        <div className={styles.todayWellness}>
          <span className={styles.supportSystemText}>
            Today{"'"}s Wellness Exercise
          </span>
          <span>{wellnessExcercise}</span>
        </div>
      </div>

      <div className={styles.rightDiv}>
        <div className={styles.dashboardInfo}>
          <UserProfile />
          <div className={styles.calendarDiv}>
            <Calendar />
          </div>
        </div>
        <Barchart />
      </div>
    </div>
  );
};

DashboardBody.propTypes = {
  getSupportGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  supportGroup: state.supportGroup,
});

export default connect(mapStateToProps, {
  getSupportGroup,
})(DashboardBody);
