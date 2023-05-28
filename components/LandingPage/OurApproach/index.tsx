import React from "react";
import styles from "./index.module.css";
import Image from "next/image";

const OurApproach = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.leftDiv}>
          <h2 className={styles.header}>Our APPROACH</h2>
          <p className={styles.paragraph}>
            Engage is your personal wellness journey. As you join, you{"'"}ll
            invite 1-8 trusted figures from your life into your wellness circle.
            They{"'"}ll provide real-time support and encouragement. Our
            platform is enriched with daily uplifting messages and exercises
            rooted in Cognitive Behavioral Therapy, offering you tangible ways
            to build resilience. The core of Engage lies in structured social
            connection and scientifically backed resiliency tools. Engage is
            more than just a platform; it{"'"}s a community of your chosen
            supporters actively participating in your wellbeing, transforming
            your journey into a shared experience of growth and care.
          </p>
        </div>
        <div className={styles.rightDiv}>
          <div className={styles.cardsDiv}>
            <div className={styles.cardDiv}>
              <div className={styles.imageDiv}>
                <Image
                  src="/three_people.svg"
                  alt="three people"
                  width={60}
                  height={45}
                />
              </div>
              <div className={styles.nameDiv}>Structured Social Connection</div>
            </div>
            <div className={styles.cardDiv}>
              <div className={styles.imageDiv}>
                <Image
                  src="/wellness_exercises.svg"
                  alt="wellness"
                  width={60}
                  height={45}
                />
              </div>
              <div className={styles.nameDiv}>Wellness Exercises</div>
            </div>
            <div className={styles.cardDiv}>
              <div className={styles.imageDiv}>
                <Image
                  src="/messaging.svg"
                  alt="messaging"
                  width={60}
                  height={45}
                />
              </div>

              <div className={styles.nameDiv}>Daily Positive Messaging</div>
            </div>
            <div className={styles.cardDiv}>
              <div className={styles.imageDiv}>
                <Image
                  src="/mood_analytic.svg"
                  alt="mood analytic"
                  width={60}
                  height={45}
                />
              </div>
              <div className={styles.nameDiv}>Mood Analytics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurApproach;
