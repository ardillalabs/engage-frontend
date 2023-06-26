import Image from "next/image";
import React from "react";
import styles from "./index.module.css";

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
          </div>
          <div className={styles.authorDescription}>
            &#34;The mortality impact of being socially disconnected is similar
            to that caused by smoking up to 15 cigarettes a day&#34;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
