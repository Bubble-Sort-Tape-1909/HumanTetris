const {addUser, addScore, getTopTenHighScores, addToHighScores} = require('./databaseFunctions.js') 

const users = [
  {
    DisplayName: 'Sam',
    Email: 'sam@email.com',
    Scores: [87, 15, 2]
  },
  {
    DisplayName: 'JoeyBats',
    Email: 'joe@email.com',
    Scores: [125, 97, 55]
  },
  {
    DisplayName: 'DonnyBoy',
    Email: 'don@email.com',
    Scores: [2, 89, 111]
  },
  {
    DisplayName: 'Alfred',
    Email: 'alfred@email.com',
    Scores: [55, 33, 22]
  },
  {
    DisplayName: 'IrishSnowman',
    Email: 'irish@email.com',
    Scores: [13, 78, 81]
  },
  {
    DisplayName: 'Colin',
    Email: 'colin@email.com',
    Scores: [44, 22, 67]
  },
  {
    DisplayName: 'Milo',
    Email: 'milo@email.com',
    Scores: [44, 13, 150]
  },
  {
    DisplayName: 'Maxxy',
    Email: 'max@email.com',
    Scores: [102, 49, 121]
  },
  {
    DisplayName: 'JohnnyTwoBits',
    Email: 'johnny2@email.com',
    Scores: [587, 23, 115]
  }
]

const highScores = [
    {
    DisplayName: "JohnnyTwoBits",
    Score: 1525
  },
  {
    DisplayName: "Milo",
    Score: 1380
  },
  {
    DisplayName: "Maxxy",
    Score: 1350
  },
  {
    DisplayName: "Colin",
    Score: 1250
  },
  {
    DisplayName: "DonnyBoy",
    Score: 1150
  },
  {
    DisplayName: "JoeyBats",
    Score: 1050
  },
  {
    DisplayName: "JohnnyTwoBits",
    Score: 970
  },
  {
    DisplayName: "IrishSnowman",
    Score: 950
  },
  {
    DisplayName: "Alfred",
    Score: 900
  },
  {
    DisplayName: "JoeyBats",
    Score: 575
  }
]



HighScores = {
  'maksim.pesetski@gmail.com' : 
  {
    UserName: 'MaksimP',
    Score: '5880'
  },
  'Twoboots@email.com' : 
  {
    UserName: 'TwoBoots',
    Score: 5300
  },
  'Geronimo@aol.com' : 
  {
    UserName: 'Geronimo',
    Score: 3500
  }


}