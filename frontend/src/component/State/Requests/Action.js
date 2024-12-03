import { ConstructionOutlined } from '@mui/icons-material';
import { api } from '../../config/api'
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
  GET_USER_REQUESTS_REQUEST,
  GET_USER_REQUESTS_SUCCESS,
  GET_USER_REQUESTS_FAILURE,
  UPDATE_REQUEST_STATUS_REQUEST,
  UPDATE_REQUEST_STATUS_SUCCESS,
  UPDATE_REQUEST_STATUS_FAILURE,
  GET_REQUEST_BY_PLAN_ID_REQUEST,
  GET_REQUEST_BY_PLAN_ID_SUCCESS,
  GET_REQUEST_BY_PLAN_ID_FAILURE,
  UPDATE_ACHIEVED_WEIGHT_REQUEST,
  UPDATE_ACHIEVED_WEIGHT_SUCCESS,
  UPDATE_ACHIEVED_WEIGHT_FAILURE,
  UPDATE_REQUEST_DESCRIPTION_AND_COMPLETE_REQUEST,
  UPDATE_REQUEST_DESCRIPTION_AND_COMPLETE_SUCCESS,
  UPDATE_REQUEST_DESCRIPTION_AND_COMPLETE_FAILURE,
  UPDATE_REQUEST_COMMENT_REQUEST,
  UPDATE_REQUEST_COMMENT_SUCCESS,
  UPDATE_REQUEST_COMMENT_FAILURE,
  CREATE_OTHER_REQUEST_REQUEST,
  CREATE_OTHER_REQUEST_SUCCESS,
  CREATE_OTHER_REQUEST_FAILURE,
  FINISH_REQUEST_BY_PLAN_ID_REQUEST,
  FINISH_REQUEST_BY_PLAN_ID_SUCCESS,
  FINISH_REQUEST_BY_PLAN_ID_FAILURE,
} from './ActionType';
import { startPayment } from '../Payment/Action';

// Action to create a new request


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
      console.log("Request  to Completed");
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

  // Action to get requests by JWT token (User's requests)
export const getUserRequests = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUESTS_REQUEST });
    try {
      const { data } = await api.get('/api/users/my-requests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_USER_REQUESTS_SUCCESS, payload: data });
      console.log("User requests fetched", data);
    } catch (error) {
      console.error("Error fetching user requests", error);
      dispatch({ type: GET_USER_REQUESTS_FAILURE, payload: error.message });
    }
  };
};

export const updateRequestStatus = (requestId, status, token) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_REQUEST_STATUS_REQUEST });
    try {
      await api.put(`/api/plan/requests/${requestId}/status/${status}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: UPDATE_REQUEST_STATUS_SUCCESS });
      console.log("Request status updated to", status);
    } catch (error) {
      console.error("Error updating request status", error);
      dispatch({ type: UPDATE_REQUEST_STATUS_FAILURE, payload: error.message });
    }
  };
};

export const getRequestByPlanId = (planId, token) => {
  return async (dispatch) => {
    dispatch({ type: GET_REQUEST_BY_PLAN_ID_REQUEST });
    try {
      const { data } = await api.get(`/api/plan/plan/${planId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_REQUEST_BY_PLAN_ID_SUCCESS, payload: data });
      return data;  // Return the fetched data
    } catch (error) {
      console.error("Error fetching request by planId", error);
      dispatch({ type: GET_REQUEST_BY_PLAN_ID_FAILURE, payload: error.message });
      throw new Error(error.message);  // Throw error for caller to handle
    }
  };
};

export const updateAchievedWeight = (planId, achievedWeight, token) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ACHIEVED_WEIGHT_REQUEST });
    try {
      const { data } = await api.put(`/api/plan/${planId}/achieved-weight`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          achievedWeight, // Send as query param
        },
      });
      dispatch({ type: UPDATE_ACHIEVED_WEIGHT_SUCCESS, payload: data });
      console.log("Achieved weight updated successfully");
    } catch (error) {
      console.error("Error updating achieved weight", error);
      dispatch({ type: UPDATE_ACHIEVED_WEIGHT_FAILURE, payload: error.message });
    }
  };
};


export const updateRequestDescriptionAndComplete = (requestId, description, token) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_REQUEST_DESCRIPTION_AND_COMPLETE_REQUEST });
    try {
      // Make the PUT request to the API with plain string body
      console.log("reply",description);
      await api.put(`/api/plan/requests/${requestId}/update-description-and-complete`, description, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain", // Indicate the body is plain text
        },
      });
      dispatch({ type: UPDATE_REQUEST_DESCRIPTION_AND_COMPLETE_SUCCESS });
      console.log("Request description updated and marked as completed");
    } catch (error) {
      console.error("Error updating request description and completing request", error);
      dispatch({ type: UPDATE_REQUEST_DESCRIPTION_AND_COMPLETE_FAILURE, payload: error.message });
    }
  };
};

export const putcomments = (requestId, comments, token) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_REQUEST_COMMENT_REQUEST });
    try {
      // Make the PUT request to the API with plain string body
      
      await api.put(`/api/plan/requests/${requestId}/putcomments`, comments, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/plain", // Indicate the body is plain text
        },
      });
      dispatch({ type: UPDATE_REQUEST_COMMENT_SUCCESS });
      console.log("Request description updated and marked as completed");
    } catch (error) {
      console.error("Error updating request description and completing request", error);
      dispatch({ type: UPDATE_REQUEST_COMMENT_FAILURE, payload: error.message });
    }
  };
};
export const createotherRequest = (requestData, token) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_OTHER_REQUEST_REQUEST });
    try {
      const { data } = await api.post('/api/users/otherrequests', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: CREATE_OTHER_REQUEST_SUCCESS, payload: data });
      console.log("Request created", data);
    } catch (error) {
      console.error("Error creating request", error);
      dispatch({ type: CREATE_OTHER_REQUEST_FAILURE, payload: error.message });
    }
  };
};

export const finishRequestByPlanId = (planId, token) => {
  return async (dispatch) => {
    
    dispatch({ type: FINISH_REQUEST_BY_PLAN_ID_REQUEST });
    try {
      await api.put(`/api/plan/requests/finish/${planId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: FINISH_REQUEST_BY_PLAN_ID_SUCCESS });
      console.log("Request status updated to finished");
    } catch (error) {
      console.error("Error completing request", error);
      dispatch({ type: FINISH_REQUEST_BY_PLAN_ID_FAILURE, payload: error.message });
    }
  };
};

export const createRequest = (requestData, nutritionist, token,) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_REQUEST_REQUEST });
   console.log("starting hhhh");
    // Define paymentData object
    const paymentData = {
      items:  nutritionist.fullName,
      amount: 1000.00,
      firstName: 'Saman',
      lastName: 'Perera',
      email: 'samanp@gmail.com',
      phone: '0771234567',
      address: 'No.1, Galle Road',
      city: 'Colombo',
      country: 'Sri Lanka',
    };

    try {
      // First, call startPayment with the payment data
      await dispatch(startPayment(token, paymentData));

      // Proceed with creating the request after the payment
      const { data } = await api.post('/api/users/requests', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Dispatch success action for request creation
      dispatch({ type: CREATE_REQUEST_SUCCESS, payload: data });
      console.log("Request created", data);
      
    } catch (error) {
      console.error("Error creating request or processing payment", error);
      dispatch({ type: CREATE_REQUEST_FAILURE, payload: error.message });
    }
  };
};