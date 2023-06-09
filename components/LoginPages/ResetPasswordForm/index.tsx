import React from 'react'
import styles from "./index.module.css";

const ResetPasswordForm = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.headerDiv}>
          <h2>Reset Password</h2>
          <p>
            Password must contain at least 1 letter, 2 numbers, and 1 symbol
            (minimum length is 12 characters)
          </p>
        </div>

        <div className={styles.inputDiv}>
          <div>New Password</div>
          <input type="password" className={styles.input} />
        </div>
        <div className={styles.inputDiv}>
          <div>Confirm Password</div>
          <input type="password" className={styles.input} />
        </div>

        <div className={styles.buttonDiv}>
          <button>Update New Password </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm
