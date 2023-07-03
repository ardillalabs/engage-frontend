import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import SignUpSteps from "../SignUpSteps";
import AddSupportMembers from "../AddSupportMembers";
import Image from "next/image";

// redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { RootState } from "../../../store";
import {
  getSupportGroup,
  deleteSupporter,
} from "../../../actions/SupportGroup";

interface teamMemberArray {
  userID: string;
  userName: string;
  imageURL: string;
  email: string;
}

const SupportGroupForm = ({ getSupportGroup, auth, supportGroup }: any) => {
  useEffect(() => {
    getSupportGroup(1);
  }, [supportGroup.supportGroup.length]);
  const [teamMemberData, setTeamMemberData] = useState<any | null>(null);

  const group: any =
    supportGroup.supportGroup &&
    supportGroup.supportGroup.map((supporter: any, index: any) => {
      const support = {
        userID: auth.id,
        userName: supporter.support_user?.full_name
          ? supporter.support_user?.full_name
          : "unknown Name",
        imageURL: supporter.support_user?.image_url
          ? supporter.support_user.image_url
          : "/dummy450x450.jpg",
        email: supporter?.email,
      };
      return support;
    });

  // Test Data

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
                    {group &&
                      group.map((team: any, i: number) => {
                        return (
                          <div key={i} className={styles.showcaseImageWrapper}>
                            <Image
                              src={team?.imageURL}
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
              teamMemberData={group}
              changeTeamMemberData={changeTeamMemberData}
            />

            <div className={styles.teamEmails}>
              {group &&
                group.map((team: any, i: number) => {
                  return (
                    <div className={styles.teamEmail} key={i}>
                      {team?.email}
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

SupportGroupForm.propTypes = {
  getSupportGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  supportGroup: state.supportGroup,
});

export default connect(mapStateToProps, {
  getSupportGroup,
})(SupportGroupForm);
