import React from 'react'
import styles from "./index.module.css";
import SignUpSteps from '../SignUpSteps';

const SupportGroupForm = () => {
  return (
    <div className={styles.mainDiv}>
        <div className={styles.componentDiv}>
            <SignUpSteps step='2' />
            <div className={styles.contentDiv}>
              <div className={styles.leftDiv}>
                  <div className={styles.buildYourTeamDiv}>
                    <h2>Build your team.</h2>
                    <p>Create your personal wellness network by inviting up 8 of your closest friends and family. These trusted figures will help monitor your wellness trends and provide encouragement when needed.</p>
                  </div>
                  <div className={styles.buildYourTeamDiv}>
                    <h2>Add your support members</h2>
                    </div>
              </div>
              <div className={styles.rightDiv}>
                  <div>Description</div>
              </div>
            </div>
           
        </div>   
    </div>
  )
}

export default SupportGroupForm
