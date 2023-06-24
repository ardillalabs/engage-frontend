import React from 'react'
import Link from "next/link";
import styles from "./index.module.css";

const EditProfileForm = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
      <div className={styles.headerDiv}>
           <h2>Edit Profile</h2> 
        </div>
        <div className={styles.inputDiv}>
          <div>Full Name</div>
          <input type="text" className={styles.input} />
        </div>
        <div className={styles.inputDiv}>
          <div>User Name</div>
          <input type="text" className={styles.input} />
        </div>
        <div className={styles.inputDiv}>
          <div>Email</div>
          <input type="text" className={styles.input} />
        </div>
        <div className={styles.inputDiv}>
          <div>Password</div>
          <input type="password" className={styles.input} />
        </div>
       
        <div className={styles.buttonDiv}>
          <Link href='/dashboard'>
            <button>Update</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EditProfileForm
