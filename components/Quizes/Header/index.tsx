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
            width={110}
            height={65}
            className='logoImage'
          />
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
