import React from 'react'
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { IoMdCall } from "react-icons/io";

interface InavItem {
  name: string;
  id: string;
}

const navItems: InavItem[] = [
  {
    name: "Home",
    id: "home",
  },
  {
    name: "About",
    id: "about",
  },
  {
    name: "Service",
    id: "service",
  },
  {
    name: "Reviews",
    id: "reviews",
  },
  {
    name: "Contact",
    id: "contact",
  },
];

const NavBar = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.upperDiv}>
          <div className={styles.itemLogoDiv}>
            <Link href="/">
              <Image
                src="/customcolor_logo_customcolor_background.png"
                alt="logo"
                width={75}
                height={45}
              />
            </Link>
          </div>
          <div className={styles.calmDiv}>
            Connect, Support, Thrive Together
          </div>
          <div></div>
        </div>
        <div className={styles.lowerDiv}>
          <div className={styles.leftDiv}>
            <div className={styles.navItems}>
              {navItems.map((navItem, index) => (
                <div key={index} className={styles.navItem}>
                  {navItem.name}
                </div>
              ))}
            </div>
            <div className={styles.telNumber}>
              | <IoMdCall className={styles.callIcon} />
              (555) 555-1234
            </div>
          </div>
          <div className={styles.rightDiv}>
            <div className={styles.loginButtonDiv}>
              <Link href="/login">
                <button>Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar
