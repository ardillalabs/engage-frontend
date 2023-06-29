import React from "react";
import styles from "./index.module.css";
import PaymentCard from "../Payment/PaymentCard";
import { IpaymentPlan } from "@/tsc-types/paymentTypes";
import Image from "next/image";

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
        <h2 className={styles.header}>Try Engage for free</h2>
        <div className="flex">
          <div className={styles.leftDiv}>
            <PaymentCard plan={freePlan} />
          </div>
          <div className={styles.rightDiv}>
            <Image
              src="/overview-angled-cropped.png"
              alt="free image"
              width={570}
              height={380}
              style={{ width: "100%", objectFit: "contain" }}
              className={styles.imageDiv}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngageForFree;
