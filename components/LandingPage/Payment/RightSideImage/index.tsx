import React, { useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";

const RightSideImage = () => {

  return (
    <div className={styles.imageContainer}>
    <Image
          src="/right_engage.png"
          alt=""
          width={2069}
          height={2313}
          className={styles.responsiveImage} 
        />
  </div>
  );
};

export default RightSideImage;
