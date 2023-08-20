import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { MdSpaceDashboard } from "react-icons/md";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { signOut } from "@/actions/Auth";
import { deleteCookie, getCookie } from "cookies-next";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { RootState } from "../../../store";
import { getCurrentUserDetails } from "../../../actions/Auth";
import { removeSupportGroupDetails } from "@/actions/SupportGroup";

interface Props {
  getCurrentUserDetails: (...args: any[]) => any;
  auth: any;
  signOut: (...args: any[]) => any;
  removeSupportGroupDetails: (...args: any[]) => any;
}

const Sidebar = ({ getCurrentUserDetails, auth, signOut, removeSupportGroupDetails }: Props) => {
  const router = useRouter();
  const routePath = router.asPath;
  const [pageSelectArrow, setPageSelectArrow] = useState(true);

  useEffect(() => {
    const cookie = getCookie("access_token", { path: "/" });
    getCurrentUserDetails(cookie);
  }, [routePath]);

  const handleSignOut = () => {
    signOut();
    deleteCookie("access_token", { path: "/" });
    router.push("/");
    removeSupportGroupDetails();
  };

  return (
    <div className="flex">
      <div className={styles.sidebarDiv}>
        <div className={styles.itemsDiv}>
          <div className={styles.itemLogoDiv}>
            <Link href="/">
              <Image
                src="/white_logo_color1_background.png"
                alt="logo"
                width={75}
                height={45}
              />
            </Link>
          </div>
          <div
            className={styles.itemDiv}
            onMouseOver={() => setPageSelectArrow(false)}
            onMouseLeave={() => setPageSelectArrow(true)}
          >
            <Link href="/dashboard" className={styles.link}>
              <MdSpaceDashboard className={styles.icon} />
            </Link>
            <AiFillCaretLeft
              className={
                !routePath.includes("/dashboard")
                  ? styles.selectArrow
                  : pageSelectArrow
                  ? styles.selectArrowSelected
                  : styles.selectArrow
              }
            />
          </div>

          <div
            className={styles.itemDiv}
            onMouseOver={() => setPageSelectArrow(false)}
            onMouseLeave={() => setPageSelectArrow(true)}
          >
            <Link href="/chat" className={styles.link}>
              <AiFillMessage className={styles.icon} />
            </Link>
            <AiFillCaretLeft
              className={
                !routePath.includes("/chat")
                  ? styles.selectArrow
                  : pageSelectArrow
                  ? styles.selectArrowSelected
                  : styles.selectArrow
              }
            />
          </div>
        </div>

        {/* Logout button */}
        <button
          className={styles.logoutBtn}
          onClick={() => {
            handleSignOut();
          }}
        >
          <IoLogOut className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  getCurrentUserDetails: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  removeSupportGroupDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentUserDetails,
  signOut,
  removeSupportGroupDetails
})(Sidebar);

// export default Sidebar;
