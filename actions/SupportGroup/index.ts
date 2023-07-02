import { AppDispatch } from "../../store";
import axios from "axios";
import {
  CREATE_SUPPORT_GROUP,
  FAIL_CREATE_SUPPORT_GROUP,
  SUPPORT_GROUP_LOADING,
  GET_SUPPORT_GROUP,
  FAIL_GET_SUPPORT_GROUP,
  SUPPORTER_DELETE,
  FAIL_SUPPORTER_DELETE,
} from "../types";
import { UserSignUpDetails } from "../../tsc-types/Auth";

// Import environment variables
const BASE_URL = process.env.BASE_URL;

// @desc        create support person
// @api         support_group
// @access      public
export const addSupportPerson =
  (supportData: any) => async (dispatch: AppDispatch) => {
    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Stringyfy Json Body
    const body = JSON.stringify({
      patientUserId: 1,
      email: supportData.email,
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/support_group`,
        body,
        config
      );

      dispatch({
        type: CREATE_SUPPORT_GROUP,
        payload: response,
      });
      getSupportGroup(1);
      // dispatch({
      //   type: SET_TOAST_STATE,
      //   payload: {
      //     visibility: true,
      //     type: "success",
      //     title: "Success!",
      //     description: `${response.data.message}`,
      //   },
      // });
    } catch (err: any) {
      if (err.message === "Network Error") {
        dispatch({
          type: FAIL_CREATE_SUPPORT_GROUP,
          payload: {
            response: {
              data: {
                message: "Network Error",
                status: err.code,
                statusText: err.code,
              },
            },
          },
        });
      } else {
        dispatch({
          type: FAIL_CREATE_SUPPORT_GROUP,
          payload: err,
        });

        if (
          err.response.data.message !==
          "This email address has already been used."
        ) {
          dispatch({
            type: FAIL_CREATE_SUPPORT_GROUP,
            payload: {
              visibility: true,
              type: "error",
              title: "Error!",
              description: `${err.response.data.message}`,
            },
          });
        }
      }
    }
  };

export const getSupportGroup =
  (userId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: SUPPORT_GROUP_LOADING,
      });
      await axios
        .get(`${BASE_URL}/support_group/${userId}`)
        .then((response) => {
          const data: any = response.data;
          dispatch({
            type: GET_SUPPORT_GROUP,
            payload: data,
          });
        });
    } catch (err) {
      dispatch({
        type: FAIL_GET_SUPPORT_GROUP,
      });
    }
  };

export const deleteSupporter =
  (userId: number, supporterEmail: string) => async (dispatch: AppDispatch) => {
    try {
      await axios
        .delete(`${BASE_URL}/support_group/${userId}/${supporterEmail}`)
        .then((response) => {
          const data: any = response.data;
          dispatch({
            type: SUPPORTER_DELETE,
            payload: data,
          });
        });
    } catch (err) {
      dispatch({
        type: FAIL_SUPPORTER_DELETE,
      });
    }
  };
