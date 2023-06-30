import { combineReducers } from "redux";
import auth from "./Auth";
import toast from "./Toast";

export default combineReducers({
  auth,
  toast,
});
