import Image from "next/image";
import React from "react";
import styles from "./index.module.css";
import Link from "next/link";

const Author = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.authorDiv}>
          <div className={styles.authorImage}>
            <Image
              src="/mask-group.png"
              width={300}
              height={300}
              style={{ maxWidth: "100%", height: "auto" }}
              alt=""
            />           
          <div className={styles.authorNameMax}>Dr. Vivek H. Murthy</div>
          <div className={styles.titleMax}>19th and 21st Surgeon General of the United States</div>
          </div>
          
          <div className={styles.authorName}>Dr. Vivek H. Murthy</div>
          <div className={styles.title}>19th and 21st Surgeon General of the United States</div>
          <div className={styles.authorDescription}>
            &#34;The mortality impact of being socially disconnected is similar
            to that caused by smoking up to 15 cigarettes a day&#34;           
          <div className={styles.readMore}><Link href={'https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf'} target="_blank">Read More..</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
