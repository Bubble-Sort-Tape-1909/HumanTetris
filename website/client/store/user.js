import firebase from '../../firebase/Firebase'
import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
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

export const firebaseEmailAndPasswordSignIn = (email, password) => dispatch => {
  try {
    firebase.auth().signInWithEmailAndPassword(email, password)
    // .catch(error => {
    //   const errorCode = error.code
    //   const errorMessage = error.message
    //   alert(errorMessage)
    //   console.log(
    //     'error code: ',
    //     errorCode,
    //     ' || error message: ',
    //     errorMessage
    //   )
    // })

    firebase.auth().onAuthStateChanged(function(user) {
      if (user.id) {
        // User is signed in.
        dispatch(getUser(user))
      }
    })
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
    default:
      return state
  }
}
