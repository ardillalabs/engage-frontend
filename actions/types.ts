// Common Region
export const SET_THEME_STATE: string = "SET_THEME_STATE";
export const SET_SIDE_NAVIGATION_BAR_STATE: string =
  "SET_SIDE_NAVIGATION_BAR_STATE";
export const SET_SEARCH_BAR_STATE: string = "SET_SEARCH_BAR_STATE";
export const SET_SUBSCRIPTION_PLAN: string = "SET_SUBSCRIPTION_PLAN";
// End of Common Region

//chose your Plan
export const SET_CHOOSE_YOUR_PLAN_LOADING: string =
  "SET_CHOOSE_YOUR_PLAN_LOADING";
export const SET_CHOOSE_YOUR_PLAN_SUCCESS: string =
  "SET_CHOOSE_YOUR_PLAN_SUCCESS";
export const SET_CHOOSE_YOUR_PLAN_FAIL: string = "SET_CHOOSE_YOUR_PLAN_FAIL";

export const SET_CHOOSE_YOUR_PLAN_MODAL_LOADING: string =
  "SET_CHOOSE_YOUR_PLAN_MODAL_LOADING";
export const SET_CHOOSE_YOUR_PLAN_MODAL_SUCCESS: string =
  "SET_CHOOSE_YOUR_PLAN_MODAL_SUCCESS";
export const SET_CHOOSE_YOUR_PLAN_MODAL_FAIL: string =
  "SET_CHOOSE_YOUR_PLAN_MODAL_FAIL";

export const PERMISSION_LIST_LOADING: string = "PERMISSION_LIST_LOADING";
export const PERMISSION_LIST_LOADING_SUCCESS: string =
  "PERMISSION_LIST_LOADING_SUCCESS";
//chose your Plan

// Alert Region
export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";
// End of Alert Region

// CB Merchandise Region
export const SEND_GIFT_CLAIM_DETAILS_SUCCESS: string =
  "SEND_GIFT_CLAIM_DETAILS_SUCCESS";
export const SEND_GIFT_CLAIM_DETAILS_FAIL: string =
  "SEND_GIFT_CLAIM_DETAILS_FAIL";
export const SET_RESPONSE_MESSAGE_TO_NULL: string =
  "SET_RESPONSE_MESSAGE_TO_NULL";
export const GENERATE_VOUCHER_CODE_SUCCESS: string =
  "GENERATE_VOUCHER_CODE_SUCCESS";
export const CHECK_USER_HAVE_COUPON: string = "CHECK_USER_HAVE_COUPON";
export const GENERATE_VOUCHER_CODE_FAIL: string = "GENERATE_VOUCHER_CODE_FAIL";

// End Of CB Merchandise Region

// Auth Region
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const SET_LOGIN_IS_LOADING = "SET_LOGIN_IS_LOADING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const SET_REGISTER_IS_LOADING = "SET_REGISTER_IS_LOADING";
export const GET_CURRENT_USER_DETAILS_SUCCESS =
  "GET_CURRENT_USER_DETAILS_SUCCESS";
export const GET_CURRENT_USER_DETAILS_FAIL = "GET_CURRENT_USER_DETAILS_FAIL";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAIL = "FORGOT_PASSWORD_FAIL";
export const SET_FORGOT_PASSWORD_IS_LOADING = "SET_FORGOT_PASSWORD_IS_LOADING";
export const CLEAR_AUTH_ERROR_MESSAGES = "CLEAR_AUTH_ERROR_MESSAGES";
export const EMAIL_VERIFICATION_SUCCESS = "EMAIL_VERIFICATION_SUCCESS";
export const EMAIL_VERIFICATION_FAIL = "EMAIL_VERIFICATION_FAIL";
export const RESEND_EMAIL_VERIFICATION_SUCCESS =
  "RESEND_EMAIL_VERIFICATION_SUCCESS";
