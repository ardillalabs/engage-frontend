import Link from "next/link";
import Image from "next/image";
import MenuBar from "./MenuBar";
import styles from "./index.module.css";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BsSun, BsMoon } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

import OutsideClickHandler from "react-outside-click-handler";

const NavBarMobile = () => {
  const [menuBarState, setMenuBarState] = useState<boolean>();

  // Menu bar
  const handleMenuBar = () => {
    setMenuBarState(!menuBarState);
  };

  return (
    <div className={styles.mainDiv}>
      <nav className={styles.nav}>
        <div className={styles.topBar}>
          <div className={styles.leftDiv}>
            <div className={styles.hamburgerDiv} onClick={handleMenuBar}>
              {menuBarState ? (
                <div>
                  <AiOutlineClose className={styles.closeIcon} />
                </div>
              ) : (
                <GiHamburgerMenu className={styles.hamburgerIcon} />
              )}
            </div>
            <div
              className={`${styles.menuBarHide} ${
                menuBarState && styles.menuBarVisible
              }`}
            >
              <MenuBar setMenuBarState={setMenuBarState} />
            </div>
            <div className={styles.menuDiv}>Menu</div>
          </div>
          <div className={styles.rightDiv}>
            <div className={styles.loginDiv}>Login</div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NavBarMobile;
