const {addUser, addScore, getUser, getTopTenHighScores} = require('./databaseFunctions.js') 

const users = [
  {
    UserName: 'Sam',
    Email: 'sam@email.com',
    Scores: [87, 15, 2]
  },
  {
    UserName: 'JoeyBats',
    Email: 'joe@email.com',
    Scores: [125, 97, 55]
  },
  {
    UserName: 'DonnyBoy',
    Email: 'don@email.com',
    Scores: [2, 89, 111]
  },
  {
    UserName: 'Alfred',
    Email: 'alfred@email.com',
    Scores: [55, 33, 22]
  },
  {
    UserName: 'IrishSnowman',
    Email: 'irish@email.com',
    Scores: [13, 78, 81]
  },
  {
    UserName: 'Colin',
    Email: 'colin@email.com',
    Scores: [44, 22, 67]
  },
  {
    UserName: 'Milo',
    Email: 'milo@email.com',
    Scores: [44, 13, 150]
  },
  {
    UserName: 'Maxxy',
    Email: 'max@email.com',
    Scores: [102, 49, 121]
  }
]

function addSeed() {
  users.forEach(user => {
    console.log('added', +user)
    addUser(user)
  })
}

// getUser()

// addScore('milo@email.com', 1000000)

// getTopTenHighScores()

// addSeed()