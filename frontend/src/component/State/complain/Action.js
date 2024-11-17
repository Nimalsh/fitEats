import { api } from '../../config/api';

import {
  FIND_COMPLAINT_REQUEST,
  FIND_COMPLAINT_SUCCESS,
  FIND_COMPLAINT_FAILURE,
  CLEAR_COMPLAINT_REQUEST,
  CLEAR_COMPLAINT_SUCCESS,
  CLEAR_COMPLAINT_FAILURE,
  GET_ALL_COMPLAINTS_REQUEST,
  GET_ALL_COMPLAINTS_SUCCESS,
  GET_ALL_COMPLAINTS_FAILURE,
  ADD_COMPLAINT_REQUEST,
  ADD_COMPLAINT_SUCCESS,
  ADD_COMPLAINT_FAILURE,
  UPDATE_COMPLAINT_REQUEST,
  UPDATE_COMPLAINT_SUCCESS,
  UPDATE_COMPLAINT_FAILURE,
  REMOVE_COMPLAINT_REQUEST,
  REMOVE_COMPLAINT_SUCCESS,
  REMOVE_COMPLAINT_FAILURE,
} from "./ActionType";

// Find a specific complaint by ID
export const findComplaint = (complaintId, token) => {
  return async (dispatch) => {
    dispatch({ type: FIND_COMPLAINT_REQUEST });
    try {
      const response = await api.get(`/api/complaints/${complaintId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: FIND_COMPLAINT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FIND_COMPLAINT_FAILURE, payload: error.message });
    }
  };
};

// Clear all complaints (e.g., after resolving)
export const clearComplaints = (token) => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_COMPLAINT_REQUEST });
    try {
      const response = await api.delete('/api/complaints/clear', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: CLEAR_COMPLAINT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CLEAR_COMPLAINT_FAILURE, payload: error.message });
    }
  };
};

// Get all complaints
export const getAllComplaints = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_COMPLAINTS_REQUEST });
    try {
      const response = await api.get('/api/complaints', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_ALL_COMPLAINTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ALL_COMPLAINTS_FAILURE, payload: error.message });
    }
  };
};

// Add a new complaint
export const addComplaint = (complaintData, token) => {
  return async (dispatch) => {
    dispatch({ type: ADD_COMPLAINT_REQUEST });
    try {
      const response = await api.post('/api/complaints', complaintData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: ADD_COMPLAINT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ADD_COMPLAINT_FAILURE, payload: error.message });
    }
  };
};

// Update a complaint
export const updateComplaint = (complaintId, updatedData, token) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_COMPLAINT_REQUEST });
    try {
      const response = await api.put(`/api/complaints/${complaintId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: UPDATE_COMPLAINT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: UPDATE_COMPLAINT_FAILURE, payload: error.message });
    }
  };
};

// Remove a complaint
export const removeComplaint = (complaintId, token) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_COMPLAINT_REQUEST });
    try {
      await api.delete(`/api/complaints/${complaintId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: REMOVE_COMPLAINT_SUCCESS, payload: complaintId });
    } catch (error) {
      dispatch({ type: REMOVE_COMPLAINT_FAILURE, payload: error.message });
    }
  };
};
