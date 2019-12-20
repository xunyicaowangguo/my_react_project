import {createStore} from 'redux'

import counterReducer from './reducers/counter_reducer'

export default createStore(counterReducer)
