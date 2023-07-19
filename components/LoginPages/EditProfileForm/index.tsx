import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './index.module.css';
import {
  UserInforUpdateDetails,
  UserProfileUpdateDetails,
} from '@/tsc-types/Auth';

//redux
import { connect } from 'react-redux';
import { RootState } from '@/store';
import PropTypes from 'prop-types';
import {
  getProfileDetails,
  updateUserDetailsSubmit,
} from '@/actions/Auth';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

interface Props {
  getProfileDetails: (...args: any[]) => any;
  updateUserDetailsSubmit: (...args: any[]) => any;
  auth: any;
}

const EditProfileForm = ({
  getProfileDetails,
  updateUserDetailsSubmit,
  auth,
}: Props) => {
  
  const router = useRouter();

  const cookie = getCookie('access_token', auth.access_token);

  const myRef = useRef<any>({});

  console.log(cookie);

  useEffect(() => {
    getProfileDetails(cookie);
  }, [getProfileDetails]);

  const [isClick, setClick] = useState({
    Name: false,
    UserName: false,
    PhoneNumber: false,
  });

  const [isData, setData] = useState({
    Name: '',
    UserName: '',
    PhoneNumber: '',
  });

  const [errors, setErrors] = useState({
    Name: '',
    UserName: '',
    PhoneNumber: '',
  });

  useEffect(() => {
    if (auth) {
      setData((prevData) => ({
        ...prevData,
        Name: auth.full_name,
        UserName: auth.username,
        PhoneNumber: auth.phone_number,
      }));
    }
  }, [auth]);

  const handleChange = (values: any) => {
    setData({
      ...isData,
      ...values,
    });
  };

  useEffect(() => {
    if (isData.UserName && isData.UserName.length === 0) {
      setErrors({ ...errors, UserName: '' });
    }
  }, [isData.UserName]);

  useEffect(() => {
    if (isData.PhoneNumber && isData.PhoneNumber.length === 0) {
      setErrors({ ...errors, PhoneNumber: '' });
    }
  }, [isData.PhoneNumber]);

  const UpdateProfileDetailsSubmit = () => {
    const errors = {
      Name: '',
      UserName: '',
      PhoneNumber: '',
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

    if (isData.UserName && isData.UserName.length < 2) {
      errors.UserName = 'Min length: 2';
    }

    if (!isData.PhoneNumber) {
      errors.PhoneNumber = 'The field is required';
    } 

    if (!(errors.Name || errors.UserName || errors.PhoneNumber)) {
      updateUserDetailsSubmit(
        {
          full_name: isData.Name,
          username: isData.UserName,
          phone_number: isData.PhoneNumber,
        },
        cookie
      );
    }

    setErrors(errors);
  };

  useEffect(() => {
    if (
      auth.isUpdatedUserInfo === false &&
      auth.updateUserInfoMessage ===
        "Username already exist."
    ) {
      setErrors({
        ...errors,
        UserName: "Username already exist.",
      });
    }
  }, [auth.isUpdatedUserInfo, auth.updateUserInfoMessage]);


  useEffect(() => {
    if (auth.isUpdatedUserInfo) {
      router.push('/dashboard');
    }
  }, [auth]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.headerDiv}>
          <h2>Edit Profile</h2>
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
          <div className={styles.errorMessage}>{errors.Name}</div>
        </div>
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
          <div className={styles.errorMessage}>{errors.UserName}</div>
        </div>
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
          <div className={styles.errorMessage}>{errors.PhoneNumber}</div>
        </div>

        <div
          className={styles.buttonDiv}
          onClick={() => UpdateProfileDetailsSubmit()}
        >
          <button>Update</button>
        </div>
      </div>
    </div>
  );
};

// export default EditProfileForm
EditProfileForm.propTypes = {
  getProfileDetails: PropTypes.func.isRequired,
  updateUserDetailsSubmit: PropTypes.func.isRequired,
};
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getProfileDetails,
  updateUserDetailsSubmit,
})(EditProfileForm);
