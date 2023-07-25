import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import SignUpSteps from "../SignUpSteps";
import { PaymentMethodResult, loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import PropTypes from "prop-types";

import Image from "next/image";
import Link from "next/link";
import { RootState } from '../../../store';
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { PaymentMethods, PaymentRouteStatus } from "@/tsc-types/Payment";
import { createStripePayment } from "@/actions/Payment";
import OutsideClickHandler from "react-outside-click-handler";

const stripePromise = loadStripe(
  "pk_test_51NJZSpE4oQnZXS7iRgA3z5BdTUeJxOJg3mUpo88pJPAPGezh7QpUanl3UvztEfZ5eSndr6qzYcXTkx0HAmEd53af00C4OJOff2"
);

interface Props {
  auth: any;
  Payment: {
    loading: boolean;
    isSaved: boolean;
    selectedPaymentMethod: {
      method: PaymentMethods;
      id: string;
    };
  };
}

const PaymentForm1 = ({ 
  Payment: {
    loading,
    isSaved,
    selectedPaymentMethod: { id, method },
  },
  auth }: Props) => {
  const stripeInputOptions = {
    style: {
      base: {
        fontSize: "18px",
      },
    },
  };
  const elements = useElements();
  const stripe = useStripe();
  const router = useRouter();

  const [paymentMethodOption, setPaymentMethodOption] = useState("credit-card");

  // const handleStripePayment = async (
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  // ) => {
  //   e.preventDefault();
  //   console.log("saveCarderror");
  //   if (!stripe || !elements) return;
  //   // console.log(router.query?.paymentType, "handleStripePayment_1");
  //   console.log(auth, "auth____");
  //   const cardEl = elements.getElement(CardNumberElement);
  //   //card element
  //   const { error, paymentMethod } = (await stripe.createPaymentMethod({
  //     card: cardEl!,
  //     type: "card",
  //     billing_details: {
  //       name: auth.fullname,
  //       email: auth.email,
  //     },
  //   })) as PaymentMethodResult;

  //   if (error) {
  //     console.log(error, "payment_method error");
  //     // router.push(
  //     //   `/payment-message?isPaymentMessage=${PaymentRouteStatus.FAIL}`,
  //     // );
  //     return;
  //   } else {
  //     //call to action
  //     if (!paymentMethod.id || id) {
  //       console.log(error, "payment_method error");
  //       // router.push(
  //       //   `/payment-message?isPaymentMessage=${PaymentRouteStatus.FAIL}`,
  //       // );
  //       return;
  //     }
  //     const sub_id = await createStripePayment(
  //       console.log("payment creation")
  //       +auth.id, //userId
  //       1, //membershipId
  //       router.query?.paymentType === "Monthly" ? 499 * 100 : 0, //amount
  //       paymentMethod?.id
  //         ? paymentMethod?.id
  //         : id !== "" && method === "stripe"
  //         ? id
  //         : "", //payment Method Id
  //       router.query?.paymentType === "Monthly"
  //         ? "MONTHLY"
  //         : router?.query?.paymentType === "Yearly"
  //         ? "YEARLY"
  //         : "MONTHLY", //payment type
  //       "price_1MtQbLGmuOIea0UaPn9zOzNU", //price Id,
  //       // isSaved,
  //     );
  //     if (sub_id) {
  //       console.log(`inside_is_done`);
  //       // setSaveCardError(false);
  //       router.push(
  //         `/payment-message?isPaymentMessage=${PaymentRouteStatus.PENDING}&txn_id=${sub_id}`,
  //       );
  //     }
  //     if (!sub_id) {
  //       // setSaveCardError(false);
  //       // router.push(
  //       //   `/payment-message?isPaymentMessage=${
  //       //     PaymentRouteStatus.FAIL
  //       //   }&message=${"If you dont have already created subscriptions, please contact us"}`,
  //       // );
  //     }
  //   }
  // };

  const myRef = useRef<any>({});

  const [isClick, setClick] = useState({
    CardHolderName: false,
    CardNumber: false,
    ExpirationDate: false,
    SecurityCode: false,
    saved: true,
  });

  const [isData, setData] = useState({
    CardHolderName: "",
    CardNumber: false,
    ExpirationDate: false,
    SecurityCode: false,
    saved: true,
  });

  const [errors, setErrors] = useState({
    CardHolderName: "",
    CardNumber: "",
    ExpirationDate: "",
    SecurityCode: "",
    saved: "",
  });

  const [errorsStripe, setErrorsStripe] = useState({
    CardHolderName: "",
    CardNumber: "",
    ExpirationDate: "",
    SecurityCode: "",
    saved: "",
  });

  function handleChangeStripe(e: any) {
    console.log('e', e);
    if (e !== null || e !== "") {
      if (e.elementType === "cardNumber") {
        setData({ ...isData, CardNumber: !e.empty });

        if (e.empty) {
          setErrors({
            ...errors,
            CardNumber: "",
          });
        }

        if (e.complete === false) {
          if (e.error.message === "Your card number is incomplete.") {
            setErrorsStripe({
              ...errorsStripe,
              CardNumber: "Card number is incomplete.",
            });

            setErrors({
              ...errors,
              CardNumber: "Card number is incomplete.",
            });
          } else if (e.error.message === "Your card number is invalid.") {
            setErrorsStripe({
              ...errorsStripe,
              CardNumber: "Card number is invalid.",
            });

            setErrors({
              ...errors,
              CardNumber: "Card number is invalid.",
            });
          }
        } else if (e.complete === true) {
          setErrorsStripe({ ...errorsStripe, CardNumber: "" });
          setErrors({
            ...errors,
            CardNumber: "",
          });
        }
      } 
    }
  }

  const handleChange = (values: any) => {
    console.log(values)
    setData({
      ...isData,
      ...values,
    });
  };

  useEffect(() => {
    if (isData.CardHolderName) {
      setErrors({ ...errors, CardHolderName: "" });
    }
  }, [isData.CardHolderName]);

  useEffect(() => {
    if (isData.CardNumber) {
      setErrors({ ...errors, CardNumber: "" });
    }
  }, [isData.CardNumber]);

  const functionCardNumberError = () => {
    if (isClick.CardNumber === false && !isData.CardNumber) {
      setErrors({ ...errors, CardNumber: "" });
    }
  };

  const FunctionSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    console.log("handleStripePayment clicked");


    //errorsStripe
    if (errorsStripe.CardNumber) {
      errors.CardNumber = errorsStripe.CardNumber;
    }

    if (!isData.CardHolderName) {
      errors.CardHolderName = "The field is required";
    }

    if (!isData.CardNumber) {
      errors.CardNumber = "The field is required";
    }
    if (
      !(
        errors.CardHolderName ||
        errors.CardNumber
      )
    ) {
      console.log("handleStripePayment clicked");
      // setSaveCardError(false);
      // handleStripePayment(e);
    }

    // setSaveCardError(false);
    setErrors(errors);
  };

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
                    checked={paymentMethodOption === "credit-card" ? true : false}
                    onClick={() => setPaymentMethodOption("credit-card")}
                  />
                  Credit Card
                </label>
                <label className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="paypal"
                    className={styles.radioBtn}
                    checked={paymentMethodOption === "paypal" ? true : false}
                    onClick={() => setPaymentMethodOption("paypal")}
                  />
                  Paypal
                </label>
              </div>
            </div>
            <form
              className={
                paymentMethodOption === "credit-card"
                  ? styles.creditCardForm
                  : styles.creditCardFormHidden
              }
            >
              <div className={styles.inputDiv}>
                <label className={styles.fieldWrap}>
                  <span>Cardholder Name</span>
                  <input
                    className={styles.inputField}
                    type="text"
                    id="cardHolderName"
                    value={isData.CardHolderName}
                    onChange={(e) =>
                      handleChange({ CardHolderName: e.target.value })
                    }
                  />
                </label>
                <div className={styles.errorMessage}>{errors.CardHolderName}</div>
              </div>
              {/* <div className={styles.inputDiv}>
                <label className={styles.fieldWrap}>
                  <span>Card Number</span>
                  <div className={styles.stripeInputField}>
                    <CardNumberElement options={stripeInputOptions}
                    id="cardNumber"
                    onChange={(e) => handleChangeStripe(e)}
                    onReady={(e) => {
                      e.focus();
                      handleChange({ Number: "1" });
                    }} />
                  </div>
                </label>
              </div>
              <div className={styles.errorMessage}>{errors.CardNumber}</div> */}

              <div className={styles.btnsWrapper} onClick={(e) => {
                FunctionSubmit(e);
              }}>
                <button className={styles.purchaseBtn}>Purchase</button>
                <Link href={"/dashboard"} className={styles.trialLink}>
                  Free Trial
                </Link>
              </div>
            </form>

            {/* Paypal Payment */}
            <form
              className={
                paymentMethodOption === "paypal"
                  ? styles.paypalForm
                  : styles.paypalFormHidden
              }
            >
              <div>Paypal</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

PaymentForm1.prototype = {
  createStripePayment: PropTypes.func.isRequired,
};

// export default PaymentForm;
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  Payment: state.Payment
});

export default connect(mapStateToProps, {
  createStripePayment
})(PaymentForm1);