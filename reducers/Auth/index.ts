import { AnyAction } from 'redux';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_CURRENT_USER_DETAILS_SUCCESS,
  GET_CURRENT_USER_DETAILS_FAIL,
  SET_REGISTER_IS_LOADING,
  SET_LOGIN_IS_LOADING,
  CLEAR_AUTH_ERROR_MESSAGES,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  SET_FORGOT_PASSWORD_IS_LOADING,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_FAIL,
  RESEND_EMAIL_VERIFICATION_SUCCESS,
  RESEND_EMAIL_VERIFICATION_FAIL,
  SET_RESEND_EMAIL_VERIFICATION_IS_LOADING,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  SET_UPDATE_PASSWORD_IS_LOADING,
  CREATE_NEW_PASSSWORD_SUCCESS,
  CREATE_NEW_PASSSWORD_FAIL,
  SET_CREATE_NEW_PASSSWORD_IS_LOADING,
  SET_ACCESS_TOKEN_NULL,
  DEACTIVATE_ACCOUNT_SUCCESS,
  DEACTIVATE_ACCOUNT_FAIL,
  SET_LOADING_DEACTIVATE_ACCOUNT,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAIL,
  SET_LOADING_UPDATE_USER_INFO,
  DELETE_DP_SUCCESS,
  DELETE_DP_FAIL,
  SET_LOADING_DELETE_DP,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAIL,
  SET_LOADING_SIGN_OUT,
  GET_USER_PROFILE_DETAILS_SUCCESS,
  GET_CURRENT_USER_PROFILE_DETAILS_FAIL,
  CLEAR_IS_UPDATED_USER_INFO,
  CLEAR_LOGGED_IN_USER
} from '../../actions/types';

const initialState: any = {
  isLoadingSignUp: null,
  isSignedUp: null,
  signedUpMessage: null,
  isLoadingLogin: null,
  isLoggedIn: null,
  loggedInMessage: null,
  isClickedToAuthBtn: false,
  accessToken: null,
  resCode: null,
  statusText: null,
  isSentVerificationEmail: null,
  //-----------------------------
  apartment: null,
  city: null,
  country: null,
  email: null,
  first_name: null,
  id: null,
  image_url: null,
  is_subscribed_telegram: null,
  last_name: null,
  membership: null,
  phone_number: null,
  postal_code: null,
  register_type: null,
  role: null,
  status: null,
  street: null,
  username: null,
  is_verified: null,
  paypal_subscription_email: null,
  stripe_default_payment_method: null,
  //---------------------------
  isLoadingForgotPassword: null,
  isSentForgotPasswordEmail: null,
  forgotPasswordMessage: null,
  //-------------------------
  isVerificationLoading: true,
  isVerified: null,
  verificationMessage: null,
  //------------------------
  isLoadingResendVerification: null,
  isSentResendVerificationEmail: null,
  resendVerificationMessage: null,
  //-----------------------
  isLoadingUpdatePassword: null,
  isUpdatedPassword: null,
  updatePasswordMessage: null,
  is_getuser_loading: true,
  //-------------------
  isLoadingCreateNewPassword: null,
  isCreatedNewPassword: null,
  createNewPasswordMessage: null,
  //---------------------
  isLoadingDeactivateAccount: null,
  isDeactivatedAccount: null,
  deactivatedAccountMessage: null,
  //------------------------
  isLoadingUpdateUserInfo: null,
  isUpdatedUserInfo: null,
  updateUserInfoMessage: null,

  //-------------------------
  isLoadingDeleteDp: null,
  isDeletedDp: null,
  deleteDpMessage: null,

  //----------------
  isLoadingSignOut: null,
  isSignedOut: null,
  signOutMessage: null,
};

