import ActionType from '../actions/actionType';
import { REST_STATUS } from '../utils/constants';

const initState = {
  orderReq: {
    data: null,
    status: REST_STATUS.INIT,
    error: null,
  },
};

export default function orderReducer(state = initState, action) {
  switch (action.type) {
    case `${ActionType.ORDER_REQ}_PENDING`: {
      return {
        ...state,
        orderReq: {
          ...state.orderReq,
          status: REST_STATUS.LOADING,
        },
      };
    }
    case `${ActionType.ORDER_REQ}_FULFILLED`: {
      return {
        ...state,
        orderReq: {
          ...state.orderReq,
          status: REST_STATUS.SUCCESS,
          data: action.payload.data,
          error: null,
        },
      };
    }
    case `${ActionType.ORDER_REQ}_REJECTED`: {
      return {
        ...state,
        orderReq: {
          ...state.orderReq,
          status: REST_STATUS.ERROR,
          data: null,
          error: action.payload.response,
        },
      };
    }
    case ActionType.INIT_ORDER_REQ: {
      return {
        ...state,
        orderReq: {
          ...initState.orderReq,
        },
      };
    }
    default:
  }
  return state;
}
