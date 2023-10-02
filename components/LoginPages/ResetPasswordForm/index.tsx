import React, { useEffect, useRef, useState } from 'react'
import styles from "./index.module.css";
import { RootState } from '@/store';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createNewPassword } from '@/actions/Auth';
import { useRouter } from 'next/router';

interface Props {
  createNewPassword: (...args: any[]) => any;
  auth: any;
}

const ResetPasswordForm = ({createNewPassword, auth}: Props) => {
  const router = useRouter();
  const myRef = useRef<any>({});
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Extract the 'access_token' query parameter from the URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('access_token');
    console.log('token first', token)

    if (token) {
      setAccessToken(token);
      console.log('token', accessToken)
      console.log('token1', token)
    }
  }, []);

  const [isClick, setClick] = useState({
    isPasswordClick: false,
    isConfirmPasswordClick: false,
  });

  const [isData, setData] = useState({ Password: '', ConfirmPassword: '' });
  const [errors, setErrors] = useState({
    Password: '',
    ConfirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (values: any) => {
    setData({
      ...isData,
      ...values,
    });
  };

  const FunctionResetPasswordSubmit = () => {
    const errors = {
      Password: '',
      ConfirmPassword: '',
    };

    if (!isData.Password) {
      console.log(isData.Password)
      errors.Password = 'The field is required';
    }
    else if (isData.Password.length < 8) {
      errors.Password = 'Must be at least 8 characters';
    }    
    if (!isData.ConfirmPassword) {
      errors.ConfirmPassword = 'The field is required';
    }
    else if (isData.Password !== isData.ConfirmPassword) {
      errors.ConfirmPassword = 'Password and Confirm Password must be same';
    }

    if (!(errors.Password || errors.ConfirmPassword) && accessToken) {
      createNewPassword(
        {
          newPassword: isData.Password,
          confirmPassword: isData.ConfirmPassword,
        },
        accessToken
      );
    }
    // clearAuthMessages();
    setErrors(errors);
    // clearAccessToken();
  };

  useEffect(() => {
    console.log(auth.isCreatedNewPassword, auth.createNewPasswordMessage)
    if (
      auth.isCreatedNewPassword === false &&
      auth.createNewPasswordMessage ===
      'Invalid access token.'
    ) {
      setErrorMessage('Invalid access token.');
    }
    if (
      auth.isCreatedNewPassword === false &&
      auth.createNewPasswordMessage ===
      'Invalid access token. The token you provided does not match any account in our system.'
    ) {
      setErrorMessage('Invalid access token. The token you provided does not match any account in our system.');
    }
    if (
      auth.isCreatedNewPassword === true &&
      auth.createNewPasswordMessage ===
      'Password has been reset successfully.'
    ) {
      setErrorMessage('Password has been reset successfully. Try to login with new password');
    }
  }, [auth.accessToken, auth.isCreatedNewPassword, auth.createNewPasswordMessage]);


  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.headerDiv}>
          <h2>Reset Password</h2>
          <p>
            Password must contain at least 1 letter, 2 numbers, and 1 symbol
            (minimum length is 12 characters)
          </p>
        </div>

        <div className={styles.inputDiv}>
          <div>New Password</div>
          <input
            onClick={() =>
              setClick({
                ...isClick,
                isPasswordClick: true,
              })
            }
            type="password"
            className={styles.input}
            id="Password"
            value={isData.Password}
            autoFocus
            ref={(input) => (myRef.current.password = input)}
            onChange={(e) => handleChange({ Password: e.target.value })}
          />
          <div className={styles.errorMessage}>{errors.Password}</div>
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
            id="confirmpassword"
            value={isData.ConfirmPassword}
            autoFocus
            ref={(input) => (myRef.current.confirmpassword = input)}
            onChange={(e) => handleChange({ ConfirmPassword: e.target.value })}
          />
          <div className={styles.errorMessage}>{errors.ConfirmPassword}</div>
        </div>

        <div className={styles.buttonDiv}>
          <button onClick={() => FunctionResetPasswordSubmit()}>Update New Password </button>
        </div>
        <div className={errorMessage === 'Password has been reset successfully. Try to login with new password'? styles.successMessage: styles.errorMessage} >{errorMessage}</div>
       </div>
    </div>
  );
}

ResetPasswordForm.propTypes = { 
  createNewPassword: PropTypes.func.isRequired 
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { createNewPassword })(ResetPasswordForm);
