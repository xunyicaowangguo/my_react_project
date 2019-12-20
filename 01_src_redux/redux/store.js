import {createStore,applyMiddleware} from 'redux'

import counterReducer from './reducers/counter_reducer'

import thunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(counterReducer,composeWithDevTools(applyMiddleware(thunk)))
