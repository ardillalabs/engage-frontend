import React from 'react'
import styles from "./index.module.css";
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.upperDiv}>
        <Link href="/">
          <Image
            src="/customcolor_logo_customcolor_background.png"
            alt="logo"
            width={162}
            height={95}
            className= {styles.logoImage}
          />
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
