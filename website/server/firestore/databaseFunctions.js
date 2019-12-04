const db = require('../../firebase/Firebase').db

//add user to the db, will need to add this to signup thunk
// #### need to do a check for if username already exists, and deny if so
function addUser(user) {
  let collection = db.collection('TestUsers')
  .doc(`${user.Email}`)
  .set(user)
  .then(console.log(`${user} added to the database.`))
}

//find top ten scores in db
async function getTopTenHighScores() {
  let highscoresArray = [];
  let query = await db.collection('TestUsers').orderBy('Scores', 'asc').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      highscoresArray.push(doc)
      console.log(doc.data())
    })
  })
  // console.log(highscoresArray)
  // return query
}
 

async function getUser(email) {
    // const collection = await db.collection('TestUsers')
    
    // const targetUser = await collection.where('email', '==', email).get()
    // console.log(targetUser)

    let userRef = db.collection('TestUsers').doc(email);
    cityRef.update({Scores: [44, 13, 150]})
    console.log('our data?', await cityRef.get())
    let getDoc = cityRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
        
    //   console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
}


// method to add a game's score to the database
async function addScore(email, newScore) {
  //find the user
  let userScore
  let doc = db.collection('TestUsers').doc(email);
  let getDoc = await doc.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
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
}


module.exports = {addUser, getTopTenHighScores, addScore, getUser}