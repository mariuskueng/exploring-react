import { createStore, compose } from 'redux';

// import the root reducer
import rootReducer from './reducers/index';

import todos from './data/todos';

// create an object for the default data
const defaultState = {
  todos,
};

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

const store = createStore(rootReducer, defaultState, enhancers);

export default store;
