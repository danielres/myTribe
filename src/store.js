import { createStore, applyMiddleware } from 'redux';
import { leanReducer } from 'lean-redux';

const store = createStore(leanReducer);

export default store;
