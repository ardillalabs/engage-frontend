import React from "react";
import styles from "./index.module.css";
import { IpaymentPlan } from "../../../../tsc-types/paymentTypes";

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
            <div className={styles.signupButtonDiv}>
              <button>Sign Up Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
