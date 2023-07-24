import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.css';

// redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import { signInSubmit } from '../../../actions/Auth';
import { useRouter } from 'next/router';

// Import environment variables
const AUTH_BASE_URL = process.env.AUTH_BASE_URL;

interface Props {
  signInSubmit: (...args: any[]) => any;
  auth: any;
}

const LoginForm = ({ signInSubmit, auth }: Props) => {
  const router = useRouter();
  // Input Fields
  const myRef = useRef<any>({});
  const [isClick, setClick] = useState({
    isEmailClick: false,
    isPasswordClick: false,
  });
  const [isPasswordHide, setPasswordHide] = useState({
    HidePassword1: false,
  });
  const [isData, setData] = useState({ Email: '', Password: '' });
  const [errors, setErrors] = useState({
    Email: '',
    Password: '',
  });

  const handleChange = (values: any) => {
    setData({
      ...isData,
      ...values,
    });
  };

  const functionEmailError = () => {
    if (isClick.isEmailClick === false && !isData.Email) {
      setErrors({ ...errors, Email: '' });
    }
  };

  const functionPasswordError = () => {
    if (isClick.isPasswordClick === false && !isData.Password) {
      setErrors({ ...errors, Password: '' });
    }
  };

  useEffect(() => {
    if (isData.Email.length === 0) {
      setErrors({ ...errors, Email: '' });
    }
  }, [isData.Email]);

  useEffect(() => {
    if (isData.Password.length === 0) {
      setErrors({ ...errors, Password: '' });
    }
  }, [isData.Password]);

  const FunctionLoginSubmit = () => {
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

    if (!isData.Password) {
      errors.Password = 'The field is required';
    }
    if (isData.Password && isData.Password.length < 8) {
      errors.Password = 'Min length: 8';
    }
    if (isData.Password && isData.Password.length < 8) {
      errors.Password = 'Min length: 8';
    }
    if (isData.Password && isData.Password.length < 8) {
      errors.Password = 'Min length: 8';
    }

    if (!(errors.Email || errors.Password)) {
      signInSubmit({ email: isData.Email, password: isData.Password });
      // myRef.current.Email = "";
      // myRef.current.Passowrd = "";
      // setData({ Email: "", Password: "" });
    }

    setErrors(errors);
  };

  useEffect(() => {
    if (
      auth.isLoggedIn === false &&
      auth.loggedInMessage ===
        'The email you entered does not belong to any registered user.'
    ) {
      setErrors({
        ...errors,
        Email: 'The email you entered does not belong to any registered user.',
      });
    }
    if (
      auth.isLoggedIn === false &&
      auth.loggedInMessage ===
        'Incorrect password. Please try again with the correct password.'
    ) {
      setErrors({
        ...errors,
        Password:
          'Incorrect password. Please try again with the correct password.',
      });
    }
  }, [auth.isLoggedIn, auth.loggedInMessage]);

  console.log(auth.isLoggedIn);
  useEffect(() => {
    if (auth.isLoggedIn) {
      router.push('/dashboard');
      myRef.current.Email = '';
      myRef.current.Passowrd = '';
      setData({ Email: '', Password: '' });
    }
  }, [auth]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <h2>Login</h2>
        <div className={styles.inputDiv}>
          <div>Email</div>
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
        <div className={styles.inputDiv}>
          <div>Password</div>
          <input
            onClick={() =>
              setClick({
                ...isClick,
                isPasswordClick: true,
              })
            }
            className={styles.input}
            type={isPasswordHide.HidePassword1 ? "text" : "password"}
            id="Password"
            value={isData.Password}
            ref={(input) => (myRef.current.Password = input)}
            onChange={(e) => handleChange({ Password: e.target.value })}
          />
          <div className={styles.errorMessage}>{errors.Password}</div>
          <div className={styles.forgotPassword}>
            <Link href="/forgot-password">
              {" "}
              <span>Forgot Password </span>
            </Link>
          </div>
        </div>

        {auth.isLoadingLogin ? (
          <div className={styles.buttonSignInSectionLoading}>Loading ...</div>
        ) : (
          <>
            <div
              className={styles.buttonDiv}
              onClick={() => FunctionLoginSubmit()}
            >
              <button>Login</button>
            </div>
            <div className={styles.CommonErrorMessage}>
              {(auth.loggedInMessage &&
                !auth.isLoggedIn &&
                auth.loggedInMessage !==
                  "Incorrect password. Please try again with the correct password.") ||
              "The email you entered does not belong to any registered user."
                ? auth.signedUpMessage
                : ""}
            </div>
          </>
        )}
        <div className={styles.bottomDiv}>
          <p>
            Don{"'"}t have an account?{" "}
            <Link href="/sign-up">
              {" "}
              <span> Sign up here </span>
            </Link>
          </p>
          <p>
            By clicking “Sign up” you agree to our{" "}
            <span> terms and conditions</span> & <span>privacy policy</span>{" "}
          </p>
        </div>
        <div className={styles.imageDiv}>
          <Image
            src="/login_image.png"
            alt="login image"
            width={310}
            height={280}
          />
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = { signInSubmit: PropTypes.func.isRequired };
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { signInSubmit })(LoginForm);
