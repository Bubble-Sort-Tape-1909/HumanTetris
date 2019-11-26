import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {firebaseReducer, getFirebase} from 'react-redux-firebase'
import {firestoreReducer, getFirestore} from 'redux-firestore'
import firebase from '../../firebase/Firebase'

const reducer = combineReducers({
  user,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})
const middleware = composeWithDevTools(
  compose(
    applyMiddleware(
      thunkMiddleware.withExtraArgument({getFirebase, getFirestore})
    )
  ),
  createLogger({collapsed: true})
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
