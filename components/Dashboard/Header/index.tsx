import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { RiUserSettingsLine } from 'react-icons/ri';
import { FiKey } from 'react-icons/fi';
import useDate from '@/hooks/useDate';
import Link from 'next/link';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { RootState } from '@/store';
import PropTypes from 'prop-types';
import { clearIsUpdatedUserInfo } from '@/actions/Auth';

interface Props {
  auth: any;
  clearIsUpdatedUserInfo: (...args: any[]) => any;
}

const Header = ({ auth, clearIsUpdatedUserInfo }: Props) => {
  const date = new Date();
  const { dayWithSyntax, weekday, month } = useDate();

  const alertWellnessTeam = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/support_group/send-alert/${auth.id}`
      );
      if (res.ok) {
        toast.success('Support group alerted', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          toastId: 'alert-feedback',
          transition: Slide,
        });
      } else {
        toast.success('Something went wrong. Try again!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          toastId: 'alert-feedback',
          transition: Slide,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    clearIsUpdatedUserInfo();
  }, []);

  return (
    <>
      <div className={styles.mainDiv}>
        <h3>Dashboard</h3>
        <div className={styles.rightDiv}>
          <span
            className={styles.date}
          >{`${weekday}, ${month} ${dayWithSyntax}`}</span>
          <div className={styles.headerIcons}>
            <div className={styles.headerIcon}>
              <Link href='/edit-profile'>
                <RiUserSettingsLine />
              </Link>
            </div>
            <div className={styles.headerIcon}>
              <Link href='/change-password'>
                <FiKey />
              </Link>
            </div>
          </div>
          <button className={styles.alertBtn} onClick={alertWellnessTeam}>
            Alert Wellness Team
          </button>
        </div>
      </div>

      <div className='toast-container'>
        <ToastContainer limit={1} />
      </div>
    </>
  );
};

Header.propTypes = {
  clearIsUpdatedUserInfo: PropTypes.func.isRequired,
};
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  clearIsUpdatedUserInfo,
})(Header);
