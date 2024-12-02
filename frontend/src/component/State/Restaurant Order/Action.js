import { api } from "../../config/api";
import {
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  GET_RESTAURANTS_ORDER_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
} from "./ActionType";

// Fetch restaurant orders with optional order status or with customer details
export const fetchRestaurantsOrder = ({ restaurantId, orderStatus, includeCustomer, jwt }) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });
  try {
    const { data } = await api.get(`/api/admin/orders/${restaurantId}`, {
      params: includeCustomer ? {} : { order_status: orderStatus }, // Include customers or filter by status
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: GET_RESTAURANTS_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, payload: error.response });
  }
};

// Update order status
export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => async (dispatch) => {
  dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
  try {
    const { data } = await api.put(
      `/api/admin/order/${orderId}/${orderStatus}`,
      {},
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error.response });
  }
};
