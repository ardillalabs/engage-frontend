import axios from "axios";
import { AppDispatch } from "../../store";

import {
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_LOADING,
  CREATE_PAYMENT_FAIL,
  SAVE_PAYMENT_METHOD,
} from "../types";

export const createStripePayment =
  (
    userId: number,
    subscriptionId: number,
    amount: number,
    paymentMethodId: string | undefined,
    paymentType: string,
    priceId?: string,
    isSaved?: boolean
  ) =>
    async (dispatch: AppDispatch) => {
      try {
        console.log({
          userId: userId,
          subscriptionId: subscriptionId,
          amount: amount,
          paymentMethodId: paymentMethodId,
          paymentType: paymentType,
          priceId: priceId,
          isSaved: isSaved
        })
        dispatch({
          type: CREATE_PAYMENT_LOADING,
        });
        const response = await axios.post(
          `http://localhost:5002/stripe/create-subscription`,
          {
            userId: userId,
            subscriptionId: subscriptionId,
            amount: amount,
            paymentMethodId: paymentMethodId,
            paymentType: paymentType,
            priceId: priceId,
            savePaymentMethod: isSaved
          }
        );
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
          return null;
        }
      } catch (error) {
        dispatch({
          type: CREATE_PAYMENT_FAIL,
        });
        return null;
      }
    };

export const savePaymentMethod =
  (saved: boolean) => async (dispatch: AppDispatch) => {
    try {
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