import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { IstepDetails } from "@/tsc-types/stepTypes";

interface prop {
  stepDetails: IstepDetails;
}

const Step = ({ stepDetails }: prop) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.imageDiv}>
          <Image
            src={stepDetails.imageSrc}
            alt={stepDetails.alt}
            width={83}
            height={83}
          />
        </div>
        <div className={styles.descriptionDiv}>
          <div className={styles.step}>{stepDetails.stepName}</div>
          <p>{stepDetails.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Step;
