import {
  CREATE_REQUEST_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_FAILURE,
  GET_REQUESTS_BY_NUTRITIONIST_REQUEST,
  GET_REQUESTS_BY_NUTRITIONIST_SUCCESS,
  GET_REQUESTS_BY_NUTRITIONIST_FAILURE,
  GET_REQUEST_BY_ID_REQUEST,
  GET_REQUEST_BY_ID_SUCCESS,
  GET_REQUEST_BY_ID_FAILURE,
  COMPLETE_REQUEST_BY_PLAN_ID_REQUEST,
  COMPLETE_REQUEST_BY_PLAN_ID_SUCCESS,
  COMPLETE_REQUEST_BY_PLAN_ID_FAILURE,
} from './ActionType';

const initialState = {
  requests: [],
  requestById: null,
  loading: false,
  error: null,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REQUEST_REQUEST:
    case GET_REQUESTS_BY_NUTRITIONIST_REQUEST:
    case GET_REQUEST_BY_ID_REQUEST:
    case COMPLETE_REQUEST_BY_PLAN_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: [...state.requests, action.payload],
      };

    case GET_REQUESTS_BY_NUTRITIONIST_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: action.payload,
      };

    case GET_REQUEST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        requestById: action.payload,
      };

    case COMPLETE_REQUEST_BY_PLAN_ID_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CREATE_REQUEST_FAILURE:
    case GET_REQUESTS_BY_NUTRITIONIST_FAILURE:
    case GET_REQUEST_BY_ID_FAILURE:
    case COMPLETE_REQUEST_BY_PLAN_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default requestReducer;
