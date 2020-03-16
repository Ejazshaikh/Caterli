import ActionType from '../actions/actionType';
import { REST_STATUS } from '../utils/constants';

const initState = {
  showLoginModal: false,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case ActionType.SHOW_LOGIN_MODAL: {
      return {
        ...state,
        showLoginModal: true,
      };
    }
    case ActionType.HIDE_LOGIN_MODAL: {
      return {
        ...state,
        showLoginModal: false,
      };
    }
    default:
  }
  return state;
}
