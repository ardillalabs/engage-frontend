import React, { useState } from "react";
import styles from "./index.module.css";
import SignUpSteps from "../SignUpSteps";
import AddSupportMembers from "../AddSupportMembers";
import Image from "next/image";

interface teamMemberArray {
  userID: string;
  userName: string;
  imageURL: string;
  email: string;
}

const SupportGroupForm = () => {
  // Test Data
  const [teamMemberData, setTeamMemberData] = useState([
    {
      userID: "U0001",
      userName: "Test1",
      imageURL: "https://source.unsplash.com/3TLl_97HNJo",
      email: "test1@gmail.com",
    },
    {
      userID: "U0002",
      userName: "Test2",
      imageURL: "https://source.unsplash.com/mEZ3PoFGs_k",
      email: "test2@gmail.com",
    },
    {
      userID: "U0003",
      userName: "Test3",
      imageURL: "https://source.unsplash.com/O3ymvT7Wf9U",
      email: "test3@gmail.com",
    },
    {
      userID: "U0004",
      userName: "Test4",
      imageURL: "https://source.unsplash.com/d1UPkiFd04A",
      email: "test4@gmail.com",
    },
    {
      userID: "U0005",
      userName: "Test5",
      imageURL: "https://source.unsplash.com/iFgRcqHznqg",
      email: "test5@gmail.com",
    },
    {
      userID: "U0006",
      userName: "Test6",
      imageURL: "https://source.unsplash.com/00ByEXKcSkA",
      email: "test6@gmail.com",
    },
    {
      userID: "U0007",
      userName: "Test7",
      imageURL: "https://source.unsplash.com/_KaMTEmJnxY",
      email: "test7@gmail.com",
    },
    {
      userID: "U0008",
      userName: "Test8",
      imageURL: "https://source.unsplash.com/JghQQDI4QWg",
      email: "test8@gmail.com",
    },
  ]);

  const changeTeamMemberData = (data: teamMemberArray[]) => {
    setTeamMemberData(data);
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <SignUpSteps step="2" />
        <div className={styles.contentDiv}>
          <div className={styles.sectionDiv}>
            <h2>Build your team.</h2>
            <p>
              Create your personal wellness network by inviting up 8 of your
              closest friends and family. These trusted figures will help
              monitor your wellness trends and provide encouragement when
              needed.
            </p>
          </div>
          <div className={styles.sectionDiv}>
            <h3>Add your support members</h3>
            <div className={styles.descriptionBoxDiv}>
              <div className={styles.descHeaderDiv}>Description</div>
              <p>
                Our mood tracking analytics monitor your emotional trends,
                offering insight into your mental well-being. When certain
                thresholds are met, your personal network is alerted, fostering
                a timely, caring intervention from those who know you best.
              </p>
              <div className={styles.teamInfo}>
                <div className={styles.teamSize}>
                  <span className={styles.teamInfoHeader}>Size</span>
                  <span className={styles.teamInfoText}>Up to 8 members</span>
                </div>
                <div className={styles.teamShowcase}>
                  <span>Team</span>
                  <div className={styles.showcaseImages}>
                    {teamMemberData.map(({ imageURL }, i) => {
                      return (
                        <div key={i} className={styles.showcaseImageWrapper}>
                          <Image
                            src={imageURL}
                            width={40}
                            height={40}
                            alt="Team Member Profile Picture"
                            className={styles.showcaseImage}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <AddSupportMembers
              teamMemberData={teamMemberData}
              changeTeamMemberData={changeTeamMemberData}
            />

            <div className={styles.teamEmails}>
              {teamMemberData.map(({ email }, i) => {
                return (
                  <div className={styles.teamEmail} key={i}>
                    {email}
                  </div>
                );
              })}
            </div>

            <button className={styles.submitBtn}>
              Submit member{"'"}s email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportGroupForm;
