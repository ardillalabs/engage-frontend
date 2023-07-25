import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import SignUpSteps from "../SignUpSteps";
import { useRouter } from "next/router";

const PaymentForm = () => {

    const router = useRouter();
    // Input Fields
    const myRef = useRef<any>({});

    const [paymentMethodOption, setPaymentMethodOption] = useState("credit-card");
    const [isClick, setClick] = useState({
        isCardHolderNameClick: false,
      });

    const [isData, setData] = useState({
        CardHolderName: "",
    });

    const [errors, setErrors] = useState({
        CardHolderName: "",
    });

    const handleChange = (values: any) => {
        setData({
          ...isData,
          ...values,
        });
      };
    

      return (
        <div className={styles.mainDiv}>
          <div className={styles.componentDiv}>
            <h2>Login</h2>
            <div className={styles.inputDiv}>
              <div>Email</div>
              <input
                onClick={() =>
                  setClick({
                    ...isClick,
                    isCardHolderNameClick: true,
                  })
                }
                type='text'
                className={styles.input}
                id='cardHolderName'
                value={isData.CardHolderName}
                autoFocus
                ref={(input) => (myRef.current.cardHolderName = input)}
                onChange={(e) => handleChange({ CardHolderName: e.target.value })}
              />
    
              <div className={styles.errorMessage}>{errors.CardHolderName}</div>
            </div>
            <div className={styles.inputDiv}>
            </div>
                <div
                  className={styles.buttonDiv}
                //   onClick={() => FunctionLoginSubmit()}
                >
                  <button>Login</button>
                </div>
          </div>
          </div>
      );
}

export default PaymentForm;