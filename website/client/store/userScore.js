/* eslint-disable default-case */
import {firebaseApp} from '../../firebase/Firebase'
import firebase from 'firebase/app'
import {addScore} from '../../server/firestore/databaseFunctions'

/**
 * ACTION TYPES
 */
const SEND_SCORE = 'SEND_SCORE'

// Action Creators:
const sendScore = (userScore, userEmail) => ({
  type: SEND_SCORE,
  userScore,
  userEmail
})

const initialState = {
  user: null,
  userScore: 0
}

// Thunks:
export const sendUserScore = userScore => {
  return dispatch => {
    let userEmail = firebase.auth().currentUser.email
    addScore(userEmail, userScore)
    dispatch(sendScore(userScore, userEmail))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_SCORE:
      return {...state, userScore: action.userScore, user: action.userEmail }
    default:
      return state
  }
}
