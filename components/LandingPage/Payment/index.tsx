import React from 'react'
import styles from "./index.module.css";
import PaymentCard from "./PaymentCard";
import { IpaymentPlan } from "../../../tsc-types/paymentTypes";
import Image from "next/image";

const monthlyPlan: IpaymentPlan = {
  header: "Monthly",
  price: "$9.99/mo",
  conditions: [
    "Structured Social Support",
    "Daily Wellness Exercises",
    "Mood Tracking",
  ],
};

const yearlyPlan: IpaymentPlan = {
  header: "Annually",
  price: "$59.99/yr",
  conditions: [
    "Structured Social Support",
    "Daily Wellness Exercises",
    "Mood Tracking",
  ],
};

const Payment = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.headerDiv}>
          Proactive positive support when you need it most
        </div>
        <p className={styles.paragraph}>Select your engagement package.</p>
        <div className={styles.cardsDiv}>
          <PaymentCard plan={monthlyPlan} />
          <PaymentCard plan={yearlyPlan} />
        </div>
        {/* <div className={styles.images}>
          <div className={styles.imageOneDiv}>
            <Image
              src="/home-page-image-one.png"
              alt=""
              width={1024}
              height={576}
              objectFit="contain"
            />
          </div>
          <div className={styles.imageTwoDiv}>
            <Image
              src="/home-page-image-two.png"
              alt=""
              width={840}
              height={540}
              objectFit="contain"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Payment
