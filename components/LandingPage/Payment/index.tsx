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
      {/* <div className={styles.componentDiv}> */}
      {/* <LeftSideImage/> */}
      <div className={styles.row}>
      <div className={styles.leftImage}>        
      <Image
          src="/left-image.png"
          alt=""
          width={680}
          height={680}
          className={styles.responsiveImage} 
        />
      </div>
      <div className={styles.mobileImageDiv}>
        <Image
          src="/left-image.png"
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
      <div className={styles.rightImage}>        
      <Image
          src="/right-image.png"
          alt=""
          width={680}
          height={680}
          className={styles.responsiveImage} 
        />
      </div>
      </div>
      {/* <div className={styles.leftImage}>        
      <Image
          src="/left_image.png"
          alt=""
          width={600}
          height={600}
          className={styles.responsiveImage} 
        />
      </div>
      <div className={styles.mobileImageDiv}>
        <Image
          src="/left_image.png"
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
      </div> */}
      <div className={styles.backgroundImageDiv}>
        {/* <img
          src="/overview-sbs.png"
          alt="screen shot"
          width="70%"
          height="70%"
        /> */}
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
