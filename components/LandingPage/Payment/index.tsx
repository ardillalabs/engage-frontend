import React, { useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import PaymentCard from "./PaymentCard";
import { IpaymentPlan } from "../../../tsc-types/paymentTypes";
import Author from "./Author";
import Link from "next/link";
import RightSideImage from "./RightSideImage";
import LeftSideImage from "./LeftSideImage";

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
  
  const [selectedPlan, setSelectedPlan] = useState(yearlyPlan);

  const handleCardClick = (plan: any) => {
    setSelectedPlan(plan);
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
      {/* <div className={styles.halfImageTwoDiv}>
        <Image
          src="/Frame 5.png"
          alt=""
          width={500}
          height={500}
        />
      </div> */}
      <LeftSideImage/>
      <div className={styles.mobileImageDiv}>
        <Image
          src="/Frame 5.png"
          alt=""
          width={500}
          height={500}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className={styles.centerDiv}>
      <div className={styles.headerDiv}>
          Be kind to your mind
        </div>
        <p className={styles.paragraph}>Select a plan:</p>
        <div className={styles.cardsDiv}>
        <PaymentCard/>
        </div>
        <div className={styles.signUpButtonDiv}>
        <Link href="/sign-up">
        <button>Sign Up</button>
            </Link>
        </div>
      </div>
      <RightSideImage/>
        {/* <div className={styles.halfImageOneDiv}>
        <Image
          src="/iPhone Mockup-Recovered.png"
          alt=""
          width={500}
          height={500}
        />
      </div> */}
      </div>
      <div className={styles.backgroundImageDiv}>
        <img
          src="/overview-sbs.png"
          alt="screen shot"
          width="70%"
          height="70%"
        />
        {/* <Image
          src="/overview-sbs.png"
          alt="background image"
          width={1920}
          height={1080}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
          className={styles.image}
        /> */}
        <div className={styles.author}>
          <Author />
        </div>
      </div>
    </div>
  );
};

export default Payment;
