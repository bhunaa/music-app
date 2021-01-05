import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";

import rootReducers from "../reducers";
import rootSagas from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const middleware = [createLogger({ collapsed: true }), sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			shouldHotReload: true,
	  })
	: compose;

const store = createStore(
	rootReducers,
	composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSagas);

export default store;
