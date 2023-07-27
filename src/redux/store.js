import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers/index'

const composeEnhancers =
	(typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose

const middleware = [thunk]

const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(...middleware)
		// other store enhancers if any
	)
)

export default store
