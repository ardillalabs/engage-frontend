import React from "react";
import styles from "./index.module.css";
import PaymentCard from "../Payment/PaymentCard";
import { IpaymentPlan } from "@/tsc-types/paymentTypes";

const EngageForFree = () => {
  const freePlan: IpaymentPlan = {
    header: "Free",
    price: "Free Trial",
    conditions: [
      "Structured Social Support",
      "Daily Wellness Exercises",
      "Mood Tracking",
    ],
  };
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.leftDiv}>
          <h2 className={styles.header}>Try Engage for free</h2>

          <PaymentCard plan={freePlan} />
        </div>
        <div className={styles.rightDiv}></div>
      </div>
    </div>
  );
};

export default EngageForFree;
