import React from "react";
import Step from "./Step";
import styles from "./index.module.css";
import { IstepDetails } from "../../../tsc-types/stepTypes";

const stepOne: IstepDetails = {
  imageSrc: "/step_1.png",
  alt: "step one",
  stepName: "Step 1 : Connect",
  description:
    "Register within the Engage platform and complete your initial mood evaluation.",
};

const stepTwo: IstepDetails = {
  imageSrc: "/step_2.png",
  alt: "step two",
  stepName: "Step 2 : Build ",
  description:
    "Invite your personalized support network to join you on your wellness journey.",
};

const stepThree: IstepDetails = {
  imageSrc: "/step_3.png",
  alt: "step three",
  stepName: "Step 3 : Thrive",
  description:
    "Receive proactive positive support from your trusted network to ensure you live a healthier, more productive, and more fulfilled life.",
};

const EngageSolutions = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.headerDiv}>
          <h2>The Engage Solution</h2>
        </div>
        <div className={styles.stepsDiv}>
          <Step stepDetails={stepOne} />
          <Step stepDetails={stepTwo} />
          <Step stepDetails={stepThree} />
        </div>
      </div>
    </div>
  );
};

export default EngageSolutions;
