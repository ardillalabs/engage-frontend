import React, { useEffect, useRef } from 'react'
import styles from './index.module.css'

const AddSupportMembers = () => {
    const parentDivRef = useRef<any>(null);
    
  return (
    <div className={styles.mainDiv}>
        <div className={styles.componentDiv}>
            <div className={styles.circlemap}></div>
        </div>   
    </div>
  )
}

export default AddSupportMembers
