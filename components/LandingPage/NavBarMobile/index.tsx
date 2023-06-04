import Link from "next/link";
import MenuBar from "./MenuBar";
import styles from "./index.module.css";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

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
            <div className={styles.loginDiv}>
              <Link href="/login">Login</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NavBarMobile;
