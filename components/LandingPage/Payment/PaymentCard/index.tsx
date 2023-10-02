import React, { useState } from "react";
import styles from "./index.module.css";


const PaymentCard = () => {

  const [isSelectedYearly, setSelectedYearly] = useState(true);
  const [isSelectedMonthly, setSelectedMonthly] = useState(false);

  
  const cardColor = isSelectedYearly ? '#324544' : 'initial';
  const cardColorMonthly = isSelectedMonthly ? '#324544' : 'initial';

  const onClickYearlyCard = () => {
    setSelectedYearly(true)
    setSelectedMonthly(false)
  }

  const onClickMonthlyCard = () => {
    setSelectedYearly(false)
    setSelectedMonthly(true)
  }

  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
      <div className={styles.cardDiv}>
      <div className={styles.cardBody}
        onClick={onClickYearlyCard}
        style={{ backgroundColor: cardColor }}>
        <div className={styles.flexContainer}>
          <div className={styles.leftDiv}>
            <div className={styles.cardHeader}>
              Yearly
            </div>
            <div className={styles.priceDiv}>$59.99/yr</div>
          </div>
            <input type="checkbox" checked= {isSelectedYearly} className={isSelectedYearly? styles.selectionCheckBoxChecked: styles.selectionCheckBox}/>
        </div>
      </div>
    </div>
    <div className={styles.cardDiv}>
      <div className={styles.cardBody}
        onClick={onClickMonthlyCard}
        style={{ backgroundColor: cardColorMonthly }}>
        <div className={styles.flexContainer}>
          <div className={styles.leftDiv}>
            <div className={styles.cardHeader}>
              Monthly
            </div>
            <div className={styles.priceDiv}>$9.99/mo</div>
          </div>
            <input type="checkbox" checked= {isSelectedMonthly} className={isSelectedMonthly? styles.selectionCheckBoxChecked: styles.selectionCheckBox}/>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default PaymentCard;
