import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {verifyAuth} from './auth'
import rootReducer from './index'

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

export default function configureStore(persistedState) {
  const store = createStore(rootReducer, persistedState, middleware)
  store.dispatch(verifyAuth())
  return store
}
