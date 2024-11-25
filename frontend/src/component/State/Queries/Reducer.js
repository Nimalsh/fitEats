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
  
  const initialState = {
    loading: false,
    queries: [],
    nutritionistQueries: [],
    query: null,
    error: null,
  };
  
  const queriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_QUERIES_REQUEST:
      case GET_QUERY_BY_ID_REQUEST:
      case CREATE_QUERY_REQUEST:
      case ADD_REPLY_REQUEST:
        case GET_USER_QUERIES_REQUEST:
            case GET_NUTRITIONIST_QUERIES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case GET_QUERIES_SUCCESS:
        return {
          ...state,
          loading: false,
          queries: action.payload,
        };
  
      case GET_QUERY_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          query: action.payload,
        };
  
      case CREATE_QUERY_SUCCESS:
      case ADD_REPLY_SUCCESS:
        return {
          ...state,
          loading: false,
        };
        case GET_USER_QUERIES_SUCCESS:
            return {
              ...state,
              loading: false,
              queries: action.payload,
            };
      
          case GET_NUTRITIONIST_QUERIES_SUCCESS:
            return {
              ...state,
              loading: false,
              nutritionistQueries: action.payload,
            };
      
  
      case GET_QUERIES_FAILURE:
      case GET_QUERY_BY_ID_FAILURE:
      case CREATE_QUERY_FAILURE:
      case ADD_REPLY_FAILURE:
        case GET_USER_QUERIES_FAILURE:
            case GET_NUTRITIONIST_QUERIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default queriesReducer;
  