import {
  CREATE_NUTRITIONIST_REQUEST,
  CREATE_NUTRITIONIST_SUCCESS,
  CREATE_NUTRITIONIST_FAILURE,
  CHECK_NUTRITIONIST_REQUEST,
  CHECK_NUTRITIONIST_REQUEST_SUCCESS,
  CHECK_NUTRITIONIST_REQUEST_FAILURE,
  CHECK_NUTRITIONIST_REQUEST_CONFIRMED,
  CHECK_NUTRITIONIST_REQUEST_CONFIRMED_SUCCESS,
  CHECK_NUTRITIONIST_REQUEST_CONFIRMED_FAILURE,
  GET_NUTRITIONIST_BY_ID_REQUEST,
  GET_NUTRITIONIST_BY_ID_SUCCESS,
  GET_NUTRITIONIST_BY_ID_FAILURE,
  GET_ALL_NUTRITIONISTS_REQUEST,
  GET_ALL_NUTRITIONISTS_SUCCESS,
  GET_ALL_NUTRITIONISTS_FAILURE,
} from "./ActionType";

const initialState = {
  nutritionistRequest: null,
  loading: false,
  error: null,
  successMessage: null,
  requestExists: false,
  requestConfirmed: false,
  nutritionistById: null,  // New state for fetched nutritionist data
  allNutritionists: [],
};

const nutritionistReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NUTRITIONIST_REQUEST:
    case CHECK_NUTRITIONIST_REQUEST:
    case CHECK_NUTRITIONIST_REQUEST_CONFIRMED:
    case GET_NUTRITIONIST_BY_ID_REQUEST:
      case GET_ALL_NUTRITIONISTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case CREATE_NUTRITIONIST_SUCCESS:
      return {
        ...state,
        loading: false,
        nutritionistRequest: action.payload,
        successMessage: "Nutritionist request submitted successfully",
      };

    case CHECK_NUTRITIONIST_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        requestExists: action.payload,
      };

    case CHECK_NUTRITIONIST_REQUEST_CONFIRMED_SUCCESS:
      return {
        ...state,
        loading: false,
        requestConfirmed: action.payload,
      };

    // Handle success for fetching nutritionist by ID
    case GET_NUTRITIONIST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        nutritionistById: action.payload,
      };
      case GET_ALL_NUTRITIONISTS_SUCCESS:
        return {
          ...state,
          loading: false,
          allNutritionists: action.payload,
        };

    case CREATE_NUTRITIONIST_FAILURE:
    case CHECK_NUTRITIONIST_REQUEST_FAILURE:
    case CHECK_NUTRITIONIST_REQUEST_CONFIRMED_FAILURE:
    case GET_NUTRITIONIST_BY_ID_FAILURE:
    case GET_ALL_NUTRITIONISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default nutritionistReducer;
