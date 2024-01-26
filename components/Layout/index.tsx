import React from 'react';
import styles from "./index.module.css";
import Sidebar from './Sidebar';
import SidebarMobile from './SidebarMobile';
import HeaderMobile from './HeaderMobile';
import CommonFunctionality from '../Protectors/CommonFunctionality';

const Layout = ({ children }: any) => {
  return (
    <>
      <CommonFunctionality/>
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