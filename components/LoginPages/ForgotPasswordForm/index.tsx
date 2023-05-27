import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css'

const ForgotPasswordFrom = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <h2 className={styles.heading}>Did you forgot password?</h2>
        <p className={styles.subHeading}>
          No problem! Resetting your password is easy. Just type in the email
          you used to register with Engage.
        </p>
        <div className={styles.inputDiv}>
          <div>Enter email</div>
          <input type="text" className={styles.input} />
        </div>
        <div className={styles.buttonDiv}>
          <button>Send Now</button>
        </div>
        <div className={styles.bottomDiv}>
          <p>Did you remember your password? Try logging in</p>
        </div>
        <div className={styles.imageDiv}>
          <Image
            src="/forgot-password.png"
            alt="forgot password image"
            width={295}
            height={295}
          />
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordFrom
