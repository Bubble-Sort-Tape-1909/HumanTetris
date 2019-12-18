import {combineReducers} from 'redux'
import auth from './auth'
import userScore from './userScore'

export default combineReducers({
  auth,
  userScore
})
