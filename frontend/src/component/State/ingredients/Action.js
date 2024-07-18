import { api } from "../../../config/api";
import {
  CREATE_INGREDIENT_REQUEST,
  CREATE_INGREDIENT_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  CREATE_INGREDIENT_CATEGORY_REQUEST,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  GET_INGREDIENT_CATEGORY_REQUEST,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  GET_INGREDIENT_CATEGORY_FAILURE,
  UPDATE_STOCK,
} from "./ActionType";

// Create Ingredient
export const createIngredient = ({data,jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/api/admin/ingredients", data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("error",error);
    }
  };
};

// Create Ingredient Category
export const createIngredientCategory = ({data,jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/api/admin/ingredients/category", data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("error",error);
    }
  };
};

// Get Ingredient Categories for a Restaurant
export const getIngredientCategories = ({id, jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/api/admin/ingredients/restaurant/${id}/category`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: response.data });
    } catch (error) {
      
      console.log("error",error);
    }
  };
};


export const getIngredientsOfRestaurant = ({id, jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/api/admin/ingredients/restaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_INGREDIENTS, payload: response.data });
    } catch (error) {
      console.log("error",error);
    }
  };
};

// Update Ingredient Stock
export const updateStockOfIngredient = ({id, jwt}) => {
  return async (dispatch) => {
    try {
      const {data} = await api.put(`/api/admin/ingredients/${id}/stock`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: UPDATE_STOCK, payload: data });
    } catch (error) {
      console.log("error",error);
    }
  };
};