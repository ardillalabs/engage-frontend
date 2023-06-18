<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> 880e4eaf1eb937dc3681e593cfa8d63e4e4de8ef
import styles from "./index.module.css";
import SignUpSteps from "../SignUpSteps";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
} from "@stripe/react-stripe-js";

import Image from "next/image";

const stripePromise = loadStripe(
  "pk_test_51NJZSpE4oQnZXS7iRgA3z5BdTUeJxOJg3mUpo88pJPAPGezh7QpUanl3UvztEfZ5eSndr6qzYcXTkx0HAmEd53af00C4OJOff2"
);

const PaymentForm = () => {
  const stripeInputOptions = {
    style: {
      base: {
        fontSize: "18px",
      },
    },
  };

<<<<<<< HEAD
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

=======
>>>>>>> 880e4eaf1eb937dc3681e593cfa8d63e4e4de8ef
  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <SignUpSteps step="3" />
        <div className={styles.contentDiv}>
          <div className={styles.sectionDiv}>
            <h2>Payment Method</h2>
            <div className={styles.selectPayment}>
              <div className={styles.selectPaymentTop}>
                <label className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="credit-card"
                    className={styles.radioBtn}
<<<<<<< HEAD
                    checked={paymentMethod === "credit-card" ? true : false}
                    onClick={() => setPaymentMethod("credit-card")}
=======
>>>>>>> 880e4eaf1eb937dc3681e593cfa8d63e4e4de8ef
                  />
                  Credit Card
                </label>
                <label className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="paypal"
                    className={styles.radioBtn}
<<<<<<< HEAD
                    checked={paymentMethod === "paypal" ? true : false}
                    onClick={() => setPaymentMethod("paypal")}
=======
>>>>>>> 880e4eaf1eb937dc3681e593cfa8d63e4e4de8ef
                  />
                  Paypal
                </label>
              </div>
              <div className={styles.paymentLogoWrap}>
                <Image
                  src={"/mastercard-logo.png"}
                  width={100}
                  height={100}
                  alt="Mastercard Logo"
                  className={styles.paymentTypeLogo}
                />
                <Image
                  src={"/visa-logo.png"}
                  width={100}
                  height={100}
                  alt="Visa Logo"
                  className={styles.paymentTypeLogo}
                />
                <Image
                  src={"/paypal-logo.png"}
                  width={100}
                  height={100}
                  alt="Paypal Logo"
                  className={styles.paymentTypeLogo}
                />
              </div>
            </div>
            <Elements stripe={stripePromise}>
<<<<<<< HEAD
              {/* Credit Card Payment */}
              <form
                className={
                  paymentMethod === "credit-card"
                    ? styles.creditCardForm
                    : styles.creditCardFormHidden
                }
              >
=======
              <form className={styles.creditCardForm}>
>>>>>>> 880e4eaf1eb937dc3681e593cfa8d63e4e4de8ef
                <label className={styles.fieldWrap}>
                  <span>Cardholder Name</span>
                  <input type="text" className={styles.inputField} />
                </label>
                <label className={styles.fieldWrap}>
                  <span>Card Number</span>
                  <div className={styles.stripeInputField}>
                    <CardNumberElement options={stripeInputOptions} />
                  </div>
                </label>
                <div className={styles.halfFieldWrap}>
                  <label className={styles.fieldWrap}>
                    <span>Expiration Date</span>
                    <div className={styles.stripeInputField}>
                      <CardExpiryElement options={stripeInputOptions} />
                    </div>
                  </label>
                  <label className={styles.fieldWrap}>
                    <span>CVC</span>
                    <div className={styles.stripeInputField}>
                      <CardCvcElement options={stripeInputOptions} />
                    </div>
                  </label>
                </div>
<<<<<<< HEAD
                <button className={styles.purchaseBtn}>Purchase</button>
              </form>

              {/* Paypal Payment */}
              <form
                className={
                  paymentMethod === "paypal"
                    ? styles.paypalForm
                    : styles.paypalFormHidden
                }
              >
                <div>Paypal</div>
              </form>
=======
                <label className={styles.checkboxWrap}>
                  <input
                    type="checkbox"
                    name="save-details"
                    className={styles.checkbox}
                  />
                  Save Details
                </label>
                <button className={styles.purchaseBtn}>Purchase</button>
              </form>
>>>>>>> 880e4eaf1eb937dc3681e593cfa8d63e4e4de8ef
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
