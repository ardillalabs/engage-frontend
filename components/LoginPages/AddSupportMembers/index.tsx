import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

// redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { RootState } from "../../../store";
import {
  addSupportPerson,
  deleteSupporter,
} from "../../../actions/SupportGroup";

interface teamMemberArray {
  userID: string;
  userName: string;
  imageURL: string;
  email: string;
}
const AddSupportMembers = ({
  changeTeamMemberData,
  teamMemberData,
  addSupportPerson,
  deleteSupporter,
  auth,
}: {
  auth: any;
  supportGroup: any;
  deleteSupporter: any;
  changeTeamMemberData: any;
  addSupportPerson: (...args: any[]) => any;
  teamMemberData: teamMemberArray[];
}) => {
  const handleRemove = (email: string, id: number, i: number) => {
    const filtered = teamMemberData
      .slice(0, i)
      .concat(teamMemberData.slice(i + 1, teamMemberData.length));
    changeTeamMemberData(filtered);
    deleteSupporter(id, email);
  };

  console.log(auth);

  const [popupDiv, setPopupDiv] = useState(false);

  const [isData, setData] = useState({
    userId: auth.id,
    Email: "",
  });

  const [errors, setErrors] = useState({
    Email: "",
  });

  const supportRef = useRef<any>({});

  const handleChange = (values: any) => {
    setData({
      ...isData,
      ...values,
    });
  };

  const FunctionSupporterSubmit = () => {
    const errors = {
      Email: "",
    };

    if (!isData.Email) {
      errors.Email = "The field is required";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(isData.Email)
    ) {
      errors.Email = "Email is invalid.";
    }

    if (!errors.Email) {
      addSupportPerson({
        userId: isData.userId,
        email: isData.Email,
      });
    }
    setErrors(errors);
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.memberTreeDiv}>
        {/* User image */}
        <div className={styles.userImageContainer}>Add Members</div>

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
                  height={60}
                  width={60}
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
            <input
              type="text"
              id="email"
              value={isData.Email}
              autoFocus
              ref={(input) => (supportRef.current.email = input)}
              onChange={(e) => handleChange({ Email: e.target.value })}
              className={styles.searchBar}
            />
            <div onClick={() => FunctionSupporterSubmit()}>
              <button className={styles.inviteBtn}>Send Invite</button>
            </div>
          </div>

          <div className={styles.memberDiv}>
            {teamMemberData.map(({ userID, userName, imageURL, email }, i) => {
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
                    onClick={() => handleRemove(email, 1, i)}
                  >
                    <RiDeleteBin6Fill />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

AddSupportMembers.propTypes = {
  addSupportPerson: PropTypes.func.isRequired,
  deleteSupporter: PropTypes.func.isRequired,
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  supportGroup: state.supportGroup,
});

export default connect(mapStateToProps, {
  addSupportPerson,
  deleteSupporter,
})(AddSupportMembers);
