import React from 'react'
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.contentDiv}>
          <div className={styles.logoDiv}>
            <Link href="/">
              <Image
                src="/customcolor_logo_customcolor_background.png"
                alt="logo"
                width={150}
                height={90}
              />
            </Link>
          </div>
          <div className={styles.listDiv}>
            <div className={styles.list}>Home</div>
            <div className={styles.list}>About</div>
            <div className={styles.list}>Service</div>
            <div className={styles.list}>Contact</div>
            <div className={styles.list}>Reviews</div>
          </div>
          <div className={styles.listDiv}>
            <div className={styles.list}>Contact us</div>
            <div className={styles.list}>Privacy policy</div>
            <div className={styles.list}>Terms and conditions</div>
            <div className={styles.list}>License</div>
            <div className={styles.list}>FAQ</div>
          </div>
          <div className={styles.socialDiv}>
            <div className={styles.circleDiv}>
              <AiFillInstagram />
            </div>
            <div className={styles.circleDiv}>
              <FaYoutube />
            </div>
            <div className={styles.circleDiv}>
              <FaTwitter />
            </div>
            <div className={styles.circleDiv}>
              <FaFacebookF />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer
