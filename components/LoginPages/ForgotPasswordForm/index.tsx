import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { forgotPassword } from '@/actions/Auth';
import { RootState } from '@/store';
import { Slide, toast } from 'react-toastify';

interface Props {
  forgotPassword: (...args: any[]) => any;
  auth: any;
}

const ForgotPasswordFrom = ({
  forgotPassword, auth
}: Props) => {

  const myRef = useRef<any>({});
  const [isClick, setClick] = useState({
    isEmailClick: false,
  });
  
  const [isData, setData] = useState({ Email: ''});
  const [errors, setErrors] = useState({
    Email: '',
  });
  const [message, setMessage] = useState("");

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

  const FunctionForgotPasswordSubmit = () => {
    const errors = {
      Email: '',
      Password: '',
    };

    if (!isData.Email) {
      errors.Email = 'The field is required';
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(isData.Email)
    ) {
      errors.Email = 'Email is invalid.';
    }

    if (!(errors.Email || errors.Password)) {
      forgotPassword(isData.Email);
    }

    setErrors(errors);
  };

  useEffect(() => {
    if (
      auth.isSentForgotPasswordEmail === false &&
      auth.forgotPasswordMessage ===
      "Invalid email address. The email you provided does not match any user in our system."
    ) {
      setErrors({
        ...errors,
        Email: "Invalid email address. The email you provided does not match any user in our system.",
      });
    } else if (
      auth.isSentForgotPasswordEmail === true &&
      auth.forgotPasswordMessage ===
      "An email has been sent to your mailbox. Please check your inbox to reset your password."
    ) {
      setMessage(
        "An email has been sent to your mailbox. Please check your inbox to reset your password.",
      );
    }
  }, [auth.isLoadingForgotPassword, auth.isSentForgotPasswordEmail, auth.forgotPasswordMessage]);
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <h2 className={styles.heading}>Did you forgot password?</h2>
        <p className={styles.subHeading}>
          No problem! Resetting your password is easy. Just type in the email
          you used to register with Engage.
        </p>
        <div className={styles.inputDiv}>
          <div>Enter email</div>
          {/* <input type='text' className={styles.input} /> */}
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
        <div className={styles.buttonDiv}  onClick={() => FunctionForgotPasswordSubmit()}>
          <button>Send Now</button>
        </div>
        <div className={styles.commonErrorMessage}>
        {message}
        </div>
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
  );
};

ForgotPasswordFrom.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {forgotPassword})(ForgotPasswordFrom);

