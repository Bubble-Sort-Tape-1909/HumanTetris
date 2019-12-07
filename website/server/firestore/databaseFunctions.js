const db = require('../../firebase/Firebase').db

//add user to the db, will need to add this to signup thunk
// #### need to do a check for if username already exists, and deny if so
async function addUser(user) {
  let userDoesNotExist = false
  let collection = db.collection('TestUsers')
  await collection
    .where('Email', '==', `${user.Email}`)
    .get()
    .then(snapshot => {
      if (snapshot.docs.length === 0) {
        userDoesNotExist = true
      }
    })
  if (userDoesNotExist) {
    collection
      .doc(`${user.Email}`)
      .set(user)
      .then(console.log(`${user.Email} added to the database.`))
  }
}

//use for when adding by 3rd party (google/facebook)
async function addUserByEmail(email) {
  let userDoesNotExist = false
  let collection = db.collection('TestUsers')
  await collection
    .where('Email', '==', `${email}`)
    .get()
    .then(snapshot => {
      if (snapshot.docs.length === 0) {
        userDoesNotExist = true
      }
    })
  const user = {
    Email: email,
    DisplayName: email,
    Scores: []
  }
  if (userDoesNotExist) {
    collection
      .doc(`${email}`)
      .set(user)
      .then(console.log(`${email} added to the database.`))
  }
}

//find top ten scores in collection HighScoresLeaderboard
//returns the leaderboard(top ten scores) in a sorted array, so lowest score is last index of the array
async function getTopTenHighScores() {
  let highscoresArray = []
  let query = await db
    .collection('HighScoresLeaderboard')
    .orderBy('Score', 'desc')
    .limit(10)
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        highscoresArray.push(doc.data())
      })
    })
  return highscoresArray
}

//we need to check if it's in the top ten highest scores in collection HighScoresLeaderboard
//if it is, delete the 10th score and insert it into the collection
async function addToHighScores(score, displayName) {
  const newHighScore = {
    DisplayName: displayName,
    Score: score
  }
  const collection = db.collection('HighScoresLeaderboard')

  const highScoresArray = await getTopTenHighScores()
  if (score > highScoresArray.slice(-1)[0].Score && score > 500) {
    collection.doc().set(newHighScore)
  }
}

// method to add a game's score to the database
async function addScore(email, newScore) {
  let userScore
  let displayName
  let doc = db.collection('TestUsers').doc(email)
  let getDoc = await doc
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!')
      } else {
        displayName = doc.data().DisplayName
        userScore = [...doc.data().Scores]
      }
    })
    .catch(err => {
      console.log('Error getting document', err)
    })

  const updatedScore = [...userScore, newScore].sort(function(a, b) {
    return a - b
  })
  console.log('updatedscore', updatedScore)
  doc.update({
    Scores: updatedScore
  })
  addToHighScores(newScore, displayName)
}

module.exports = {
  addUser,
  getTopTenHighScores,
  addScore,
  addToHighScores,
  addUserByEmail
}
