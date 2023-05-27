import React from 'react'
import styles from "./index.module.css";
import Image from 'next/image';
import Link from 'next/link';

const LoginForm = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.headerDiv}>
          Login
        </div>
        <div className={styles.inputDiv}>
          <div>Email</div>
          <input type="text" className={styles.input} />
        </div>
        <div className={styles.inputDiv}>
          <div>Password</div>
          <input type="password" className={styles.input} />
          <div className={styles.forgotPassword}><Link href="/forgot-password"> forgot password</Link></div>
        </div>
       
        <div className={styles.buttonDiv}>
          <button>Login</button>
        </div>
        <div className={styles.bottomDiv}>
          <p>
            Don{"'"}t have an account? <Link href="/sign-up"> Sign up here</Link>
          </p>
          <p>By clicking “Sign up” you agree to our <span> terms and conditions</span>  & <span>privacy policy</span> </p>
        </div>
        <div className={styles.imageDiv}>
          <Image
            src="/login_image.png"
            alt="login image"
            width={310}
            height={280}
          />
        </div>
        
      </div>
    </div>
  )
}

export default LoginForm
