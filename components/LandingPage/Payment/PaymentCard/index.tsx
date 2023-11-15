import React, { useState } from "react";
import styles from "./index.module.css";


const PaymentCard = () => {

  const [isSelectedYearly, setSelectedYearly] = useState(true);
  const [isSelectedMonthly, setSelectedMonthly] = useState(false);

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
      <div className={isSelectedYearly ? styles.cardBodySelectd: styles.cardBody}
        onClick={onClickYearlyCard}>
        <div className={styles.flexContainer}>
          <div className={styles.leftDiv}>
            <div className={isSelectedYearly ? styles.selectedCardHeader : styles.cardHeader}>
              Yearly
            </div>
            <div className={isSelectedYearly ? styles.priceDivSelected : styles.priceDiv}>$59.99/yr</div>
          </div>
            <input type="checkbox" checked= {isSelectedYearly} onChange={onClickYearlyCard}
                className={isSelectedYearly? styles.selectionCheckBoxChecked: styles.selectionCheckBox}/>
        </div>
      </div>
    </div>
    <div className={styles.cardDiv}>
      <div onClick={onClickMonthlyCard}
        className={isSelectedMonthly ? styles.cardBodySelectd: styles.cardBody}>
        <div className={styles.flexContainer}>
          <div className={styles.leftDiv}>
            <div className={isSelectedMonthly ? styles.selectedCardHeader : styles.cardHeader}>
              Monthly
            </div>
            <div className={isSelectedMonthly ? styles.priceDivSelected : styles.priceDiv}>$9.99/mo</div>
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
