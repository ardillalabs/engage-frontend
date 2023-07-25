import { combineReducers } from "redux";
import auth from "./Auth";
import toast from "./Toast";
import quiz from "./Quiz";
import supportGroup from "./SupportGroup";
import Payment from "./Payment";

export default combineReducers({
  auth,
  toast,
  quiz,
  supportGroup,
  Payment
});
