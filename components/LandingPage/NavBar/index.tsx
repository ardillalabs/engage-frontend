import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { IoMdCall } from "react-icons/io";
import NavBarMobile from "../NavBarMobile";

interface InavItem {
  name: string;
  id: string;
}

const navItems: InavItem[] = [
  {
    name: "Home",
    id: "/",
  },
  {
    name: "About",
    id: "#about",
  },
  {
    name: "Service",
    id: "#service",
  },
  {
    name: "Solution",
    id: "#solution",
  },
  {
    name: "Contact",
    id: "/",
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
                src="/animation_Contrast_tnqz1240.gif"
                alt="logo"
                width={110}
                height={94}
              />
            </Link>
          </div>
          <div className={styles.calmDiv}>
            Connect, Support, Thrive Together
          </div>
          <div className={styles.emptyDiv}></div>
        </div>
        <div className={styles.lowerDiv}>
          <div className={styles.leftDiv}>
            <div className={styles.navItems}>
              {navItems.map((navItem, index) => (
                <Link key={index} className={styles.navItem} href={navItem.id}>
                  {navItem.name}
                </Link>
              ))}
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
        {/* <div className={styles.mobileLowerDiv}> */}
        <NavBarMobile />
        {/* </div> */}
      </div>
    </div>
  );
};

export default NavBar;
