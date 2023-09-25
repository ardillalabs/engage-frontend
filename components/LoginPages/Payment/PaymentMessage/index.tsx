import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { setCookie } from "cookies-next";
import { GrStatusCritical, GrStatusGood } from "react-icons/gr";
import { Ring } from "@uiball/loaders";
import Link from "next/link";

const BASE_URL = process.env.BASE_URL;

const PaymentRouteStatus = {
  SUCCESS: "success",
  FAIL: "fail",
  REJECTED: "rejected",
};

const PaymentMessage = () => {
  const router = useRouter();
  const [status, setStatus] = useState(router.query.isPaymentMessage);
  useEffect(() => {
    const interval = setInterval(async () => {
      let paymentStatus = router.query.isPaymentMessage;
      if (
        router.query.txn_id &&
        paymentStatus != "rejected" &&
        paymentStatus != "fail"
      ) {
        const response = await axios.get(
          `${BASE_URL}/payment/payment-id/${router.query.txn_id}`
        );

        setStatus(response.data[0].status);

        if (status == "active") {
          setCookie("membership", 1);
          clearInterval(interval);
        }
        if (status == "rejected") {
          clearInterval(interval);
          router.push(
            `/payment-message?isPaymentMessage=${PaymentRouteStatus.REJECTED}&txn_id=${router.query.txn_id}`
          );
        }
        if (status == "fail") {
          clearInterval(interval);
          router.push(
            `/payment-message?isPaymentMessage=${PaymentRouteStatus.FAIL}`
          );
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [status, router.query.txn_id, router.query.isPaymentMessage]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.paymentMessageDiv}>
        {status == "pending" ? (
          <>
            <Ring size={40} lineWeight={5} speed={2} color="black" />
            <span>Please wait while the payment is being processed</span>
          </>
        ) : status == "fail" ? (
          <>
            <GrStatusCritical className={styles.messageIcon} />
            <span>You have already purchased a subscription</span>
            <Link href={"/dashboard"}>Go back to dashboard</Link>
          </>
        ) : status == "active" ? (
          <>
            <GrStatusGood className={styles.messageIcon} />
            <span>Payment Successful</span>
            <Link href={"/dashboard"}>Go back to dashboard</Link>
          </>
        ) : (
          <>
            <GrStatusCritical className={styles.messageIcon} />
            <span>Something went wrong. Please try again</span>
            <Link href={"/dashboard"}>Go back to dashboard</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentMessage;
