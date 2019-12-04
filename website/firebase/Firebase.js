// import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firestore'
// require('../secrets')

const firebase = require('firebase/app')
require('firebase/firestore')
require('firebase/auth')
require('../secrets')

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID
}

// Initialize Firebase
// export const firebaseApp = firebase.initializeApp(firebaseConfig)
// const baseDb = firebaseApp.firestore()
// const baseAuth = firebaseApp.auth()
// export const db = baseDb
// export const auth = baseAuth


// #################




// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const baseDb = firebaseApp.firestore()
const db = baseDb
const auth = firebase.auth()

 module.exports = {firebaseConfig, firebaseApp, db, auth}