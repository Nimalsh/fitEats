import { api } from "../../config/api";
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

// Fetch all articles
export const getArticles = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_ARTICLES_REQUEST });
    try {
      const { data } = await api.get(`/articles`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      dispatch({ type: GET_ARTICLES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ARTICLES_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

// Fetch article by ID
export const getArticleById = (jwt, articleId) => {
  return async (dispatch) => {
    dispatch({ type: GET_ARTICLE_BY_ID_REQUEST });
    try {
      const { data } = await api.get(`/articles/${articleId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      dispatch({ type: GET_ARTICLE_BY_ID_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: GET_ARTICLE_BY_ID_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

// Create a new article
export const createArticle = (jwt, articleData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ARTICLE_REQUEST });
    try {
      const { data } = await api.post(`/articles/create`, articleData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "multipart/form-data", // Ensure the correct content type for multipart/form-data
        },
      });
      dispatch({ type: CREATE_ARTICLE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_ARTICLE_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

export const updateArticle = (jwt, articleId, articleData) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_ARTICLE_REQUEST });
      try {
        const { data } = await api.put(`/articles/update/${articleId}`, articleData, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        dispatch({ type: UPDATE_ARTICLE_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: UPDATE_ARTICLE_FAILURE,
          payload: error.response ? error.response.data : error.message,
        });
      }
    };
  };
  

// Delete an article
export const deleteArticle = (jwt, articleId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ARTICLE_REQUEST });
    try {
      await api.delete(`/api/articles/${articleId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      dispatch({ type: DELETE_ARTICLE_SUCCESS, payload: articleId });
    } catch (error) {
      dispatch({
        type: DELETE_ARTICLE_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

// Fetch articles by user
export const getUserArticles = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_ARTICLES_REQUEST });
    try {
      const { data } = await api.get(`/api/articles/author`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      dispatch({ type: GET_USER_ARTICLES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_USER_ARTICLES_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};
