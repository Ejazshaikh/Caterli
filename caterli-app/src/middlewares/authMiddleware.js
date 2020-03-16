import ActionType from '../actions/actionType';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  if (
    action.type === `${ActionType.LOGIN}_FULFILLED` ||
    action.type === `${ActionType.SIGNUP_REQ}_FULFILLED`
  ) {
    localStorage.setItem('auth', JSON.stringify(action.payload.data));
  }

  if (action.type === ActionType.SIGN_OUT) {
    localStorage.removeItem('auth');
  }
};
