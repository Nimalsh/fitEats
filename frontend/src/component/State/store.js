import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Authentication/Reducer";
import cartReducer from "./Cart/Reducer";
import ingredientReducer from "./ingredients/Reduecr";
import menuItemReducer from "./Menu/Reducer";
import NutrionReducer from "./Nutrion/Reducer";

import orderReducer from "./Order/Reducer";
import restaurantOrderReducer from "./Restaurant Order/Reducer";

import restaurantReducer from "./Restaurant/Reducer";


import planReducer from "./Plan/Reducer";
import requestReducer from "./Requests/Reducer";
import  bmiReducer from "./Bmi/Reducer";

import complaintReducer from "./complain/Reducer";
import { eventReducer } from "./event/Reducer";


const rootReducer =combineReducers({
  auth:authReducer,
  restaurant:restaurantReducer,
  menu:menuItemReducer,
  cart:cartReducer,
  order:orderReducer,
  restaurantOrder:restaurantOrderReducer,
  ingredients:ingredientReducer,

  foodItems:restaurantReducer,

  nutrion:NutrionReducer,
  event:restaurantReducer,
  foodDetails:menuItemReducer,
  plan: planReducer, 
  request:requestReducer,
  bmi:bmiReducer,

  nutrion:NutrionReducer,
  complaint:complaintReducer,
  event:eventReducer

});

export const store= legacy_createStore(rootReducer,applyMiddleware(thunk))