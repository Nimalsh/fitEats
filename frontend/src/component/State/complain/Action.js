import { api } from '../../config/api';
// actions.js// actions.js// src/State/complain/Action.js
import axios from "axios";
import {
  ADD_COMPLAINT_REQUEST,
  ADD_COMPLAINT_SUCCESS,
  ADD_COMPLAINT_FAILURE,
  FETCH_COMPLAINTS_REQUEST,
  FETCH_COMPLAINTS_SUCCESS,
  FETCH_COMPLAINTS_FAILURE,
  DELETE_COMPLAINT_REQUEST,
  DELETE_COMPLAINT_SUCCESS,
  DELETE_COMPLAINT_FAILURE,
  FETCH_USER_COMPLAINTS_REQUEST,
  FETCH_USER_COMPLAINTS_SUCCESS,
  FETCH_USER_COMPLAINTS_FAILURE,
} from "./ActionType";

// Base API URL
const API_URL = "/api/complaint";

// Add Complaint
export const addComplaint = (payload ) => {
  return async (dispatch) => {
  dispatch({ type: ADD_COMPLAINT_REQUEST });

  try {
    const {response} = await api.post(`/api/complaint`, payload, {
      headers: { Authorization: `Bearer ${payload.jwt}` },
    });
    dispatch({ type: ADD_COMPLAINT_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: ADD_COMPLAINT_FAILURE, payload: error.message });
  }
};
};



// Delete Complaint by ID
export const deleteComplaint = (id) => async (dispatch) => {
  dispatch({ type: DELETE_COMPLAINT_REQUEST });

  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: DELETE_COMPLAINT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_COMPLAINT_FAILURE, payload: error.message });
  }
};


// Fetch Complaints by User ID
export const fetchUserComplaints = (reqData) => async (dispatch) => {
  dispatch({ type: FETCH_USER_COMPLAINTS_REQUEST });
  try {
    const response = await api.get(`/api/complaint/user/${reqData.userId}`, {
      headers: { Authorization: `Bearer ${reqData.jwt}` },
    });
    dispatch({ type: FETCH_USER_COMPLAINTS_SUCCESS, payload: response.data });
    
  } catch (error) {
    dispatch({ type: FETCH_USER_COMPLAINTS_FAILURE, payload: error.message });
  }
};