 import { api } from "../../config/api";
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

// Create Order
export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const { data } = await api.post(`/api/orders`, reqData.order, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.error("Create order error:", error);
      dispatch({ type: CREATE_ORDER_FAILURE, payload: error.response ? error.response.data : error.message });
    }
  };
};
// Get User's Orders
export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_ORDERS_REQUEST });
    try {
      const { data } = await api.get("/api/order/user", {
        headers: {
          Authorization: `Bearer ${jwt}`
, // Corrected syntax
        },
      });
      dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      console.error("Get user's orders error:", error);
      dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error.response ? error.response.data : error.message });
    }
  };
};
// Get User's Notifications
export const getUsersNotifications = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_NOTIFICATION_REQUEST });
    try {
      const { data } = await api.get(`/api/notifications/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_USERS_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
      console.error("Get user's notifications error:", error);
      dispatch({ type: GET_USERS_NOTIFICATION_FAILURE, payload: error.response ? error.response.data : error.message });
    }
  };
};

// Get User's Notifications (Assuming there's an endpoint for this, replace with actual if different)
// export const getUsersNotifications = (token) => {
//   return async (dispatch) => {
//     dispatch({ type: GET_USERS_NOTIFICATION_REQUEST });
//     try {
//       const response = await api.get(`/api/notifications/user`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       dispatch({ type: GET_USERS_NOTIFICATION_SUCCESS, payload: response.data });
//       console.log("get user's notifications", response.data);
//     } catch (error) {
//       console.log("error", error);
//       dispatch({ type: GET_USERS_NOTIFICATION_FAILURE, payload: error.message });
//     }
//   };
// };
