import ActionType from './actionType';
import { sendOrderReq } from '../ServerHandler';

export function sendOrderRequest(params) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth;
    dispatch({ type: ActionType.ORDER_REQ, payload: sendOrderReq(accessToken, params) });
  };
}

export function initOrderReq() {
  return { type: ActionType.INIT_ORDER_REQ };
}
