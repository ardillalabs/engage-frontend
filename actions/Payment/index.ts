import axios from "axios";
import { AppDispatch } from "../../store";

import {
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_LOADING,
  CREATE_PAYMENT_FAIL,
  SAVE_PAYMENT_METHOD,
  GET_STRIPE_PAYMENT_METHODS_LOADING,
  GET_STRIPE_PAYMENT_METHODS_FAIL,
  GET_STRIPE_PAYMENT_METHODS_SUCCESS,
  GET_SUBSCRIPTIONS_LOADINNG,
  GET_SUBSCRIPTIONS_SUCCESS,
  CANCEL_SUBSCRIPTIONS_LOADINNG,
  CANCEL_SUBSCRIPTIONS_FAIL,
  CANCEL_SUBSCRIPTIONS_SUCCESS,
  SELECTED_SUBSCRIPTION,
  COIN_PAYMENT_SUCCESS,
  SET_SELECTED_PAYMENT_METHOD,
  SET_TOAST_STATE,
  PAYMENT_METHOD_STATE_CHANGED,
  SET_SUBSCRIPTION_PLAN,
  SET_STRIPE_PAYMENT_METHODS_LOADING,
  SET_STRIPE_PAYMENT_METHODS_SUCCESS,
  SET_STRIPE_PAYMENT_METHODS_ERROR
} from "../types";
import { ECancelSubscriptionsPaymentMethod, PaymentMethods } from "@/tsc-types/Payment";
export const createStripePayment =
  (
    userId: number,
    membershipId: number,
    amount: number,
    paymentMethodId: string | undefined,
    paymentType: string,
    priceId?: string,
    isSaved?: boolean
  ) =>
    async (dispatch: AppDispatch) => {
      try {
        console.log("payment methods");
        dispatch({
          type: CREATE_PAYMENT_LOADING,
        });
        const response = await axios.post(
          `${process.env.NEXT_APP_STRIPE_PAYMENT_SERVICE}/create-payment`,
          {
            userId: userId,
            membershipId: membershipId,
            amount: amount,
            paymentMethodId: paymentMethodId,
            paymentType: paymentType,
            priceId: priceId,
            savePaymentMethod: isSaved,
          }
        );
        console.log(response?.data?.id, "stripe_response_1");

        if (response?.data?.id) {
          dispatch({
            type: CREATE_PAYMENT_SUCCESS,
            payload: true,
          });
          return response?.data?.id;
        } else {
          dispatch({
            type: CREATE_PAYMENT_FAIL,
          });
          dispatch({
            type: SET_TOAST_STATE,
            payload: {
              visibility: true,
              type: "error",
              title: "Error!",
              description: "We couldn't process your subscription request. Please try again.",
            },
          });
          return null;
        }
      } catch (error) {
        dispatch({
          type: CREATE_PAYMENT_FAIL,
        });
        console.log(error, "stripe_response_2");
        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: "We couldn't process your subscription request. Please try again.",
          },
        });
        return null;
      }
    };


