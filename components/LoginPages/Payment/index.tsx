import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import SignUpSteps from '../SignUpSteps';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ChooseYourPlanInitialStates } from '../../../tsc-types/ChossePlan';
import { setChooseYourPlanModal } from '../../../actions/ChoosePlan';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { RootState } from '@/store';
import CardPayment from './CardPayment';
import { getCookie } from 'cookies-next';
import { getCurrentUserDetails } from '../../../actions/Auth';

interface Props {
  ChoosePlan: ChooseYourPlanInitialStates;
  setChooseYourPlanModal: any;
  toast: any;
  setToastState: any;
  auth: any;
  getCurrentUserDetails: any;
}

const PaymentForm = ({
  setChooseYourPlanModal,
  ChoosePlan: { chooseYourPlan, choosePlanModal },
  toast,
  setToastState,
  auth,
  getCurrentUserDetails,
}: any) => {
  const router = useRouter();
  const [isRouteUrl, setRouteUrl] = useState<string>('');
  const [isRouteUrlParam, setRouteUrlParam] = useState<any>({
    paymentType: '',
    membershipType: '',
  });
  const [isPaymentMethod, setPaymentMethod] = useState<any>({
    message: true,
    method: '',
    approvedMethod: '',
  });

  useEffect(() => {
    const cookie = getCookie('access_token');
    console.log('payment - access token');
    getCurrentUserDetails(cookie);
  }, []);

  const stripePromise = loadStripe(
    'pk_test_51L7XS0AkohmLDDScBrUoZzy984RNkDHLkEPlCCXMWetb0IZvDjbFMqfRsFN3BCJ4MXYd0bfYW9YLpWECKv7BKHdg00OOZnS5qu'
  );

  useEffect(() => {
    setRouteUrl(router.route);
  }, [router.route]);

  useEffect(() => {
    if (router.query.paymentType || router.query.membershipType) {
      setRouteUrlParam({
        paymentType: router.query.paymentType,
        membershipType: router.query.membershipType,
      });
    }

    if (!router.query.paymentType || !router.query.membershipType) {
      if (
        !router.asPath.includes('paymentType') ||
        !router.asPath.includes('membershipType')
      ) {
        setRouteUrlParam({
          paymentType: 'Yearly',
          membershipType: 'Gold',
        });
      }
    }
  }, [router.query.paymentType]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.componentDiv}>
        <SignUpSteps step='3' />
        <div className={styles.contentDiv}>
          <div className={styles.sectionDiv}>
            <h2 className={styles.paymentTitle}>Payment Method</h2>
            <div className={styles.paymentLogoWrap}>
                <Image
                  src={'/mastercard-logo.png'}
                  width={100}
                  height={100}
                  alt='Mastercard Logo'
                  className={styles.paymentTypeLogo}
                />
                <Image
                  src={'/visa-logo.png'}
                  width={100}
                  height={100}
                  alt='Visa Logo'
                  className={styles.paymentTypeLogo}
                />
                {/* <Image
                  src={'/paypal-logo.png'}
                  width={100}
                  height={100}
                  alt='Paypal Logo'
                  className={styles.paymentTypeLogo}
                /> */}
              </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '10px',
              }}
            >
              {/* <button style={{ marginRight: '20px' }}>Monthly</button>
              <button>Yearly</button> */}
            </div>
            <div className={styles.selectPayment}>
              {/* <div className={styles.selectPaymentTop}>
                <label className={styles.paymentMethod}>
                  <input
                    type='radio'
                    name='credit-card'
                    className={styles.radioBtn}
                    checked={paymentMethod === 'credit-card' ? true : false}
                    onClick={() => setPaymentMethod('credit-card')}
                  />
                  Credit Card
                </label>
                <label className={styles.paymentMethod}>
                  <input
                    type='radio'
                    name='paypal'
                    className={styles.radioBtn}
                    checked={paymentMethod === 'paypal' ? true : false}
                    onClick={() => setPaymentMethod('paypal')}
                  />
                  Paypal
                </label>
              </div> */}
            </div>
            <Elements stripe={stripePromise}>
              <CardPayment isPaymentMethod={isPaymentMethod} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

PaymentForm.prototype = {
  getCurrentUserDetails: PropTypes.func.isRequired,
  setChooseYourPlanModal: PropTypes.func.isRequired,
  setToastState: PropTypes.func.isRequired,
};

const mapStateToProps = (state: RootState) => ({
  ChoosePlan: state.ChoosePlan,
  toast: state.toast,
});

export default connect(mapStateToProps, {
  getCurrentUserDetails,
  setChooseYourPlanModal,
})(PaymentForm);
