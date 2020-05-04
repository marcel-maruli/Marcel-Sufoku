import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from "redux-thunk";
import logger from "redux-logger";

import {
  boardReducer,
  gameReducer
} from "../reducers";

const reducers = combineReducers({
  boardReducer,
  gameReducer
});

const store = createStore(reducers, applyMiddleware(thunk, logger));

export default store;
