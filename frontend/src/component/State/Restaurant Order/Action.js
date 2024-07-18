import { api } from "../../../config/api";
import {
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  GET_RESTAURANTS_ORDER_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
} from "./ActionType";

// Get Restaurant's Orders
export const fetchRestaurantsOrder = (restaurantId,orderStatus,jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });
    try {
      const { data } = await api.get(`/api/admin/order/restaurant/${restaurantId}`, {
        params: { order_status: orderStatus },
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      const orders=data;
      dispatch({ type: GET_RESTAURANTS_ORDER_SUCCESS, payload: orders });
    } catch (error) {
      dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, payload: error });
    }
  };
};

// Update Order Status
export const updateOrderStatus = ({orderId,orderStatus,jwt}) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
      const response = await api.put(`/api/admin/order/${orderId}/${orderStatus}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const updatedOrder = response.data;

      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, updatedOrder });
    } catch (error) {
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error});
    }
  };
};
