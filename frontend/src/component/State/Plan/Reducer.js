import * as actionTypes from "./ActionType";
import { LOGOUT } from "../Authentication/ActionType";

const initialState = {
  plan: null,
  planData: {},
  mealStatus: {}, 
  completedMealsCount: 0, 
  loading: false,
  error: null,
};

const planReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PLAN_REQUEST:
    case actionTypes.SET_BREAKFAST_REQUEST:
    case actionTypes.SET_LUNCH_REQUEST:
    case actionTypes.SET_DINNER_REQUEST:
    case actionTypes.GET_PLAN_DATA_REQUEST:
    case actionTypes.UPDATE_PLAN_STATUS_REQUEST:
    case actionTypes.UPDATE_MEAL_STATUS_REQUEST:
    case actionTypes.GET_MEAL_STATUS_REQUEST: 
    case actionTypes.COUNT_COMPLETED_MEALS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.CREATE_PLAN_SUCCESS:
      return {
        ...state,
        plan: action.payload,
        loading: false,
      };

    case actionTypes.SET_BREAKFAST_SUCCESS:
    case actionTypes.SET_LUNCH_SUCCESS:
    case actionTypes.SET_DINNER_SUCCESS:
    case actionTypes.UPDATE_PLAN_STATUS_SUCCESS:
    case actionTypes.UPDATE_MEAL_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
      case actionTypes.GET_MEAL_STATUS_SUCCESS:  // Updated case for GET_MEAL_STATUS_SUCCESS
      return {
        ...state,
        mealStatus: {
          ...state.mealStatus,
          [action.payload.daysId]: {
            breakfast: action.payload.breakfast,
            lunch: action.payload.lunch,
            dinner: action.payload.dinner,
          },
        },
        loading: false,
      };
      

    case actionTypes.GET_PLAN_DATA_SUCCESS:
      return {
        ...state,
        planData: {
          ...state.planData,
          [action.payload.daysId]: {
            breakfast: action.payload.breakfast,
            lunch: action.payload.lunch,
            dinner: action.payload.dinner,
          },
        },
        loading: false,
      };

      case actionTypes.COUNT_COMPLETED_MEALS_SUCCESS:
      return {
        ...state,
        completedMealsCount: action.payload,
        loading: false,
      };

    case actionTypes.CREATE_PLAN_FAILURE:
    case actionTypes.SET_BREAKFAST_FAILURE:
    case actionTypes.SET_LUNCH_FAILURE:
    case actionTypes.SET_DINNER_FAILURE:
    case actionTypes.GET_PLAN_DATA_FAILURE:
    case actionTypes.UPDATE_PLAN_STATUS_FAILURE:
    case actionTypes.UPDATE_MEAL_STATUS_FAILURE:
    case actionTypes.UPDATE_MEAL_STATUS_FAILURE:
    case actionTypes.GET_MEAL_STATUS_FAILURE:
      case actionTypes.COUNT_COMPLETED_MEALS_FAILURE:

      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        plan: null,
        planData: {},
        mealStatus: {},
        completedMealsCount: 0, 
        error: null,
        mealStatus: null,  
      };

    default:
      return state;
  }
};

export default planReducer;
