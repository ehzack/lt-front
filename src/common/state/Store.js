import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducers from "./RootReducers";
import rootSagas from "../saga/RootSaga";

const configureStore = () => {
  const sagaMidlleware = createSagaMiddleware();

  return {
    ...createStore(
      rootReducers,
      composeWithDevTools(applyMiddleware(sagaMidlleware))
    ),
    runSaga: sagaMidlleware.run(rootSagas),
  };
};

export default configureStore;
