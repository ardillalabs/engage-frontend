import React from 'react'
import styles from "./index.module.css";

interface prop {
  text: string;
}

const SubHeader = ({text}: prop) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.centerDiv}>
          {text}
        </div>
      </div>
    </div>
  )
}

export default SubHeader
