import React, { useState } from "react";
import styles from "./index.module.css";
import { SlMenu } from "react-icons/sl";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import { TbChartPieFilled } from "react-icons/tb";
import Image from "next/image";
import { IoLogOut } from "react-icons/io5";

const SidebarMobile = () => {
  const [sidebarActive, setSidebarActive] = useState(false);

  return (
    <div className={styles.mainDivContainer}>
      <div className={styles.mainDiv}>
        <div className={styles.leftDiv}>
          <SlMenu
            className={styles.hamburgerIcon}
            onClick={() => setSidebarActive(!sidebarActive)}
          />
          <span className={styles.menuText}>Menu</span>
        </div>
        <button className={styles.alertBtn}>Alert Wellness Team</button>
      </div>

      <div
        className={sidebarActive ? styles.sidebarDiv : styles.sidebarDivHidden}
      >
        <div className={styles.profilePreview}>
          <Image
            src="https://source.unsplash.com/_7LbC5J-jw4"
            alt="Profile Picture"
            className={styles.profilePicture}
            width={60}
            height={60}
          />
          <span className={styles.profileName}>Denneal Perera</span>
        </div>

        <Link href="/dashboard" className={styles.link}>
          <MdSpaceDashboard className={styles.icon} />
          <span>Dashboard</span>
        </Link>

        <Link href="/home" className={styles.link}>
          <AiFillHome className={styles.icon} />
          <span>Home</span>
        </Link>

        <Link href="/chat" className={styles.link}>
          <AiFillMessage className={styles.icon} />
          <span>Chat</span>
        </Link>

        <button className={`${styles.logoutBtn} ${styles.link}`}>
          <IoLogOut className={styles.icon} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarMobile;
