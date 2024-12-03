import { api } from "../../config/api";
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
  GET_ALL_NUTRITIONIST_REQUESTS_REQUEST,
  GET_ALL_NUTRITIONIST_REQUESTS_SUCCESS,
  GET_ALL_NUTRITIONIST_REQUESTS_FAILURE,
  GET_DOCUMENT_REQUEST,
  GET_DOCUMENT_SUCCESS,
  GET_DOCUMENT_FAILURE,
} from "./ActionType";

export const createNutritionistRequest = (requestData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_NUTRITIONIST_REQUEST });

    try {
      const formData = new FormData();
      formData.append("fullName", requestData.fullName);
      formData.append("email", requestData.email);
      formData.append("qualifications", requestData.qualifications);
      formData.append("experience", requestData.experience);
      formData.append("specializations", requestData.specializations);
      formData.append("documents", requestData.documents);

      const response = await api.post(`/auth/nutritionist-request`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({ type: CREATE_NUTRITIONIST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_NUTRITIONIST_FAILURE, payload: error.message });
    }
  };
};

export const checkNutritionistRequestByEmail = (email) => {
    return async (dispatch) => {
      dispatch({ type: CHECK_NUTRITIONIST_REQUEST });
  
      try {
        const response = await api.post(`/auth/check-nutritionist-request`, null, {
          params: { email },
        });
        dispatch({ type: CHECK_NUTRITIONIST_REQUEST_SUCCESS, payload: response.data });
  
        // Return the response data to use in the component
        return response.data; // return the result so it can be used in the component
      } catch (error) {
        dispatch({ type: CHECK_NUTRITIONIST_REQUEST_FAILURE, payload: error.message });
        throw new Error(error.message); // Propagate error if needed
      }
    };
  };
  
  export const checkNutritionistRequestConfirmed = (email) => {
    return async (dispatch) => {
      dispatch({ type: CHECK_NUTRITIONIST_REQUEST_CONFIRMED });
  
      try {
        const response = await api.post(`/auth/check-nutritionist-request-confirmed`, null, {
          params: { email },
        });
        dispatch({ type: CHECK_NUTRITIONIST_REQUEST_CONFIRMED_SUCCESS, payload: response.data });
  
        // Return the response data to use in the component
        return response.data; // return the result so it can be used in the component
      } catch (error) {
        dispatch({ type: CHECK_NUTRITIONIST_REQUEST_CONFIRMED_FAILURE, payload: error.message });
        throw new Error(error.message); // Propagate error if needed
      }
    };
  };

  export const getNutritionistById = (id) => {
    return async (dispatch) => {
      dispatch({ type: GET_NUTRITIONIST_BY_ID_REQUEST });
  
      try {
        const response = await api.get(`/auth/nutritionist/${id}`);
        dispatch({ type: GET_NUTRITIONIST_BY_ID_SUCCESS, payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: GET_NUTRITIONIST_BY_ID_FAILURE, payload: error.message });
        throw new Error(error.message);
      }
    };
  };

  export const getAllNutritionistRequests = (token) => {
    return async (dispatch) => {
      dispatch({ type: GET_ALL_NUTRITIONISTS_REQUEST });
      try {
        const response = await api.get(`/api/nutritionists/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        dispatch({
          type: GET_ALL_NUTRITIONISTS_SUCCESS,
          payload: response.data,
        });
        console.log("Fetched all nutritionist requests successfully");
      } catch (error) {
        console.error("Error fetching all nutritionist requests:", error);
        dispatch({
          type: GET_ALL_NUTRITIONISTS_FAILURE,
          payload: error.message,
        });
      }
    };
  };
  
  export const getDocumentByRequestId = (requestId, token) => {
    return async (dispatch) => {
      dispatch({ type: GET_DOCUMENT_REQUEST });
  
      try {
        const response = await api.get(`/api/nutritionists/${requestId}/document`, {
          responseType: "blob", // Ensures the response is treated as binary data
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        });
  
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `document-${requestId}.pdf`);
        document.body.appendChild(link);
        link.click();
  
        dispatch({ type: GET_DOCUMENT_SUCCESS });
      } catch (error) {
        dispatch({ type: GET_DOCUMENT_FAILURE, payload: error.message });
      }
    };
  };

  export const getAllRequests = (token) => {
    return async (dispatch) => {
      dispatch({ type: GET_ALL_NUTRITIONIST_REQUESTS_REQUEST });
      console.log("disaptching");
      try {
        const response = await api.get("/api/nutritionists/admin/requests/all", {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        });
        dispatch({
          type: GET_ALL_NUTRITIONIST_REQUESTS_SUCCESS,
          payload: response.data,
          
        });

        console.log("disaptching",response.data);
      } catch (error) {
        dispatch({
          type: GET_ALL_NUTRITIONIST_REQUESTS_FAILURE,
          payload: error.message,
        });
      }
    };
  };
  