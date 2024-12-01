import { api } from "../../config/api";
import {
  CREATE_BMIPLAN_REQUEST,
  CREATE_BMIPLAN_SUCCESS,
  CREATE_BMIPLAN_FAILURE,
  ADD_MEAL_REQUEST,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILURE,
  FETCH_MEALS_REQUEST,
  FETCH_MEALS_SUCCESS,
  FETCH_MEALS_FAILURE,
  FETCH_NUTRITION_REQUEST,
  FETCH_NUTRITION_SUCCESS,
  FETCH_NUTRITION_FAILURE,
  UPDATE_NUTRITION_REQUEST,
  UPDATE_NUTRITION_SUCCESS,
  UPDATE_NUTRITION_FAILURE,
  GET_NUTRITION_REQUEST,
  GET_NUTRITION_SUCCESS,
  GET_NUTRITION_FAILURE,
  GET_BMIPLAN_REQUEST,
  GET_BMIPLAN_SUCCESS,
  GET_BMIPLAN_FAILURE,
  UPDATE_WEIGHT_HEIGHT_REQUEST,
  UPDATE_WEIGHT_HEIGHT_SUCCESS,
  UPDATE_WEIGHT_HEIGHT_FAILURE,
  FETCH_USER_DETAILS_REQUEST,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  GET_ACTIVE_PLANS_REQUEST,
  GET_ACTIVE_PLANS_SUCCESS,
  GET_ACTIVE_PLANS_FAILURE


} from "./ActionType";

// Create BMI Plan
export const createBmiplan = (duration, weight, height, bmi, target,age,activitylevel,gender, jwt, navigate) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_BMIPLAN_REQUEST });
    try {
        console.log("Creating BMI Plan with data:", { duration, weight, height, bmi, target, age, activitylevel, gender });

      const requestBody = { duration, weight, height, bmi, target,age,activitylevel,gender };
      const { data } = await api.post("/api/bmi-plans/create", requestBody, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: CREATE_BMIPLAN_SUCCESS, payload: data });
      const time = data.duration;
      const planId = data.planId;
      console.log("BMI plan created", data);
      navigate(`/my-profile/BMI/plan/${time}/${planId}`);
    } catch (error) {
      console.log("Error creating BMI plan:", error);
      dispatch({ type: CREATE_BMIPLAN_FAILURE, payload: error.message });
    }
  };
};

// Add Meal to Day
export const addMealToDay = (planId, daysId, mealName, mealData, jwt) => {
  return async (dispatch) => {
    dispatch({ type: ADD_MEAL_REQUEST });
    try {
      const { data } = await api.post(
        `/api/bmi-plans/add-meal?planId=${planId}&daysId=${daysId}&mealName=${mealName}`,
        mealData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch({ type: ADD_MEAL_SUCCESS, payload: data });
      console.log("Meal added successfully", data);
    } catch (error) {
      console.log("Error adding meal:", error);
      dispatch({ type: ADD_MEAL_FAILURE, payload: error.message });
    }
  };
};

// Fetch Meals for a Day
export const fetchMealsForDay = (planId, daysId, jwt) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_MEALS_REQUEST });
    try {
      const { data } = await api.get(`/api/bmi-plans/meals?planId=${planId}&daysId=${daysId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: FETCH_MEALS_SUCCESS, payload: data });
      console.log("Meals fetched successfully", data);
      return data;
    } catch (error) {
      console.log("Error fetching meals:", error);
      dispatch({ type: FETCH_MEALS_FAILURE, payload: error.message });
    }
  };
};
export const fetchNutritionData = (foodName, quantity, jwt, foodPreparationStatus = '') => {
    return async (dispatch) => {
      dispatch({ type: FETCH_NUTRITION_REQUEST });
  
      try {
        // Construct the query string with the optional foodPreparationStatus parameter
        const queryParams = new URLSearchParams({
          foodName,
          quantity,
        });
  
        if (foodPreparationStatus) {
          queryParams.append('foodPreparationStatus', foodPreparationStatus);
        }
        console.log('apiii', queryParams.toString());
        const { data } = await api.get(`/api/nutrition/data?${queryParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
  
        dispatch({ type: FETCH_NUTRITION_SUCCESS, payload: data });
        console.log("Nutrition data fetched successfully", data);
        return data;
      } catch (error) {
        console.log("Error fetching nutrition data:", error);
        dispatch({ type: FETCH_NUTRITION_FAILURE, payload: error.message });
      }
    };
  };
  