export const RESEND_EMAIL_VERIFICATION_FAIL = "RESEND_EMAIL_VERIFICATION_FAIL";
export const SET_RESEND_EMAIL_VERIFICATION_IS_LOADING =
  "SET_RESEND_EMAIL_VERIFICATION_IS_LOADING";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export const UPDATE_PASSWORD_FAIL = "UPDATE_PASSWORD_FAIL";
export const SET_UPDATE_PASSWORD_IS_LOADING = "SET_UPDATE_PASSWORD_IS_LOADING";
export const CREATE_NEW_PASSSWORD_SUCCESS = "CREATE_NEW_PASSSWORD_SUCCESS";
export const CREATE_NEW_PASSSWORD_FAIL = "CREATE_NEW_PASSSWORD_FAIL";
export const SET_CREATE_NEW_PASSSWORD_IS_LOADING =
  "SET_CREATE_NEW_PASSSWORD_IS_LOADING";
export const SET_ACCESS_TOKEN_NULL = "SET_ACCESS_TOKEN_NULL";
export const DEACTIVATE_ACCOUNT_SUCCESS = "DEACTIVATE_ACCOUNT_SUCCESS";
export const DEACTIVATE_ACCOUNT_FAIL = "DEACTIVATE_ACCOUNT_FAIL";
export const SET_LOADING_DEACTIVATE_ACCOUNT = "SET_LOADING_DEACTIVATE_ACCOUNT";

export const UPDATE_USER_INFO_SUCCESS = "UPDATE_USER_INFO_SUCCESS";
export const UPDATE_USER_INFO_FAIL = "UPDATE_USER_INFO_FAIL";
export const SET_LOADING_UPDATE_USER_INFO = "SET_LOADING_UPDATE_USER_INFO";

export const DELETE_DP_SUCCESS = "DELETE_DP_SUCCESS";
export const DELETE_DP_FAIL = "DELETE_DP_FAIL";
export const SET_LOADING_DELETE_DP = "SET_LOADING_DELETE_DP";

export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_FAIL = "SIGN_OUT_FAIL";
export const SET_LOADING_SIGN_OUT = "SET_LOADING_SIGN_OUT";

// End of Auth Region
// End of chose your Plan

// Video Poll
export const VIDEO_POLL_LOADING: string = "VIDEO_POLL_LOADING";
export const CURRENT_VIDEO_POLL_LOADING_SUCCESS: string =
  "CURRENT_VIDEO_POLL_LOADING_SUCCESS";
export const SEND_VOTE: string = "SEND_VOTE";
export const IS_VOTED: string = "IS_VOTED";
export const VIDEO_POLL_SUCCESS: string = "VIDEO_POLL_SUCCESS";
export const VIDEO_POLL_FAIL: string = "VIDEO_POLL_FAIL";
export const VIDEO_POLL_VOTE_COUNT: string = "VIDEO_POLL_VOTE_COUNT";

// End of Video Poll

// COIN_REVIEW Poll
export const COIN_REVIEW_POLL_LOADING: string = "COIN_REVIEW_POLL_LOADING";
export const CURRENT_COIN_REVIEW_POLL_LOADING_SUCCESS: string =
  "CURRENT_COIN_REVIEW_POLL_LOADING_SUCCESS";
export const SEND_COIN_REVIEW_VOTE: string = "SEND_COIN_REVIEW_VOTE";
export const IS_COIN_REVIEW_VOTED: string = "IS_COIN_REVIEW_VOTED";
export const COIN_REVIEW_POLL_SUCCESS: string = "COIN_REVIEW_POLL_SUCCESS";
export const COIN_REVIEW_POLL_FAIL: string = "COIN_REVIEW_POLL_FAIL";
export const COIN_REVIEW_POLL_VOTE_COUNT: string =
  "COIN_REVIEW_POLL_VOTE_COUNT";
