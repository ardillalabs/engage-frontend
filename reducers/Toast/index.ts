import { AnyAction } from "redux";
import { SET_TOAST_STATE } from "../../actions/types";

const initialState = {
  showToast: false,
  type: null,
  title: null,
  description: null,
};

export default function (state = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case SET_TOAST_STATE:
      return {
        ...state,
        showToast: payload.visibility,
        type: payload.type,
        title: payload.title,
        description: payload.description,
      };

    default:
      return state;
  }
}
