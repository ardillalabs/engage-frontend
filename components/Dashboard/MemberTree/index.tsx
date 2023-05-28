import React from 'react';
import styles from "./index.module.css";
import Image from 'next/image';

const MemberTree = () => {
  return (
    <div className={styles.mainDiv}>
        <button className={styles.addBtn}>Add Members</button>
        <div className={styles.memberTreeDiv}>

            {/* User image */}
            <div className={styles.userImageContainer} >
              <Image
                src="https://source.unsplash.com/_7LbC5J-jw4"
                alt="Profile Picture"
                className={styles.userImage}
                width={60}
                height={60}
              />
            </div>

            {/* Members */}
            <div className={styles.imageContainer} >
              <div className={styles.imagePlaceholder}>
                <div>+</div>
              </div>
            </div>
            <div className={styles.imageContainer} >
              <div className={styles.imagePlaceholder}>
                <div>+</div>
              </div>
            </div>
            <div className={styles.imageContainer} >
              <div className={styles.imagePlaceholder}>
                <div>+</div>
              </div>
            </div>
            <div className={styles.imageContainer} >
              <div className={styles.imagePlaceholder}>
                <div>+</div>
              </div>
            </div>
            <div className={styles.imageContainer} >
              <div className={styles.imagePlaceholder}>
                <div>+</div>
              </div>
            </div>
            <div className={styles.imageContainer} >
              <div className={styles.imagePlaceholder}>
                <div>+</div>
              </div>
            </div>
            <div className={styles.imageContainer} >
              <div className={styles.imagePlaceholder}>
                <div>+</div>
              </div>
            </div>
            <div className={styles.imageContainer} >
              <div className={styles.imagePlaceholder}>
                <div>+</div>
              </div>
            </div>

            {/* Lines */}
            <div className={styles.linesDiv}>
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
            </div>
        </div>
    </div>
  )
}

export default MemberTree;