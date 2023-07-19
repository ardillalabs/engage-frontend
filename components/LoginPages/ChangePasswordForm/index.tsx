import React, { useEffect, useRef, useState } from 'react'
import styles from "./index.module.css";

// redux
import PropTypes from 'prop-types';
import { RootState } from '@/store';
import { connect } from 'react-redux';
import { getProfileDetails, updatePassword } from '@/actions/Auth';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

interface Props {
  getProfileDetails: (...args: any[]) => any;
  updatePassword: (...args: any[]) => any;
  auth: any;
}

const ChangePasswordForm = ({getProfileDetails, updatePassword, auth}: Props) => {
  const router = useRouter();

  const cookie = getCookie('access_token', auth.access_token);

  console.log(cookie);
  // Input Fields
  const myRef = useRef<any>({});

  useEffect(() => {
    getProfileDetails(cookie);
  }, [getProfileDetails]);

  const [isClick, setClick] = useState({isCurrentPasswordClick: false, isNewPasswordClick: false, isConfirmPasswordClick: false});

  const [isData, setData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const [errors, setErrors] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const handleChange = (values: any) => {
    setData({
      ...isData,
      ...values,
    });
  };

  useEffect(() => {
    if (isData.currentPassword.length === 0) {
      setErrors({ ...errors, currentPassword: "" });
    }
  }, [isData.currentPassword]);

  useEffect(() => {
    if (isData.newPassword.length === 0) {
      setErrors({ ...errors, newPassword: "" });
    }
  }, [isData.newPassword]);

  useEffect(() => {
    if (isData.confirmPassword.length === 0) {
      setErrors({ ...errors, confirmPassword: "" });
    }
  }, [isData.confirmPassword]);


  const changePasswordSubmit = () => {
    const errors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!isData.currentPassword) {
      errors.currentPassword = "The field is required";
    }
    if (isData.currentPassword && isData.currentPassword.length < 8) {
      errors.currentPassword = "Min length: 8";
    }
    if (!isData.newPassword) {
      errors.newPassword = "The field is required";
    }
    if (isData.newPassword && isData.newPassword.length < 8) {
      errors.newPassword = "Min length: 8";
    }
    if (!isData.confirmPassword) {
      errors.confirmPassword = "The field is required";
    }
    if (isData.newPassword !== isData.confirmPassword) {
      errors.confirmPassword = "New password and Confirm password must be same.";
    }

    if (!(errors.currentPassword || errors.newPassword || errors.confirmPassword)) {
      updatePassword({ currentPassword: isData.currentPassword, newPassword: isData.newPassword }, cookie);
    }
    setErrors(errors);
  };

  useEffect(() => {
    if (
      auth.isUpdatedPassword === false &&
      auth.updatePasswordMessage ===
        "Incorrect password. Please try again with the correct password."
    ) {
      setErrors({
        ...errors,
        currentPassword: "Incorrect password. Please try again with the correct password.",
      });
    }
  }, [auth.isUpdatedPassword, auth.updatePasswordMessage]);

  useEffect(() => {
    if(auth.isUpdatedPassword)
      router.push('/dashboard')
  }, [auth.isUpdatedPassword])

  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.headerDiv}>
          <h2>Change Password</h2>
          <p>
            Password must contain at least 1 letter, 2 numbers, and 1 symbol
            (minimum length is 12 characters)
          </p>
        </div>
        <div className={styles.inputDiv}>
          <div>Current Password</div>
          <input
            onClick={() =>
              setClick({
                ...isClick,
                isCurrentPasswordClick: true,
              })
            }
            type="password"
            className={styles.input}
            id="existingPassword"
            value={isData.currentPassword}
            autoFocus
            ref={(input) => (myRef.current.currentPassword = input)}
            onChange={(e) => handleChange({ currentPassword: e.target.value })}
          />
          <div className={styles.errorMessage}>{errors.currentPassword}</div>
        </div>
        <div className={styles.inputDiv}>
          <div>New Password</div>
          <input
            onClick={() =>
              setClick({
                ...isClick,
                isNewPasswordClick: true,
              })
            }
            type="password"
            className={styles.input}
            id="newPassword"
            value={isData.newPassword}
            autoFocus
            ref={(input) => (myRef.current.newPassword = input)}
            onChange={(e) => handleChange({ newPassword: e.target.value })}
          />
           <div className={styles.errorMessage}>{errors.newPassword}</div>
        </div>
        <div className={styles.inputDiv}>
          <div>Confirm Password</div>
          <input
            onClick={() =>
              setClick({
                ...isClick,
                isConfirmPasswordClick: true,
              })
            }
            type="password"
            className={styles.input}
            id="confirmPassword"
            value={isData.confirmPassword}
            autoFocus
            ref={(input) => (myRef.current.confirmPassword = input)}
            onChange={(e) => handleChange({ confirmPassword: e.target.value })}
          />
           <div className={styles.errorMessage}>{errors.confirmPassword}</div>
        </div>

        <div className={styles.buttonDiv}  onClick={() => changePasswordSubmit()}>
          <button>Update New Password </button>
        </div>
      </div>
    </div>
  );
}

// export default ChangePasswordForm
ChangePasswordForm.propTypes = {
  getProfileDetails: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
};
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getProfileDetails,
  updatePassword,
})(ChangePasswordForm);

