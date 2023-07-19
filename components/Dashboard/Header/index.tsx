import React, { useState } from "react";
import styles from "./index.module.css";
import { RiUserSettingsLine } from "react-icons/ri";
import { FiKey } from "react-icons/fi";
import useDate from "@/hooks/useDate";
import Link from "next/link";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const date = new Date();
  const { dayWithSyntax, weekday, month } = useDate();

  const alertWellnessTeam = async () => {
    try {
      const res = await fetch(
        "http://ec2-54-160-247-159.compute-1.amazonaws.com:5000/api/support_group/send-alert/2"
      );
      if (res.ok) {
        toast.success("Support group alerted", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          toastId: "alert-feedback",
          transition: Slide,
        });
      } else {
        toast.success("Something went wrong. Try again!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          toastId: "alert-feedback",
          transition: Slide,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              <Link href="/edit-profile">
                <RiUserSettingsLine />
              </Link>
            </div>
            <div className={styles.headerIcon}>
              <Link href="/change-password">
                <FiKey />
              </Link>
            </div>
          </div>
          <button className={styles.alertBtn} onClick={alertWellnessTeam}>
            Alert Wellness Team
          </button>
        </div>
      </div>

      <div className="toast-container">
        <ToastContainer limit={1} />
      </div>
    </>
  );
};

export default Header;
