import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

interface teamMemberArray {
  userID: string;
  userName: string;
  imageURL: string;
  email: string;
}
const MemberTree = ({
  changeTeamMemberData,
  teamMemberData,
}: {
  changeTeamMemberData: any;
  teamMemberData: teamMemberArray[];
}) => {
  const handleRemove = (i: number) => {
    const filtered = teamMemberData
      .slice(0, i)
      .concat(teamMemberData.slice(i + 1, teamMemberData.length));

    changeTeamMemberData(filtered);
  };

  const [popupDiv, setPopupDiv] = useState(false);

  return (
    <div className={styles.mainDivWrapper}>
      <button
        className={popupDiv ? styles.addBtnHidden : styles.addBtn}
        onClick={() => setPopupDiv(true)}
      >
        Add Members
      </button>
      <div className={styles.mainDiv}>
        <div className={styles.memberTreeDiv}>
          {/* User image */}
          <div className={styles.userImageContainer}>
            <Image
              src="https://source.unsplash.com/_7LbC5J-jw4"
              alt="Profile Picture"
              className={styles.userImage}
              width={100}
              height={100}
            />
          </div>

          {/* Members */}

          {Array.from(Array(8), (e, i) => {
            return (
              <div
                className={styles.imageContainer}
                onClick={() => setPopupDiv(true)}
                key={i}
              >
                {!teamMemberData[i] ? (
                  <div className={styles.imagePlaceholder}>
                    <div>+</div>
                  </div>
                ) : (
                  <Image
                    src={teamMemberData[i].imageURL}
                    height={100}
                    width={100}
                    alt="Member Profile Picture"
                    className={styles.image}
                  />
                )}
              </div>
            );
          })}

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

        {/* Member add popup */}
        <div
          className={
            popupDiv ? styles.popupDivWrapper : styles.popupDivWrapperHidden
          }
        >
          <div className={popupDiv ? styles.popupDiv : styles.popupDivHidden}>
            <div className={styles.popupHeader}>
              <h6>Team Members</h6>
              <div
                className={styles.iconDiv}
                onClick={() => {
                  setPopupDiv(false);
                }}
              >
                <IoMdClose />
              </div>
            </div>
            <div className={styles.searchDiv}>
              <input type="text" className={styles.searchBar} />
              <button className={styles.inviteBtn}>Send Invite</button>
            </div>

            <div className={styles.memberDiv}>
              {teamMemberData.map(
                ({ userID, userName, imageURL, email }, i) => {
                  return (
                    <div className={styles.member} key={userID}>
                      <div className={styles.memberDetailsDiv}>
                        <Image
                          src={imageURL}
                          height={60}
                          width={60}
                          alt="Profile Picture"
                          className={styles.memberImage}
                        />
                        <div className={styles.memberDetails}>
                          <span className="body-3">{userName}</span>
                          <span className={styles.memberEmail}>{email}</span>
                        </div>
                      </div>
                      <div
                        className={styles.iconDiv}
                        onClick={() => handleRemove(i)}
                      >
                        <RiDeleteBin6Fill />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberTree;
