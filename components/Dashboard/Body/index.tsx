import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import MemberTree from '../MemberTree';
import UserProfile from '../UserProfile';
import Calendar from '../Calendar';
import Link from 'next/link';
import useDate from '@/hooks/useDate';
import Barchart from '../Barchart';

// redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import {
  getSupportGroup,
  deleteSupporter,
} from '../../../actions/SupportGroup';
import {
  checkDailyQuizEligibility,
  checkWeeklyQuizEligibility,
} from '@/actions/Quiz';
import { useRouter } from 'next/router';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface teamMemberArray {
  userID: string;
  userName: string;
  imageURL: string;
  email: string;
}

const DashboardBody = ({
  getSupportGroup,
  auth,
  supportGroup,
  checkDailyQuizEligibility,
  checkWeeklyQuizEligibility,
  quiz,
}: any) => {
  useEffect(() => {
    getSupportGroup(auth.id);
  }, [supportGroup.supportGroup.length, auth.id]);
  // Test Data
  const [teamMemberData, setTeamMemberData] = useState<any>(null);
  const router = useRouter();

  const group: any =
    supportGroup.supportGroup &&
    supportGroup.supportGroup.map((supporter: any, index: any) => {
      const support = {
        userID: auth.id,
        userName: supporter.support_user?.full_name
          ? supporter.support_user?.full_name
          : 'Anonymous',
        imageURL: supporter.support_user?.image_url
          ? supporter.support_user.image_url
          : '/dummy450x450.jpg',
        email: supporter?.email,
        phoneNumber: supporter.support_user?.phone_number,
      };
      return support;
    });

  console.log(auth);

  const { day, monthNum, year } = useDate();
  const [dailyMessage, setDailyMessage] = useState('Loading...');
  const [wellnessExcercise, setWellnessExcercise] = useState('Loading...');

  let formattedMonthNum = monthNum;
  console.log(`${year}-${monthNum}-${day}`)
  if (monthNum === "010" || monthNum === "011" || monthNum === "012") {
    formattedMonthNum = monthNum.substring(1); // Remove the first character
  }
  console.log(formattedMonthNum);

  const dailyMessageFetch = async () => {
    try {
      const res = await fetch(
        `https://backend.stayengaged.io/api/daily_message/${year}-${formattedMonthNum}-${day}`
      );

      if (res.ok) {
        return res.json().then(({ daily_message }) => {
          setDailyMessage(daily_message.description);
        });
      }
    } catch (error) {
      setDailyMessage('Have a good day!');
      console.log('Failed to fetch daily message', error);
    }
  };

  const wellnessExcerciseFetch = async () => {
    try {
      // const res = await fetch(
      //   `https://engage-backend-production.up.railway.app/api/daily_message/${year}-${monthNum}-${day}`
      // );
      const res = await fetch(
        `https://backend.stayengaged.io/api/wellness_message/${year}-${formattedMonthNum}-${day}`
      );

      if (res.ok) {
        console.log('res', res);
        return res.json().then(({ wellness_message }) => {
          setWellnessExcercise(wellness_message.description);
        });
      }
    } catch (error) {
      setWellnessExcercise('No excercises available');
      console.log('Failed to fetch weekly excercise', error);
    }
  };

  useEffect(() => {
    dailyMessageFetch();
    wellnessExcerciseFetch();
  }, []);

  const changeTeamMemberData = (data: teamMemberArray[]) => {
    setTeamMemberData(data);
  };

  useEffect(() => {
    console.log(auth.id)
    const dateToday = `${year}-${formattedMonthNum}-${day}`;
    checkDailyQuizEligibility(auth.id, 2, dateToday);
    checkWeeklyQuizEligibility(auth.id, 1, dateToday);
  }, [quiz.dailyQuiz, quiz.weeklyQuiz, auth]);

  const handleLinkClick = () => {
    if (quiz?.dailyQuiz === 'You are eligible to do today quiz') {
      router.push('/daily-quiz'); // Navigate to "daily-quiz" route
    } else {
      toast.error('You have already done today quiz. Do again tomorrow!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        toastId: 'alert-feedback',
        transition: Slide,
      });
    }
  };

  const handleLinkClickWeekly = () => {
    console.log(quiz?.weeklyQuiz);
    if (quiz?.weeklyQuiz === 'You are eligible to do this week quiz') {
      router.push('/weekly-quiz'); // Navigate to "weekly-quiz" route
    } else {
      toast.error('You have already done this week quiz. Do again next week!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        toastId: 'alert-feedback',
        transition: Slide,
      });
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.leftDiv}>
        {/* Dashboard Top */}
        <div className={styles.dashboardTop}>
          {/* <h3 className={styles.welcomeText}>Hello {auth?.username}</h3> */}
          <div className={styles.dashboardTopMenus}>
            <Link href='' onClick={handleLinkClick}>
              <div className={styles.dashboardTopMenu}>
                <div className={styles.menuImageDiv}>
                  <svg
                    width='35'
                    height='36'
                    viewBox='0 0 35 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M13.2227 14.2636H15.8074L14.5145 10.8931L13.2227 14.2636Z'
                      fill='#51FF96'
                    />
                    <path
                      d='M8.76853 4.5C6.74871 4.5 5.11133 6.26288 5.11133 8.4375V27.5625C5.11133 29.7371 6.74872 31.5 8.76853 31.5H18.0116C17.1105 29.9846 16.588 28.183 16.588 26.25C16.588 25.0624 16.7853 23.9242 17.1464 22.8717H8.76853C8.28759 22.8717 7.89777 22.452 7.89777 21.9342C7.89777 21.4165 8.28759 20.9967 8.76853 20.9967H18.0136C19.6233 18.2923 22.4392 16.5 25.644 16.5C27.3007 16.5 28.8534 16.9789 30.1893 17.8152V8.4375C30.1893 6.26288 28.5519 4.5 26.5321 4.5H8.76853ZM7.89777 26.4375C7.89777 25.9197 8.28759 25.5 8.76853 25.5H14.3471C14.8279 25.5 15.2178 25.9197 15.2178 26.4375C15.2178 26.9553 14.8279 27.375 14.3471 27.375H8.76853C8.28759 27.375 7.89777 26.9553 7.89777 26.4375ZM14.514 7.49872C14.8666 7.49866 15.1844 7.72747 15.319 8.07833L18.6293 16.7078C18.8128 17.1864 18.6013 17.7346 18.1568 17.9322C17.7123 18.1299 17.2032 17.9021 17.0196 17.4236L16.5267 16.1386H12.504L12.0115 17.4233C11.8281 17.902 11.319 18.1298 10.8745 17.9324C10.4299 17.7349 10.2182 17.1867 10.4017 16.7081L13.7092 8.07862C13.8437 7.7277 14.1614 7.49878 14.514 7.49872ZM23.0474 7.49858C23.5282 7.49858 23.9181 7.91835 23.9181 8.43608V10.5H25.8355C26.3165 10.5 26.7063 10.9197 26.7063 11.4375C26.7063 11.9553 26.3165 12.375 25.8355 12.375H23.9181V14.4362C23.9181 14.954 23.5282 15.3737 23.0474 15.3737C22.5664 15.3737 22.1766 14.954 22.1766 14.4362V12.375H20.2626C19.7817 12.375 19.3918 11.9553 19.3918 11.4375C19.3918 10.9197 19.7817 10.5 20.2626 10.5H22.1766V8.43608C22.1766 7.91835 22.5664 7.49858 23.0474 7.49858Z'
                      fill='#51FF96'
                    />
                    <path
                      d='M33.3069 26.25C33.3069 30.8063 29.8761 34.5 25.6442 34.5C21.4122 34.5 17.9814 30.8063 17.9814 26.25C17.9814 21.6937 21.4122 18 25.6442 18C29.8761 18 33.3069 21.6937 33.3069 26.25ZM26.3408 21C26.3408 20.5858 26.0289 20.25 25.6442 20.25C25.2594 20.25 24.9475 20.5858 24.9475 21V25.5H20.7679C20.3831 25.5 20.0713 25.8358 20.0713 26.25C20.0713 26.6642 20.3831 27 20.7679 27H24.9475V31.5C24.9475 31.9142 25.2594 32.25 25.6442 32.25C26.0289 32.25 26.3408 31.9142 26.3408 31.5V27H30.5204C30.9052 27 31.217 26.6642 31.217 26.25C31.217 25.8358 30.9052 25.5 30.5204 25.5H26.3408V21Z'
                      fill='#51FF96'
                    />
                  </svg>
                </div>
                <span className={styles.topMenuText}>
                  Go to Daily Mood Quiz
                </span>
              </div>
            </Link>
            <Link href='' onClick={handleLinkClickWeekly}>
              <div className={styles.dashboardTopMenu}>
                <div className={styles.menuImageDiv}>
                  <svg
                    width='35'
                    height='36'
                    viewBox='0 0 35 36'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M13.2227 14.2636H15.8074L14.5145 10.8931L13.2227 14.2636Z'
                      fill='#51FF96'
                    />
                    <path
                      d='M8.76853 4.5C6.74871 4.5 5.11133 6.26288 5.11133 8.4375V27.5625C5.11133 29.7371 6.74872 31.5 8.76853 31.5H18.0116C17.1105 29.9846 16.588 28.183 16.588 26.25C16.588 25.0624 16.7853 23.9242 17.1464 22.8717H8.76853C8.28759 22.8717 7.89777 22.452 7.89777 21.9342C7.89777 21.4165 8.28759 20.9967 8.76853 20.9967H18.0136C19.6233 18.2923 22.4392 16.5 25.644 16.5C27.3007 16.5 28.8534 16.9789 30.1893 17.8152V8.4375C30.1893 6.26288 28.5519 4.5 26.5321 4.5H8.76853ZM7.89777 26.4375C7.89777 25.9197 8.28759 25.5 8.76853 25.5H14.3471C14.8279 25.5 15.2178 25.9197 15.2178 26.4375C15.2178 26.9553 14.8279 27.375 14.3471 27.375H8.76853C8.28759 27.375 7.89777 26.9553 7.89777 26.4375ZM14.514 7.49872C14.8666 7.49866 15.1844 7.72747 15.319 8.07833L18.6293 16.7078C18.8128 17.1864 18.6013 17.7346 18.1568 17.9322C17.7123 18.1299 17.2032 17.9021 17.0196 17.4236L16.5267 16.1386H12.504L12.0115 17.4233C11.8281 17.902 11.319 18.1298 10.8745 17.9324C10.4299 17.7349 10.2182 17.1867 10.4017 16.7081L13.7092 8.07862C13.8437 7.7277 14.1614 7.49878 14.514 7.49872ZM23.0474 7.49858C23.5282 7.49858 23.9181 7.91835 23.9181 8.43608V10.5H25.8355C26.3165 10.5 26.7063 10.9197 26.7063 11.4375C26.7063 11.9553 26.3165 12.375 25.8355 12.375H23.9181V14.4362C23.9181 14.954 23.5282 15.3737 23.0474 15.3737C22.5664 15.3737 22.1766 14.954 22.1766 14.4362V12.375H20.2626C19.7817 12.375 19.3918 11.9553 19.3918 11.4375C19.3918 10.9197 19.7817 10.5 20.2626 10.5H22.1766V8.43608C22.1766 7.91835 22.5664 7.49858 23.0474 7.49858Z'
                      fill='#51FF96'
                    />
                    <path
                      d='M33.3069 26.25C33.3069 30.8063 29.8761 34.5 25.6442 34.5C21.4122 34.5 17.9814 30.8063 17.9814 26.25C17.9814 21.6937 21.4122 18 25.6442 18C29.8761 18 33.3069 21.6937 33.3069 26.25ZM26.3408 21C26.3408 20.5858 26.0289 20.25 25.6442 20.25C25.2594 20.25 24.9475 20.5858 24.9475 21V25.5H20.7679C20.3831 25.5 20.0713 25.8358 20.0713 26.25C20.0713 26.6642 20.3831 27 20.7679 27H24.9475V31.5C24.9475 31.9142 25.2594 32.25 25.6442 32.25C26.0289 32.25 26.3408 31.9142 26.3408 31.5V27H30.5204C30.9052 27 31.217 26.6642 31.217 26.25C31.217 25.8358 30.9052 25.5 30.5204 25.5H26.3408V21Z'
                      fill='#51FF96'
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
            Daily Positive Message
          </span>
          <span>{dailyMessage}</span>
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
          {/* <div className={styles.calendarDiv}>
            <Calendar />
          </div> */}
        </div>
        <Barchart />
      </div>
    </div>
  );
};

DashboardBody.propTypes = {
  getSupportGroup: PropTypes.func.isRequired,
  checkDailyQuizEligibility: PropTypes.func.isRequired,
  checkWeeklyQuizEligibility: PropTypes.func.isRequired,
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  supportGroup: state.supportGroup,
  quiz: state.quiz,
});

export default connect(mapStateToProps, {
  getSupportGroup,
  checkDailyQuizEligibility,
  checkWeeklyQuizEligibility,
})(DashboardBody);
