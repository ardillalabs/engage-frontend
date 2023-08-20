import React, { useState } from 'react';
import styles from './index.module.css';
import { SlMenu } from 'react-icons/sl';
import { AiFillMessage } from 'react-icons/ai';
import Link from 'next/link';
import { MdSpaceDashboard } from 'react-icons/md';
import Image from 'next/image';
import { IoLogOut } from 'react-icons/io5';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut } from '@/actions/Auth';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { RootState } from '@/store';
import PropTypes from 'prop-types';
import { removeSupportGroupDetails } from '@/actions/SupportGroup';

interface Props {
  auth: any;
  signOut: any;
  removeSupportGroupDetails: any;
}

const SidebarMobile = ({ auth, signOut, removeSupportGroupDetails }: Props) => {
  const router = useRouter();
  const [sidebarActive, setSidebarActive] = useState(false);

  const handleSignOut = () => {
    signOut();
    deleteCookie("access_token", { path: "/" });
    router.push("/");
    removeSupportGroupDetails();
  };
  
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

  return (
    <div className={styles.mainDivContainer}>
      <div className={styles.mainDiv}>
        <div className={styles.leftDiv}>
          <SlMenu
            className={styles.hamburgerIcon}
            onClick={() => setSidebarActive(!sidebarActive)}
          />
          <span className={styles.menuText}>Menu</span>
        </div>
        <button className={styles.alertBtn} onClick={alertWellnessTeam}>
          Alert Wellness Team
        </button>
      </div>

      <div
        className={sidebarActive ? styles.sidebarDiv : styles.sidebarDivHidden}
      >
        <div className={styles.profilePreview}>
          <Image
            src='https://source.unsplash.com/_7LbC5J-jw4'
            alt='Profile Picture'
            className={styles.profilePicture}
            width={60}
            height={60}
          />
          <span className={styles.profileName}>Denneal Perera</span>
        </div>

        <Link href='/dashboard' className={styles.link}>
          <MdSpaceDashboard className={styles.icon} />
          <span>Dashboard</span>
        </Link>

        <Link href='/chat' className={styles.link}>
          <AiFillMessage className={styles.icon} />
          <span>Chat</span>
        </Link>

        <button
          className={`${styles.logoutBtn} ${styles.link}`}
          onClick={() => {
            handleSignOut();
          }}
        >
          <IoLogOut className={styles.icon} />
          <span>Logout</span>
        </button>
      </div>

      <div className='toast-container'>
        <ToastContainer limit={1} />
      </div>
    </div>
  );
};

SidebarMobile.propTypes = {
  signOut: PropTypes.func.isRequired,
  removeSupportGroupDetails: PropTypes.func.isRequired,
};
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {signOut, removeSupportGroupDetails})(SidebarMobile);
