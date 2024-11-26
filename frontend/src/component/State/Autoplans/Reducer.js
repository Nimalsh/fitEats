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

const initialState = {
  plans: [],
  planData: {},
  loading: false,
  error: null,
  totalMealCount: 0,
  currentMealplan: null, // State to hold meal plan data
  updateMessage: "",
  userRequests:[]
};

const autoplansReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PLAN_REQUEST:
    case GET_PLAN_DATA_REQUEST:
    case UPDATE_MEAL_STATUS_REQUEST:
    case GET_TOTAL_MEAL_COUNT_REQUEST:
    case GET_PLAN_BY_ID_REQUEST:
    case COMPLETE_MEALPLAN_REQUEST:
      case UPDATE_MEAL_REQUEST:
        case UPDATE_MEAL_WEIGHT_REQUEST:
          case GET_REQUESTS_BY_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        plans: [...state.plans, action.payload],
      };

    case GET_PLAN_DATA_SUCCESS:
      return {
        ...state,
        planData: {
          ...state.planData,
          [action.payload.daysId]: {
            breakfast: action.payload.breakfast,
            lunch: action.payload.lunch,
            dinner: action.payload.dinner,
            breakfastIngredients: action.payload.breakfastIngredients,
            lunchIngredients: action.payload.lunchIngredients,
            dinnerIngredients: action.payload.dinnerIngredients,
            breakfastImage: action.payload.breakfastImage,
            lunchImage: action.payload.lunchImage,
            dinnerImage: action.payload.dinnerImage,
            breakfaststatus: action.payload.breakfaststatus,
            lunchstatus: action.payload.lunchstatus,
            dinnerstatus: action.payload.dinnerstatus,
          },
        },
        loading: false,
      };

    case GET_PLAN_BY_ID_SUCCESS: 
      return {
        ...state,
        loading: false,
        currentMealplan: action.payload, // Store detailed plan data here
      };

    case COMPLETE_MEALPLAN_SUCCESS: 
      return {
        ...state,
        loading: false,
        currentMealplan: action.payload, // Update completed meal plan data here
        plans: state.plans.map((plan) =>
          plan.planId === action.payload.planId ? action.payload : plan
        ),
      };

    case UPDATE_MEAL_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case GET_TOTAL_MEAL_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        totalMealCount: action.payload,
      };
      case UPDATE_MEAL_SUCCESS: // Handle meal update success
      return {
        ...state,
        loading: false,
        // Assuming the response includes a message like "Meal updated successfully for day 1 and meal type dinner"
        updateMessage: action.payload, // Store the success message or data
      };

      case UPDATE_MEAL_WEIGHT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentMealplan: action.payload, // Update meal plan with the new weight
        updateMessage: "Meal plan weight updated successfully",
      };

      case GET_REQUESTS_BY_TOKEN_SUCCESS: // Handle success for fetching requests by token
      return {
        ...state,
        loading: false,
        userRequests: action.payload, // Store fetched requests here
      };



    case CREATE_PLAN_FAILURE:
    case GET_PLAN_DATA_FAILURE:
    case UPDATE_MEAL_STATUS_FAILURE:
    case GET_TOTAL_MEAL_COUNT_FAILURE:
    case GET_PLAN_BY_ID_FAILURE:
    case COMPLETE_MEALPLAN_FAILURE:
    case UPDATE_MEAL_FAILURE:
    case UPDATE_MEAL_WEIGHT_FAILURE:
      case GET_REQUESTS_BY_TOKEN_FAILURE: 
      
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default autoplansReducer;
