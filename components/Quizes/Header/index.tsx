import React from "react";
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.upperDiv}>
          <Link href="/">
            <Image
              src="/animation_Contrast_tnqz1240.gif"
              alt="logo"
              width={110}
              height={94}
              className={styles.logoImage}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
