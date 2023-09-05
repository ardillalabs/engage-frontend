import Image from "next/image";
import styles from "./index.module.css";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import React, { useEffect, useRef, useState } from "react";

// redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { RootState } from "../../../store";
import {
  addSupportPerson,
  addSupportPersonByPhoneNumber,
  deleteSupporter,
  getSupportGroup,
} from "../../../actions/SupportGroup";
import { getCookie } from "cookies-next";
import { getCurrentUserDetails } from "../../../actions/Auth";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

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
  addSupportPersonByPhoneNumber,
  deleteSupporter,
  getSupportGroup,
  supportGroup,
  auth,
  getCurrentUserDetails,
}: {
  auth: any;
  supportGroup: any;
  deleteSupporter: any;
  getSupportGroup: any;
  changeTeamMemberData: any;
  addSupportPerson: (...args: any[]) => any;
  addSupportPersonByPhoneNumber: (...args: any[]) => any;
  teamMemberData: teamMemberArray[];
  getCurrentUserDetails: any;
}) => {
  useEffect(() => {
    const cookie = getCookie("access_token");
    console.log('support - access token')
    getCurrentUserDetails(cookie);
  }, []);

  const handleRemove = async (email: string, id: number, i: number) => {
    const filtered = teamMemberData
      .slice(0, i)
      .concat(teamMemberData.slice(i + 1, teamMemberData.length));
    changeTeamMemberData(filtered);
    await deleteSupporter(id, email);
    getSupportGroup(auth.id);
  };

  const [popupDiv, setPopupDiv] = useState(false);

  const [isData, setData] = useState({
    userId: auth.id,
    Email: "",
    PhoneNumber: ""
  });

  const [isDataPhoneNumber, setDataPhoneNumber] = useState({
    userId: auth.id,
    PhoneNumber: ""
  });

  const [errors, setErrors] = useState({
    Email: "",
  });

  const [errorsPhoneNumber, setErrorsPhoneNumber] = useState({
    PhoneNumber: ""
  });


  const supportRef = useRef<any>({});

  const handleChange = (values: any) => {
    supportGroup.failCreateSupporter = null;
    setData({
      ...isData,
      ...values,
    });
  };

  const handlePhoneNumberChange = (values: any) => {
    supportGroup.failCreateSupporter = null;
    setDataPhoneNumber({
      ...isDataPhoneNumber,
      ...values,
    });
  };

  const FunctionSupporterSubmit = async () => {
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
      await addSupportPerson({
        userId: auth.id,
        email: isData.Email,
      });
      getSupportGroup(auth.id);
    }

    setErrors(errors);
  };

  const FunctionSupporterSubmitPhoneNumber = async () => {
    console.log(isDataPhoneNumber.PhoneNumber, 'phone number')
    const errorsPhoneNumber = {
      PhoneNumber: "",
    };

    if (!isDataPhoneNumber.PhoneNumber) {
      errorsPhoneNumber.PhoneNumber = "The field is required";
    }

    if (!errorsPhoneNumber.PhoneNumber) {
      addSupportPersonByPhoneNumber({
        userId: auth.id,
        phoneNumber: isDataPhoneNumber.PhoneNumber,
      });
      getSupportGroup(auth.id);
    }

    setErrorsPhoneNumber(errorsPhoneNumber);
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
            <div className={styles.errorMessage}>
              {errors.Email
                ? errors.Email
                : supportGroup?.failCreateSupporter?.response?.data?.message}
            </div>
          </div>
          <div className={styles.searchDiv}>
              <PhoneInput
                defaultCountry="us"
                className={`${styles.searchBar1} ${styles.phoneNumber}`}
                value={isData.PhoneNumber}
                onChange={(phoneNumber) =>
                  handlePhoneNumberChange({ PhoneNumber: phoneNumber })
                }
              />
              <div onClick={() => FunctionSupporterSubmitPhoneNumber()}>
                <button className={styles.inviteBtn}>Send Invite</button>
              </div>
              <div className={styles.errorMessage}>
                {errorsPhoneNumber.PhoneNumber
                  ? errorsPhoneNumber.PhoneNumber
                  : supportGroup?.failCreateSupporter?.response?.data?.message}
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
                    onClick={() => handleRemove(email, isData.userId, i)}
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
  addSupportPersonByPhoneNumber: PropTypes.func.isRequired,
  deleteSupporter: PropTypes.func.isRequired,
  getSupportGroup: PropTypes.func.isRequired,
  getCurrentUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  supportGroup: state.supportGroup,
});

export default connect(mapStateToProps, {
  addSupportPerson,
  addSupportPersonByPhoneNumber,
  deleteSupporter,
  getSupportGroup,
  getCurrentUserDetails,
})(AddSupportMembers);
