// src/redux/reducers/MealLogReducer.js

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
  
  // Initial State
  const initialState = {
    mealLog: null,
    mealsByDate: [],
    nutrition: [],
    meallogStatus: null,
    loading: false,
    error: null,
  };
  
  // MealLog Reducer
  const MeallogReducer = (state = initialState, action) => {
    switch (action.type) {
      // CREATE OR UPDATE MEALLOG
      case CREATE_OR_UPDATE_MEALLOG_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case CREATE_OR_UPDATE_MEALLOG_SUCCESS:
        return {
          ...state,
          loading: false,
          mealLog: action.payload,
          error: null,
        };
  
      case CREATE_OR_UPDATE_MEALLOG_FAILURE:
        return {
          ...state,
          loading: false,
          error: "Failed to create or update meal log.",
        };
  
      // ADD MEAL TO LOG
      case ADD_MEAL_TO_LOG_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case ADD_MEAL_TO_LOG_SUCCESS:
        return {
          ...state,
          loading: false,
          mealLog: action.payload,
          error: null,
        };
  
      case ADD_MEAL_TO_LOG_FAILURE:
        return {
          ...state,
          loading: false,
          error: "Failed to add meal to log.",
        };
  
      // GET MEALS BY DATE
      case GET_MEALS_BY_DATE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case GET_MEALS_BY_DATE_SUCCESS:
        return {
          ...state,
          loading: false,
          mealsByDate: action.payload,
          error: null,
        };
  
      case GET_MEALS_BY_DATE_FAILURE:
        return {
          ...state,
          loading: false,
          error: "Failed to fetch meals by date.",
        };

      case UPDATE_NUTRITION_REQUEST:
      case GET_NUTRITION_REQUEST:
      case GET_MEALLOG_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
        };

        case UPDATE_NUTRITION_SUCCESS:
        return {
          ...state,
          loading: false,
          // Optionally handle nutrition update response
        };
      case UPDATE_NUTRITION_FAILURE:
      case GET_NUTRITION_FAILURE:
      case GET_MEALLOG_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

        case GET_NUTRITION_SUCCESS:
        return {
          ...state,
          loading: false,
          nutrition: action.payload,
        };
        case GET_MEALLOG_STATUS_SUCCESS:
          return {
            ...state,
            loading: false,
            meallogStatus: action.payload,
          };

  
      // Default case to return the state unchanged
      default:
        return state;
    }
  };
  
  export default MeallogReducer;
  