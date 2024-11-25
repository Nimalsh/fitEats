import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_USERS_ORDERS_REQUEST,
  GET_USERS_ORDERS_SUCCESS,
  GET_USERS_ORDERS_FAILURE,
  GET_USERS_NOTIFICATION_REQUEST,
  GET_USERS_NOTIFICATION_SUCCESS,
  GET_USERS_NOTIFICATION_FAILURE,
} from "./ActionTypes";

const initialState = {
  loading: false,
  orders: [],
  error: null,
  notifications: [], // Corrected from `Notification` to `notifications` for consistency
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_USERS_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
        error: null,
      };

    case GET_USERS_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    // **Handle Order Creation**
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: [...state.orders, payload], // Add the newly created order to the existing list
        error: null,
      };

    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
