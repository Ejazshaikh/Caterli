import ActionType from './actionType';
import { loginReq, signupReq } from '../ServerHandler';

export function sendLoginReq(email, password) {
  return { type: ActionType.LOGIN, payload: { promise: loginReq({ email, password }) } };
}

export function sendSignupReq(name, email, password) {
  return {
    type: ActionType.SIGNUP_REQ,
    payload: { promise: signupReq({ name, email, password }) },
  };
}

export function signout() {
  return { type: ActionType.SIGN_OUT };
}

export function setAuthData(data) {
  return { type: ActionType.SET_AUTH, payload: data };
}
