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


} from "./ActionType";

// Create BMI Plan
export const createBmiplan = (duration, weight, height, bmi, target, jwt, navigate) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_BMIPLAN_REQUEST });
    try {
      const requestBody = { duration, weight, height, bmi, target };
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

export const fetchNutritionData = (foodName, quantity, jwt) => {
    return async (dispatch) => {
      dispatch({ type: FETCH_NUTRITION_REQUEST });
      try {
        const { data } = await api.get(`/api/nutrition/data?foodName=${foodName}&quantity=${quantity}`, {
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
      } catch (error) {
        console.log("Error fetching nutrition values:", error);
        dispatch({ type: GET_NUTRITION_FAILURE, payload: error.message });
      }
    };
  };
  