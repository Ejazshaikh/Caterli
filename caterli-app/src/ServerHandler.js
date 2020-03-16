import axiosImport from 'axios';
import queryString from 'querystring';

const axios = axiosImport.create({ timeout: 15000 });
let API = 'http://localhost:8080/api';

function toQueryParams(payload) {
  const q = queryString.stringify(payload);
  console.log(q);
  return q;
}

export function loginReq(loginPayload) {
  return axios.post(`${API}/auth`, toQueryParams(loginPayload));
}

export function fetchRestaurantList() {
  return axios.get(`${API}/restaurants`);
}

export function fetchRestaurant(id) {
  return axios.get(`${API}/restaurants/${id}`);
}

export function searchRestaurants(text) {
  return axios.get(`${API}/restaurants/search?text=${text}`);
}

export function signupReq(signupPayload) {
  return axios.post(`${API}/users`, toQueryParams(signupPayload));
}

export function sendOrderReq(accessToken, params) {
  const headers = { 'x-auth-token': accessToken };
  return axios.post(`${API}/order`, toQueryParams(params), { headers });
}
