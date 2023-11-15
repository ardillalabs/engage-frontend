import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const intialState = {};
const middleWare = [thunk];
const store: any = createStore(
  rootReducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;

// Type of state
export type RootState = ReturnType<typeof store.getState>;
// Type of dispatch
export type AppDispatch = typeof store.dispatch;
