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
  
  const initialState = {
    bmiPlan: null,
    meals: {
      breakfasts: [],
      lunches: [],
      dinners: [],
      snacks: [],
    },
    nutrition: [],
    activePlans: [],
    userDetails: null,
    loading: false,
    error: null,
  };
  
  const bmiPlanReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_BMIPLAN_REQUEST:
      case ADD_MEAL_REQUEST:
      case FETCH_MEALS_REQUEST:
      case FETCH_NUTRITION_REQUEST:
      case UPDATE_NUTRITION_REQUEST:
      case GET_NUTRITION_REQUEST:
      case GET_BMIPLAN_REQUEST: 
      case UPDATE_WEIGHT_HEIGHT_REQUEST:
      case FETCH_USER_DETAILS_REQUEST:
      case GET_ACTIVE_PLANS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_BMIPLAN_SUCCESS:
        return {
          ...state,
          loading: false,
          bmiPlan: action.payload,
        };
      case ADD_MEAL_SUCCESS:
        return {
          ...state,
          loading: false,
          // Optionally handle added meal response
        };
      case FETCH_MEALS_SUCCESS:
        return {
          ...state,
          loading: false,
          meals: action.payload,
        };
      case FETCH_NUTRITION_SUCCESS:
        return {
          ...state,
          loading: false,
          nutrition: action.payload,
        };
      case UPDATE_NUTRITION_SUCCESS:
        return {
          ...state,
          loading: false,
          // Optionally handle nutrition update response
        };
      case GET_NUTRITION_SUCCESS:
        return {
          ...state,
          loading: false,
          nutrition: action.payload,
        };

    case GET_BMIPLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        bmiPlan: action.payload,
        error: null, // Clear any existing errors
      };

      case UPDATE_WEIGHT_HEIGHT_SUCCESS:
        return {
          ...state,
          loading: false,
          // Optionally handle weight and height update response
        };
        case FETCH_USER_DETAILS_SUCCESS:
            return {
              ...state,
              loading: false,
              userDetails: action.payload,
            };
        case GET_ACTIVE_PLANS_SUCCESS: // Handle success state for fetching active plans
            return {
              ...state,
              loading: false,
              activePlans: action.payload, // Store active plans in state
              error: null, // Clear any existing errors
            };
      case CREATE_BMIPLAN_FAILURE:
      case ADD_MEAL_FAILURE:
      case FETCH_MEALS_FAILURE:
      case FETCH_NUTRITION_FAILURE:
      case UPDATE_NUTRITION_FAILURE:
      case GET_NUTRITION_FAILURE:
      case GET_BMIPLAN_FAILURE:
      case UPDATE_WEIGHT_HEIGHT_FAILURE:
      case FETCH_USER_DETAILS_FAILURE:
      case GET_ACTIVE_PLANS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default bmiPlanReducer;
  