export const updateNutritionValues = (planId, daysId, nutritionValues, jwt) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_NUTRITION_REQUEST });
      try {
        await api.put(`/api/bmi-plans/update-nutrition/${planId}/${daysId}`, nutritionValues, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        });
        dispatch({ type: UPDATE_NUTRITION_SUCCESS });
        console.log("Nutrition values updated successfully");
      } catch (error) {
        console.log("Error updating nutrition values:", error);
        dispatch({ type: UPDATE_NUTRITION_FAILURE, payload: error.message });
      }
    };
  };
  
  // Fetch Nutrition Values
  export const getNutritionValues = (planId, daysId, jwt) => {
    return async (dispatch) => {
      dispatch({ type: GET_NUTRITION_REQUEST });
      try {
        const { data } = await api.get(`/api/bmi-plans/get-nutrition/${planId}/${daysId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        dispatch({ type: GET_NUTRITION_SUCCESS, payload: data });
        console.log("Nutrition values fetched successfully", data);
        return data;
      } catch (error) {
        console.log("Error fetching nutrition values:", error);
        dispatch({ type: GET_NUTRITION_FAILURE, payload: error.message });
      }
    };
  };

  export const fetchBmiplanByPlanId = (planId, jwt) => {
    return async (dispatch) => {
      dispatch({ type: GET_BMIPLAN_REQUEST });
      try {
        const { data } = await api.get(`/api/bmi-plans/${planId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        dispatch({ type: GET_BMIPLAN_SUCCESS, payload: data });
        console.log("BMI plan fetched successfully", data);
        return data;
      } catch (error) {
        console.log("Error fetching BMI plan:", error);
        dispatch({ type: GET_BMIPLAN_FAILURE, payload: error.message });
      }
    };

};

export const updateWeightAndHeight = (jwt, weight, height,planId) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_WEIGHT_HEIGHT_REQUEST });
      try {
        const requestBody = { currentWeight: weight, height:height };
        const { data } = await api.put(`/api/users/update-weight-height/${planId}`, requestBody, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        });
        dispatch({ type: UPDATE_WEIGHT_HEIGHT_SUCCESS, payload: data });
        console.log("Weight and height updated successfully", data);
      } catch (error) {
        console.log("Error updating weight and height:", error);
        dispatch({ type: UPDATE_WEIGHT_HEIGHT_FAILURE, payload: error.message });
      }
    };

};

export const fetchUserDetailsByToken = (jwt) => {
    return async (dispatch) => {
      dispatch({ type: FETCH_USER_DETAILS_REQUEST });
  
      try {
        const { data } = await api.get('/api/users/userdetails', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
  
        dispatch({ type: FETCH_USER_DETAILS_SUCCESS, payload: data });
        console.log('User details fetched successfully:', data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        dispatch({ type: FETCH_USER_DETAILS_FAILURE, payload: error.message });
      }
    };
  };

  export const fetchActiveBmiPlans = (jwt) => {
    return async (dispatch) => {
      dispatch({ type: GET_ACTIVE_PLANS_REQUEST });
      try {
        const { data } = await api.get("/api/bmi-plans/active-plans", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        dispatch({ type: GET_ACTIVE_PLANS_SUCCESS, payload: data });
        console.log("Active BMI plans fetched successfully", data);
      } catch (error) {
        console.log("Error fetching active BMI plans:", error);
        dispatch({ type: GET_ACTIVE_PLANS_FAILURE, payload: error.message });
      }
    };
  };
  
  