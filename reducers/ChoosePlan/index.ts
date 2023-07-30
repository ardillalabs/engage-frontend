import { AnyAction } from "redux";
import {
  SET_CHOOSE_YOUR_PLAN_LOADING,
  SET_CHOOSE_YOUR_PLAN_SUCCESS,
  SET_CHOOSE_YOUR_PLAN_FAIL,
  SET_CHOOSE_YOUR_PLAN_MODAL_LOADING,
  SET_CHOOSE_YOUR_PLAN_MODAL_SUCCESS,
  SET_CHOOSE_YOUR_PLAN_MODAL_FAIL,
  PERMISSION_LIST_LOADING,
  PERMISSION_LIST_SUCCESS,
  PERMISSION_LIST_FAIL,
  GET_MEMBERSHIP_LOADING,
  GET_MEMBERSHIP_SUCCESS,
  GET_MEMBERSHIP_FAIL,
} from "../../actions/types";
import { ChooseYourPlanInitialStates } from "../../tsc-types/ChossePlan";

const initialState: ChooseYourPlanInitialStates = {
  loading: false,
  chooseYourPlan: {
    planDate: "Yearly",
    planType: "Gold",
  },
  choosePlanModal: false,
  permissionList: null,
  membershipDedails: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case SET_CHOOSE_YOUR_PLAN_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_CHOOSE_YOUR_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        chooseYourPlan: {
          planType: payload.planType,
          planDate: payload.planDate,
        },
      };

    case SET_CHOOSE_YOUR_PLAN_FAIL:
      return {
        ...state,
        loading: false,
      };

    case SET_CHOOSE_YOUR_PLAN_MODAL_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_CHOOSE_YOUR_PLAN_MODAL_SUCCESS:
      return {
        ...state,
        choosePlanModal: payload,
      };

    case SET_CHOOSE_YOUR_PLAN_MODAL_FAIL:
      return {
        ...state,
        loading: false,
      };

    case PERMISSION_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };

    case PERMISSION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        permissionList: payload,
      };

    case PERMISSION_LIST_FAIL:
      return {
        ...state,
        loading: false,
        permissionList: null,
      };
    case GET_MEMBERSHIP_LOADING:
      return {
        ...state,
        loading: true,
        membershipDedails: null
      }
    case GET_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        loading: false,
        membershipDedails: payload
      }
    case GET_MEMBERSHIP_FAIL:
      return {
        ...state,
        loading: false,
        membershipDedails: null
      }
    default:
      return state;
  }
}
