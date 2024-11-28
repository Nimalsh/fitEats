 import axios from "axios";
import { api } from "../../config/api";

import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  GET_ALL_RESTAURANTS_REQUEST,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_FOOD_ITEMS_BY_CATEGORY_FAILURE,
  GET_FOOD_ITEMS_BY_CATEGORY_REQUEST,
  GET_FOOD_ITEMS_BY_CATEGORY_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  GET_RESTAURANTS_EVENTS_FAILURE,
  GET_RESTAURANTS_EVENTS_REQUEST,
  GET_RESTAURANTS_EVENTS_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
} from "./ActionType";

export const getAllRestaurantsAction = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
    try {
      const { data } = await api.get("/api/restaurant", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
      console.log("all restaurant", data);
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error });
    }
  };
};

export const getRestaurantById = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
      const response = await api.get(`api/restaurant/${reqData.restaurantId}`, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
      dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
    }
  };
};

// export const getRestaurantByUserId = (jwt) => {
//   return async (dispatch) => {
//     dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
//     try {
//       const { data } = await api.get(`/api/admin/restaurant/user`, {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       console.log("get restaurant by user id ", data);
//       dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
//     } catch (error) {
//       console.log("error", error);
//       dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error.message });
//     }
//   };
//  };

 
export const getRestaurantByUserId = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
      const { data } = await api.get(`/api/admin/restaurant/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get restaurant by user id ", data);
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error.message });
    }
  };
};


// export const createRestaurant = (reqData) => {
//   console.log("token---------", reqData.token);
//   return async (dispatch) => {
//     dispatch({ type: CREATE_RESTAURANT_REQUEST });
//     try {
//       const { data } = await api.post(`/api/admin/restaurant`, reqData.data, {
//         headers: {
//           Authorization: `Bearer ${reqData.token}`,
//         },
//       });
//       dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
//       console.log("create restaurant", data);
//     } catch (error) {
//       console.log("error", error);
//       dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
//     }
//   };
// };

export const createRestaurant = (reqData) => {
  console.log("token---------", reqData.token);  // Check token safely
  return async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });

    try {
      const { data } = await api.post(`/api/admin/restaurant`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });

      dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
      console.log("create restaurant", data);  // Log the response for debugging
    } catch (error) {
      console.error("Error creating restaurant:", error.response ? error.response.data : error.message);
      dispatch({ 
        type: CREATE_RESTAURANT_FAILURE, 
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};


export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
      const res = await api.put(`api/admin/restaurant/${restaurantId}`, restaurantData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
    }
  };
};

export const deleteRestaurant = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });
    try {
      const res = await api.delete(`api/admin/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete restaurant", res.data);
      dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const updateRestaurantStatus = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
      const res = await api.put(`api/admin/restaurants/${restaurantId}/status`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("ressss", res.data);
      dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
    }
  };
};

// export const createEventAction = ({ data, jwt, restaurantId }) => {
//   return async (dispatch) => {
//     dispatch({ type: CREATE_EVENTS_REQUEST });
//     try {
//       const res = await api.post(`api/admin/events/restaurant/${restaurantId}`, data, {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       console.log("create event", res.data);
//       dispatch({ type: CREATE_EVENTS_SUCCESS, payload: res.data });
//     } catch (error) {
//       console.log("error", error);
//       dispatch({ type: CREATE_EVENTS_FAILURE, payload: error });
//     }
//   };
// };

// export const createEventAction = ({ data, jwt, restaurantId }) => {
//   return async (dispatch) => {
//     dispatch({ type: CREATE_EVENTS_REQUEST });
//     try {
//       const res = await api.post(`api/admin/events/restaurant/${restaurantId}`, data, {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       console.log("create event", res.data);
//       dispatch({ type: CREATE_EVENTS_SUCCESS, payload: res.data });
//     } catch (error) {
//       console.error("Error creating event:", error.response?.data || error.message);
//       dispatch({ type: CREATE_EVENTS_FAILURE, payload: error.response?.data || error.message });
//     }
//   };
// };

export const createEventAction = ({ data, jwt  }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_EVENTS_REQUEST });
    try {
      const res = await api.post(`api/admin/events`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      
      dispatch({ type: CREATE_EVENTS_SUCCESS, payload: res.data });
      console.log("create event", res.data);
    } catch (error) {
      console.error("Error", error);
      dispatch({ type: CREATE_EVENTS_FAILURE, payload: error });
    }
  };
};




export const deleteEventAction = ({ eventId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENTS_REQUEST });
    try {
      const res = await api.delete(`api/admin/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete events", res.data);
      dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: DELETE_EVENTS_FAILURE, payload: error });
    }
  };
};


// export const getAllEvents = (jwt) => async (dispatch) => {
//   dispatch({ type:GET_ALL_EVENTS_REQUEST });
//   try {
//     const res = await api.get("/api/events", {
//       headers: { Authorization: `Bearer ${jwt}` },
//     });
//     console.log("delete events", res.data);
//     dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
//   } catch (error) {
//     dispatch({ type:GET_ALL_EVENTS_FAILURE, payload: error.message });
//   }
// };

// export const getRestaurantsEvents = ({ restaurantId, jwt }) => {
//   return async (dispatch) => {
//     dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
//     try {
//       const res = await api.get(`api/admin/events/restaurant/${restaurantId}`, {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       console.log("get restaurants event ", res.data);
//       dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: res.data });
//     } catch (error) {
//       console.log("error", error);
//       dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: error });
//     }
//   };
// };

// export const getRestaurantsEvents = ({reqData}) => {
//   return async (dispatch) => {
//     dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
//     try {
//       const {data} = await api.get(`api/admin/events/restaurant/${reqData.restaurantId}`, {
//         headers: {
//           Authorization: `Bearer ${reqData.jwt}`,
//         },
//       });
//       dispatch({
//         type:  GET_RESTAURANTS_EVENTS_SUCCESS,
//         payload: data,
//       });
//       console.log("get restaurants event ", data); 
//     } catch (error) {
//       console.log("error", error);
//       dispatch({
//         type: GET_RESTAURANTS_EVENTS_FAILURE,
//         payload: error,
//       }); 
//     }
//   };
// };


export const getRestaurantsEvents = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
      dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
      try {
          const { data } = await api.get(`api/admin/events/restaurant/${restaurantId}`, {
              headers: {
                  Authorization: `Bearer ${jwt}`,
              },
          });
          dispatch({
              type: GET_RESTAURANTS_EVENTS_SUCCESS,
              payload: data,
          });
          console.log("get restaurants event ", data); 
      } catch (error) {
          console.log("error", error);
          dispatch({
              type: GET_RESTAURANTS_EVENTS_FAILURE,
              payload: error,
          }); 
      }
  };
};

export const createCategoryAction = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      const res = await api.post(`api/admin/category`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create category", res.data);
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getRestaurantsCategory = ({ jwt, restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
    try {
      const res = await api.get(`api/category/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get restaurants category ", res.data);
      dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
    }
  };
};

// src/component/State/Restaurant/Action.js

export const getFoodItemsByCategory = ({ categoryId, jwt }) => async (dispatch) => {
  dispatch({ type: GET_FOOD_ITEMS_BY_CATEGORY_REQUEST });
  
  try {
    const response = await axios.get(`/api/food-items?category_id=${categoryId}`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    dispatch({
      type: GET_FOOD_ITEMS_BY_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_FOOD_ITEMS_BY_CATEGORY_FAILURE,
      payload: error.message,
    });
  }
};
