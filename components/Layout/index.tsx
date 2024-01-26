import React from 'react';
import styles from "./index.module.css";
import Sidebar from './Sidebar';
import SidebarMobile from './SidebarMobile';
import HeaderMobile from './HeaderMobile';

const Layout = ({ children }: any) => {
  return (
    <>
        <div className={styles.layoutView}><Sidebar /></div>
        <div className={styles.layoutViewMobile}>
          <HeaderMobile />
          <SidebarMobile />
        </div>
        <main className={styles.childrenDiv}>{ children }</main>

    </>
  )
}

export default Layout;