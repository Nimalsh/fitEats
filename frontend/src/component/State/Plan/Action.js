import { api } from '../../config/api'
import { useNavigate } from 'react-router-dom';
import {
  CREATE_PLAN_REQUEST,
  CREATE_PLAN_SUCCESS,
  CREATE_PLAN_FAILURE,
  SET_BREAKFAST_REQUEST,
  SET_BREAKFAST_SUCCESS,
  SET_BREAKFAST_FAILURE,
  SET_LUNCH_REQUEST,
  SET_LUNCH_SUCCESS,
  SET_LUNCH_FAILURE,
  SET_DINNER_REQUEST,
  SET_DINNER_SUCCESS,
  SET_DINNER_FAILURE,
  GET_PLAN_DATA_REQUEST,
  GET_PLAN_DATA_SUCCESS,
  GET_PLAN_DATA_FAILURE,
  UPDATE_PLAN_STATUS_REQUEST,
  UPDATE_PLAN_STATUS_SUCCESS,
  UPDATE_PLAN_STATUS_FAILURE,
} from "./ActionType";

// Action to create a plan
// Action Creator
export const createPlan = (duration, token, navigate) => {
    return async (dispatch) => {
      dispatch({ type: CREATE_PLAN_REQUEST });
      try {
        const requestData = { duration };
  
        // Replace with your actual API endpoint and response structure
        const { data } = await api.post(`/api/plan/create`, requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        dispatch({ type: CREATE_PLAN_SUCCESS, payload: data });
        console.log("Plan created", data);
  
        const planId = data.planId;
      
  
        // Navigate to the next view with the planId attached to the URL
        navigate(`/nutri/weightloss/view/proceed/${planId}/${duration}`);
  
        return planId; // Return the planId
      } catch (error) {
        console.log("error", error);
        dispatch({ type: CREATE_PLAN_FAILURE, payload: error.message });
        throw error; // Rethrow the error to handle it in the component
      }
    };
  };
  

// Action to set breakfast for a specific day
export const setBreakfast = (planId, reqData) => {
  return async (dispatch) => {
    dispatch({ type: SET_BREAKFAST_REQUEST });
    try {
      await api.put(`/api/plan/${planId}/set-breakfast`, reqData, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: SET_BREAKFAST_SUCCESS });
      console.log("Breakfast set");
    } catch (error) {
      console.log("error", error);
      dispatch({ type: SET_BREAKFAST_FAILURE, payload: error.message });
    }
  };
};

// Action to set lunch for a specific day
export const setLunch = (planId, reqData) => {
  return async (dispatch) => {
    dispatch({ type: SET_LUNCH_REQUEST });
    try {
      await api.put(`/api/plan/${planId}/set-lunch`, reqData, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: SET_LUNCH_SUCCESS });
      console.log("Lunch set");
    } catch (error) {
      console.log("error", error);
      dispatch({ type: SET_LUNCH_FAILURE, payload: error.message });
    }
  };
};

// Action to set dinner for a specific day
export const setDinner = (planId, reqData) => {
  return async (dispatch) => {
    dispatch({ type: SET_DINNER_REQUEST });
    try {
      await api.put(`/api/plan/${planId}/set-dinner`, reqData, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: SET_DINNER_SUCCESS });
      console.log("Dinner set");
    } catch (error) {
      console.log("error", error);
      dispatch({ type: SET_DINNER_FAILURE, payload: error.message });
    }
  };
};

// Action to get plan data for a specific day
// actions.js
// actions.js
// Adjusted for Axios
export const getPlanData = (planId, day, token) => {
    return async (dispatch) => {
        dispatch({ type: GET_PLAN_DATA_REQUEST });
        
        try {
            const response = await api.get(`/api/plan/${planId}/day/${day}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Fetched plan data:', response.data);

            // Dispatch the data with the `daysId` as the key
            dispatch({
                type: GET_PLAN_DATA_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            console.error('Error fetching plan data:', error);
            dispatch({
                type: GET_PLAN_DATA_FAILURE,
                error: error.toString(),
            });
        }
    };
};

export const updatePlanStatus = (planId, status, token) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_PLAN_STATUS_REQUEST });
      try {
        await api.put(`/api/plan/${planId}/status`, status, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        dispatch({ type: UPDATE_PLAN_STATUS_SUCCESS });
        console.log("Plan status updated successfully");
      } catch (error) {
        console.log("error", error);
        dispatch({ type: UPDATE_PLAN_STATUS_FAILURE, payload: error.message });
      }
    };
  };
