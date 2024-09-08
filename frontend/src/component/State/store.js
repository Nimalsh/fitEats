import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import orderReducer from "./Order/Reducer";
import ingredientReducer from "./ingredients/Reduecr";
import restaurantOrderReducer from "./Restaurant Order/Reducer";
import NutrionReducer from "./Nutrion/Reducer";
import complaintReducer from "./complain/Reducer";

const rootReducer =combineReducers({
  auth:authReducer,
  restaurant:restaurantReducer,
  menu:menuItemReducer,
  cart:cartReducer,
  order:orderReducer,
  restaurantOrder:restaurantOrderReducer,
  ingredients:ingredientReducer,
  nutrion:NutrionReducer,
  complaintReducer:complaintReducer,

});

export const store= legacy_createStore(rootReducer,applyMiddleware(thunk))