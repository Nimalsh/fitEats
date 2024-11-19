// src/State/complain/Reducer.js
import {
  ADD_COMPLAINT_REQUEST,
  ADD_COMPLAINT_SUCCESS,
  ADD_COMPLAINT_FAILURE,
  FETCH_COMPLAINTS_REQUEST,
  FETCH_COMPLAINTS_SUCCESS,
  FETCH_COMPLAINTS_FAILURE,
  DELETE_COMPLAINT_REQUEST,
  DELETE_COMPLAINT_SUCCESS,
  DELETE_COMPLAINT_FAILURE,
} from "./ActionType";

const initialState = {
  complaints: [],
  loading: false,
  error: null,
}
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMPLAINT_REQUEST:
    case FETCH_COMPLAINTS_REQUEST:
    case DELETE_COMPLAINT_REQUEST:
      return { ...state, loading: true };

    case ADD_COMPLAINT_SUCCESS:
      return {
        ...state,
        loading: false,
        complaints: [...state.complaints, action.payload],
      };

    case FETCH_COMPLAINTS_SUCCESS:
      return {
        ...state,
        loading: false,
        complaints: action.payload,
      };

    case DELETE_COMPLAINT_SUCCESS:
      return {
        ...state,
        loading: false,
        complaints: state.complaints.filter(
          (complaint) => complaint.id !== action.payload
        ),
      };

    case ADD_COMPLAINT_FAILURE:
    case FETCH_COMPLAINTS_FAILURE:
    case DELETE_COMPLAINT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default Reducer;
