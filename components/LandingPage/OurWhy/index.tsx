import React from "react";
import Image from "next/image";
import styles from "./index.module.css";

const OurWhy = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.leftDiv}>
          <Image
            src="/our_why.png"
            alt="our why"
            width={570}
            height={380}
            style={{ width: "100%", objectFit: "contain" }}
            className={styles.imageDiv}
          />
        </div>
        <div className={styles.rightDiv}>
          <h2 className={styles.header}>Our WHY</h2>
          <p className={styles.paragraph}>
            We are individuals united by a common goal: proactive mental
            wellness. We are forward-thinkers, wellness enthusiasts, and
            believers in the power of personal connection. We understand that
            mental wellness isn{"'"}t just a luxury{"—"}it{"'"}s a life
            necessity. Engage is your space to build a unique network,
            handpicked by you, bound by empathy, encouragement, and shared
            wellness goals. It{"'"}s here, in this supportive environment, that
            we each play a crucial part in fostering a culture of well-being.
            Together, we create an exciting journey towards better wellness.
            Welcome to Engage!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurWhy;
