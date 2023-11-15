import React, { useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";

const LeftSideImage = () => {

  return (
    <div className={styles.imageContainer}>
    <Image
          src="/left_image.png"
          alt=""
          width={600}
          height={600}
          className={styles.responsiveImage} 
        />
  </div>
  );
};

export default LeftSideImage;
