import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'
import { rootReducer } from './reducers'
import { petReducer } from './reducers/petReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const rootReducer = combineReducers({
// petModule: petReducer

// })

// export const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// )


export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
