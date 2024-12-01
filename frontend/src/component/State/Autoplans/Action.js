import { api } from '../../config/api'
import {
  CREATE_PLAN_REQUEST,
  CREATE_PLAN_SUCCESS,
  CREATE_PLAN_FAILURE,
  GET_PLAN_DATA_REQUEST,
  GET_PLAN_DATA_SUCCESS,
  GET_PLAN_DATA_FAILURE,
  UPDATE_MEAL_STATUS_REQUEST,
  UPDATE_MEAL_STATUS_SUCCESS,
  UPDATE_MEAL_STATUS_FAILURE,
  GET_TOTAL_MEAL_COUNT_REQUEST,
  GET_TOTAL_MEAL_COUNT_SUCCESS,
  GET_TOTAL_MEAL_COUNT_FAILURE,
  GET_PLAN_BY_ID_REQUEST,
  GET_PLAN_BY_ID_SUCCESS,
  GET_PLAN_BY_ID_FAILURE,
  COMPLETE_MEALPLAN_REQUEST,
  COMPLETE_MEALPLAN_SUCCESS,
  COMPLETE_MEALPLAN_FAILURE,
  UPDATE_MEAL_REQUEST,
  UPDATE_MEAL_SUCCESS,
  UPDATE_MEAL_FAILURE,
  UPDATE_MEAL_WEIGHT_REQUEST,
  UPDATE_MEAL_WEIGHT_SUCCESS,
  UPDATE_MEAL_WEIGHT_FAILURE,
  GET_REQUESTS_BY_TOKEN_REQUEST,
  GET_REQUESTS_BY_TOKEN_SUCCESS,
  GET_REQUESTS_BY_TOKEN_FAILURE,

  
} from './ActionType';

// Action to create a new request
export const createRequest = (requestData, token) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_PLAN_REQUEST });
    try {
      console.log("Request ", requestData);
      console.log(token);
      const { data } = await api.post('/api/Mealplan/create', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: CREATE_PLAN_SUCCESS, payload: data });
      console.log("Request created", data);
      return data;
    } catch (error) {
      console.error("Error creating request", error);
      dispatch({ type: CREATE_PLAN_FAILURE, payload: error.message });
    }
  };
};


export const getPlanData = (planId, day, token) => {
  return async (dispatch) => {
      dispatch({ type: GET_PLAN_DATA_REQUEST });
      
      try {
          const response = await api.get(`/api/Mealplan/mealplandata/${planId}/${day}`, {
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

export const updateMealStatus = (planId, daysId, mealTypes, token) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MEAL_STATUS_REQUEST });
    try {
      await api.put(`/api/Mealplan/updateMealStatus/${planId}/${daysId}`, mealTypes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("anny");
      dispatch({ type: UPDATE_MEAL_STATUS_SUCCESS });
    } catch (error) {
      console.error("Error updating meal status", error);
      dispatch({ type: UPDATE_MEAL_STATUS_FAILURE, payload: error.message });
    }
  };
};

// Action to get total meal count marked as true for a plan

export const getTotalMealStatusCount = (planId, token) => {
  return async (dispatch) => {
    dispatch({ type: GET_TOTAL_MEAL_COUNT_REQUEST });
    try {
      const response = await api.get(`/api/Mealplan/mealstatus/total/${planId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Success:", response.data);
      dispatch({ type: GET_TOTAL_MEAL_COUNT_SUCCESS, payload: response.data });
      
      return response.data; // Return the response data for use in the component
    } catch (error) {
      console.error("Error fetching total meal status count", error);
      dispatch({ type: GET_TOTAL_MEAL_COUNT_FAILURE, payload: error.message });
      
      throw error; // Propagate the error to handle it in the component
    }
  };
};

export const getMealplanById = (planId, token) => {
  return async (dispatch) => {
    dispatch({ type: GET_PLAN_BY_ID_REQUEST });
    try {
      const response = await api.get(`/api/Mealplan/${planId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched meal plan by ID:", response.data);

      dispatch({
        type: GET_PLAN_BY_ID_SUCCESS,
        payload: response.data,
      });

      // Return the fetched data for further use
      return response.data;
    } catch (error) {
      console.error("Error fetching meal plan by ID:", error);
      dispatch({
        type: GET_PLAN_BY_ID_FAILURE,
        payload: error.message,
      });
      return null;
    }
  };
};

export const completeMealplan = (planId, token) => {
  return async (dispatch) => {
    dispatch({ type: COMPLETE_MEALPLAN_REQUEST });
    try {
      const response = await api.put(`/api/Mealplan/complete/${planId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: COMPLETE_MEALPLAN_SUCCESS, payload: response.data });
    } catch (error) {
      console.error("Error completing meal plan", error);
      dispatch({ type: COMPLETE_MEALPLAN_FAILURE, payload: error.message });
    }
  };
};

export const updateMealForPlanDayAndType = (planId, daysId, mealType, token) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MEAL_REQUEST });

    try {
      const response = await api.put(`/api/Mealplan/updateMeal/${planId}/${daysId}/${mealType}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Meal updated successfully:", response.data);
      dispatch({ type: UPDATE_MEAL_SUCCESS, payload: response.data });
    } catch (error) {
      console.error("Error updating meal:", error);
      dispatch({ type: UPDATE_MEAL_FAILURE, payload: error.message });
    }
  };
};

export const updateMealPlanWeight = (planId, weight, token) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MEAL_WEIGHT_REQUEST });
    try {
      const response = await api.put(`/api/Mealplan/updateMeal/${planId}/${weight}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("Meal plan weight updated successfully:", response.data);
      
      const afterweight = response.data.afterweight; // Capture `afterweight`
      
      // Dispatch success action with response data
      dispatch({ type: UPDATE_MEAL_WEIGHT_SUCCESS, payload: response.data });
      
      // Return afterweight for use in handleDialogSubmit
      return afterweight;
    } catch (error) {
      console.error("Error updating meal plan weight:", error);
      dispatch({ type: UPDATE_MEAL_WEIGHT_FAILURE, payload: error.message });
      throw error; // Rethrow error to handle it in the component
    }
  };
}; 

export const getRequestsByToken = (token) =>  {
  return async (dispatch) => {
  dispatch({ type: GET_REQUESTS_BY_TOKEN_REQUEST });
  try {
   
    const response = await api.get('/api/Mealplan/myplans', {
      headers: { 
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log("Requests fetched successfully:", response.data);

    // Dispatch success action with the response data
    dispatch({
      type: GET_REQUESTS_BY_TOKEN_SUCCESS,
      payload: response.data,
    });

    // Return data for optional use in the calling component
    return response.data;
  } catch (error) {
    console.error("Error fetching requests by token:", error.message);
    
    dispatch({
      type: GET_REQUESTS_BY_TOKEN_FAILURE,
      payload: error.message || 'Failed to fetch requests by token',
    });

    // Throw error to handle it in the component if needed
    throw error;
  }
};
}
