import {
    CREATE_BMIPLAN_REQUEST,
    CREATE_BMIPLAN_SUCCESS,
    CREATE_BMIPLAN_FAILURE,
  } from "./ActionType";
  
  const initialState = {
    bmiPlan: null,
    loading: false,
    error: null,
  };
  
  const bmiPlanReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_BMIPLAN_REQUEST:
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
      case CREATE_BMIPLAN_FAILURE:
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
  