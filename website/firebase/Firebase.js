import * as firebase from 'firebase'
var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'humantetris.firebaseapp.com',
  databaseURL: 'https://humantetris.firebaseio.com',
  projectId: 'humantetris',
  appId: '1:217643379306:web:9e24161271a101aeabb813'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
//auth
const auth = firebase.auth()
const db = firebase.firestore()
module.exports = {db, auth}
