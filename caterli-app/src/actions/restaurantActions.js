import ActionType from './actionType';
import { fetchRestaurantList, fetchRestaurant, searchRestaurants } from '../ServerHandler';

export function fetchRestaurantsReq() {
  return { type: ActionType.FETCH_RESTAURANTS_REQ, payload: fetchRestaurantList() };
}

export function fetchRestaurantReq(id) {
  return { type: ActionType.FETCH_RESTAURANT_REQ, payload: fetchRestaurant(id) };
}

export function searchRestaurantsReq(text) {
  return { type: ActionType.SEARCH_RESTAURANTS, payload: searchRestaurants(text) };
}
