
import axios from "axios"
import { ADD_TO_FAVOURITE_FAILURE, ADD_TO_FAVOURITE_REQUEST, ADD_TO_FAVOURITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { API_URL, api } from "../../config/api"

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else if (data.role === "ROLE_NUTRITION") {
      reqData.navigate("/nutri");
    } else {
      reqData.navigate("/my-profile/dashboard");
    }
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    console.log("Register success", data);
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
    console.log("Error", error);
  }
};

export const loginUser=(reqData)=>async(dispatch)=>{
  dispatch({type:LOGIN_REQUEST})
  try{
    const {data} =await  axios.post(`${API_URL}/auth/signin`,reqData.userData)
    if(data.jwt)localStorage.setItem("jwt",data.jwt);
    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else if (data.role === "ROLE_NUTRITION") {
      reqData.navigate("/nutri"); // Add the appropriate route for nutritionists
    } else {
      reqData.navigate("/my-profile/dashboard");
    }
    dispatch({type:LOGIN_SUCCESS,payload:data.jwt})
    console.log("login success",data)
  }catch(error){
    dispatch({type:LOGIN_FAILURE,payload:error})
    console.log("error",error)
  }
}

export const getUser=(jwt)=>async(dispatch)=>{
  dispatch({type:GET_USER_REQUEST})
  try{
    const {data} =await  api.get(`/api/users/profile`,{
      headers:{
        Authorization:`Bearer ${jwt}`
      }
    })
   
    dispatch({type:GET_USER_SUCCESS,payload:data})
    console.log("user profile",data)
  }catch(error){
    dispatch({type:LOGIN_FAILURE,payload:error})
    console.log("error",error)
  }
}
export const addToFavorites = (restaurantId) => async (dispatch) => {
  const jwt = localStorage.getItem('jwt');  // Get JWT token from local storage

  dispatch({ type: 'ADD_TO_FAVOURITE_REQUEST' });

  try {
      // Send a PUT request to add the restaurant to favorites
      const { data } = await axios.put(
          `/api/restaurant/${restaurantId}/add-favorites`, // Correct URL format
          {},  // No body needed for this request
          {
              headers: {
                  Authorization: `Bearer ${jwt}`,  // Add the JWT token to the Authorization header
              },
          }
      );

      // Dispatch the success action with the updated restaurant data
      dispatch({ type: 'ADD_TO_FAVOURITE_SUCCESS', payload: data });
  } catch (error) {
      // Dispatch the failure action if there's an error
      dispatch({
          type: 'ADD_TO_FAVOURITE_FAILURE',
          payload: error.response?.data || error.message,
      });
  }
};


export const logout=()=>async(dispatch)=>{
  try{
    
    localStorage.clear();
    dispatch({type:LOGOUT})
    console.log("logout success",)
  }catch(error){
    console.log("error",error)
  }
};

export const updateProfile = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "UPDATE_PROFILE_REQUEST" });

  try {
    const jwt = localStorage.getItem("jwt");
    const { data } = await axios.put(
      `${API_URL}/api/users/profile`,
      formData,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: data });
    navigate("/my-profile/dashboard");
  } catch (error) {
    dispatch({
      type: "UPDATE_PROFILE_FAILURE",
      payload: error.response?.data?.message || error.message,
    });
  }
};
