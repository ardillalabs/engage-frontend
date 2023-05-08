import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { ImHome2 } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { FiBarChart2 } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdOutlineNotifications } from "react-icons/md";

const Sidebar = ({ children }: any) => {
  return (
    <div className="flex">
      <div className={styles.sidebarDiv}>
        <div className={styles.itemsDiv}>
          <div className={styles.itemLogoDiv}>
            <Link href="/">
              <Image
                src="/white_logo_color1_background.png"
                alt="logo"
                width={75}
                height={45}
              />
            </Link>
          </div>
          <div className={styles.itemDiv}>
            <Link href="/dashboard">
              <RiDashboardLine className={styles.icon} />
            </Link>
          </div>
          <div className={styles.itemDiv}>
            <Link href="/">
              <ImHome2 className={styles.icon} />
            </Link>
          </div>
          <div className={styles.itemDiv}>
            <Link href="/notification">
              <MdOutlineNotifications className={styles.icon} />
            </Link>
          </div>
          <div className={styles.itemDiv}>
            <Link href="/">
              <FiBarChart2 className={styles.icon} />
            </Link>
          </div>
          <div className={styles.itemDiv}>
            <Link href="/profile">
              <CgProfile className={styles.icon} />
            </Link>
          </div>
          <div className={styles.itemDiv}>
            <Link href="/chat">
              <BsFillChatDotsFill className={styles.icon} />
            </Link>
          </div>
        </div>
      </div>

      <main className={styles.childrenDiv}>{children}</main>
    </div>
  );
};

export default Sidebar;
