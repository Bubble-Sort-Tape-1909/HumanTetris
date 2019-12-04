const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')
require('../secrets')

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID
}

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig)
const baseDb = firebaseApp.firestore()
const baseAuth = firebaseApp.auth()
export const db = baseDb
export const auth = baseAuth
