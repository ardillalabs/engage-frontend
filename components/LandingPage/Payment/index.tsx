import React, { useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import PaymentCard from "./PaymentCard";
import { IpaymentPlan } from "../../../tsc-types/paymentTypes";
import Author from "./Author";
import Link from "next/link";

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
      <div className={styles.halfImageTwoDiv}>
        <Image
          src="/iPhone Mockup-Recovered.png"
          alt=""
          width={500}
          height={500}
        />
      </div>
      <div className={styles.mobileImageDiv}>
        <Image
          src="/iPhone Mockup.png"
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
          Proactive positive support <br/>when you need it most
        </div>
        <p className={styles.paragraph}>Select a plan:</p>
        <div className={styles.cardsDiv}>
        <PaymentCard
          plan={yearlyPlan}
          onClick={() => handleCardClick(yearlyPlan)}
          isSelected={selectedPlan === yearlyPlan}
        />
        <PaymentCard
          plan={monthlyPlan}
          onClick={() => handleCardClick(monthlyPlan)}
          isSelected={selectedPlan === monthlyPlan}
        />
        </div>
        <div className={styles.signUpButtonDiv}>
        <Link href="/sign-up">
        <button>Sign Up</button>
            </Link>
        </div>
      </div>
        <div className={styles.halfImageOneDiv}>
        <Image
          src="/iPhone Mockup-Recovered.png"
          alt=""
          width={500}
          height={500}
        />
      </div>
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
