import { AppDispatch } from '../../store';
import axios from 'axios';
import { SET_TOAST_STATE } from '../types';

// @desc        Set show/hide toast
// @api
// @access      public
export const setToastState =
  (visibility: boolean, type: string, title: string, description: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: SET_TOAST_STATE,
        payload: {
          visibility: visibility,
          type: type,
          title: title,
          description: description,
        },
      });
    } catch (err: any) {
      console.log(err, 'err');
    }
  };
