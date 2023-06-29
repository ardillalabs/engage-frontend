import { combineReducers } from "redux";
import auth from "./Auth";
import toast from "./Toast";
import quiz from "./Quiz"

export default combineReducers({
  auth,
  toast,
  quiz
});
