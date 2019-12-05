const db = require('../../firebase/Firebase').db

//add user to the db, will need to add this to signup thunk
// #### need to do a check for if username already exists, and deny if so
async function addUser(user) {
    // console.log(user.Email)
    console.log('>>>>>>>>>>>>>>>>>>>>>>1')
    let userDoesNotExist = false
  let collection = db.collection('TestUsers')
  await collection.where('Email', '==', `${user.Email}`).get().then((snapshot) => {
      // console.log(snapshot.docs)
      if(snapshot.docs.length === 0){
          userDoesNotExist = true
      }
  })
  console.log(userDoesNotExist)
  if (userDoesNotExist){
    collection
    .doc(`${user.Email}`)
    .set(user)
    .then(console.log(`${user.Email} added to the database.`))
  }
}

//find top ten scores in collection HighScoresLeaderboard
//returns the leaderboard(top ten scores) in a sorted array, so lowest score is last index of the array
async function getTopTenHighScores() {
  let highscoresArray = [];
  let query = await db.collection('HighScoresLeaderboard').orderBy('Score', 'desc').limit(10).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      highscoresArray.push(doc.data())
      // console.log(doc.data())
    })
  })
  console.log(highscoresArray)
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
  //find the user
  let userScore
  let displayName
  let doc = db.collection('TestUsers').doc(email);
  let getDoc = await doc.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
        displayName = doc.data().DisplayName
        userScore = [...doc.data().Scores]
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  })

 const updatedScore = [...userScore, newScore].sort(function(a, b){return a - b})
//  updatedScore.sort()
 console.log('updatedscore', updatedScore)
    doc.update({
      Scores: updatedScore
  })
  addToHighScores(newScore, displayName)
}


module.exports = {addUser, getTopTenHighScores, addScore, addToHighScores}