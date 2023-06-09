import React from 'react'
import Link from "next/link";
import styles from "./index.module.css";
import SignUpSteps from '../SignUpSteps';

const SignupForm = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <SignUpSteps step="1" />
        <div className={styles.headerDiv}>
           <h2>Let{"'"}s Get Started!</h2> 
           <p>Tell us a little about your self.</p>
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
          <Link href='/support-group'>
            <button>Continue</button>
          </Link>
        </div>
        <div className={styles.bottomDiv}>
          <p>
            Already have an account ? <Link href="/login"> Login</Link>
          </p>
          <p>By clicking “Sign up” you agree to our <span> terms and conditions</span>  & <span>privacy policy</span> </p>
        </div>
        
      </div>
    </div>
  )
}

export default SignupForm
