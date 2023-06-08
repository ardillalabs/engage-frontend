import { AppDispatch } from "../../store";
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_REGISTER_IS_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_LOGIN_IS_LOADING,
  GET_CURRENT_USER_DETAILS_SUCCESS,
  GET_CURRENT_USER_DETAILS_FAIL,
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
  SET_TOAST_STATE,
} from "../types";
import {
  CreateNewPasswordDetails,
  UpdatePasswordDetails,
  UserInforUpdateDetails,
  UserSignInDetails,
  UserSignUpDetails,
} from "../../tsc-types/Auth";

// Import environment variables
const AUTH_BASE_URL = process.env.AUTH_BASE_URL;

// @desc        Sign up user
// @api         auth/signup
// @access      public
export const signUpSubmit =
  (registerFormData: UserSignUpDetails) => async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_REGISTER_IS_LOADING,
    });
    dispatch({
      type: CLEAR_AUTH_ERROR_MESSAGES,
    });

    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Stringyfy Json Body
    const body = JSON.stringify({
      full_name: registerFormData.full_name,
      username: registerFormData.user_name,
      phone_number: registerFormData.phone_number,
      email: registerFormData.email,
      password: registerFormData.password,
    });

    try {
      const response = await axios.post(
        `${AUTH_BASE_URL}/signup`,
        body,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response,
      });
      // dispatch({
      //   type: SET_TOAST_STATE,
      //   payload: {
      //     visibility: true,
      //     type: "success",
      //     title: "Success!",
      //     description: `${response.data.message}`,
      //   },
      // });
    } catch (err: any) {
      if (err.message === "Network Error") {
        dispatch({
          type: REGISTER_FAIL,
          payload: {
            response: {
              data: {
                message: "Network Error",
                status: err.code,
                statusText: err.code,
              },
            },
          },
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `Network Error`,
          },
        });
      } else {
        dispatch({
          type: REGISTER_FAIL,
          payload: err,
        });

        if (
          err.response.data.message !==
          "This email address is already in use. Please use a different email or sign in with your existing account."
        ) {
          dispatch({
            type: SET_TOAST_STATE,
            payload: {
              visibility: true,
              type: "error",
              title: "Error!",
              description: `${err.response.data.message}`,
            },
          });
        }
      }
    }
  };

// @desc        Get current user details
// @api         auth/get-user
// @access      public
export const getCurrentUserDetails =
  (access_token: string) => async (dispatch: AppDispatch) => {
    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      withCredentials: true,
    };

    try {
      const response = await axios.get(`${AUTH_BASE_URL}get-user`, config);
      dispatch({
        type: GET_CURRENT_USER_DETAILS_SUCCESS,
        payload: response,
      });
    } catch (err: any) {
      dispatch({
        type: GET_CURRENT_USER_DETAILS_FAIL,
        payload: err,
      });
    }
  };

// @desc        Sign in user
// @api         auth/signin
// @access      public
export const signInSubmit =
  (signInFormData: UserSignInDetails) => async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_LOGIN_IS_LOADING,
    });
    dispatch({
      type: CLEAR_AUTH_ERROR_MESSAGES,
    });

    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Stringyfy Json Body
    const body = JSON.stringify({
      email: signInFormData.email,
      password: signInFormData.password,
    });

    try {
      const response = await axios.post(
        `${AUTH_BASE_URL}/signin`,
        body,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });

      // dispatch({
      //   type: SET_TOAST_STATE,
      //   payload: {
      //     visibility: true,
      //     type: "success",
      //     title: "Success!",
      //     description: `${response.data.message}`,
      //   },
      // });
    } catch (err: any) {
      if (err.message === "Network Error") {
        dispatch({
          type: LOGIN_FAIL,
          payload: {
            response: {
              data: {
                message: "Network Error",
                status: err.code,
                statusText: err.code,
              },
            },
          },
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `Network Error`,
          },
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: err,
        });

        if (
          err.response.data.message !==
          "The email you entered does not belong to any registered user."
        ) {
          if (
            err.response.data.message !==
            "Incorrect password. Please try again with the correct password."
          ) {
            dispatch({
              type: SET_TOAST_STATE,
              payload: {
                visibility: true,
                type: "error",
                title: "Error!",
                description: `${err.response.data.message}`,
              },
            });
          }
        }
      }
    }
  };

