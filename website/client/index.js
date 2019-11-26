import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import {createFirestoreInstance} from 'redux-firestore'

// establishes socket connection
import './socket'

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router history={history}>
        <App />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('app')
)
