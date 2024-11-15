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
  } from "./ActionType";
  
  const initialState = {
    nutritionistRequest: null,
    loading: false,
    error: null,
    successMessage: null,
    requestExists: false,
    requestConfirmed: false,
  };
  
  const nutritionistReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_NUTRITIONIST_REQUEST:
      case CHECK_NUTRITIONIST_REQUEST:
      case CHECK_NUTRITIONIST_REQUEST_CONFIRMED:
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
  
      case CREATE_NUTRITIONIST_FAILURE:
      case CHECK_NUTRITIONIST_REQUEST_FAILURE:
      case CHECK_NUTRITIONIST_REQUEST_CONFIRMED_FAILURE:
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
  