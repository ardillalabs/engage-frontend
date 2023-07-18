import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';

import { connect } from 'react-redux';
import { RootState } from '@/store';
import PropTypes from 'prop-types';
import { forgotPassword } from '@/actions/Auth';
import { useRouter } from 'next/router';

interface Props {
  forgotPassword: (...args: any[]) => any;
  auth: any;
}

const ForgotPasswordFrom = ({forgotPassword, auth}: Props) => {
  const router = useRouter();

  const myRef = useRef<any>({});

  const [isData, setData] = useState({ Email: ''});

  const [errors, setErrors] = useState({ Email: ''});

  const handleChange = (values: any) => {
    setData({
      ...isData,
      ...values,
    });
  };

  useEffect(() => {
    if (isData.Email.length === 0) {
      setErrors({ ...errors, Email: "" });
    }
  }, [isData.Email]);
  
  const forgotpasswordSubmit = () => {
    console.log("Clicked button")
    const errors = {
      Email: "",
    };

    if (!isData.Email) {
      console.log("Empty Email")
      errors.Email = 'The field is required';
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(isData.Email)
    ) {
      errors.Email = 'Email is invalid.';
    }

    if (!(errors.Email)) {
      forgotPassword(
        {
          email: isData.Email,
        }
      );
    }

    setErrors(errors);
  }

  useEffect(() => {
    if (
      auth.isSentForgotPasswordEmail === false && 
      auth.forgotPasswordMessage == 'Invalid email address. The email you provided does not match any user in our system.') {
      setErrors({
        ...errors,
        Email: 'Invalid email address. The email you provided does not match any user in our system.',
      });
    } 
  }, [auth.isSentForgotPasswordEmail, auth.forgotPasswordMessage]);


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
          <input
            type='text'
            className={styles.input}
            id='email'
            value={isData.Email}
            autoFocus
            ref={(input) => (myRef.current.emal = input)}
            onChange={(e) => handleChange({ Email: e.target.value })}
          />
          <div className={styles.errorMessage}>{errors.Email}</div>
        </div>
        <div className={styles.buttonDiv}  onClick={() => forgotpasswordSubmit()}>
          <button>Send Now</button>
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

// export default ForgotPasswordFrom;
ForgotPasswordFrom.propTypes = {
  forgotPassword: PropTypes.func.isRequired
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  forgotPassword
})(ForgotPasswordFrom);
