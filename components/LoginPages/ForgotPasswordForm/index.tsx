import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';
import { RootState } from '@/store';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forgotPassword, getCurrentUserDetails } from '@/actions/Auth';
import { getCookie } from 'cookies-next';
import Header from '@/components/LoginPages/Header';

interface Props {
  getCurrentUserDetails: (...args: any[]) => any;
  forgotPassword: (...args: any[]) => any;
  auth: any;
}

const ForgotPasswordFrom = ({ getCurrentUserDetails, forgotPassword, auth }: Props) => {

  const myRef = useRef<any>({});
  const cookie = getCookie('access_token');

  useEffect(() => {
    getCurrentUserDetails(cookie)
  }, [cookie]);

  const [isClick, setClick] = useState({
    isEmailClick: false,
  });
  
  const [isData, setData] = useState({ Email: '',});
  const [errors, setErrors] = useState({
    Email: '',
  });

  const handleChange = (values: any) => {
    setData({
      ...isData,
      ...values,
    });
  };
  
  useEffect(() => {
    if (isData.Email.length === 0) {
      setErrors({ ...errors, Email: '' });
    }
  }, [isData.Email]);

  
  const ForgotPasswordSubmit = () => {
    const errors = {
      Email: '',
    };

    if (!isData.Email) {
      errors.Email = 'The field is required';
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(isData.Email)
    ) {
      errors.Email = 'Email is invalid.';
    }
    if (!(errors.Email)) {
      forgotPassword(isData.Email );
    }
    setErrors(errors);
  };

  useEffect(() => {
    console.log(auth.isSentForgotPasswordEmail, auth.forgotPasswordMessage)
    if (
      auth.isSentForgotPasswordEmail === false &&
      auth.forgotPasswordMessage ===
      'Invalid email address. The email you provided does not match any user in our system.'
    ) {
      setErrors({
        ...errors,
        Email: 'Invalid email address. The email you provided does not match any user in our system.',
      });
    }
    if (
      auth.isSentForgotPasswordEmail === false &&
      auth.forgotPasswordMessage ===
      'Your account has been deactivated. Please contact our support team for further assistance.'
    ) {
      setErrors({
        ...errors,
        Email: 'Your account has been deactivated. Please contact our support team for further assistance.',
      });
    }
    if (
      auth.isSentForgotPasswordEmail === false &&
      auth.forgotPasswordMessage ===
      'Your account has been banned. Please contact our support team for further assistance.'
    ) {
      setErrors({
        ...errors,
        Email: 'Your account has been banned. Please contact our support team for further assistance.',
      });
    }
  }, [auth.isLoadingForgotPassword, auth.isSentForgotPasswordEmail, auth.forgotPasswordMessage]);

  return (
    auth.is_getuser_loading === false ?
    <div>
      <Header subTopic="Welcome to Engage" />
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <h2 className={styles.heading}>Did you forgot password?</h2>
        <p className={styles.subHeading}>
          No problem! Resetting your password is easy. Just type in the email
          you used to register with Engage.
        </p>
        <div className={styles.inputDiv}>
          <div>Enter email</div>
          <input
            onClick={() =>
              setClick({
                ...isClick,
                isEmailClick: true,
              })
            }
            type="text"
            className={styles.input}
            id="email"
            value={isData.Email}
            autoFocus
            ref={(input) => (myRef.current.email = input)}
            onChange={(e) => handleChange({ Email: e.target.value })}
          />
          <div className={styles.errorMessage}>{errors.Email}</div>
        </div>
        {auth.isLoadingForgotPassword ? (
          <div className={styles.buttonSignInSectionLoading}>Loading ...</div>
        ) : (
          <>
            <div
              className={styles.buttonDiv}>
              <button onClick={() => ForgotPasswordSubmit()}>Send Now</button>
            </div>
            <div className={styles.successMessage}>
              {(auth.isSentForgotPasswordEmail && auth.forgotPasswordMessage === 'An email has been sent to your mailbox. Please check your inbox to reset your password.')
                ? auth.forgotPasswordMessage
                : ""}
            </div>
          </>
        )}
        <div className={styles.bottomDiv}>
          <p>
            Did you remember your password?{' '}
            <Link href='/login'>
              {' '}
              <span> Login </span>
            </Link>
          </p>
        </div>
        <div className={styles.imageDiv}>
          <Image
            src='/forgot-password.png'
            alt='forgot password image'
            width={295}
            height={295}
          />
        </div>
      </div>
    </div>    
    </div>: 
    <div>Loading....</div>
  );
};

// export default ForgotPasswordFrom;
ForgotPasswordFrom.propTypes = { 
  forgotPassword: PropTypes.func.isRequired, 
  getCurrentUserDetails: PropTypes.func.isRequired ,
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getCurrentUserDetails, forgotPassword })(ForgotPasswordFrom);

