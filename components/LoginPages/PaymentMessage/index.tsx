import { useRouter } from "next/router";
import styles from "./index.module.css";
import { Ring } from "@uiball/loaders";
import { BiErrorCircle } from "react-icons/bi";
import { FcPaid } from "react-icons/fc";

const PaymentMessage = () => {
  const router = useRouter();
  const paymentState = router.query.isPaymentMessage;
  const paymentMessage = router.query.message;
  console.log(paymentMessage);
  return (
    <div className={styles.mainDiv}>
      <div className={styles.paymentIcon}>
        {paymentState === "success" ? (
          <FcPaid />
        ) : paymentState === "loading" ? (
          <Ring size={40} lineWeight={5} speed={2} color="black" />
        ) : paymentState === "fail" ? (
          <BiErrorCircle className={styles.failedIcon} />
        ) : (
          ""
        )}
      </div>
      <div className={styles.paymentMessage}>{paymentMessage}</div>
    </div>
  );
};

export default PaymentMessage;
