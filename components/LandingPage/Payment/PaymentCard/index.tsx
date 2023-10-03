import React, { useState } from "react";
import styles from "./index.module.css";


const PaymentCard = () => {

  const [isSelectedYearly, setSelectedYearly] = useState(true);
  const [isSelectedMonthly, setSelectedMonthly] = useState(false);

  
  const cardColor = isSelectedYearly ? '#324544' : 'initial';
  const cardColorMonthly = isSelectedMonthly ? '#324544' : 'initial';

  const onClickYearlyCard = () => {
    console.log(isSelectedYearly, isSelectedMonthly)
    setSelectedYearly(true)
    setSelectedMonthly(false)
    console.log(isSelectedYearly, isSelectedMonthly)
  }

  const onClickMonthlyCard = () => {
    console.log(isSelectedYearly, isSelectedMonthly)
    setSelectedYearly(false)
    setSelectedMonthly(true)
    console.log(isSelectedYearly, isSelectedMonthly)
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
            <input type="checkbox" checked= {isSelectedYearly} onChange={onClickYearlyCard}
                className={isSelectedYearly? styles.selectionCheckBoxChecked: styles.selectionCheckBox}/>
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
            <input type="checkbox" checked= {isSelectedMonthly} onChange={onClickMonthlyCard} className={isSelectedMonthly? styles.selectionCheckBoxChecked: styles.selectionCheckBox}/>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default PaymentCard;
