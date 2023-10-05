import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { RiUserSettingsLine } from "react-icons/ri";
import { FiKey } from "react-icons/fi";
import Link from "next/link";

const HeaderMobile = () => {
  return (
    <div className={styles.mainDiv}>
      <Image
        src="/animation_Contrast_tnqz1240.gif"
        alt="logo"
        width={82.5}
        height={70.5}
      />
      <div className={styles.headerIcons}>
        <div className={styles.headerIcon}>
          <Link href="/edit-profile">
            <RiUserSettingsLine />
          </Link>
        </div>
        <div className={styles.headerIcon}>
          <Link href="/change-password">
            <FiKey />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
