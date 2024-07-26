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
  favorite: [],
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
          favorite:action.payload.favorites
        };
    case ADD_TO_FAVOURITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        favorite: isPresentInFavorites(state.favorite, action.payload)
          ? state.favorite.filter((item) => item.id !== action.payload.id)
          : [action.payload, ...state.favorite],
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

    default:
      return state;
  }
};
