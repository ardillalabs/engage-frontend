import React from 'react';
import styles from './index.module.css';
import { RiUserSettingsLine } from 'react-icons/ri';
import { FiKey } from 'react-icons/fi';
import useDate from '@/hooks/useDate';
import Link from 'next/link';

const Header = () => {
  const date = new Date();
  const { dayWithSyntax, weekday, month } = useDate();

  return (
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
        <button className={styles.alertBtn}>Alert Wellness Team</button>
      </div>
    </div>
  );
};

export default Header;
