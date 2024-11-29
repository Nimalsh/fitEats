import {
    GET_ARTICLES_REQUEST,
    GET_ARTICLES_SUCCESS,
    GET_ARTICLES_FAILURE,
    GET_ARTICLE_BY_ID_REQUEST,
    GET_ARTICLE_BY_ID_SUCCESS,
    GET_ARTICLE_BY_ID_FAILURE,
    CREATE_ARTICLE_REQUEST,
    CREATE_ARTICLE_SUCCESS,
    CREATE_ARTICLE_FAILURE,
    UPDATE_ARTICLE_REQUEST,
    UPDATE_ARTICLE_SUCCESS,
    UPDATE_ARTICLE_FAILURE,
    DELETE_ARTICLE_REQUEST,
    DELETE_ARTICLE_SUCCESS,
    DELETE_ARTICLE_FAILURE,
    GET_USER_ARTICLES_REQUEST,
    GET_USER_ARTICLES_SUCCESS,
    GET_USER_ARTICLES_FAILURE,
  } from "./ActionType";
  
  const initialState = {
    loading: false,
    articles: [],
    article: null,
    userArticles: [],
    error: null,
  };
  
  const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ARTICLES_REQUEST:
      case GET_ARTICLE_BY_ID_REQUEST:
      case CREATE_ARTICLE_REQUEST:
      case UPDATE_ARTICLE_REQUEST:
      case DELETE_ARTICLE_REQUEST:
      case GET_USER_ARTICLES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case GET_ARTICLES_SUCCESS:
        return {
          ...state,
          loading: false,
          articles: action.payload,
        };
  
      case GET_ARTICLE_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          article: action.payload,
        };
  
      case CREATE_ARTICLE_SUCCESS:
      case UPDATE_ARTICLE_SUCCESS:
        return {
          ...state,
          loading: false,
        };
  
      case DELETE_ARTICLE_SUCCESS:
        return {
          ...state,
          loading: false,
          articles: state.articles.filter((article) => article.id !== action.payload),
        };
  
      case GET_USER_ARTICLES_SUCCESS:
        return {
          ...state,
          loading: false,
          userArticles: action.payload,
        };
  
      case GET_ARTICLES_FAILURE:
      case GET_ARTICLE_BY_ID_FAILURE:
      case CREATE_ARTICLE_FAILURE:
      case UPDATE_ARTICLE_FAILURE:
      case DELETE_ARTICLE_FAILURE:
      case GET_USER_ARTICLES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default articlesReducer;
  