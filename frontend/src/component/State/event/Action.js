// action.js
import { api } from '../../config/api';
import {
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
} from './ActionType';

export const getAllEvents = (jwt) => async (dispatch) => {
    dispatch({ type:GET_ALL_EVENTS_REQUEST });
    try {
      const res = await api.get("/api/events", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("delete events", res.data);
      dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type:GET_ALL_EVENTS_FAILURE, payload: error.message });
    }
  };
