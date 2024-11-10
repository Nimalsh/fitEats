import {
  FIND_COMPLAINT_REQUEST,
  FIND_COMPLAINT_SUCCESS,
  FIND_COMPLAINT_FAILURE,
  CLEAR_COMPLAINT_REQUEST,
  CLEAR_COMPLAINT_SUCCESS,
  CLEAR_COMPLAINT_FAILURE,
  GET_ALL_COMPLAINTS_REQUEST,
  GET_ALL_COMPLAINTS_SUCCESS,
  GET_ALL_COMPLAINTS_FAILURE,
  ADD_COMPLAINT_REQUEST,
  ADD_COMPLAINT_SUCCESS,
  ADD_COMPLAINT_FAILURE,
  UPDATE_COMPLAINT_REQUEST,
  UPDATE_COMPLAINT_SUCCESS,
  UPDATE_COMPLAINT_FAILURE,
  REMOVE_COMPLAINT_REQUEST,
  REMOVE_COMPLAINT_SUCCESS,
  REMOVE_COMPLAINT_FAILURE,
} from './ActionType';

// Initial state
const initialState = {
  complaints: [],
  currentComplaint: null,
  loading: false,
  error: null,
};

// Complaint Reducer
const complaintReducer = (state = initialState, action) => {
  switch (action.type) {
    // Find complaint
    case FIND_COMPLAINT_REQUEST:
      return { ...state, loading: true, error: null };
    case FIND_COMPLAINT_SUCCESS:
      return { ...state, loading: false, currentComplaint: action.payload };
    case FIND_COMPLAINT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Clear complaints
    case CLEAR_COMPLAINT_REQUEST:
      return { ...state, loading: true, error: null };
    case CLEAR_COMPLAINT_SUCCESS:
      return { ...state, loading: false, complaints: [] };
    case CLEAR_COMPLAINT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Get all complaints
    case GET_ALL_COMPLAINTS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ALL_COMPLAINTS_SUCCESS:
      return { ...state, loading: false, complaints: action.payload };
    case GET_ALL_COMPLAINTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Add complaint
    case ADD_COMPLAINT_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_COMPLAINT_SUCCESS:
      return { ...state, loading: false, complaints: [...state.complaints, action.payload] };
    case ADD_COMPLAINT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Update complaint
    case UPDATE_COMPLAINT_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_COMPLAINT_SUCCESS:
      return {
        ...state,
        loading: false,
        complaints: state.complaints.map((complaint) =>
          complaint.id === action.payload.id ? action.payload : complaint
        ),
      };
    case UPDATE_COMPLAINT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Remove complaint
    case REMOVE_COMPLAINT_REQUEST:
      return { ...state, loading: true, error: null };
    case REMOVE_COMPLAINT_SUCCESS:
      return {
        ...state,
        loading: false,
        complaints: state.complaints.filter((complaint) => complaint.id !== action.payload),
      };
    case REMOVE_COMPLAINT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default complaintReducer;
