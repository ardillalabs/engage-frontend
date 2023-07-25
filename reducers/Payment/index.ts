import { AnyAction } from "redux";

import {
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_LOADING,
  CREATE_PAYMENT_FAIL,
  SAVE_PAYMENT_METHOD,
  GET_STRIPE_PAYMENT_METHODS_SUCCESS,
  GET_STRIPE_PAYMENT_METHODS_LOADING,
  GET_SUBSCRIPTIONS_SUCCESS,
  CANCEL_SUBSCRIPTIONS_SUCCESS,
  SELECTED_SUBSCRIPTION,
  COIN_PAYMENT_SUCCESS,
  SET_SELECTED_PAYMENT_METHOD,
  PAYMENT_METHOD_STATE_CHANGED,
  SET_SUBSCRIPTION_STATUS,
  CLEAR_STRIPE_PAYMENT_METHODS,
  SET_STRIPE_PAYMENT_METHODS_LOADING,
  SET_STRIPE_PAYMENT_METHODS_SUCCESS,
  SET_STRIPE_PAYMENT_METHODS_ERROR
} from "../../actions/types";
import { PaymentInitialStates, PaymentMethods } from "../../tsc-types/Payment";
import { IStripePaymentMethods } from "./@types/stripe.payment_methods.types";

const initialState: PaymentInitialStates = {
  loading: false,
  paymentDone: false,
  isSaved: false,
  savedStripePaymentMethods: {},
  subscriptions: [
    {
      id: "",
      payment_id: "",
      amount: 0,
      payment_method: "",
      payment_type: "",
      expire_date: "",
      create_date: new Date(0),
      status: "",
      isRenewal: false,
    },
  ],
  subscriptionCanceled: false,
  selectedSubscription: {
    method: "",
    subscriptionId: "",
  },
  coinPaymentDetails: {
    address: "",
    amount: "",
    checkout_url: "",
    confirm_needed: "",
    qrcode_url: "",
    status_url: "",
    timeout: 0,
    txn_id: "",
  },
  selectedPaymentMethod: {
    method: PaymentMethods.default,
    id: "",
  },
  paymentMethodStateChanged: false,
  subscription: {
    id: "",
    status: ""
  },
  stripePaymentMethods: null
};

export default function (state = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        paymentDone: payload,
      };
    case CREATE_PAYMENT_LOADING:
      return {
        ...state,
        loading: true,
        paymentDone: payload,
      };
    case CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentDone: payload,
      };
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        isSaved: payload,
      };
    case GET_STRIPE_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        savedStripePaymentMethods: payload,
      };
    case GET_STRIPE_PAYMENT_METHODS_LOADING:
      return {
        ...state,
      };
    case GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions: payload,
      };

    case CANCEL_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptionCanceled: true,
      };
    case SELECTED_SUBSCRIPTION:
      console.log(payload, "SELECTED_SUBSCRIPTION");
      return {
        ...state,
        selectedSubscription: payload,
      };
    case COIN_PAYMENT_SUCCESS:
      console.log(payload, "COIN_PAYMENT_SUCCESS");
      return {
        ...state,
        coinPaymentDetails: payload,
      };
    case SET_SELECTED_PAYMENT_METHOD:
      return {
        ...state,
        selectedPaymentMethod: payload,
      };
    case PAYMENT_METHOD_STATE_CHANGED:
      console.log("PAYMENT_METHOD_STATE_CHANGED");
      return {
        ...state,
        paymentMethodStateChanged: true
      }
    case SET_SUBSCRIPTION_STATUS:
      console.log(payload, "SET_SUBSCRIPTION_STATUS")
      return {
        ...state,
        subscription: payload
      }
    case CLEAR_STRIPE_PAYMENT_METHODS:
      return {
        ...state,
        savedStripePaymentMethods: {}
      }
    case SET_STRIPE_PAYMENT_METHODS_LOADING:
      console.log(payload, "SET_STRIPE_PAYMENT_METHODS_LOADING")
      return {
        ...state,
        stripePaymentMethods: payload
      }
    case SET_STRIPE_PAYMENT_METHODS_SUCCESS:
      console.log(payload, "SET_STRIPE_PAYMENT_METHODS_SUCCESS")
      return {
        ...state,
        stripePaymentMethods: payload
      }
    case SET_STRIPE_PAYMENT_METHODS_ERROR:
      console.log(payload, "SET_STRIPE_PAYMENT_METHODS_ERROR")

      return {
        ...state,
        stripePaymentMethods: payload
      }
    default:
      return state;
  }
}
