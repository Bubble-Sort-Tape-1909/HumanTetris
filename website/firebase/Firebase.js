import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: 'AIzaSyB_8aB4-hvElJdok-zo84vGN_nUorEv0JI',
  authDomain: 'humantetris.firebaseapp.com',
  databaseURL: 'https://humantetris.firebaseio.com',
  projectId: 'humantetris',
  appId: '1:217643379306:web:9e24161271a101aeabb813'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()

export default firebase
