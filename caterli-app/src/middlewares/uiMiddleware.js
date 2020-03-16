import ActionType from '../actions/actionType';
import { hideLoginModal } from '../actions/uiActions';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  if (
    action.type === `${ActionType.LOGIN}_FULFILLED` ||
    action.type === `${ActionType.SIGNUP_REQ}_FULFILLED`
  ) {
    dispatch(hideLoginModal());
  }
};
