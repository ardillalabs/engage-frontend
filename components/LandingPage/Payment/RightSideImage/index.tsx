import React, { useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";

const RightSideImage = () => {

  return (
    <div className={styles.imageContainer}>
    <Image
          src="/iPhone Mockup-Recovered.png"
          alt=""
          width={500}
          height={500}
          className={styles.responsiveImage} 
        />
  </div>
  );
};

export default RightSideImage;
