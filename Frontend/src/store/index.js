/* eslint-disable no-undef */
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../store/reducers";
import rootSaga from "../store/sagas";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

function bindMiddleware(middleware) {
  if (!IS_PRODUCTION) {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
}

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(makeStore, {
  // debug: !IS_PRODUCTION,
});

export default makeStore;