export const cancelRenewal = (userId: number, subscriptionId: string, access_token: string, method: string) => async (dispatch: AppDispatch) => {
  console.log("cancel renewal")
  // API Header configarations
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    withCredentials: true,
  };
  console.log(config, "cancel renewal 0")
  if (method === ECancelSubscriptionsPaymentMethod.STRIPE) {
    console.log("cancel renewal 1")
    try {
      console.log("cancel renewal 2")
      const response = await axios.post(
        `${process.env.NEXT_APP_STRIPE_PAYMENT_SERVICE}/cancel-membership-subscription-renewal`,
        {
          userId: userId,
          subscriptionId: subscriptionId,
        },
        config
      );
      console.log(response, "cancel_renewal_response");
      dispatch({
        type: SET_TOAST_STATE,
        payload: {
          visibility: true,
          type: "success",
          title: "Success!",
          description: "Your subscription renewal has been canceled successfully.",
        },
      });
    }
    catch (error) {
      console.log(error, "cancel renewal_error")
      dispatch({
        type: SET_TOAST_STATE,
        payload: {
          visibility: true,
          type: "error",
          title: "Error!",
          description: "We couldn't cancel your subscription renewal. Please try again.",
        },
      });
    }

  }

  if (method === ECancelSubscriptionsPaymentMethod.PAYPAL) {
    try {
      console.log("cancel renewal 3")
      const response = await axios.post(
        `${process.env.PAYPAL_BASE_URL}/subscriptions/renewal/cancel`,
        {
          userId: userId,
          subscriptionId: subscriptionId,
        },
        config
      );
      console.log(response, "cancel_renewal_response");
      dispatch({
        type: SET_TOAST_STATE,
        payload: {
          visibility: true,
          type: "success",
          title: "Success!",
          description: "Your subscription renewal has been canceled successfully.",
        },
      });
    }
    catch (error) {
      console.log(error, "cancel renewal_error")
      dispatch({
        type: SET_TOAST_STATE,
        payload: {
          visibility: true,
          type: "error",
          title: "Error!",
          description: "We couldn't cancel your subscription renewal. Please try again.",
        },
      });

    }
  }
}
//subscription memberships
export const getActiveSubscriptionMemmberships =
  (userId: number) => async (dispatch: AppDispatch) => {
    console.log(
      `${process.env.BASE_URL}payment/${userId}`,
      "active_subscriptions"
    );

    try {
      dispatch({
        type: GET_SUBSCRIPTIONS_LOADINNG,
      });

      const response = await axios.get(
        `${process.env.BASE_URL}payment/${userId}`
      );
      console.log(response.data, "active_subscriptions");
      if (response.data.length < 1) {
        dispatch({
          type: GET_SUBSCRIPTIONS_LOADINNG,
        });
      }
      dispatch({
        type: GET_SUBSCRIPTIONS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error, "getActiveSubscriptionMemmberships_error");
      return error;
    }
  };

//selected-subscription
export const setSelectedSubscription =
  (method: string, subscriptionId: string) => async (dispatch: AppDispatch) => {
    console.log(`setSelectedSubscription`, method, subscriptionId);
    dispatch({
      type: SELECTED_SUBSCRIPTION,
      payload: {
        method: method,
        subscriptionId: subscriptionId,
      },
    });
  };
export const setPaymentMethodStateChanged =
  (state: boolean) => async (dispatch: AppDispatch) => {
    dispatch({
      type: PAYMENT_METHOD_STATE_CHANGED,
      payload: state,
    });
  };

export const setSubscription =
  (id: string, status: string) => async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_SUBSCRIPTION_PLAN,
      payload: {
        id: id,
        status: status,
      },
    });
  };