export default function (state = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoadingSignUp: false,
        isSignedUp: true,
        signedUpMessage: payload.message,
        accessToken: payload.access_token,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        isLoadingSignUp: false,
        isSignedUp: false,
        signedUpMessage: payload.message,
        accessToken: null,
        resCode: payload.status,
        statusText: payload.statusText,
        loggedInMessage: payload.message,
        isSentVerificationEmail: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoadingLogin: false,
        isLoggedIn: true,
        loggedInMessage: payload.message,
        accessToken: payload.access_token,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isLoadingLogin: false,
        isLoggedIn: false,
        loggedInMessage: payload.message,
        accessToken: null,
        resCode: payload.status,
        statusText: payload.statusText,
      };

    case GET_CURRENT_USER_DETAILS_SUCCESS:
      console.log('GET_CURRENT_USER_DETAILS_SUCCESS', payload.data);
      return {
        ...state,
        isLoadingSignUp: false,
        isSignedUp: true,
        isLoadingLogin: false,
        isLoggedIn: true,
        isLogedIn: true,
        //-----------------
        email: payload.data.email,
        first_name: payload.data.full_name,
        id: payload.data.id,
        image_url: payload.data.image_url,
        phone_number: payload.data.phone_number,
        role: payload.data.role,
        status: payload.data.status,
        username: payload.data.username,
      };

    case GET_CURRENT_USER_DETAILS_FAIL:
      return {
        ...state,
        isLoadingSignUp: true,
        isSignedUp: null,
        isLoadingLogin: true,
        isLoggedIn: null,
        //-----------------
        apartment: null,
        city: null,
        country: null,
        email: null,
        first_name: null,
        id: null,
        image_url: null,
        is_subscribed_telegram: null,
        last_name: null,
        membership: null,
        phone_number: null,
        postal_code: null,
        register_type: null,
        role: null,
        status: null,
        street: null,
        username: null,
        is_verified: payload.is_verified,
        paypal_subscription_email: null,
        stripe_default_payment_method: null,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoadingForgotPassword: false,
        isSentForgotPasswordEmail: true,
        forgotPasswordMessage: payload.data.message,
      };

    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        isLoadingForgotPassword: false,
        isSentForgotPasswordEmail: false,
        forgotPasswordMessage: payload.data.message,
        resCode: payload.status,
        statusText: payload.statusText,
      };

    case EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        isVerificationLoading: false,
        isVerified: true,
        verificationMessage: payload.data.message,
      };

    case EMAIL_VERIFICATION_FAIL:
      return {
        ...state,
        isVerificationLoading: false,
        isVerified: false,
        verificationMessage: payload.response.data.message,
        resCode: payload.response.status,
        statusText: payload.response.statusText,
      };

    case RESEND_EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        isLoadingResendVerification: false,
        isSentResendVerificationEmail: true,
        resendVerificationMessage: payload.data.message,
        accessToken: payload.data.access_token,
      };

    case RESEND_EMAIL_VERIFICATION_FAIL:
      return {
        ...state,
        isLoadingResendVerification: false,
        isSentResendVerificationEmail: false,
        resendVerificationMessage: payload.response.data.message,
        resCode: payload.response.status,
        statusText: payload.response.statusText,
        accessToken: null,
      };

    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoadingUpdatePassword: false,
        isUpdatedPassword: true,
        updatePasswordMessage: payload.message,
        accessToken: payload.access_token,
      };

    case CLEAR_IS_UPDATED_USER_INFO:
      return {
        ...state,
        isUpdatedPassword: false,
        isUpdatedUserInfo: false,
      };

    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        isLoadingUpdatePassword: false,
        isUpdatedPassword: false,
        updatePasswordMessage: payload.message,
        accessToken: null,
      };

    case CREATE_NEW_PASSSWORD_SUCCESS:
      return {
        ...state,
        isLoadingCreateNewPassword: false,
        isCreatedNewPassword: true,
        createNewPasswordMessage: payload.data.message,
        accessToken: payload.data.access_token,
      };

    case CREATE_NEW_PASSSWORD_FAIL:
      return {
        ...state,
        isLoadingCreateNewPassword: false,
        isCreatedNewPassword: false,
        createNewPasswordMessage: payload.response.data.message,
        resCode: payload.response.status,
        statusText: payload.response.statusText,
        accessToken: null,
      };

    case DEACTIVATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoadingDeactivateAccount: false,
        isDeactivatedAccount: true,
        deactivatedAccountMessage: payload.data.message,
      };
    case DEACTIVATE_ACCOUNT_FAIL:
      return {
        ...state,
        isLoadingDeactivateAccount: false,
        isDeactivatedAccount: false,
        deactivatedAccountMessage: payload.response.data.message,
      };

    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoadingUpdateUserInfo: false,
        isUpdatedUserInfo: true,
        updateUserInfoMessage: payload.message,
        accessToken: payload.access_token,
      };

    case UPDATE_USER_INFO_FAIL:
      return {
        ...state,
        isLoadingUpdateUserInfo: false,
        isUpdatedUserInfo: false,
        updateUserInfoMessage: payload.message,
      };

    case DELETE_DP_SUCCESS:
      return {
        ...state,
        isLoadingDeleteDp: false,
        isDeletedDp: true,
        deleteDpMessage: payload.data.message,
        accessToken: payload.data.access_token,
      };

    case DELETE_DP_FAIL:
      return {
        ...state,
        isLoadingDeleteDp: false,
        isDeletedDp: false,
        deleteDpMessage: payload.response.data.message,
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isLoadingSignOut: false,
        isSignedOut: true,
        signOutMessage: payload.data.message,
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isLoadingSignOut: false,
        isSignedOut: false,
        signOutMessage: payload.response.data.message,
      };

    case SET_LOADING_SIGN_OUT:
      return {
        ...state,
        isLoadingSignOut: true,
      };

    case SET_LOADING_DELETE_DP:
      return {
        ...state,
        isLoadingDeleteDp: true,
      };

    case SET_LOADING_UPDATE_USER_INFO:
      return {
        ...state,
        isLoadingUpdateUserInfo: true,
      };

    case SET_LOADING_DEACTIVATE_ACCOUNT:
      return {
        ...state,
        isLoadingDeactivateAccount: true,
      };

    case SET_CREATE_NEW_PASSSWORD_IS_LOADING:
      return {
        ...state,
        isLoadingCreateNewPassword: true,
      };

    case SET_UPDATE_PASSWORD_IS_LOADING:
      return {
        ...state,
        isLoadingUpdatePassword: true,
      };

    case SET_RESEND_EMAIL_VERIFICATION_IS_LOADING:
      return {
        ...state,
        isLoadingResendVerification: true,
      };

    case SET_REGISTER_IS_LOADING:
      return {
        ...state,
        isLoadingSignUp: true,
      };

    case SET_LOGIN_IS_LOADING:
      return {
        ...state,
        isLoadingLogin: true,
      };

    case SET_FORGOT_PASSWORD_IS_LOADING:
      return {
        ...state,
        isLoadingForgotPassword: true,
      };

    case SET_ACCESS_TOKEN_NULL:
      return {
        ...state,
        accessToken: null,
      };

    case CLEAR_AUTH_ERROR_MESSAGES:
      return {
        ...state,
        signedUpMessage: null,
        loggedInMessage: null,
        forgotPasswordMessage: null,
        verificationMessage: null,
        resendVerificationMessage: null,
        updatePasswordMessage: null,
        createNewPasswordMessage: null,
        deactivatedAccountMessage: null,
        updateUserInfoMessage: null,
        deleteDpMessage: null,
        resCode: null,
        statusText: null,
        isLogedIn: false,
        accessToken: null,
      };

    // case GET_CURRENT_USER_DETAILS_SUCCESS:
    //   return {
    //     ...state,
    //     isLoadingSignUp: false,
    //     // isSignedUp: true,
    //     isLoadingLogin: false,
    //     isLoggedIn: true,
    //     //-----------------
    //     apartment: payload.data.apartment,
    //     city: payload.data.city,
    //     country: payload.data.country,
    //     email: payload.data.email,
    //     first_name: payload.data.first_name,
    //     id: payload.data.id,
    //     image_url: payload.data.image_url,
    //     is_subscribed_telegram: payload.data.is_subscribed_telegram,
    //     lastname: payload.data.lastname,
    //     membership: payload.data.membership,
    //     phone_number: payload.data.phone_number,
    //     postal_code: payload.data.postal_code,
    //     register_type: payload.data.register_type,
    //     role: payload.data.role,
    //     status: payload.data.status,
    //     street: payload.data.street,
    //     username: payload.data.username,
    //     is_verified: payload.data.is_verified,
    //   };

    case GET_CURRENT_USER_DETAILS_FAIL:
      return {
        ...state,
        isLoadingSignUp: true,
        isSignedUp: null,
        isLoadingLogin: true,
        isLoggedIn: null,
        //-----------------
        apartment: null,
        city: null,
        country: null,
        email: null,
        first_name: null,
        id: null,
        image_url: null,
        is_subscribed_telegram: null,
        lastname: null,
        membership: null,
        phone_number: null,
        postal_code: null,
        register_type: null,
        role: null,
        status: null,
        street: null,
        username: null,
        is_verified: payload.is_verified,
      };

    case EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        isVerificationLoading: false,
        isVerified: true,
        verificationMessage: payload.data.message,
      };

    case EMAIL_VERIFICATION_FAIL:
      return {
        ...state,
        isVerificationLoading: false,
        isVerified: false,
        verificationMessage: payload.response.data.message,
        resCode: payload.response.status,
        statusText: payload.response.statusText,
      };

    case RESEND_EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        isLoadingResendVerification: false,
        isSentResendVerificationEmail: true,
        resendVerificationMessage: payload.data.message,
        accessToken: payload.data.access_token,
      };

    case RESEND_EMAIL_VERIFICATION_FAIL:
      return {
        ...state,
        isLoadingResendVerification: false,
        isSentResendVerificationEmail: false,
        resendVerificationMessage: payload.response.data.message,
        resCode: payload.response.status,
        statusText: payload.response.statusText,
        accessToken: null,
      };

    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoadingUpdatePassword: false,
        isUpdatedPassword: true,
        updatePasswordMessage: payload.data.message,
        accessToken: payload.data.access_token,
      };

    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        isLoadingUpdatePassword: false,
        isUpdatedPassword: false,
        updatePasswordMessage: payload.response.data.message,
        resCode: payload.response.status,
        statusText: payload.response.statusText,
        accessToken: null,
      };

    case SET_UPDATE_PASSWORD_IS_LOADING:
      return {
        ...state,
        isLoadingUpdatePassword: true,
      };

    case SET_RESEND_EMAIL_VERIFICATION_IS_LOADING:
      return {
        ...state,
        isLoadingResendVerification: true,
      };

    case SET_REGISTER_IS_LOADING:
      return {
        ...state,
        isLoadingSignUp: true,
      };

    case SET_LOGIN_IS_LOADING:
      return {
        ...state,
        isLoadingLogin: true,
      };

    case SET_FORGOT_PASSWORD_IS_LOADING:
      return {
        ...state,
        isLoadingForgotPassword: true,
      };

    case CLEAR_AUTH_ERROR_MESSAGES:
      return {
        ...state,
        signedUpMessage: null,
        loggedInMessage: null,
        forgotPasswordMessage: null,
        verificationMessage: null,
        resendVerificationMessage: null,
        updatePasswordMessage: null,
        resCode: null,
        statusText: null,
      };

    case GET_USER_PROFILE_DETAILS_SUCCESS:
      return {
        ...state,
        email: payload.data.email,
        full_name: payload.data.full_name,
        phone_number: payload.data.phone_number,
        username: payload.data.username,
      };

    case GET_CURRENT_USER_PROFILE_DETAILS_FAIL:
      return {
        ...state,
        email: null,
        full_name: null,
        phone_number: null,
        username: null,
      };
    
    case CLEAR_LOGGED_IN_USER: 
      return {
        ...state,
        isLoadingSignUp: null,
        isSignedUp: null,
        signedUpMessage: null,
        isLoadingLogin: null,
        isLoggedIn: null,
        loggedInMessage: null,
        //-----------------
        email: null,
        first_name: null,
        full_name: null,
        id: null,
        image_url: null,
        phone_number: null,
        role: null,
        status: null,
        username: null,
        accessToken: null,
      };
    default:
      return state;
  }
}
