import { LOGOUT } from "../Authentication/ActionType";
import * as actionTypes from "./ActionType";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FIND_CART_REQUEST:
    case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
    case actionTypes.UPDATE_CARTITEM_REQUEST:
    case actionTypes.REMOVE_CARTITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case actionTypes.CLEAR_CART_SUCCESS:
    case actionTypes.FIND_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        cartItems:action.payload.items,
        loading: false,
      };

    case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: [action.payload, ...state.cartItems],
      };

      case actionTypes.UPDATE_CARTITEM_SUCCESS:
  return {
    ...state,
    cartItems: state.cartItems.map((cartItem) =>
      cartItem.id === action.payload.id
        ? { ...cartItem, quantity: action.payload.quantity, totalPrice: action.payload.totalPrice }
        : cartItem
    ),
  };



    // case actionTypes.GET_ALL_CART_ITEMS_SUCCESS:
    //   return {
    //     ...state,
    //     cartItem: action.payload,
    //     loading: false,
    //     error: null,
    //   };

   
 
    case actionTypes.REMOVE_CARTITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload), // Correct key is cartItems
        loading: false,
      };

    case actionTypes.FIND_CART_FAILURE:
    case actionTypes.UPDATE_CARTITEM_FAILURE:
    case actionTypes.REMOVE_CARTITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("jwt");
      return {...state,cartItem:[],cart:null,success:"logout success"};


    default:
      return state;
  }
};

export default cartReducer;
