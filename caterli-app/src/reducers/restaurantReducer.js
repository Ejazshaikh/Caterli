import ActionType from '../actions/actionType';
import { REST_STATUS } from '../utils/constants';

const initState = {
  restaurantListReq: {
    data: null,
    status: REST_STATUS.INIT,
    error: null,
  },
  restaurantReq: {
    data: null,
    status: REST_STATUS.INIT,
    error: null,
  },
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case `${ActionType.FETCH_RESTAURANTS_REQ}_PENDING`: {
      return {
        ...state,
        restaurantListReq: {
          ...state.restaurantListReq,
          status: REST_STATUS.LOADING,
        },
      };
    }
    case `${ActionType.FETCH_RESTAURANTS_REQ}_FULFILLED`: {
      return {
        ...state,
        restaurantListReq: {
          ...state.restaurantListReq,
          status: REST_STATUS.SUCCESS,
          data: action.payload.data,
          error: null,
        },
      };
    }
    case `${ActionType.FETCH_RESTAURANTS_REQ}_REJECTED`: {
      return {
        ...state,
        restaurantListReq: {
          ...state.restaurantListReq,
          status: REST_STATUS.ERROR,
          data: null,
          error: action.payload.response,
        },
      };
    }

    case `${ActionType.SEARCH_RESTAURANTS}_PENDING`: {
      return {
        ...state,
        restaurantListReq: {
          ...state.restaurantListReq,
          status: REST_STATUS.LOADING,
        },
      };
    }
    case `${ActionType.SEARCH_RESTAURANTS}_FULFILLED`: {
      return {
        ...state,
        restaurantListReq: {
          ...state.restaurantListReq,
          status: REST_STATUS.SUCCESS,
          data: action.payload.data,
          error: null,
        },
      };
    }
    case `${ActionType.SEARCH_RESTAURANTS}_REJECTED`: {
      return {
        ...state,
        restaurantListReq: {
          ...state.restaurantListReq,
          status: REST_STATUS.ERROR,
          data: null,
          error: action.payload.response,
        },
      };
    }

    case `${ActionType.FETCH_RESTAURANT_REQ}_PENDING`: {
      return {
        ...state,
        restaurantReq: {
          ...state.restaurantReq,
          status: REST_STATUS.LOADING,
        },
      };
    }
    case `${ActionType.FETCH_RESTAURANT_REQ}_FULFILLED`: {
      return {
        ...state,
        restaurantReq: {
          ...state.restaurantReq,
          status: REST_STATUS.SUCCESS,
          data: action.payload.data,
          error: null,
        },
      };
    }
    case `${ActionType.FETCH_RESTAURANT_REQ}_REJECTED`: {
      return {
        ...state,
        restaurantReq: {
          ...state.restaurantReq,
          status: REST_STATUS.ERROR,
          data: null,
          error: action.payload.response,
        },
      };
    }
    default:
  }
  return state;
}
