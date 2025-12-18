import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import {reducer} from './reducer'; // Assuming you have your rootReducer

const store = createStore(reducer, applyMiddleware(thunk));

export default store;