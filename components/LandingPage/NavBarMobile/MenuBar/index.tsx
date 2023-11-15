import React from "react";
import Link from "next/link";
import styles from "./index.module.css";

interface Props {
  setMenuBarState: any;
}

const MenuBar = ({ setMenuBarState }: Props) => {
  const navItems = [
    {
      name: "Home",
      navigation: "/",
    },
    {
      name: "About",
      navigation: "#about",
    },
    {
      name: "Service",
      navigation: "#service",
    },
    {
      name: "Solution",
      navigation: "#solution",
    },
    {
      name: "Contact",
      navigation: "/",
    },
  ];
  return (
    <div className={styles.menuDropdown}>
      {navItems.map((navItem, index) => (
        <div
          key={index}
          className={styles.menuBarDiv}
          onClick={() => {
            setMenuBarState(false);
          }}
        >
          <div className={styles.menuBarList}>
            <Link href={navItem.navigation}>
              <div className={styles.name}>{navItem.name}</div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
