import ActionType from '../actions/actionType';
import { REST_STATUS } from '../utils/constants';

const initState = {
  isLoggedIn: false,
  loginReqStatus: REST_STATUS.INIT,
  signupReqStatus: REST_STATUS.INIT,
  user: null,
  error: null,
  accessToken: null,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case `${ActionType.LOGIN}_PENDING`: {
      return {
        ...state,
        loginReqStatus: REST_STATUS.LOADING,
      };
    }
    case `${ActionType.LOGIN}_FULFILLED`: {
      return {
        ...state,
        isLoggedIn: true,
        loginReqStatus: REST_STATUS.SUCCESS,
        user: action.payload.data.userData,
        accessToken: action.payload.data.accessToken,
        error: null,
      };
    }
    case `${ActionType.LOGIN}_REJECTED`: {
      return {
        ...state,
        isLoggedIn: false,
        loginReqStatus: REST_STATUS.ERROR,
        error: action.payload.response,
      };
    }
    case `${ActionType.SIGNUP_REQ}_PENDING`: {
      return {
        ...state,
        signupReqStatus: REST_STATUS.LOADING,
      };
    }
    case `${ActionType.SIGNUP_REQ}_FULFILLED`: {
      return {
        ...state,
        isLoggedIn: true,
        signupReqStatus: REST_STATUS.SUCCESS,
        user: action.payload.data.userData,
        accessToken: action.payload.data.accessToken,
        error: null,
      };
    }
    case `${ActionType.SIGNUP_REQ}_REJECTED`: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        accessToken: null,
        signupReqStatus: REST_STATUS.ERROR,
        error: action.payload.response,
      };
    }
    case ActionType.SIGN_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
        accessToken: null,
      };
    }
    case ActionType.SET_AUTH: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.userData,
        error: null,
        accessToken: action.payload.accessToken,
      };
    }
    default:
  }
  return state;
}