//cancel-membership
export const cancelSubscriptionMemmberships =
  (
    userId: number,
    subscriptionId: string,
    method: string,
    access_token: string
  ) =>
    async (dispatch: AppDispatch) => {
      // API Header configarations
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        withCredentials: true,
      };

      console.log(
        {
          userId: userId,
          subscriptionId: subscriptionId,
        },
        "cancelSubscriptionMemmberships"
      );

      try {
        if (method === ECancelSubscriptionsPaymentMethod.STRIPE) {
          dispatch({
            type: CANCEL_SUBSCRIPTIONS_LOADINNG,
          });
          const response = await axios.post(
            `${process.env.NEXT_APP_STRIPE_PAYMENT_SERVICE}/cancel-membership-subscription`,
            {
              userId: userId,
              subscriptionId: subscriptionId,
            },
            config
          );
          if (!response.data) {
            dispatch({
              type: SET_TOAST_STATE,
              payload: {
                visibility: true,
                type: "error",
                title: "Error!",
                description: "We couldn't cancel your subscription. Please try again.",
              },
            });
          }
          dispatch({
            type: SET_TOAST_STATE,
            payload: {
              visibility: true,
              type: "success",
              title: "Success!",
              description:
                "Your subscription has been successfully canceled.",
            },
          });
          dispatch({
            type: CANCEL_SUBSCRIPTIONS_SUCCESS,
            payload: true,
          });
        }
        if (method === ECancelSubscriptionsPaymentMethod.PAYPAL) {
          console.log(
            "cancel paypal subscription membership",
            `${process.env.PAYPAL_BASE_URL}/subscriptions/cancel`,
            {
              subscriptionId: subscriptionId,
              userId: +userId,
            },
            config
          );
          dispatch({
            type: CANCEL_SUBSCRIPTIONS_LOADINNG,
          });
          const response = await axios.post(
            `${process.env.PAYPAL_BASE_URL}/subscriptions/cancel`,
            {
              subscriptionId: subscriptionId,
              userId: +userId,
            },
            config
          );
          if (!response.data) {
            dispatch({
              type: SET_TOAST_STATE,
              payload: {
                visibility: true,
                type: "error",
                title: "Error!",
                description: "We couldn't cancel your subscription. Please try again.",
              },
            });
          }
          console.log(response, "subscription_canceled");
          dispatch({
            type: CANCEL_SUBSCRIPTIONS_SUCCESS,
            payload: true,
          });
          dispatch({
            type: SET_TOAST_STATE,
            payload: {
              visibility: true,
              type: "success",
              title: "Success!",
              description:
                "Your subscription has been successfully canceled.",
            },
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: CANCEL_SUBSCRIPTIONS_FAIL,
        });
        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: "you cannot cancel subscription at this time",
          },
        });
      }
    };

export const savePaymentMethod =
  (saved: boolean) => async (dispatch: AppDispatch) => {
    try {
      console.log("savePaymentMethod");
      dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: saved,
      });
    } catch (error) {
      dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: false,
      });
    }
  };

export const getsavedStripePaymentMethods =
  (userId: number, access_token: string) => async (dispatch: AppDispatch) => {
    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      withCredentials: true,
    };

    try {
      dispatch({
        type: GET_STRIPE_PAYMENT_METHODS_LOADING,
      });
      const stripesavedStripePaymentMethods = (
        await axios.get(
          `${process.env.NEXT_APP_STRIPE_PAYMENT_SERVICE}/payment-methods/${userId}`,
          config
        )
        //test
      ).data as Array<any>;
      if (stripesavedStripePaymentMethods.length < 0) {
        return [];
      }
      console.log({ userId: userId, s: stripesavedStripePaymentMethods });
      dispatch({
        type: GET_STRIPE_PAYMENT_METHODS_SUCCESS,
        payload: stripesavedStripePaymentMethods,
      });
      dispatch({
        type: PAYMENT_METHOD_STATE_CHANGED,
        payload: false,
      });
    } catch (error) {
      dispatch({
        type: GET_STRIPE_PAYMENT_METHODS_FAIL,
      });
    }
  };

