import React from "react";
import styles from "./index.module.css";
import { FaEdit } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const Header = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.headerDiv}>
        <div className={styles.leftDiv}>
          <div className="page-heading">Dashboard</div>
        </div>
        <div className={styles.rightDiv}>
          <div className={styles.dateDiv}>Monday,15 may 2023</div>
          <div className={styles.buttonDiv}>
            <button>Need a help Quickly</button>
          </div>
          <div>
            <FaEdit className={styles.iconDiv} />
          </div>
          <div>
            <FiSettings className={styles.iconDiv} />
          </div>
        </div>
      </div>
      <hr style={{ margin: "0" }} />
    </div>
  );
};

export default Header;
