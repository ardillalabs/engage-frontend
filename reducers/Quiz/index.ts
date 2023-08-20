import { AnyAction } from "redux";
import {
  QUESTION_LIST_LOADING,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  SEND_QUIZ_MARKS_FAIL,
  SEND_QUIZ_MARKS_SUCCESS,
  QUIZ_ELIGIBILITY_LOADING,
  DAILY_QUIZ_ELIGIBILITY_CHECK_SUCCESS,
  WEEKLY_QUIZ_ELIGIBILITY_CHECK_SUCCESS
} from "../../actions/types";
import { Quiz } from "@/tsc-types/Quiz";

const initialState: Quiz = {
  loading: false,
  questionList: [],
};

export default function (state = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case QUESTION_LIST_LOADING:
      return {
        ...state,
        isLoadingWeeklyQuiz: false,
      };

    case QUESTION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        questionList: payload,
      };
    case QUESTION_LIST_FAIL:
      return {
        ...state,
        loading: false,
      };
    case SEND_QUIZ_MARKS_SUCCESS:
      return {
        ...state
      };
    case SEND_QUIZ_MARKS_FAIL:
      return {
        ...state
      };
    case QUIZ_ELIGIBILITY_LOADING:
      return {
        ...state,
        eligibilityLoading: true
      }
    case DAILY_QUIZ_ELIGIBILITY_CHECK_SUCCESS:
      return {
        ...state,
        dailyQuiz: payload
      }
    case WEEKLY_QUIZ_ELIGIBILITY_CHECK_SUCCESS:
      return {
        ...state,
        weeklyQuiz: payload
      }
    default: 
      return state;
  }
}
