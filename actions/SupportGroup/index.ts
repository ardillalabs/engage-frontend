import { AppDispatch } from '../../store';
import axios from 'axios';
import {
  CREATE_SUPPORT_GROUP,
  FAIL_CREATE_SUPPORT_GROUP,
  SUPPORT_GROUP_LOADING,
  GET_SUPPORT_GROUP,
  FAIL_GET_SUPPORT_GROUP,
  SUPPORTER_DELETE,
  FAIL_SUPPORTER_DELETE,
  SET_LOADING_CLEAR_SUPPORT_GROUP,
  CLEAR_SUPPORT_GROUP_MESSAGES,
  CLEAR_SUPPORT_GROUP,
} from '../types';

// Import environment variables
const BASE_URL = 'http://localhost:5000/api';

// @desc        create support person
// @api         support_group
// @access      public
export const addSupportPerson =
  (supportData: any) => async (dispatch: AppDispatch) => {
    // API Header configarations
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('supportData', supportData);

    // Stringyfy Json Body
    const body = JSON.stringify({
      patientUserId: parseInt(supportData.userId),
      email: supportData.email,
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/support_group`,
        body,
        config
      );

      dispatch({
        type: CREATE_SUPPORT_GROUP,
        payload: response,
      });
      getSupportGroup(supportData.userId);
    } catch (err: any) {
      if (err.message === 'Network Error') {
        dispatch({
          type: FAIL_CREATE_SUPPORT_GROUP,
          payload: {
            response: {
              data: {
                message: 'Network Error',
                status: err.code,
                statusText: err.code,
              },
            },
          },
        });
      } else {
        dispatch({
          type: FAIL_CREATE_SUPPORT_GROUP,
          payload: err,
        });

        if (
          err.response.data.message !==
          'This email address has already been used.'
        ) {
          dispatch({
            type: FAIL_CREATE_SUPPORT_GROUP,
            payload: {
              visibility: true,
              type: 'error',
              title: 'Error!',
              description: `${err.response.data.message}`,
            },
          });
        }
      }
    }
  };

export const getSupportGroup =
  (userId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: SUPPORT_GROUP_LOADING,
      });
      await axios
        .get(`${BASE_URL}/support_group/${userId}`)
        .then((response) => {
          const data: any = response.data;
          console.log('support-group-res', data);
          dispatch({
            type: GET_SUPPORT_GROUP,
            payload: data,
          });
        });
    } catch (err) {
      dispatch({
        type: FAIL_GET_SUPPORT_GROUP,
      });
    }
  };

export const deleteSupporter =
  (userId: number, supporterEmail: string) => async (dispatch: AppDispatch) => {
    try {
      await axios
        .delete(`${BASE_URL}/support_group/${userId}/${supporterEmail}`)
        .then((response) => {
          const data: any = response.data;
          dispatch({
            type: SUPPORTER_DELETE,
            payload: data,
          });
        });
    } catch (err) {
      dispatch({
        type: FAIL_SUPPORTER_DELETE,
      });
    }
  };

export const removeSupportGroupDetails = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: SET_LOADING_CLEAR_SUPPORT_GROUP,
  });
  dispatch({
    type: CLEAR_SUPPORT_GROUP_MESSAGES,
  });
  try {
    console.log('Sign Out');
    dispatch({
      type: CLEAR_SUPPORT_GROUP
    })
  } catch (err: any) {
  }
}
