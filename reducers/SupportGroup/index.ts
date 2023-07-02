import { AnyAction } from "redux";
import {
  CREATE_SUPPORT_GROUP,
  FAIL_CREATE_SUPPORT_GROUP,
  SUPPORT_GROUP_LOADING,
  GET_SUPPORT_GROUP,
  FAIL_GET_SUPPORT_GROUP,
  SUPPORTER_DELETE,
  FAIL_SUPPORTER_DELETE,
} from "../../actions/types";

const initialState: any = {
  loading: false,
  supportGroup: [],
  failCreateSupporter: null,
};

export default function (state = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case FAIL_CREATE_SUPPORT_GROUP:
      return {
        ...state,
        loading: false,
        failCreateSupporter: payload,
      };
    case GET_SUPPORT_GROUP:
      return {
        ...state,
        loading: false,
        supportGroup: payload,
      };

    default:
      return state;
  }
}
