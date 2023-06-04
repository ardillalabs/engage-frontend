import React, { useEffect, useRef, useState } from 'react'
import Link from "next/link";
import styles from "./index.module.css";

const EditProfileForm = () => {

  const myRef = useRef<any>({});

  const [isClick, setClick] = useState({
    Name: false,
    UserName: false,
    PhoneNumber: false,
  });

  const [isData, setData] = useState({
    Name: "Hansanie Sandunika",
    UserName: "Sandunika",
    PhoneNumber: "0770617666"
  });
  const [errors, setErrors] = useState({
    Name: "",
    UserName: "",
    PhoneNumber: ""
  });
  
  const handleChange = (values: any) => {
    setData({
      ...isData,
      ...values,
    });
  };

  const functionNameError = () => {
    if (isClick.Name === false && !isData.Name) {
      setErrors({ ...errors, Name: "" });
    }
  };

  const functionUserNameError = () => {
    if (isClick.UserName === false && !isData.UserName) {
      setErrors({ ...errors, UserName: "" });
    }
  };

  const functionPhoneNumberError = () => {
    if (isClick.PhoneNumber === false && !isData.PhoneNumber) {
      setErrors({ ...errors, PhoneNumber: "" });
    }
  };

  useEffect(() => {
    if (isData.Name.length === 0) {
      setErrors({ ...errors, Name: "" });
    }
  }, [isData.Name]);

  useEffect(() => {
    if (isData.UserName.length === 0) {
      setErrors({ ...errors, UserName: "" });
    }
  }, [isData.UserName]);

  useEffect(() => {
    if (isData.PhoneNumber.length === 0) {
      setErrors({ ...errors, PhoneNumber: "" });
    }
  }, [isData.PhoneNumber]);
  
  if (!isData.Name) {
    errors.Name = "The field is required";
  }

  if (isData.Name && isData.Name.length < 2) {
    errors.Name = "Min length: 2";
  }

  if (!isData.UserName) {
    errors.UserName = "The field is required";
  }

  if (isData.Name && isData.Name.length < 2) {
    errors.Name = "Min length: 2";
  }

  if (isData.Name && isData.Name.length < 2) {
    errors.Name = "Min length: 2";
  }

  if (!isData.UserName) {
    errors.UserName = "The field is required";
  }

  if (isData.UserName && isData.UserName.length < 2) {
    errors.UserName = "Min length: 2";
  }

  if (isData.UserName && isData.UserName.length < 2) {
    errors.UserName = "Min length: 2";
  }

  if (isData.UserName && isData.UserName.length < 2) {
    errors.UserName = "Min length: 2";
  }

  if (!isData.PhoneNumber) {
    errors.PhoneNumber = "The field is required";
  } else if (
    isData.PhoneNumber.length > 13 ||
    isData.PhoneNumber.length < 8
  ) {
    errors.PhoneNumber = "Phone number is invalid.";
  }

  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
      <div className={styles.headerDiv}>
           <h2>Edit Profile</h2> 
        </div>
        <div className={styles.inputDiv}>
          <div>Full Name</div>
          <input
            type="text"
            className={styles.input}
            id="name"
            value={isData.Name}
            autoFocus
            ref={(input) => (myRef.current.name = input)}
            onChange={(e) => handleChange({ Name: e.target.value })}
          />
        </div>
        <div className={styles.inputDiv}>
          <div>User Name</div>
          <input
            type="text"
            className={styles.input}
            id="username"
            value={isData.UserName}
            autoFocus
            ref={(input) => (myRef.current.username = input)}
            onChange={(e) => handleChange({ UserName: e.target.value })}
          />
        </div>
        <div className={styles.inputDiv}>
          <div>Phone Number</div>
          <input
            type="text"
            className={styles.input}
            id="phonenumber"
            value={isData.PhoneNumber}
            autoFocus
            ref={(input) => (myRef.current.phonenumber = input)}
            onChange={(e) => handleChange({ PhoneNumber: e.target.value })}
          />
        </div>
       
        <div className={styles.buttonDiv}>
          <Link href='/dashboard'>
            <button>Update</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EditProfileForm
