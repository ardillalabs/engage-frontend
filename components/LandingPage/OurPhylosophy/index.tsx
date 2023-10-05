import React from "react";
import styles from "./index.module.css";
import Image from "next/image";

const OurPhylosophy = () => {
  return (
    // <div className={styles.mainDiv}>
    //   <div className={styles.componentDiv}>
    //     <h2 className={styles.heading}>Our PHILOSOPHY</h2>
    //     <p className={styles.paragraph}>
    //       We believe in the profound power of social connection. It{"'"}s not
    //       just about the number of interactions but the structure, function, and
    //       quality of your relationships that truly matter. We{"'"}re here to
    //       ensure that your ties with family, friends, colleagues, and community
    //       are fulfilling and reliable. Engage helps you cultivate your social
    //       environment, both digital and physical, for your ultimate health and
    //       wellbeing. We strive to bridge any gaps in social connection,
    //       fostering resilience, prosperity, and community safety. Let Engage
    //       guide you to a socially connected life, where every interaction counts
    //       and nourishes your wellbeing.
    //     </p>
    //   </div>
    // </div>
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.leftDiv}>
          <Image
            src="/our_why.png"
            alt="our why"
            width={570}
            height={380}
            style={{ width: "100%", objectFit: "contain" }}
            className={styles.imageDiv}
          />
        </div>
        <div className={styles.rightDiv}>
          <h2 className={styles.header}>Our PHILOSOPHY</h2>
          <p className={styles.paragraph}>
            We believe in the profound power of social connection. It{"'"}s not
            just about the number of interactions but the structure, function,
            and quality of your relationships that truly matter. We{"'"}re here
            to ensure that your ties with family, friends, colleagues, and
            community are fulfilling and reliable. Engage helps you cultivate
            your social environment, both digital and physical, for your
            ultimate health and wellbeing. We strive to bridge any gaps in
            social connection, fostering resilience, prosperity, and community
            safety. Let Engage guide you to a socially connected life, where
            every interaction counts and nourishes your wellbeing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurPhylosophy;
