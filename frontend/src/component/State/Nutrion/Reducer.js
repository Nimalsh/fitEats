import {
  GET_NUTRITION_DATA_SUCCESS,
  GET_NUTRITION_DATA_FAILURE,
  // other imports...
} from "./ActionType";

const initialState = {
  ingredients: [],
  update: null,
  category: [],
  nutritionData: null,
};

const NutrionReducer = (state = initialState, action) => {
  switch (action.type) {
    // other cases...
    
    case GET_NUTRITION_DATA_SUCCESS:
      return {
        ...state,
        nutritionData: action.payload,
      };

    case GET_NUTRITION_DATA_FAILURE:
      return {
        ...state,
        nutritionData: null,
      };

    default:
      return state;
  }
};

export default NutrionReducer;
