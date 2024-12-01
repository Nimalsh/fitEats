import {
    START_PAYMENT_REQUEST,
    START_PAYMENT_SUCCESS,
    START_PAYMENT_FAILURE,
    HANDLE_NOTIFICATION_REQUEST,
    HANDLE_NOTIFICATION_SUCCESS,
    HANDLE_NOTIFICATION_FAILURE,
  } from "./ActionType";
  
  const initialState = {
    loading: false,
    paymentDetails: null,
    notificationResponse: null,
    error: null,
  };
  
  const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
      // Start Payment
      case START_PAYMENT_REQUEST:
        return { ...state, loading: true, error: null };
      case START_PAYMENT_SUCCESS:
        return { ...state, loading: false, paymentDetails: action.payload };
      case START_PAYMENT_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      // Handle Notification
      case HANDLE_NOTIFICATION_REQUEST:
        return { ...state, loading: true, error: null };
      case HANDLE_NOTIFICATION_SUCCESS:
        return { ...state, loading: false, notificationResponse: action.payload };
      case HANDLE_NOTIFICATION_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default paymentReducer;
  