// End of COIN_REVIEW Poll
//payments
export const CREATE_PAYMENT_LOADING: string = "CREATE_PAYMENT_LOADING";
export const CREATE_PAYMENT_SUCCESS: string = "CREATE_PAYMENT_SUCCESS";
export const CREATE_PAYMENT_FAIL: string = "CREATE_PAYMENT_FAIL";

//payment method saved
export const SAVE_PAYMENT_METHOD: string = "SAVE_PAYMENT_METHOD";

//get saved payment methods
export const GET_STRIPE_PAYMENT_METHODS_LOADINNG: string =
  "GET_STRIPE_PAYMENT_METHODS_LOADINNG";
export const GET_STRIPE_PAYMENT_METHODS_SUCCESS: string =
  "GET_STRIPE_PAYMENT_METHODS_SUCCESS";
export const GET_STRIPE_PAYMENT_METHODS_FAIL: string =
  "GET_STRIPE_PAYMENT_METHODS_FAIL";

//subscription-memberships
export const GET_SUBSCRIPTIONS_LOADINNG: string = "GET_SUBSCRIPTIONS_LOADINNG";
export const GET_SUBSCRIPTIONS_SUCCESS: string = "GET_SUBSCRIPTIONS_SUCCESS";
export const GET_SUBSCRIPTIONS_FAIL: string = "GET_SUBSCRIPTIONS_FAIL";

export const SELECTED_SUBSCRIPTION: string = "SELECTED_SUBSCRIPTION";

//cancel-subscription-memberships
export const CANCEL_SUBSCRIPTIONS_LOADINNG: string =
  "CANCEL_SUBSCRIPTIONS_LOADINNG";
export const CANCEL_SUBSCRIPTIONS_SUCCESS: string =
  "CANCEL_SUBSCRIPTIONS_SUCCESS";
export const CANCEL_SUBSCRIPTIONS_FAIL: string = "CANCEL_SUBSCRIPTIONS_FAIL";

//coin-payment
export const COIN_PAYMENT_LOADING: string = "COIN_PAYMENT_LOADING";
export const COIN_PAYMENT_SUCCESS: string = "COIN_PAYMENT_SUCCESS";
export const COIN_PAYMENT_FAIL: string = "COIN_PAYMENT_FAIL";

// paypal
export const SET_SELECTED_PAYMENT_METHOD: string =
  "SET_SELECTED_PAYMENT_METHOD";

export const PAYPAL_PAYMENT_SUCCESS = "PAYPAL_PAYMENT_SUCCESS";
export const PAYPAL_PAYMENT_FAIL = "PAYPAL_PAYMENT_FAIL";
export const SET_PAYPAL_PAYMENT_IS_LOADING = "SET_PAYPAL_PAYMENT_IS_LOADING";
export const PAYPAL_ON_APPROVE_SUCCESS = "PAYPAL_ON_APPROVE_SUCCESS";
export const PAYPAL_ON_APPROVE_FAIL = "PAYPAL_ON_APPROVE_FAIL";
export const SET_PAYPAL_ON_APPROVE_IS_LOADING =
  "SET_PAYPAL_ON_APPROVE_IS_LOADING";
export const PAYPAL_CREATE_SUCCESS = "PAYPAL_CREATE_SUCCESS";
export const PAYPAL_CREATE_FAIL = "PAYPAL_CREATE_FAIL";
export const SET_PAYPAL_CREATE_IS_LOADING = "SET_PAYPAL_CREATE_IS_LOADING";

export const SET_IS_SUCCESS_MODEL_OPEN = "SET_IS_SUCCESS_MODEL_OPEN";
export const SET_IS_SUCCESS_MODEL_CLOSE = "SET_IS_SUCCESS_MODEL_CLOSE";
export const SET_IS_FAILURE_MODEL_OPEN = "SET_IS_FAILURE_MODEL_OPEN";
export const SET_IS_FAILURE_MODEL_CLOSE = "SET_IS_FAILURE_MODEL_CLOSE";

// Tost
export const SET_TOAST_STATE: string = "SET_TOAST_STATE";
// End of toast