// @desc        Forgot password
// @api         auth/forgot-password
// @access      public
export const forgotPassword =
  (email: string) => async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_FORGOT_PASSWORD_IS_LOADING,
    });
    dispatch({
      type: CLEAR_AUTH_ERROR_MESSAGES,
    });

    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    // Stringyfy Json Body
    const body = JSON.stringify({
      email: email,
    });

    try {
      const response = await axios.post(
        `${AUTH_BASE_URL}forgot-password`,
        body,
        config
      );

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: response,
      });

      dispatch({
        type: SET_TOAST_STATE,
        payload: {
          visibility: true,
          type: "success",
          title: "Success!",
          description: `${response.data.message}`,
        },
      });
    } catch (err: any) {
      if (err.message === "Network Error") {
        dispatch({
          type: FORGOT_PASSWORD_FAIL,
          payload: {
            response: {
              data: {
                message: "Network Error",
                status: err.code,
                statusText: err.code,
              },
            },
          },
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `Network Error`,
          },
        });
      } else {
        dispatch({
          type: FORGOT_PASSWORD_FAIL,
          payload: err,
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `${err.response.data.message}`,
          },
        });
      }
    }
  };

// @desc        Clear auth  messages
// @api
// @access      public
export const clearAuthMessages = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({
      type: CLEAR_AUTH_ERROR_MESSAGES,
    });
  } catch (err: any) {}
};

// @desc        Email verification
// @api         auth/verificaiton
// @access      public
export const emailVerification =
  (verification_code: string, access_token: string) =>
  async (dispatch: AppDispatch) => {
    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    try {
      const response = await axios.get(
        `${AUTH_BASE_URL}verification?verification_code=${verification_code}&access_token=${access_token}`,
        config
      );

      dispatch({
        type: EMAIL_VERIFICATION_SUCCESS,
        payload: response,
      });

      dispatch({
        type: SET_TOAST_STATE,
        payload: {
          visibility: true,
          type: "success",
          title: "Success!",
          description: `${response.data.message}`,
        },
      });
    } catch (err: any) {
      if (err.message === "Network Error") {
        dispatch({
          type: EMAIL_VERIFICATION_FAIL,
          payload: {
            response: {
              data: {
                message: "Network Error",
                status: err.code,
                statusText: err.code,
              },
            },
          },
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `Network Error`,
          },
        });
      } else {
        dispatch({
          type: EMAIL_VERIFICATION_FAIL,
          payload: err,
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `${err.response.data.message}`,
          },
        });
      }
    }
  };

// @desc        Email verification
// @api         auth/verificaiton
// @access      public
export const resendEmailVerification =
  (access_token: string) => async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_RESEND_EMAIL_VERIFICATION_IS_LOADING,
    });
    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      withCredentials: true,
    };

    try {
      const response = await axios.get(
        `${AUTH_BASE_URL}resend-verification`,
        config
      );

      dispatch({
        type: RESEND_EMAIL_VERIFICATION_SUCCESS,
        payload: response,
      });

      dispatch({
        type: SET_TOAST_STATE,
        payload: {
          visibility: true,
          type: "success",
          title: "Success!",
          description: `${response.data.message}`,
        },
      });
    } catch (err: any) {
      if (err.message === "Network Error") {
        dispatch({
          type: RESEND_EMAIL_VERIFICATION_FAIL,
          payload: {
            response: {
              data: {
                message: "Network Error",
                status: err.code,
                statusText: err.code,
              },
            },
          },
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `Network Error`,
          },
        });
      } else {
        dispatch({
          type: RESEND_EMAIL_VERIFICATION_FAIL,
          payload: err,
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `${err.response.data.message}`,
          },
        });
      }
    }
  };

// @desc        Update password
// @api         auth/update-password
// @access      public
export const updatePassword =
  (updatePasswordDetails: UpdatePasswordDetails, access_token: string) =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_UPDATE_PASSWORD_IS_LOADING,
    });
    dispatch({
      type: CLEAR_AUTH_ERROR_MESSAGES,
    });

    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      withCredentials: true,
    };

    // Stringyfy Json Body
    const body = JSON.stringify({
      currentPassword: updatePasswordDetails.currentPassword,
      newPassword: updatePasswordDetails.newPassword,
    });

    try {
      const response = await axios.put(
        `${AUTH_BASE_URL}update-password`,
        body,
        config
      );

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: response,
      });

      dispatch({
        type: SET_TOAST_STATE,
        payload: {
          visibility: true,
          type: "success",
          title: "Success!",
          description: `${response.data.message}`,
        },
      });
    } catch (err: any) {
      if (err.message === "Network Error") {
        dispatch({
          type: UPDATE_PASSWORD_FAIL,
          payload: {
            response: {
              data: {
                message: "Network Error",
                status: err.code,
                statusText: err.code,
              },
            },
          },
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `Network Error`,
          },
        });
      } else {
        dispatch({
          type: UPDATE_PASSWORD_FAIL,
          payload: err,
        });

        if (
          err.response.data.message !==
          "Incorrect password. Please try again with the correct password."
        ) {
          dispatch({
            type: SET_TOAST_STATE,
            payload: {
              visibility: true,
              type: "error",
              title: "Error!",
              description: `${err.response.data.message}`,
            },
          });
        }
      }
    }
  };

