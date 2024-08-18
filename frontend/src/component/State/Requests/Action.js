import { api } from '../../config/api';
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
  UPDATE_REQUEST_WITH_PLAN_ID_REQUEST,
  UPDATE_REQUEST_WITH_PLAN_ID_SUCCESS,
  UPDATE_REQUEST_WITH_PLAN_ID_FAILURE,
  COMPLETE_REQUEST_BY_PLAN_ID_REQUEST,
  COMPLETE_REQUEST_BY_PLAN_ID_SUCCESS,
  COMPLETE_REQUEST_BY_PLAN_ID_FAILURE,
} from './ActionType';

// Action to create a new request
export const createRequest = (requestData, token) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_REQUEST_REQUEST });
    try {
      const { data } = await api.post('/api/users/requests', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: CREATE_REQUEST_SUCCESS, payload: data });
      console.log("Request created", data);
    } catch (error) {
      console.error("Error creating request", error);
      dispatch({ type: CREATE_REQUEST_FAILURE, payload: error.message });
    }
  };
};

// Action to get requests by nutritionist ID
export const getRequestsByNutritionistId = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_REQUESTS_BY_NUTRITIONIST_REQUEST });
    try {
      const { data } = await api.get('/api/plan/requests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_REQUESTS_BY_NUTRITIONIST_SUCCESS, payload: data });
    } catch (error) {
      console.error("Error fetching requests", error);
      dispatch({ type: GET_REQUESTS_BY_NUTRITIONIST_FAILURE, payload: error.message });
    }
  };
};

export const getRequestById = (id, token) => {
    return async (dispatch) => {
      dispatch({ type: GET_REQUEST_BY_ID_REQUEST });
      try {
        const { data } = await api.get(`/api/plan/requests/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: GET_REQUEST_BY_ID_SUCCESS, payload: data });
      } catch (error) {
        console.error("Error fetching request by ID", error);
        dispatch({ type: GET_REQUEST_BY_ID_FAILURE, payload: error.message });
      }
    };
  };

  export const updateRequestWithPlanId = (requestId, planId, token) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_REQUEST_WITH_PLAN_ID_REQUEST });
      try {
        await api.put(`/api/plan/requests/${requestId}/set-plan`, JSON.stringify(planId), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        dispatch({ type: UPDATE_REQUEST_WITH_PLAN_ID_SUCCESS });
        console.log("Request updated with planId");
      } catch (error) {
        console.error("Error updating request with planId", error);
        dispatch({ type: UPDATE_REQUEST_WITH_PLAN_ID_FAILURE, payload: error.message });
      }
    };
  };

  export const completeRequestByPlanId = (planId, token) => {
    return async (dispatch) => {
      dispatch({ type: COMPLETE_REQUEST_BY_PLAN_ID_REQUEST });
      try {
        await api.put(`/api/plan/requests/complete/${planId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: COMPLETE_REQUEST_BY_PLAN_ID_SUCCESS });
        console.log("Request status updated to Completed");
      } catch (error) {
        console.error("Error completing request", error);
        dispatch({ type: COMPLETE_REQUEST_BY_PLAN_ID_FAILURE, payload: error.message });
      }
    };
  };
  