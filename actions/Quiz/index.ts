import { Quiz } from "@/tsc-types/Quiz";
import { AppDispatch } from "../../store";
import {
  QUESTION_LIST_LOADING,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  SET_TOAST_STATE,
  SEND_QUIZ_MARKS_SUCCESS,
  SEND_QUIZ_MARKS_FAIL,
} from "../types";

import axios from "axios";
// const BASE_URL = "https://engage-backend-production.up.railway.app/api/";
const BASE_URL = "http://ec2-54-160-247-159.compute-1.amazonaws.com:5000/api/";
export const getQuestionList =
  (quizId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: QUESTION_LIST_LOADING,
      });
      await axios.get(`${BASE_URL}question/${quizId}`).then((response) => {
        const data: Quiz[] = response.data;
        const permissions: any = data.map((item: any) => item);
        dispatch({
          type: QUESTION_LIST_SUCCESS,
          payload: data,
        });
      });
    } catch (err) {
      dispatch({
        type: QUESTION_LIST_FAIL,
      });
    }
  };

export const quizMarksSubmit =
  (quizId: number, userId: number, marks: number) =>
  async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    };
    const body = JSON.stringify({
      quizId: quizId,
      userId: userId,
      marks: marks,
    });

    console.log(body);
    
    try {
      const response = await axios.post(`${BASE_URL}quiz_mark`, body, config);
      dispatch({
        type: SEND_QUIZ_MARKS_SUCCESS,
        payload: {
          success_response: response.data,
          success_message: "successfully submitted !!!",
        },
      });

      dispatch({
        type: SET_TOAST_STATE,
        payload: {
          visibility: true,
          type: "success",
          title: "successfully submitted !!!",
          description: "",
        },
      });
      //   dispatch(setAlert("User logged in successfully.", "success"));
    } catch (err: any) {
      dispatch({
        type: SEND_QUIZ_MARKS_FAIL,
        payload:
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message &&
          err.response.data.message[1],
      });

      dispatch({
        type: SET_TOAST_STATE,
        payload: {
          visibility: true,
          type: "error",
          title: "unsuccessfully submitted !!!",
          description: "",
        },
      });
      //   dispatch(setAlert(err.response.data.error, "error"));
    }
  };
