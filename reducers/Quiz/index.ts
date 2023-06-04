import { AnyAction } from "redux";
import {
  QUESTION_LIST_LOADING,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  SEND_QUIZ_MARKS_FAIL,
  SEND_QUIZ_MARKS_SUCCESS
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
    default:
      return state;
  }
}
