import { isPresentInFavorites } from "../../config/logic";
import {
  ADD_TO_FAVOURITE_FAILURE,
  ADD_TO_FAVOURITE_REQUEST,
  ADD_TO_FAVOURITE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

const initialState = {
  isLoading: false,
  error: null,
  jwt: null,
  favorites: [], // Ensure favorites is always initialized as an array
  success: null,
  user: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case ADD_TO_FAVOURITE_REQUEST:
      return { ...state, isLoading: true, error: null, success: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        success: "Register Success",
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        favorites: Array.isArray(action.payload.favorites) ? action.payload.favorites : [],
      };

    case ADD_TO_FAVOURITE_SUCCESS:
      const newFavorites = isPresentInFavorites(state.favorites, action.payload)
        ? state.favorites.filter((item) => item.id !== action.payload.id)
        : [action.payload, ...state.favorites];
      return {
        ...state,
        isLoading: false,
        error: null,
        favorites: newFavorites,
      };

    case LOGOUT:
      return initialState;
      
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case ADD_TO_FAVOURITE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: null,
      };

      case "UPDATE_PROFILE_REQUEST":
  return { ...state, isLoading: true, error: null };

case "UPDATE_PROFILE_SUCCESS":
  return { ...state, isLoading: false, user: action.payload, success: "Profile updated successfully!" };

case "UPDATE_PROFILE_FAILURE":
  return { ...state, isLoading: false, error: action.payload };


    default:
      return state;
  }
};


