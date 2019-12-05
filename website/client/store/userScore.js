/* eslint-disable default-case */
import {firebaseApp} from '../../firebase/Firebase'
import firebase from 'firebase/app'

/**
 * ACTION TYPES
 */
const SEND_SCORE = 'SEND_SCORE'

// Action Creators:
const sendScore = userScore => ({
  type: SEND_SCORE,
  userScore
})

const initialState = {
  user: null,
  userScore: 0
}

// Thunks:
export const sendUserScore = userScore => {
  return dispatch => {
    let user = firebase.auth().currentUser.email
    console.log('thunk', user)

    dispatch(sendScore(userScore))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_SCORE:
      return {...state, userScore: action.userScore}
    default:
      return state
  }
}
