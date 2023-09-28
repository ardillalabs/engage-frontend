import React, { useEffect } from "react";
import styles from "./index.module.css";
import { Ring } from "@uiball/loaders";
import { GrStatusCritical, GrStatusGood } from "react-icons/gr";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { RootState } from "@/store";
import PropTypes from "prop-types";
import { emailVerification } from "@/actions/Auth";

const EmailVerification = ({ auth, emailVerification }: any) => {
  const router: any = useRouter();

  useEffect(() => {
    if (router.query.verification_code && router.query.access_token) {
      emailVerification(
        router.query.verification_code,
        router.query.access_token
      );
    }
  }, [router]);

  console.log(auth);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.paymentMessageDiv}>
        {auth?.isVerificationLoading && !auth.isVerified ? (
          <>
            <Ring size={40} lineWeight={5} speed={2} color="black" />
            <span>Please wait while we verify your email address</span>
          </>
        ) : !auth?.isVerificationLoading && auth.isVerified ? (
          <>
            <GrStatusGood className={styles.messageIcon} />
            <span>Email address have been successfully verified</span>
            <Link href={"/dashboard"}>Go back to dashboard</Link>
          </>
        ) : !auth?.isVerificationLoading && !auth.isVerified ? (
          <>
            <GrStatusCritical className={styles.messageIcon} />
            <span>Something went wrong. Please try again</span>
            <Link href={"/dashboard"}>Go back to dashboard</Link>
          </>
        ) : (
          <>
            <GrStatusCritical className={styles.messageIcon} />
            <span>Something went wrong. Please try again errrrorrrrrrrrrr</span>
            <Link href={"/dashboard"}>Go back to dashboard</Link>
          </>
        )}
      </div>
    </div>
  );
};

EmailVerification.propTypes = {
  emailVerification: PropTypes.func.isRequired,
};
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  emailVerification,
})(EmailVerification);
