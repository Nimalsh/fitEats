import * as actionTypes from "./ActionType";

const initialState = {
  restaurants: [],
  usersRestaurant: null,
  restaurant: null,
  loading: false,
  error: null,
  events: [],
  restaurantsEvents: [],
  categories: [],
  foodItems: [],
};
   
const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RESTAURANTS_EVENTS_REQUEST:
    case actionTypes.CREATE_RESTAURANT_REQUEST:
    case actionTypes.GET_ALL_RESTAURANTS_REQUEST:
    case actionTypes.DELETE_RESTAURANT_REQUEST:
    case actionTypes.UPDATE_RESTAURANT_REQUEST:
    case actionTypes.GET_RESTAURANT_BY_ID_REQUEST:
    case actionTypes.CREATE_CATEGORY_REQUEST:
    case actionTypes.GET_RESTAURANTS_CATEGORY_REQUEST:
    case actionTypes.GET_FOOD_ITEMS_BY_CATEGORY_REQUEST:
    // case actionTypes.GET_ALL_EVENTS_REQUEST:  
      return {
        ...state,
        loading: true,
        error: null,
      };
      case actionTypes.GET_RESTAURANT_BY_ID_SUCCESS:
        console.log("Reducer received restaurant details:", action.payload);
        return {
          ...state,
          loading: false,
          restaurant: action.payload,
        };
      
    case actionTypes.CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        usersRestaurant: action.payload
      };

    case actionTypes.GET_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
      };

    case actionTypes.GET_FOOD_ITEMS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
      };

    case actionTypes.GET_FOOD_ITEMS_BY_CATEGORY_SUCCESS:
      return {
        ...state, 
        loading: false, 
        foodItems: action.payload,
      }

    case actionTypes.GET_RESTAURANT_BY_USER_ID_SUCCESS:
    case actionTypes.UPDATE_RESTAURANT_STATUS_SUCCESS:
    case actionTypes.UPDATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        usersRestaurant: action.payload,
      };

    case actionTypes.DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        error:null,
        loading: false,
        restaurants: state.restaurants.filter(
          // (restaurant) => restaurant.id !== action.payload
          (item)=> item.id !== action.payload
        ),
        usersRestaurant: state.usersRestaurant.filter(
          (item) => item.id !== action.payload
        ),
      };

    case actionTypes.CREATE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: [...state.events, action.payload],
        restaurantsEvents: [...state.restaurantsEvents, action.payload],
      };

    // case actionTypes.GET_ALL_EVENTS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     events: action.payload,
    //   };

    case actionTypes.DELETE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter(
          (item) => item.id !== action.payload
          // (event) => event.id !== action.payload
        ),
        restaurantsEvents: state.restaurantsEvents.filter(
          (item) => item.id !== action.payload
          // (event) => event.id !== action.payload
        ),
      };

    case actionTypes.GET_RESTAURANTS_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurantsEvents: action.payload,
      };

    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };

    case actionTypes.GET_RESTAURANTS_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case actionTypes.GET_RESTAURANTS_EVENTS_FAILURE:
    case actionTypes.GET_ALL_RESTAURANTS_FAILURE:
    case actionTypes.UPDATE_RESTAURANT_FAILURE:
    case actionTypes.GET_RESTAURANT_BY_ID_FAILURE:
    case actionTypes.CREATE_RESTAURANT_FAILURE:
    case actionTypes.DELETE_RESTAURANT_FAILURE:
    case actionTypes.DELETE_EVENTS_FAILURE:
    case actionTypes.CREATE_CATEGORY_FAILURE:
    case actionTypes.GET_RESTAURANTS_CATEGORY_FAILURE:
    case actionTypes.GET_FOOD_ITEMS_BY_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default restaurantReducer;
