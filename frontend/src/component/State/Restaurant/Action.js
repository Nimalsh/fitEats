// import {api} from "../../../config/api";

import { GET_ALL_RESTAURANTS_FAILURE, GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS, GET_RESTAURANT_BY_ID_REQUEST } from "./ActionType";


export const getAllRestaurantsAction = (token) =>{
  return async (dispatch) => {
    dispatch({type:GET_ALL_RESTAURANTS_REQUEST});
    try{
      const{data} = await api.get("/api/restaurants",{
        header:{
          Authorization: `Bearer${token}`,
        },
      });
      dispatch({type:GET_ALL_RESTAURANTS_SUCCESS,payload:data});
      console.log("all restaurant",data);
    }catch(error){
      console.log("catch error",error)
      dispatch({type:GET_ALL_RESTAURANTS_FAILURE,payload:error});
    }
  }
}

export const getRstaurantById =(reqData)=>{
  return async(dispatch)=>{
    dispatch({type:GET_RESTAURANT_BY_ID_REQUEST});
  }
}