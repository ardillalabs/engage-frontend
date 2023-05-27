import React from 'react'
import styles from "./index.module.css";
import SignUpSteps from '../SignUpSteps';
import AddSupportMembers from '../AddSupportMembers';

const SupportGroupForm = () => {
  return (
    <div className={styles.mainDiv}>
        <div className={styles.componentDiv}>
            <SignUpSteps step='2' />
            <div className={styles.contentDiv}>
                  <div className={styles.sectionDiv}>
                    <h2>Build your team.</h2>
                    <p>Create your personal wellness network by inviting up 8 of your closest friends and family. These trusted figures will help monitor your wellness trends and provide encouragement when needed.</p>
                  </div>
                  <div className={styles.sectionDiv}>
                    <h3>Add your support members</h3>
                    <div className={styles.descriptionBoxDiv}>
                      <div className={styles.descHeaderDiv}>Description</div>
                      <p>Our mood tracking analytics monitor your emotional trends, offering insight into your mental well-being. When certain thresholds are met, your personal network is alerted, fostering a timely, caring intervention from those who know you best.</p>
                      {/* <table>
                        <tr>
                          <th>Size</th>
                          <th>Team</th>
                        </tr>
                        <tr>
                          <td>Up to 8 members</td>
                          <td></td>
                        </tr>
                      </table> */}
                    </div>
                    <AddSupportMembers />
                  </div>
            </div>
           
        </div>   
    </div>
  )
}

export default SupportGroupForm
