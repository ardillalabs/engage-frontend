import React, { useState } from "react";
import styles from "./index.module.css";
import { IpaymentPlan } from "../../../../tsc-types/paymentTypes";
import Link from "next/link";

interface props {
  plan: IpaymentPlan;
}

const PaymentCard = ({ plan, onClick, isSelected }: any|props) => {

  const cardColor = isSelected ? '#324544' : 'initial';

  console.log(plan, onClick, isSelected)

  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
      <div className={styles.cardDiv}>
      <div
        className={`${styles.cardBodyMonthly} ${isSelected ? styles.cardBody : styles.cardBodyMonthly}`}
        onClick={onClick}
        style={{ backgroundColor: cardColor }}
      >
        <div className={styles.flexContainer}>
          <div className={styles.leftDiv}>
            <div className={styles.cardHeader}>
              {plan.header}
            </div>
            <div className={styles.priceDiv}>{plan.price}</div>
          </div>
            <input type="checkbox" checked= {isSelected} className={isSelected? styles.selectionCheckBoxChecked: styles.selectionCheckBox}/>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default PaymentCard;