// @desc        Create new password
// @api         auth/create-new-password
// @access      public
export const createNewPassword =
  (createNewPasswordDetails: CreateNewPasswordDetails, access_token: string) =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_CREATE_NEW_PASSSWORD_IS_LOADING,
    });
    dispatch({
      type: CLEAR_AUTH_ERROR_MESSAGES,
    });

    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      withCredentials: true,
    };

    // Stringyfy Json Body
    const body = JSON.stringify({
      newPassword: createNewPasswordDetails.newPassword,
      confirmPassword: createNewPasswordDetails.confirmPassword,
    });

    try {
      const response = await axios.put(
        `${AUTH_BASE_URL}create-new-password`,
        body,
        config
      );

      dispatch({
        type: CREATE_NEW_PASSSWORD_SUCCESS,
        payload: response,
      });

      dispatch({
        type: SET_TOAST_STATE,
        payload: {
          visibility: true,
          type: "success",
          title: "Success!",
          description: `${response.data.message}`,
        },
      });
    } catch (err: any) {
      if (err.message === "Network Error") {
        dispatch({
          type: CREATE_NEW_PASSSWORD_FAIL,
          payload: {
            response: {
              data: {
                message: "Network Error",
                status: err.code,
                statusText: err.code,
              },
            },
          },
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `Network Error`,
          },
        });
      } else {
        dispatch({
          type: CREATE_NEW_PASSSWORD_FAIL,
          payload: err,
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `${err.response.data.message}`,
          },
        });
      }
    }
  };

// @desc        Clear access token
// @api
// @access      public
export const clearAccessToken = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({
      type: SET_ACCESS_TOKEN_NULL,
    });
  } catch (err: any) {
    console.log(err, "err");
  }
};

// @desc        Deactivate account
// @api         auth/deactivate-user
// @access      public
export const deactivateAccount =
  (access_token: string) => async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_LOADING_DEACTIVATE_ACCOUNT,
    });
    dispatch({
      type: CLEAR_AUTH_ERROR_MESSAGES,
    });

    // Stringyfy Json Body
    const body = JSON.stringify({});
    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      withCredentials: true,
    };

    try {
      const response = await axios.put(
        `${AUTH_BASE_URL}deactivate-user`,
        body,
        config
      );

      if (response.data.success === true) {
        dispatch({
          type: DEACTIVATE_ACCOUNT_SUCCESS,
          payload: response,
        });

        // dispatch({
        //   type: SET_TOAST_STATE,
        //   payload: {
        //     visibility: true,
        //     type: "success",
        //     title: "Success!",
        //     description: `${response.data.message}`,
        //   },
        // });
      } else {
        dispatch({
          type: DEACTIVATE_ACCOUNT_FAIL,
          payload: response,
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `${response.data.message}`,
          },
        });
      }
    } catch (err: any) {
      if (err.message === "Network Error") {
        dispatch({
          type: DEACTIVATE_ACCOUNT_FAIL,
          payload: {
            response: {
              data: {
                message: "Network Error",
                status: err.code,
                statusText: err.code,
              },
            },
          },
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `Network Error`,
          },
        });
      } else {
        dispatch({
          type: DEACTIVATE_ACCOUNT_FAIL,
          payload: err,
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `${err.response.data.message}`,
          },
        });
      }
    }
  };

