import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import orderReducer from "./Order/Reducer";
import ingredientReducer from "./ingredients/Reduecr";
import restaurantOrderReducer from "./Restaurant Order/Reducer";
import planReducer from "./Plan/Reducer";
import requestReducer from "./Requests/Reducer";
import  bmiReducer from "./Bmi/Reducer";
const rootReducer =combineReducers({
  auth:authReducer,
  restaurant:restaurantReducer,
  menu:menuItemReducer,
  cart:cartReducer,
  order:orderReducer,
  restaurantOrder:restaurantOrderReducer,
  ingredients:ingredientReducer,
  plan: planReducer, 
  request:requestReducer,
  bmi:bmiReducer
});

export const store= legacy_createStore(rootReducer,applyMiddleware(thunk))