// reducer.js
import {
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
} from './ActionType';

const initialState = {
  events: [], // Holds the list of events
  loading: false, // Indicates loading state
  error: null, // Holds error message
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case GET_ALL_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
