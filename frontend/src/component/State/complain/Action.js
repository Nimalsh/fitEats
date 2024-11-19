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

// Fetch All Complaints
export const fetchComplaints = () => async (dispatch) => {
  dispatch({ type: FETCH_COMPLAINTS_REQUEST });

  try {
    const response = await axios.get(API_URL);
    dispatch({ type: FETCH_COMPLAINTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_COMPLAINTS_FAILURE, payload: error.message });
  }
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
