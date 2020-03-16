import ActionType from './actionType';

export function showLoginModal() {
  return { type: ActionType.SHOW_LOGIN_MODAL };
}

export function hideLoginModal() {
  return { type: ActionType.HIDE_LOGIN_MODAL };
}
