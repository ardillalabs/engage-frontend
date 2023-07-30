import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { connect } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsCheck2 } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdOutlineArrowBackIos } from "react-icons/md";
import PropTypes from "prop-types";

//stripe
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { PaymentMethodResult } from "@stripe/stripe-js";
import { createStripePayment, savePaymentMethod } from "../../../../actions/Payment";
import { ChooseYourPlanInitialStates } from "../../../../tsc-types/ChossePlan";
import { PaymentMethods, PaymentRouteStatus } from "../../../../tsc-types/Payment";
import { RootState } from "@/store";

interface Props {
  isPaymentMethod: any;
  createStripePayment: (
    userId: number,
    membershipId: number,
    amount: number,
    paymentMethodId: string | undefined,
    paymentType: string,
    priceId?: string,
    isSaved?: boolean,
    country_code?: string
  ) => Promise<string>;
  savePaymentMethod: (saved: boolean) => void;
  Payment: {
    loading: boolean;
    isSaved: boolean;
    selectedPaymentMethod: {
      method: PaymentMethods;
      id: string;
    };
  };
  newAuth: any;
  ChoosePlan: ChooseYourPlanInitialStates;
}

const CardPayment = ({
  isPaymentMethod,
  createStripePayment,
  savePaymentMethod,
  Payment: {
    loading,
    isSaved,
    selectedPaymentMethod: { id, method },
  },
  newAuth,
  ChoosePlan: {
    chooseYourPlan: { planType, planDate },
  },
  ChoosePlan,
}: Props) => {
  //stripe
  const elements = useElements();
  const stripe = useStripe();
  const router = useRouter();

  const [isTick, setTick] = useState<boolean>(false);
  const [saveCardError, setSaveCardError] = useState<boolean>(false);
  const handleStripePayment = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(saveCardError, "saveCarderror");
    console.log(
      {
        newAuth: 2,
        mem: 1,
        price: 479,
        // methodId: PaymentMethods.stripe ? id : "abcd",
        pt: "YEARLY",
        pi: "price_1N7gGeAkohmLDDScufxw8HIF",
        sv: true,
      },
      "stripe-payment_req_1"
    );
    if (!stripe || !elements) return;
    console.log(router.query?.paymentType, "handleStripePayment_1");
    const cardEl = elements.getElement(CardNumberElement);
    //card element
    const { error, paymentMethod } = (await stripe.createPaymentMethod({
      card: cardEl!,
      type: "card",
      billing_details: {
        name: 'kavishka',
        email: 'kavishkaganepola1995@gmail.com',
      },
    })) as PaymentMethodResult;

    if (error) {
      console.log(error, "payment_method error");
      router.push(
        `/payment-message?isPaymentMessage=${PaymentRouteStatus.FAIL}`
      );
      return;
    } else {
      //call to action
      if (!paymentMethod.id || id) {
        console.log(error, "payment_method error");
        router.push(
          `/payment-message?isPaymentMessage=${PaymentRouteStatus.FAIL}`
        );
        return;
      }
      const sub_id = await createStripePayment(
        2, //userId
        1, //membershipId
        5.99, //amount
        paymentMethod?.id
          ? paymentMethod?.id
          : id !== ""
            ? id
            : "", //payment Method Id
        "YEARLY", //payment type
        "price_1N7gGeAkohmLDDScufxw8HIF", //price Id,
        true
      );
      if (sub_id) {
        console.log(`inside_is_done`);
        setSaveCardError(false);
        // router.push(
        //   `/payment-message?isPaymentMessage=${PaymentRouteStatus.PENDING}&txn_id=${sub_id}`
        // );
      }
      if (!sub_id) {
        console.log(`inside_is_done error`);
        setSaveCardError(false);
        // router.push(
        //   `/payment-message?isPaymentMessage=${PaymentRouteStatus.FAIL
        //   }&message=${"We couldn't process your subscription request. Please try again."}`
        // );
      }
    }
  };

  const stripeInputOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#010203",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  // Input Fields
  const myRef = useRef<any>({});
  // const tref = useRef<any>(null);

  const [isClick, setClick] = useState({
    CardName: false,
    CardNumber: false,
    ExpirationDate: false,
    SecurityCode: false,
    saved: true,
  });

  const [isData, setData] = useState({
    CardName: "",
    CardNumber: true,
    ExpirationDate: true,
    SecurityCode: true,
    saved: true,
  });

  const [errors, setErrors] = useState({
    CardName: "",
    CardNumber: "",
    ExpirationDate: "",
    SecurityCode: "",
    saved: "",
  });

  const [errorsStripe, setErrorsStripe] = useState({
    CardName: "",
    CardNumber: "",
    ExpirationDate: "",
    SecurityCode: "",
    saved: "",
  });

  function handleChangeStripe(e: any) {
    if (e !== null || e !== "") {
      if (e.elementType === "cardNumber") {
        // setData({ ...isData, CardNumber: !e.empty });

        if (e.empty) {
          setErrors({
            ...errors,
            CardNumber: "",
          });
        }

        if (e.complete === false) {
          if (e.error != undefined && e.error.message === "Your card number is incomplete.") {
            setErrorsStripe({
              ...errorsStripe,
              CardNumber: "Card number is incomplete.",
            });

            setErrors({
              ...errors,
              CardNumber: "Card number is incomplete.",
            });
          } else if (e.error != undefined && e.error.message === "Your card number is invalid.") {
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
      } else if (e.elementType === "cardExpiry") {
        // setData({ ...isData, ExpirationDate: !e.empty });

        if (e.empty) {
          setErrors({
            ...errors,
            ExpirationDate: "",
          });
        }

        if (e.complete === false) {
          if (
            e.error != undefined && e.error.message === "Your card's expiration date is incomplete."
          ) {
            setErrorsStripe({
              ...errorsStripe,
              ExpirationDate: "Expiration date is incomplete.",
            });
            setErrors({
              ...errors,
              ExpirationDate: "Expiration date is incomplete.",
            });
          } else if (
            e.error != undefined && e.error.message === "Your card's expiration year is invalid."
          ) {
            setErrorsStripe({
              ...errorsStripe,
              ExpirationDate: "Expiration year is invalid.",
            });
            setErrors({
              ...errors,
              ExpirationDate: "Expiration year is invalid.",
            });
          } else if (
            e.error != undefined && e.error.message === "Your card's expiration year is in the past."
          ) {
            setErrorsStripe({
              ...errorsStripe,
              ExpirationDate: "Expiration year is in the past.",
            });

            setErrors({
              ...errors,
              ExpirationDate: "Expiration year is in the past.",
            });
          }
        } else if (e.complete === true) {
          setErrorsStripe({ ...errorsStripe, ExpirationDate: "" });
          setErrors({
            ...errors,
            ExpirationDate: "",
          });
        }
      } else if (e.elementType === "cardCvc") {
        // setData({ ...isData, SecurityCode: !e.empty });

        if (e.empty) {
          setErrors({
            ...errors,
            SecurityCode: "",
          });
        }

        if (e.complete === false) {
          if (e.error != undefined && e.error.message === "Your card's security code is incomplete.") {
            setErrorsStripe({
              ...errorsStripe,
              SecurityCode: "security code is incomplete.",
            });
          }

          setErrors({
            ...errors,
            SecurityCode: "security code is incomplete.",
          });
        } else if (e.complete === true) {
          setErrorsStripe({ ...errorsStripe, SecurityCode: "" });
          setErrors({
            ...errors,
            SecurityCode: "",
          });
        }
      }
    }
  }

  const handleChange = (values: any) => {
    console.log("key handleChange", values.key);

    setData({
      ...isData,
      ...values,
    });
  };

  const functionCardNameError = () => {
    if (isClick.CardName === false && !isData.CardName) {
      setErrors({ ...errors, CardName: "" });
    }
  };

  const functionCardNumberError = () => {
    if (isClick.CardNumber === false && !isData.CardNumber) {
      setErrors({ ...errors, CardNumber: "" });
    }
  };

  const functionExpirationDateError = () => {
    if (isClick.ExpirationDate === false && !isData.ExpirationDate) {
      setErrors({ ...errors, ExpirationDate: "" });
    }
  };

  const functionSecurityCodeError = () => {
    if (isClick.SecurityCode === false && !isData.SecurityCode) {
      setErrors({ ...errors, SecurityCode: "" });
    }
  };
  const functionIsSavedError = () => {
    if (isClick.saved === false && !isData.saved) {
      setErrors({ ...errors, saved: "" });
    }
  };

  useEffect(() => {
    if (isData.CardName) {
      setErrors({ ...errors, CardName: "" });
    }
  }, [isData.CardName]);

  useEffect(() => {
    if (isData.CardNumber) {
      setErrors({ ...errors, CardNumber: "" });
    }
  }, [isData.CardNumber]);

  useEffect(() => {
    if (isData.ExpirationDate) {
      setErrors({ ...errors, ExpirationDate: "" });
    }
  }, [isData.ExpirationDate]);

  useEffect(() => {
    if (isData.SecurityCode) {
      setErrors({ ...errors, SecurityCode: "" });
    }
  }, [isData.SecurityCode]);
  useEffect(() => {
    if (isData.saved) {
      setErrors({ ...errors, saved: "" });
    }
  }, [isData.saved]);

  // useEffect(() => {
  //   getMembershipDetails(1);
  // }, []);

  const FunctionSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setSaveCardError(false);

    const errors = {
      CardName: "",
      CardNumber: "",
      ExpirationDate: "",
      SecurityCode: "",
      saved: "",
    };

    //errorsStripe
    if (errorsStripe.CardNumber) {
      errors.CardNumber = errorsStripe.CardNumber;
    }

    if (errorsStripe.ExpirationDate) {
      errors.ExpirationDate = errorsStripe.ExpirationDate;
    }

    if (errorsStripe.SecurityCode) {
      errors.SecurityCode = errorsStripe.SecurityCode;
    }
    if (errorsStripe.saved) {
      errors.saved = errorsStripe.saved;
    }
    //errorsStripe

    if (!isData.CardName) {
      errors.CardName = "The field is required";
    }

    if (!isData.CardNumber) {
      errors.CardNumber = "The field is required";
    }

    if (!isData.ExpirationDate) {
      errors.ExpirationDate = "The field is required";
    }

    if (!isData.SecurityCode) {
      errors.SecurityCode = "The field is required";
    }
    // if (!isSaved) {
    //   errors.saved = "You must save card information";
    // }

    // console.log("oisdfsjdnfmnbhdvf 2", errors.CardNumber);
    if (
      !(
        errors.CardName ||
        errors.CardNumber ||
        errors.ExpirationDate ||
        errors.SecurityCode ||
        errors.saved
      )
    ) {
      if (loading === false) {
        console.log("handleStripePayment clicked");
        // setSaveCardError(false);
        handleStripePayment(e);
      }
    }

    // setSaveCardError(false);
    setErrors(errors);
  };

  return (
    <div className={styles.main}>
      <div className={styles.backSection}>
        <div>
          <Link href="/" tabIndex={0}>
            <MdOutlineArrowBackIos className={styles.backIcon} />
          </Link>
        </div>
        <Link href="/" tabIndex={-1}>
          <div
            tabIndex={-1}
            className={styles.backText}
          >
            Back to payment plans{" "}
          </div>
        </Link>
      </div>
      <div className={styles.welcomeHeading}>Payment Details</div>
      <div className={styles.Fields}>
        <div className={styles.EmailMainDiv} tabIndex={1}>
          <div
            tabIndex={0}
            className={
              isClick.CardName !== false && isData.CardName !== ""
                ? styles.EmailDiv
                : errors.CardName === ""
                  ? styles.EmailDivClick
                  : styles.EmailDivClickError
            }
          >
            {isClick.CardName !== false && isData.CardName !== "" && (
              <div className={styles.Email}>Name on card</div>
            )}

            {(isClick.CardName !== true || isData.CardName === "") && (
              <div className={styles.EmailmainClick}>
                <div
                  className={styles.EmailClick}
                >
                  <div className={errors.CardName && styles.EmailTextError}>
                    Name on card
                  </div>
                  {errors.CardName && (
                    <div className={styles.EmailErrorIcon}>
                      <Image
                        src="/authentication/ErrorImage.svg"
                        alt="/authentication/ErrorImage.svg"
                        width={22}
                        height={22}
                        objectFit="cover"
                        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                        priority={true}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.EmailClickInput} tabIndex={0}>
                  <input
                    className={styles.EmailClickInputField}
                    type="text"
                    id="cardName"
                    placeholder="visa / Master"
                    // value={isData.CardName}
                    onChange={(e) => handleChange({ CardName: e.target.value })}
                    autoFocus
                    ref={(e) => (myRef.current.CardName = e)}
                  // tabIndex={1}
                  // onKeyDown={(e) => onKeyDown(e, 1)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={styles.EmailErrorMessage}>{errors.CardName}</div>
        </div>
        <div className={styles.EmailMainDiv}>
          <div
            className={
              isClick.CardNumber === false && isData.CardNumber === false
                ? styles.EmailDiv
                : errors.CardNumber === "" || isData.CardNumber === false
                  ? styles.EmailDivClick
                  : styles.EmailDivClickError
            }
          >
            {isClick.CardNumber === false && isData.CardNumber === false && (
              <div className={styles.Email}>Card Number</div>
            )}

            {(isClick.CardNumber === true || isData.CardNumber === true) && (
              <div className={styles.EmailmainClick} id="EmailmainClickdiv">
                <div
                  className={styles.EmailClick}
                >
                  <div className={errors.CardNumber && styles.EmailTextError}>
                    Card Number
                  </div>
                  {errors.CardNumber && (
                    <div className={styles.EmailErrorIcon}>
                      <Image
                        src="/authentication/ErrorImage.svg"
                        alt="/authentication/ErrorImage.svg"
                        width={22}
                        height={22}
                        objectFit="cover"
                        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                        priority={true}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.EmailClickInput}>
                  <CardNumberElement
                    id="cardNumber"
                    options={stripeInputOptions}
                    onChange={(e) => {
                      handleChangeStripe(e);
                    }}
                    onReady={(e) => {
                      // e.focus();
                      setClick({
                        ...isClick,
                        CardNumber: true,
                      });
                      handleChange({ Number: "1" });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={styles.EmailErrorMessage}>{errors.CardNumber}</div>
        </div>

        <div className={styles.bottomFields}>
          <div className={styles.bottomFieldsLeft}>
            <div className={styles.EmailMainDiv}>
              <div
                // tabIndex={2}
                // onKeyDown={(e) => onKeyDown(e, 2)}
                className={
                  isClick.ExpirationDate === false &&
                    isData.ExpirationDate === false
                    ? styles.EmailDiv
                    : errors.ExpirationDate === "" ||
                      isData.ExpirationDate === false
                      ? styles.EmailDivClick
                      : styles.EmailDivClickError
                }
              >
                {isClick.ExpirationDate === false &&
                  isData.ExpirationDate === false && (
                    <div className={styles.Email}>Expiration date</div>
                  )}

                {(isClick.ExpirationDate === true ||
                  isData.ExpirationDate === true) && (
                    <div className={styles.EmailmainClick}>
                      <div
                        className={styles.EmailClick}
                      >
                        <div
                          className={
                            errors.ExpirationDate && styles.EmailTextError
                          }
                        >
                          Expiration date
                        </div>
                        {errors.ExpirationDate && (
                          <div className={styles.EmailErrorIcon}>
                            <Image
                              src="/authentication/ErrorImage.svg"
                              alt="/authentication/ErrorImage.svg"
                              width={22}
                              height={22}
                              objectFit="cover"
                              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              priority={true}
                            />
                          </div>
                        )}
                      </div>
                      <div
                        className={styles.EmailClickInput}
                      >
                        <CardExpiryElement
                          id="cardExpiry"
                          options={stripeInputOptions}
                          onChange={(e) => {
                            handleChangeStripe(e);
                          }}
                          onReady={(e) => {
                            // e.focus();
                            setClick({
                              ...isClick,
                              ExpirationDate: true,
                            });
                            handleChange({ ExpireDate: "1" });
                          }}
                        />
                      </div>
                    </div>
                  )}
              </div>
              <div className={styles.EmailErrorMessage}>
                {errors.ExpirationDate}
              </div>
            </div>
          </div>
          <div className={styles.bottomFieldsRight}>
            <div className={styles.EmailMainDiv}>
              <div
                className={
                  isClick.SecurityCode === false &&
                    isData.SecurityCode === false
                    ? styles.EmailDiv
                    : errors.SecurityCode === "" ||
                      isData.SecurityCode === false
                      ? styles.EmailDivClick
                      : styles.EmailDivClickError
                }
              >
                {isClick.SecurityCode === false &&
                  isData.SecurityCode === false && (
                    <div className={styles.Email}>Security code</div>
                  )}

                {(isClick.SecurityCode === true ||
                  isData.SecurityCode === true) && (
                    <div className={styles.EmailmainClick}>
                      <div
                        className={styles.EmailClick}
                      >
                        <div
                          className={errors.SecurityCode && styles.EmailTextError}
                        >
                          Security code
                        </div>
                        {errors.SecurityCode && (
                          <div className={styles.EmailErrorIcon}>
                            <Image
                              src="/authentication/ErrorImage.svg"
                              alt="/authentication/ErrorImage.svg"
                              width={22}
                              height={22}
                              objectFit="cover"
                              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                              priority={true}
                            />
                          </div>
                        )}
                      </div>
                      <div className={styles.EmailClickInput}>
                        <CardCvcElement
                          id="cardCvc"
                          options={stripeInputOptions}
                          onChange={(e) => handleChangeStripe(e)}
                          onReady={(e) => {
                            setClick({
                              ...isClick,
                              SecurityCode: true,
                            });
                          }}
                        />
                      </div>
                    </div>
                  )}
              </div>
              <div className={styles.EmailErrorMessage}>
                {errors.SecurityCode}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonSection}>
        <Link
          href={`/payment-message?isPaymentMessage=${isPaymentMethod.message == false
              ? PaymentRouteStatus.FAIL
              : PaymentRouteStatus.PENDING
            }`}
        >
          <div
            tabIndex={0}
            className={
              loading === false
                ? styles.buttonSignInSection
                : styles.buttonSignInSectionLoading
            }
            onClick={(e) => {
              FunctionSubmit(e);
            }}
          >
            {loading === true ? (
              <>Loading...</>
            ) : (
              <>
                Complete Payment{" "}
                {!router.query.paymentType
                  ? `$${ChoosePlan.membershipDedails?.yearly_payment}`
                  : router.query.paymentType === "Monthly"
                    ? `$${ChoosePlan.membershipDedails?.monthly_payment}`
                    : `$${ChoosePlan.membershipDedails?.yearly_payment}`}
              </>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

CardPayment.prototype = {
  createStripePayment: PropTypes.func.isRequired,
  savePaymentMethod: PropTypes.func.isRequired,
};

const mapStateToProps = (state: RootState) => ({
  ChoosePlan: state.ChoosePlan,
  Payment: state.Payment,
  newAuth: state.newAuth,
  common: state.common,
});

export default connect(mapStateToProps, {
  createStripePayment,
  savePaymentMethod,
})(CardPayment);
