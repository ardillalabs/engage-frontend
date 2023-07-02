import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './index.module.css';
import SignUpSteps from '../SignUpSteps';

//cookies
import { useCookies } from 'react-cookie';

// redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import { signUpSubmit } from '../../../actions/Auth';
import { useRouter } from 'next/router';

// Import environment variables
const AUTH_BASE_URL = process.env.AUTH_BASE_URL;

interface Props {
  signUpSubmit: (...args: any[]) => any;
  auth: any;
}

const SignupForm = ({ signUpSubmit, auth }: Props) => {
  const router = useRouter();

  //Get cookies
  const [cookies, setCookie] = useCookies(['access_token']);

  // Input Fields
  const myRef = useRef<any>({});
  const [isClick, setClick] = useState({
    Name: false,
    UserName: false,
    PhoneNumber: false,
    Email: false,
    Password: false,
  });
  const [isPasswordHide, setPasswordHide] = useState<any>({
    Password: false,
  });
  const [isData, setData] = useState({
    Name: '',
    UserName: '',
    PhoneNumber: '',
    Email: '',
    Password: '',
  });
  const [errors, setErrors] = useState({
    Name: '',
    UserName: '',
    PhoneNumber: '',
    Email: '',
    Password: '',
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const handleChange = (values: any) => {
    setData({
      ...isData,
      ...values,
    });
  };

  const functionNameError = () => {
    if (isClick.Name === false && !isData.Name) {
      setErrors({ ...errors, Name: '' });
    }
  };

  const functionUserNameError = () => {
    if (isClick.UserName === false && !isData.UserName) {
      setErrors({ ...errors, UserName: '' });
    }
  };

  const functionPhoneNumberError = () => {
    if (isClick.PhoneNumber === false && !isData.PhoneNumber) {
      setErrors({ ...errors, PhoneNumber: '' });
    }
  };

  const functionEmailError = () => {
    if (isClick.Email === false && !isData.Email) {
      setErrors({ ...errors, Email: '' });
    }
  };

  const functionPasswordError = () => {
    if (isClick.Password === false && !isData.Password) {
      setErrors({ ...errors, Password: '' });
    }
  };

  useEffect(() => {
    if (isData.Name.length === 0) {
      setErrors({ ...errors, Name: '' });
    }
  }, [isData.Name]);

  useEffect(() => {
    if (isData.UserName.length === 0) {
      setErrors({ ...errors, UserName: '' });
    }
  }, [isData.UserName]);

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
      Name: '',
      UserName: '',
      PhoneNumber: '',
      Email: '',
      Password: '',
    };

    if (!isData.Name) {
      errors.Name = 'The field is required';
    }

    if (isData.Name && isData.Name.length < 2) {
      errors.Name = 'Min length: 2';
    }

    if (!isData.UserName) {
      errors.UserName = 'The field is required';
    }

    if (isData.Name && isData.Name.length < 2) {
      errors.Name = 'Min length: 2';
    }

    if (isData.Name && isData.Name.length < 2) {
      errors.Name = 'Min length: 2';
    }

    if (!isData.UserName) {
      errors.UserName = 'The field is required';
    }

    if (isData.UserName && isData.UserName.length < 2) {
      errors.UserName = 'Min length: 2';
    }

    if (isData.UserName && isData.UserName.length < 2) {
      errors.UserName = 'Min length: 2';
    }

    if (isData.UserName && isData.UserName.length < 2) {
      errors.UserName = 'Min length: 2';
    }

    if (!isData.PhoneNumber) {
      errors.PhoneNumber = 'The field is required';
    } else if (
      isData.PhoneNumber.length > 13 ||
      isData.PhoneNumber.length < 8
    ) {
      errors.PhoneNumber = 'Phone number is invalid.';
    }

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

    if (isData.Password.length < 8) {
      errors.Password = 'Must be at least 8 characters';
    }

    if (!(errors.Name || errors.UserName || errors.Email || errors.Password)) {
      signUpSubmit({
        full_name: isData.Name,
        user_name: isData.UserName,
        phone_number: isData.PhoneNumber,
        email: isData.Email,
        password: isData.Password,
      });
    }
    setErrors(errors);
  };

  useEffect(() => {
    if (auth.isSignedUp || auth.isLoggedIn) {
      myRef.current.Name = '';
      (myRef.current.UserName = ''), (myRef.current.Email = '');
      myRef.current.Password = '';
      setData({
        Name: '',
        UserName: '',
        PhoneNumber: '',
        Email: '',
        Password: '',
      });
      setIsChecked(false);
      router.push('/support-group');
    }
  }, [auth.isSignedUp, auth.isLoggedIn]);

  useEffect(() => {
    if (
      auth.isSignedUp === false &&
      auth.signedUpMessage ===
        'This email address is already in use. Please use a different email or sign in with your existing account.'
    ) {
      setErrors({
        ...errors,
        Email:
          'This email address is already in use. Please use a different email or sign in with your existing account.',
      });
    }

    if (
      auth.isSignedUp === false &&
      auth.signedUpMessage ===
        'This username is already in use. Please use a different username or sign in with your existing account.'
    ) {
      setErrors({
        ...errors,
        UserName:
          'This username is already in use. Please use a different username or sign in with your existing account.',
      });
    }
  }, [auth.isSignedUp, auth.signedUpMessage]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <SignUpSteps step='1' />
        <div className={styles.headerDiv}>
          <h2>Let{"'"}s Get Started!</h2>
          <p>Tell us a little about your self.</p>
        </div>
        <div className={styles.inputDiv}>
          <div>Full Name</div>
          <input
            type='text'
            className={styles.input}
            id='name'
            value={isData.Name}
            autoFocus
            ref={(input) => (myRef.current.name = input)}
            onChange={(e) => handleChange({ Name: e.target.value })}
          />
        </div>
        <div className={styles.errorMessage}>{errors.Name}</div>
        <div className={styles.inputDiv}>
          <div>User Name</div>
          <input
            type='text'
            className={styles.input}
            id='username'
            value={isData.UserName}
            autoFocus
            ref={(input) => (myRef.current.username = input)}
            onChange={(e) => handleChange({ UserName: e.target.value })}
          />
        </div>
        <div className={styles.errorMessage}>{errors.UserName}</div>
        <div className={styles.inputDiv}>
          <div>Phone Number</div>
          <input
            type='text'
            className={styles.input}
            id='phonenumber'
            value={isData.PhoneNumber}
            autoFocus
            ref={(input) => (myRef.current.phonenumber = input)}
            onChange={(e) => handleChange({ PhoneNumber: e.target.value })}
          />
        </div>
        <div className={styles.errorMessage}>{errors.PhoneNumber}</div>
        <div className={styles.inputDiv}>
          <div>Email</div>
          <input
            type='text'
            className={styles.input}
            id='email'
            value={isData.Email}
            autoFocus
            ref={(input) => (myRef.current.email = input)}
            onChange={(e) => handleChange({ Email: e.target.value })}
          />
        </div>
        <div className={styles.errorMessage}>{errors.Email}</div>
        <div className={styles.inputDiv}>
          <div>Password</div>
          <input
            type='password'
            className={styles.input}
            id='Password'
            value={isData.Password}
            autoFocus
            ref={(input) => (myRef.current.Password = input)}
            onChange={(e) => handleChange({ Password: e.target.value })}
          />
        </div>
        <div className={styles.errorMessage}>{errors.Password}</div>
        <div className={styles.buttonDiv}>
          <div onClick={() => FunctionLoginSubmit()}>
            <button>Continue</button>
          </div>
        </div>
        {/* <div className={styles.CommonErrorMessage}>
          {auth.signedUpMessage}
        </div> */}
        <div className={styles.bottomDiv}>
          <p>
            Already have an account ?{' '}
            <Link href='/login'>
              {' '}
              <span> Login </span>
            </Link>
          </p>
          <p>
            By clicking “Sign up” you agree to our{' '}
            <span> terms and conditions</span> & <span>privacy policy</span>{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

SignupForm.propTypes = { signUpSubmit: PropTypes.func.isRequired };
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { signUpSubmit })(SignupForm);
