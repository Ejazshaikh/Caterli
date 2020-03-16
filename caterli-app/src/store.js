import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import auth from './reducers/authReducer';
import ui from './reducers/uiReducer';
import restaurant from './reducers/restaurantReducer';
import order from './reducers/orderReducer';

import authMiddleWare from './middlewares/authMiddleware';
import uiMiddleWare from './middlewares/uiMiddleware';

const reducers = combineReducers({ auth, ui, restaurant, order });

const middlewares = [thunk, promise, authMiddleWare, uiMiddleWare, createLogger()];
const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
