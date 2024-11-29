import { api } from "../../config/api";
import {
  GET_QUERIES_REQUEST,
  GET_QUERIES_SUCCESS,
  GET_QUERIES_FAILURE,
  GET_QUERY_BY_ID_REQUEST,
  GET_QUERY_BY_ID_SUCCESS,
  GET_QUERY_BY_ID_FAILURE,
  CREATE_QUERY_REQUEST,
  CREATE_QUERY_SUCCESS,
  CREATE_QUERY_FAILURE,
  ADD_REPLY_REQUEST,
  ADD_REPLY_SUCCESS,
  ADD_REPLY_FAILURE,
  GET_USER_QUERIES_REQUEST,
  GET_USER_QUERIES_SUCCESS,
  GET_USER_QUERIES_FAILURE,
  GET_NUTRITIONIST_QUERIES_REQUEST,
  GET_NUTRITIONIST_QUERIES_SUCCESS,
  GET_NUTRITIONIST_QUERIES_FAILURE,
} from "./ActionType";

// Fetch all queries
export const getQueries = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_QUERIES_REQUEST });
    try {
      const { data } = await api.get(`/api/queries/all`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      dispatch({ type: GET_QUERIES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_QUERIES_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

// Fetch query by ID
export const getQueryById = (jwt, queryId) => {
  return async (dispatch) => {
    dispatch({ type: GET_QUERY_BY_ID_REQUEST });
    try {
      const { data } = await api.get(`/api/queries/${queryId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      dispatch({ type: GET_QUERY_BY_ID_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_QUERY_BY_ID_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

// Create a new query
export const createQuery = (jwt, queryString) => {
    return async (dispatch) => {
      dispatch({ type: CREATE_QUERY_REQUEST });
      try {
        const { data } = await api.post(
          `/api/queries/add-query`,
          queryString.trim(), // Send only the query string
          {
            headers: { 
              Authorization: `Bearer ${jwt}`, 
              'Content-Type': 'text/plain'  // Ensure the content type is 'text/plain'
            },
          }
        );
        dispatch({ type: CREATE_QUERY_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: CREATE_QUERY_FAILURE,
          payload: error.response ? error.response.data : error.message,
        });
      }
    };
  };
  

// Add a reply to a query
export const addReply = (jwt, queryId, reply) => {
    return async (dispatch) => {
      dispatch({ type: ADD_REPLY_REQUEST });
      try {
        const { data } = await api.post(
          `/api/queries/add-reply/${queryId}`, // Include the queryId in the URL
          reply.trim(), // The reply in the request body
          {
            headers: {
              Authorization: `Bearer ${jwt}`, // Authorization header with JWT
              'Content-Type': 'text/plain' 
            },
          }
        );
        dispatch({ type: ADD_REPLY_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: ADD_REPLY_FAILURE,
          payload: error.response ? error.response.data : error.message,
        });
      }
    };
  };

  export const getUserQueries = (jwt) => {
    return async (dispatch) => {
      dispatch({ type: GET_USER_QUERIES_REQUEST });
      try {
        const { data } = await api.get(`/api/queries/user/queries`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: GET_USER_QUERIES_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: GET_USER_QUERIES_FAILURE,
          payload: error.response ? error.response.data : error.message,
        });
      }
    };
  };
  
  // Fetch queries for a nutritionist (from JWT token)
  export const getNutritionistQueries = (jwt) => {
    return async (dispatch) => {
      dispatch({ type: GET_NUTRITIONIST_QUERIES_REQUEST });
      try {
        const { data } = await api.get(`/api/queries/nutritionist/queries`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        dispatch({ type: GET_NUTRITIONIST_QUERIES_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: GET_NUTRITIONIST_QUERIES_FAILURE,
          payload: error.response ? error.response.data : error.message,
        });
      }
    };
  };
  
  
