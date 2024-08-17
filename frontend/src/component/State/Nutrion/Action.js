
import { api } from "../../config/api";
import { GET_NUTRITION_DATA_SUCCESS, GET_NUTRITION_DATA_FAILURE } from "./ActionType";

export const fetchNutritionData = (foodName) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/nutrition-content?foodName=${encodeURIComponent(foodName)}`);
      
      if (response.status === 200) {
        dispatch({ type: GET_NUTRITION_DATA_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: GET_NUTRITION_DATA_FAILURE });
        console.error('Failed to fetch nutrition data');
      }
    } catch (error) {
      dispatch({ type: GET_NUTRITION_DATA_FAILURE });
      console.error('Error fetching nutrition data:', error);
    }
  };
};
