import React, { useState } from "react";
import styles from "./index.module.css";

interface prop {
  step: string;
}

const SignUpSteps = ({ step }: prop) => {
  const [activeStep, setActiveStep] = useState<string>(step);

  return (
    <div className={styles.stepsDiv}>
      <div
        className={activeStep === "1" ? styles.activeStep : styles.inactiveStep}
      >
        1
      </div>
      <hr className={styles.lineDiv} />
      <div
        className={activeStep === "2" ? styles.activeStep : styles.inactiveStep}
      >
        2
      </div>
      <hr className={styles.lineDiv} />
      <div
        className={activeStep === "3" ? styles.activeStep : styles.inactiveStep}
      >
        3
      </div>
    </div>
  );
};

export default SignUpSteps;
