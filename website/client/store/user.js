import firebase from '../../firebase/Firebase'
import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'
const LOGIN_ERROR = 'LOGIN_ERROR'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const logIn = () => ({type: LOGIN_SUCCESSFUL})
const logInError = err => ({type: LOGIN_ERROR, err})

/**
 * THUNK CREATORS
 */
export const firebaseEmailAndPasswordSignIn = (email, password) => dispatch => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      return dispatch(logIn())
    })
    .catch(err => {
      return dispatch(logInError(err))
    })
}

export const me = () => dispatch => {
  try {
    var user = firebase.auth().currentUser
    if (user) {
      // User is signed in.
      dispatch(getUser(user))
    } else {
      dispatch(getUser(defaultUser))
    }
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case LOGIN_ERROR:
      return {...state, authError: 'Login Failed'}
    case LOGIN_SUCCESSFUL:
      console.log('login success!')
      return {...state, authError: null}
    default:
      return state
  }
}
