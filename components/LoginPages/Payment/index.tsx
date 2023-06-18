import React, { useState } from "react";
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

  const [paymentMethod, setPaymentMethod] = useState("credit-card");

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
                    checked={paymentMethod === "credit-card" ? true : false}
                    onClick={() => setPaymentMethod("credit-card")}
                  />
                  Credit Card
                </label>
                <label className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="paypal"
                    className={styles.radioBtn}
                    checked={paymentMethod === "paypal" ? true : false}
                    onClick={() => setPaymentMethod("paypal")}
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
              {/* Credit Card Payment */}
              <form
                className={
                  paymentMethod === "credit-card"
                    ? styles.creditCardForm
                    : styles.creditCardFormHidden
                }
              >
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
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