// @desc        Update user
// @api         auth/update-user-info
// @access      public
export const updateUserInfoSubmit =
  (userInforUpdateDetails: UserInforUpdateDetails, access_token: string) =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_LOADING_UPDATE_USER_INFO,
    });
    dispatch({
      type: CLEAR_AUTH_ERROR_MESSAGES,
    });

    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${access_token}`,
      },
      withCredentials: true,
    };

    // Create FormData object and append properties
    const formData = new FormData();
    formData.append("first_name", userInforUpdateDetails.first_name);
    formData.append("last_name", userInforUpdateDetails.last_name);

    if (userInforUpdateDetails.username) {
      formData.append("username", userInforUpdateDetails.username);
    }
    if (userInforUpdateDetails.phone_number) {
      formData.append("phone_number", userInforUpdateDetails.phone_number);
    }
    if (userInforUpdateDetails.street) {
      formData.append("street", userInforUpdateDetails.street);
    }
    if (userInforUpdateDetails.apartment) {
      formData.append("apartment", userInforUpdateDetails.apartment);
    }
    if (userInforUpdateDetails.city) {
      formData.append("city", userInforUpdateDetails.city);
    }
    if (userInforUpdateDetails.postal_code) {
      formData.append("postal_code", userInforUpdateDetails.postal_code);
    }
    if (userInforUpdateDetails.country) {
      formData.append("country", userInforUpdateDetails.country);
    }

    if (userInforUpdateDetails.dp) {
      formData.append("dp", userInforUpdateDetails.dp);
    }
    if (userInforUpdateDetails.email) {
      formData.append("email", userInforUpdateDetails.email);
    }

    try {
      const response = await axios.put(
        `${AUTH_BASE_URL}update-user-info`,
        formData,
        config
      );

      dispatch({
        type: UPDATE_USER_INFO_SUCCESS,
        payload: response,
      });

      dispatch({
        type: SET_TOAST_STATE,
        payload: {
          visibility: true,
          type: "success",
          title: "Success!",
          description: `${response.data.message}`,
        },
      });
    } catch (err: any) {
      if (err.message === "Network Error") {
        dispatch({
          type: UPDATE_USER_INFO_FAIL,
          payload: {
            response: {
              data: {
                message: "Network Error",
                status: err.code,
                statusText: err.code,
              },
            },
          },
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `Network Error`,
          },
        });
      } else {
        dispatch({
          type: UPDATE_USER_INFO_FAIL,
          payload: err,
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `${err.response.data.message}`,
          },
        });
      }
    }
  };

// @desc        Delete Dp
// @api         auth/delete-dp
// @access      public
export const deleteDp =
  (access_token: string) => async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_LOADING_DELETE_DP,
    });
    dispatch({
      type: CLEAR_AUTH_ERROR_MESSAGES,
    });

    // Stringyfy Json Body
    const body = JSON.stringify({});
    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      withCredentials: true,
    };

    try {
      const response = await axios.put(
        `${AUTH_BASE_URL}delete-dp`,
        body,
        config
      );

      if (response.data.success === true) {
        dispatch({
          type: DELETE_DP_SUCCESS,
          payload: response,
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "success",
            title: "Success!",
            description: `${response.data.message}`,
          },
        });
      } else {
        dispatch({
          type: DELETE_DP_FAIL,
          payload: response,
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `${response.data.message}`,
          },
        });
      }
    } catch (err: any) {
      if (err.message === "Network Error") {
        dispatch({
          type: DELETE_DP_FAIL,
          payload: {
            response: {
              data: {
                message: "Network Error",
                status: err.code,
                statusText: err.code,
              },
            },
          },
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `Network Error`,
          },
        });
      } else
        dispatch({
          type: DELETE_DP_FAIL,
          payload: err,
        });

      dispatch({
        type: SET_TOAST_STATE,
        payload: {
          visibility: true,
          type: "error",
          title: "Error!",
          description: `${err.response.data.message}`,
        },
      });
    }
  };

// @desc        Sign out
// @api         auth//logout
// @access      public
export const signOut =
  (access_token: string) => async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_LOADING_SIGN_OUT,
    });
    dispatch({
      type: CLEAR_AUTH_ERROR_MESSAGES,
    });

    // API Header configarations
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      withCredentials: true,
    };

    try {
      const response = await axios.get(`${AUTH_BASE_URL}logout`, config);

      if (response.data.success === true) {
        dispatch({
          type: SIGN_OUT_SUCCESS,
          payload: response,
        });

        // dispatch({
        //   type: SET_TOAST_STATE,
        //   payload: {
        //     visibility: true,
        //     type: "success",
        //     title: "Success!",
        //     description: `${response.data.message}`,
        //   },
        // });
      } else {
        dispatch({
          type: SIGN_OUT_FAIL,
          payload: response,
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `${response.data.message}`,
          },
        });
      }
    } catch (err: any) {
      if (err.message === "Network Error") {
        dispatch({
          type: SIGN_OUT_FAIL,
          payload: {
            response: {
              data: {
                message: "Network Error",
                status: err.code,
                statusText: err.code,
              },
            },
          },
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `Network Error`,
          },
        });
      } else {
        dispatch({
          type: SIGN_OUT_FAIL,
          payload: err,
        });

        dispatch({
          type: SET_TOAST_STATE,
          payload: {
            visibility: true,
            type: "error",
            title: "Error!",
            description: `${err.response.data.message}`,
          },
        });
      }
    }
  };