import { api } from "../../config/api";

import { clearCartAction } from "../Cart/Action";

import {
  START_PAYMENT_REQUEST,
  START_PAYMENT_SUCCESS,
  START_PAYMENT_FAILURE,
  HANDLE_NOTIFICATION_REQUEST,
  HANDLE_NOTIFICATION_SUCCESS,
  HANDLE_NOTIFICATION_FAILURE,
} from "./ActionType";

// Start Payment
// Action.js

export const startPayment = (jwt, paymentData) => {
    return async (dispatch) => {
        console.log("start");
      dispatch({ type: START_PAYMENT_REQUEST });
      try {
        const { data } = await api.post(`/api/payments/start`, paymentData, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Hash",data.hash);
        console.log("Order_Id",data.order_id);
        // Use window.payhere to avoid ESLint error
        window.payhere.startPayment({
          sandbox: true,
          merchant_id: data.merchant_id,
          return_url: data.return_url,
          cancel_url: data.cancel_url,
          notify_url: data.notify_url,
          order_id: data.order_id,
          amount: data.amount,
          currency: data.currency,
          items: data.items,
          hash: data.hash,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          country: data.country,
        });
  
        dispatch({ type: START_PAYMENT_SUCCESS, payload: data });

        setTimeout(() => {
          dispatch(clearCartAction());
        }, 1000);

      } catch (error) {
        dispatch({
          type: START_PAYMENT_FAILURE,
          payload: error.response ? error.response.data : error.message,
        });
      }
    };
  };
   

// Handle Notification
export const handleNotification = (jwt, notificationData) => {
  return async (dispatch) => {
    dispatch({ type: HANDLE_NOTIFICATION_REQUEST });

    try {
      const { data } = await api.post(`/api/payments/notify`, notificationData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: HANDLE_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: HANDLE_NOTIFICATION_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};
