import React from "react";
import Image from "next/image";
import styles from "./index.module.css";
import PaymentCard from "./PaymentCard";
import { IpaymentPlan } from "../../../tsc-types/paymentTypes";

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
      {/* <div className={styles.halfImageOneDiv}>
        <Image
          src="/home_page_two.png"
          alt=""
          fill
          style={{
            backgroundImage: `url(/home_page_two.png)`,
            width: "100%",
            height: "100%",
            borderTopLeftRadius: "50%",
            borderBottomLeftRadius: "50%",
          }}
          // objectFit="cover"
        />
      </div>
      <div className={styles.halfImageTwoDiv}>
        <Image
          src="/home_page_one.png"
          alt=""
          fill
          style={{
            backgroundImage: `url(/home_page_one.png)`,
            width: "100%",
            height: "100%",
            borderTopRightRadius: "50%",
            borderBottomRightRadius: "50%",
          }}
        />
      </div> */}

      <div className={styles.componentDiv}>
        <div className={styles.headerDiv}>
          Proactive positive support when you need it most
        </div>
        <p className={styles.paragraph}>Select your engagement package.</p>
        <div className={styles.cardsDiv}>
          <PaymentCard plan={monthlyPlan} />
          <PaymentCard plan={yearlyPlan} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
