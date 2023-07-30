import { AppDispatch } from "../../store";
import {
  SET_CHOOSE_YOUR_PLAN_LOADING,
  SET_CHOOSE_YOUR_PLAN_SUCCESS,
  SET_CHOOSE_YOUR_PLAN_FAIL,
  SET_CHOOSE_YOUR_PLAN_MODAL_LOADING,
  SET_CHOOSE_YOUR_PLAN_MODAL_SUCCESS,
  SET_CHOOSE_YOUR_PLAN_MODAL_FAIL,
} from "../types";

import axios from "axios";
const BASE_URL = process.env.BASE_URL;

export const setChooseYourPlan =
  (planType: string, planDate: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: SET_CHOOSE_YOUR_PLAN_LOADING,
      });

      dispatch({
        type: SET_CHOOSE_YOUR_PLAN_SUCCESS,
        payload: { planType: planType, planDate: planDate },
      });
    } catch (err) {
      dispatch({
        type: SET_CHOOSE_YOUR_PLAN_FAIL,
      });
    }
  };

export const setChooseYourPlanModal =
  (condition: boolean) => async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: SET_CHOOSE_YOUR_PLAN_MODAL_LOADING,
      });

      dispatch({
        type: SET_CHOOSE_YOUR_PLAN_MODAL_SUCCESS,
        payload: condition,
      });
    } catch (err) {
      dispatch({
        type: SET_CHOOSE_YOUR_PLAN_MODAL_FAIL,
      });
    }
  };
