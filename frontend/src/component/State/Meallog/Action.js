// src/redux/actions/MealLogAction.js

import { api } from "../../config/api";
import {
  CREATE_OR_UPDATE_MEALLOG_REQUEST,
  CREATE_OR_UPDATE_MEALLOG_SUCCESS,
  CREATE_OR_UPDATE_MEALLOG_FAILURE,
  ADD_MEAL_TO_LOG_REQUEST,
  ADD_MEAL_TO_LOG_SUCCESS,
  ADD_MEAL_TO_LOG_FAILURE,
  GET_MEALS_BY_DATE_REQUEST,
  GET_MEALS_BY_DATE_SUCCESS,
  GET_MEALS_BY_DATE_FAILURE,
  UPDATE_NUTRITION_REQUEST,
  UPDATE_NUTRITION_SUCCESS,
  UPDATE_NUTRITION_FAILURE,
  GET_NUTRITION_REQUEST,
  GET_NUTRITION_SUCCESS,
  GET_NUTRITION_FAILURE,
  GET_MEALLOG_STATUS_REQUEST,
  GET_MEALLOG_STATUS_SUCCESS,
  GET_MEALLOG_STATUS_FAILURE,
} from "./ActionType";

// Action to create or update a meal log
export const createOrUpdateMeallog = (date, jwtToken) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_OR_UPDATE_MEALLOG_REQUEST });

    try {
      const { data } = await api.post(`/api/meallog`, null, {
        params: { date },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      dispatch({
        type: CREATE_OR_UPDATE_MEALLOG_SUCCESS,
        payload: data,
      });
      console.log("Meal log created or updated successfully", data);
      return data;
    } catch (error) {
      console.log("Error creating or updating meal log:", error);
      dispatch({
        type: CREATE_OR_UPDATE_MEALLOG_FAILURE,
        payload: error.message,
      });
    }
  };
};

// Action to add a meal to the log
export const addMealToLog = (date, mealType, item, measurement, quantity, jwtToken) => {
  return async (dispatch) => {
    dispatch({ type: ADD_MEAL_TO_LOG_REQUEST });

    try {
      const queryParams = new URLSearchParams({
        date,
        mealType,
        item,
        measurement,
        quantity,
      }).toString();

      const { data } = await api.post(`/api/meallog/addMeal?${queryParams}`, null, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      dispatch({ type: ADD_MEAL_TO_LOG_SUCCESS, payload: "Meal added successfully" });
      console.log("Meal added successfully", data);
      return data;
    } catch (error) {
      console.log("Error adding meal to log:", error);
      dispatch({ type: ADD_MEAL_TO_LOG_FAILURE, payload: error.message });
    }
  };
};

// Action to get meals by date
export const getMealsByDate = (date, jwtToken) => {
  return async (dispatch) => {
    dispatch({ type: GET_MEALS_BY_DATE_REQUEST });

    try {
      const queryParams = new URLSearchParams({ date }).toString();

      const { data } = await api.get(`/api/meallog/meals?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      dispatch({ type: GET_MEALS_BY_DATE_SUCCESS, payload: data });
      console.log("Meals fetched successfully by date", data);
      return data;
    } catch (error) {
      console.log("Error fetching meals by date:", error);
      dispatch({ type: GET_MEALS_BY_DATE_FAILURE, payload: error.message });
    }
  };
};

export const updateNutritionValues = (date, nutritionValues, jwt) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_NUTRITION_REQUEST });
    try {
      await api.put(`/api/update-nutrition/${date}`, nutritionValues, {
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

export const getNutritionValues = (date, jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_NUTRITION_REQUEST });
    try {
      const { data } = await api.get(`/api/get-nutrition/${date}`, {
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
// Action to get the Meallog status by date
export const getMeallogStatusByDate = (date, jwtToken) => {
  return async (dispatch) => {
    dispatch({ type: GET_MEALLOG_STATUS_REQUEST });

    try {
      // Directly include date in the URL string
      const { data } = await api.get(`/api/meallog/status/${date}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      dispatch({ type: GET_MEALLOG_STATUS_SUCCESS, payload: data });
      console.log("Meallog status fetched successfully", data);
      return data;
    } catch (error) {
      console.log("Error fetching Meallog status:", error);
      dispatch({ type: GET_MEALLOG_STATUS_FAILURE, payload: error.message });
      throw error; // Optional: propagate the error for further handling if needed
    }
  };
};



