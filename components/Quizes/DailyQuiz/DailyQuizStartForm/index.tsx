import React from 'react'
import styles from "./index.module.css";
import Link from 'next/link';

const DailyQuizStartForm = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.bodyDiv}>Please fill out this 2 question quiz to see where you're at!</div>
        <div className={styles.questionNoDiv}>
            <button>1</button>
            <button>2</button>
        </div>
        <div className={styles.buttonDiv}>
          <Link href='/support-group'>
            <button>Start Quiz</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DailyQuizStartForm
