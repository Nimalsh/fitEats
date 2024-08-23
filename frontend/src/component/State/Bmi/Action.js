import { api } from "../../config/api";
import {
  CREATE_BMIPLAN_REQUEST,
  CREATE_BMIPLAN_SUCCESS,
  CREATE_BMIPLAN_FAILURE,
} from "./ActionType";

// Create BMI Plan
export const createBmiplan = (duration, weight, height, bmi, target, jwt, navigate) => {
  return async (dispatch) => {
    
    dispatch({ type: CREATE_BMIPLAN_REQUEST });
    try {
      // Prepare the request body
      const requestBody = {
        duration,
        weight,
        height,
        bmi,
        target,
      };
     
      // Call API to create the BMI plan
      const { data } = await api.post("/api/bmi-plans/create", requestBody, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });
      
      dispatch({ type: CREATE_BMIPLAN_SUCCESS, payload: data });
      const time = data.duration;
      const planId = data.planId;
      console.log("BMI plan created", data);


      // Navigate to the next view, adjust path as needed
      navigate(`/my-profile/BMI/plan/${time}/${planId}`); 

    } catch (error) {
      console.log("Error creating BMI plan:", error);
      dispatch({ type: CREATE_BMIPLAN_FAILURE, payload: error.message });
    }
  };
};
