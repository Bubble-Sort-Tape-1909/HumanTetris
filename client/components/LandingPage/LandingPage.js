// import * as functions from 'firebase-functions'
// import * as firebase from 'firebase-admin'
// import {MD5} from 'crypto-js'

// export const createUserDoc = functions.auth.user().onCreate(event => {
//   const firebaseUser = event.data

//   // Use gravatar as default if photoUrl isn't specified in user data
//   let fileEnding = 'jpg'
//   let photoURL = `https://www.gravatar.com/avatar/${MD5(firebaseUser.email)
//     .toString()
//     .toLowerCase()}.jpg?s=1024&d=robohash`
//   if (firebaseUser.photoURL) {
//     fileEnding = firebaseUser.photoURL.substr(
//       firebaseUser.photoURL.lastIndexOf('.') + 1
//     )
//     photoURL = firebaseUser.photoURL
//   }

//   const fileName = `users/${firebaseUser.uid}/profile.${fileEnding}`
//   const profilePhotoStorageOpts = {
//     destination: fileName,
//     metadata: {
//       contentType: `image/${fileEnding}`
//     }
//   }

//   const user = {
//     name: firebaseUser.displayName || 'No Name',
//     email: firebaseUser.email,
//     photoUrl: `gs://${firebase.storage().bucket().name}/${fileName}`
//   }

//   return Promise.all([
//     firebase
//       .storage()
//       .bucket()
//       .upload(photoURL, profilePhotoStorageOpts),
//     firebase
//       .firestore()
//       .collection('users')
//       .doc(firebaseUser.uid)
//       .set(user)
//   ])
// })