export const createCoinPayment =
  (
    currency: string,
    email: string,
    amount: number,
    userId: number,
    membershipId: number
  ) =>
    async (
      dispatch: AppDispatch
    ): Promise<{
      address: string;
      amount: string;
      checkout_url: string;
      confirm_needed: string;
      qrcode_url: string;
      status_url: string;
      timeout: number;
      txn_id: string;
      code?: string;
    } | null> => {
      console.log("coin-payment-clicked");
      try {
        const response = await axios.post(
          `${process.env.NEXT_APP_COIN_PAYMENT_SERVICE}/create`,
          {
            currency: currency,
            email: email,
            amount: amount,
            userId: userId,
            membershipId: membershipId,
          }
        );
        if (!response.data) {
          dispatch({
            type: CREATE_PAYMENT_FAIL,
          });
          return null;
        }
        const {
          address,
          checkout_url,
          qrcode_url,
          confirm_needed,
          status_url,
          timeout,
          txn_id,
        } = response.data;
        dispatch({
          type: CREATE_PAYMENT_SUCCESS,
          payload: true,
        });

        dispatch({
          type: COIN_PAYMENT_SUCCESS,
          payload: response.data,
        });
        console.log(
          {
            address: address,
            amount: response.data?.amount,
            checkout_url: checkout_url,
            confirm_needed: confirm_needed,
            qrcode_url: qrcode_url,
            status_url: status_url,
            timeout: timeout,
            txn_id: txn_id,
            code: response.data?.code,
          },
          "response_from_coin_payment"
        );
        return {
          address: address,
          amount: response.data?.amount,
          checkout_url: checkout_url,
          confirm_needed: confirm_needed,
          qrcode_url: response.data?.qrcode_url,
          status_url: status_url,
          timeout: timeout,
          txn_id: txn_id,
          code: response.data?.code,
        };
      } catch (error) {
        console.log(error);
        dispatch({
          type: CREATE_PAYMENT_FAIL,
        });
        return null;
      }
    };

export const setSelectedPaymentMethodId =
  (method: PaymentMethods, id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: SET_SELECTED_PAYMENT_METHOD,
        payload: {
          method: method,
          id: id,
        },
      });
    } catch (error) {
      return error;
    }
  };

//delete payment method stripe
export const deletePaymentMethodStripe =
  (paymentMethodId: string, access_token: string) =>
    async (dispatch: AppDispatch) => {
      // API Header configarations
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        withCredentials: true,
      };

      dispatch({
        type: SET_STRIPE_PAYMENT_METHODS_LOADING,
        payload: null
      })

      try {
        console.log(`delete-payment-method`);
        const response = await axios.post(
          `${process.env.NEXT_APP_STRIPE_PAYMENT_SERVICE}/payment-methods/delete`,
          {
            paymentMethodId: paymentMethodId,
          },
          config
        );
        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "success",
            title: "Success!",
            description: "Your payment method has been successfully deleted.",
          },
        });
        dispatch({
          type: PAYMENT_METHOD_STATE_CHANGED,
          payload: true,
        });
        dispatch({
          type: SET_STRIPE_PAYMENT_METHODS_SUCCESS,
          payload: response.data
        })
        console.log(response, `response_payment_method_delete`);
      } catch (error) {
        console.log(error);
        dispatch({
          type: SET_STRIPE_PAYMENT_METHODS_ERROR,
          payload: null
        })
        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: "We couldn't delete your payment method. Please try again.",
          },
        });
        return error;
      }
    };

//update default payment method
export const updateDefaultPaymentMethod =
  (userId: number, paymentMethodId: string, access_token: string) =>
    async (dispatch: AppDispatch) => {
      // API Header configarations
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        withCredentials: true,
      };

      try {

        console.log("updateDefaultPaymentMethod");
        dispatch({
          type: SET_STRIPE_PAYMENT_METHODS_LOADING,
          payload: null
        })
        const response = await axios.put(
          `${process.env.NEXT_APP_STRIPE_PAYMENT_SERVICE}/payment-methods/default`,
          {
            userId: userId,
            paymentMethodId: paymentMethodId,
          },
          config
        );
        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "success",
            title: "Success!",
            description: "Your default payment method has been updated successfully.",
          },
        });
        dispatch({
          type: SET_STRIPE_PAYMENT_METHODS_SUCCESS,
          payload: response.data
        })
        dispatch({
          type: PAYMENT_METHOD_STATE_CHANGED,
          payload: true,
        });
        console.log(response.data, "updateDefaultPaymentMethod");
      } catch (error) {
        console.log(error);
        dispatch({
          type: SET_STRIPE_PAYMENT_METHODS_ERROR,
          payload: null
        })
        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: "We couldn't update your default payment method. Please try again.",
          },
        });
        return error;
      }
    };
