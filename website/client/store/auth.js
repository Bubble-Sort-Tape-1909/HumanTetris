import {firebaseApp} from '../../firebase/Firebase'
import firebase from 'firebase/app'
/**
 * ACTION TYPES
 */
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
const VERIFY_REQUEST = 'VERIFY_REQUEST'
const VERIFY_SUCCESS = 'VERIFY_SUCCESS'

/**
 * INITIAL STATE
 */
const defaultState = {
  isLoggingIn: false,
  isLoggingOut: false,
  isVerifying: false,
  loginError: false,
  logoutError: false,
  isAuthenticated: false,
  user: {}
}

/**
 * ACTION CREATORS
 */
const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  }
}

const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

const loginError = () => {
  return {
    type: LOGIN_FAILURE
  }
}

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  }
}

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  }
}

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  }
}

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  }
}

/**
 * THUNK CREATORS
 */
export const loginUser = (method, email, password) => dispatch => {
  dispatch(requestLogin())
  if (method === 'EMAIL') {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        firebase.auth().currentUser.sendEmailVerification()
        dispatch(receiveLogin(user))
      })
      .catch(error => {
        console.error(error)
        dispatch(loginError())
      })
  } else if (method === 'GOOGLE') {
    firebaseApp
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        firebase.auth().currentUser.sendEmailVerification()
        const user = result.user
        dispatch(receiveLogin(user))
      })
      .catch(error => {
        console.error(error)
        dispatch(loginError())
      })
  } else if (method === 'FACEBOOK') {
    firebaseApp
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(result => {
        firebase.auth().currentUser.sendEmailVerification()
        const user = result.user
        dispatch(receiveLogin(user))
      })
      .catch(error => {
        console.error(error)
        dispatch(loginError())
      })
  }
}

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest())
  firebaseApp.auth().onAuthStateChanged(user => {
    if (user !== null) {
      dispatch(receiveLogin(user))
    }
    dispatch(verifySuccess())
  })
}

export const logoutUser = () => dispatch => {
  dispatch(requestLogout())
  firebaseApp
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout())
    })
    .catch(error => {
      console.error(error)
      dispatch(logoutError())
    })
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {}
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true
      }
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false
      }
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false
      }
    default:
      return state
  }
}
