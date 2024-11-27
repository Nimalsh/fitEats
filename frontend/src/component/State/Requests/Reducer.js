import {
  CREATE_REQUEST_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_FAILURE,
  GET_REQUESTS_BY_NUTRITIONIST_REQUEST,
  GET_REQUESTS_BY_NUTRITIONIST_SUCCESS,
  GET_REQUESTS_BY_NUTRITIONIST_FAILURE,
  GET_REQUEST_BY_ID_REQUEST,
  GET_REQUEST_BY_ID_SUCCESS,
  GET_REQUEST_BY_ID_FAILURE,
  COMPLETE_REQUEST_BY_PLAN_ID_REQUEST,
  COMPLETE_REQUEST_BY_PLAN_ID_SUCCESS,
  COMPLETE_REQUEST_BY_PLAN_ID_FAILURE,
  GET_USER_REQUESTS_REQUEST,
  GET_USER_REQUESTS_SUCCESS,
  GET_USER_REQUESTS_FAILURE,
  UPDATE_REQUEST_STATUS_REQUEST,
  UPDATE_REQUEST_STATUS_SUCCESS,
  UPDATE_REQUEST_STATUS_FAILURE,
  GET_REQUEST_BY_PLAN_ID_REQUEST,
  GET_REQUEST_BY_PLAN_ID_SUCCESS,
  GET_REQUEST_BY_PLAN_ID_FAILURE,
  UPDATE_ACHIEVED_WEIGHT_REQUEST,
  UPDATE_ACHIEVED_WEIGHT_SUCCESS,
  UPDATE_ACHIEVED_WEIGHT_FAILURE,
  UPDATE_REQUEST_DESCRIPTION_AND_COMPLETE_REQUEST,
  UPDATE_REQUEST_DESCRIPTION_AND_COMPLETE_SUCCESS,
  UPDATE_REQUEST_DESCRIPTION_AND_COMPLETE_FAILURE,
  UPDATE_REQUEST_COMMENT_REQUEST,
  UPDATE_REQUEST_COMMENT_SUCCESS,
  UPDATE_REQUEST_COMMENT_FAILURE
} from './ActionType';

const initialState = {
  requests: [],
  requestById: null,
  requestByPlanId: null,
  loading: false,
  error: null,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REQUEST_REQUEST:
    case GET_REQUESTS_BY_NUTRITIONIST_REQUEST:
    case GET_REQUEST_BY_ID_REQUEST:
    case COMPLETE_REQUEST_BY_PLAN_ID_REQUEST:
    case GET_USER_REQUESTS_REQUEST:
    case UPDATE_REQUEST_STATUS_REQUEST:
    case GET_REQUEST_BY_PLAN_ID_REQUEST:
      case UPDATE_ACHIEVED_WEIGHT_REQUEST:
        case UPDATE_REQUEST_DESCRIPTION_AND_COMPLETE_REQUEST:
          case UPDATE_REQUEST_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: [...state.requests, action.payload],
      };

    case GET_REQUESTS_BY_NUTRITIONIST_SUCCESS:
    case GET_USER_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: action.payload,
      };

    case GET_REQUEST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        requestById: action.payload,
      };

    case COMPLETE_REQUEST_BY_PLAN_ID_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_REQUEST_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
        };
        case GET_REQUEST_BY_PLAN_ID_SUCCESS:
          return {
            ...state,
            loading: false,
            requestByPlanId: action.payload,
          };

          case UPDATE_ACHIEVED_WEIGHT_SUCCESS:
            return {
              ...state,
              loading: false,
              // Update the specific request if needed
              requests: state.requests.map((request) =>
                request.planId === action.payload.planId ? action.payload : request
              ),
            };
            case UPDATE_REQUEST_DESCRIPTION_AND_COMPLETE_SUCCESS:
              return {
                ...state,
                loading: false,
                // Optionally update the specific request in state here if needed
              };
              case UPDATE_REQUEST_COMMENT_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  // Optionally update the specific request in state here if needed
                };
        
      

    case CREATE_REQUEST_FAILURE:
    case GET_REQUESTS_BY_NUTRITIONIST_FAILURE:
    case GET_REQUEST_BY_ID_FAILURE:
    case COMPLETE_REQUEST_BY_PLAN_ID_FAILURE:
    case GET_USER_REQUESTS_FAILURE:
    case UPDATE_REQUEST_STATUS_FAILURE:
    case GET_REQUEST_BY_PLAN_ID_FAILURE:
    case UPDATE_ACHIEVED_WEIGHT_FAILURE:
      case UPDATE_REQUEST_DESCRIPTION_AND_COMPLETE_FAILURE:
    case UPDATE_REQUEST_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default requestReducer;
