import React from "react";
import styles from "./index.module.css";
import { IpaymentPlan } from "../../../../tsc-types/paymentTypes";
import Link from "next/link";

interface props {
  plan: IpaymentPlan;
}

const PaymentCard = ({ plan }: props) => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <div className={styles.cardDiv}>
          <div className={styles.cardHeaderDiv}>
            <div className={styles.cardHeader}>{plan.header}</div>
          </div>
          <div className={styles.cardBody}>
            <ul className={styles.conditionList}>
              {plan.conditions.map((condition: string, index: number) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
            <div className={styles.priceDiv}>{plan.price}</div>
            <Link href="/sign-up">
              <div className={styles.signupButtonDiv}>
                <button>Sign Up Now</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
