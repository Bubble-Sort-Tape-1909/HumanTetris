/* eslint-disable guard-for-in */
/* eslint-disable max-statements */
/* eslint-disable complexity */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
let video
let poseNet
let poses = []
let selectedWindowName
let gameStarted = false

let playersScore = 0

let gameOver = false

// bodyscale constantly updates with the distance between players left hip and left knee
let bodyScale
//TempScale is the bodyscale at a particular point in time
let tempScale

//starting point which are used to draw window shapes
let tempLeftAnkleY
let startingX

// initialize draw (based off of which)
let startGame = false

//Initialize PoseNet key points' x & y:
let keyPointsToCollide = {
  nose: {x: 0, y: 0},
  leftEye: {x: 0, y: 0},
  rightEye: {x: 0, y: 0},
  leftEar: {x: 0, y: 0},
  rightEar: {x: 0, y: 0},
  leftShoulder: {x: 0, y: 0},
  rightShoulder: {x: 0, y: 0},
  leftElbow: {x: 0, y: 0},
  rightElbow: {x: 0, y: 0},
  leftWrist: {x: 0, y: 0},
  rightWrist: {x: 0, y: 0},
  leftHip: {x: 0, y: 0},
  rightHip: {x: 0, y: 0},
  rightKnee: {x: 0, y: 0},
  leftKnee: {x: 0, y: 0},
  leftAnkle: {x: 0, y: 0},
  rightAnkle: {x: 0, y: 0}
}

// windowShape to collide
let poly = []

// boolean that represents if the whole body is within the window shape
let isClear = false

let gameCounter = 0
// Can we remove this??
// let isClearGlobal = false

// Defines the shape in use each round
let currentWindowShape
// list of all the shapes
let windowShapesName = [
  'split',
  'tShape',
  'figureSkater',
  'jerrysHole',
  'jumpingJack',
  'runningMan',
  'breakDancer'
]

// Defines the min and max starting points to keep the shapes in frame
let minMaxX
function startingPoint(name, ts) {
  if (name === 'jumpingJack') {
    minMax = {
      maxX: 3 * ts,
      minX: 0
    }
  } else if (name === 'split') {
    minMaxX = {
      maxX: 5.5 * ts,
      minX: 0
    }
  } else if (name === 'tShape') {
    minMaxX = {
      maxX: 3.5 * ts,
      minX: 2 * ts
    }
  } else if (name === 'figureSkater') {
    minMaxX = {
      maxX: 1.3 * ts,
      minX: 0.8 * ts
    }
  } else if (name === 'jerrysHole') {
    minMaxX = {
      maxX: 2 * ts,
      minX: 0
    }
  } else if (name === 'runningMan') {
    minMaxX = {
      maxX: 1.9 * ts,
      minX: ts
    }
  } else if (name === 'breakDancer')
    minMaxX = {
      maxX: 2.3 * ts,
      minX: 1.5 * ts
    }
}
// Selects a random shape from the windosShapesName array
let getRandomWindowShapeName = windowShapesName => {
  let randomIndex = Math.floor(Math.random() * windowShapesName.length)
  return windowShapesName[randomIndex]
}

// function that creates a window shape scaled in accoding the body of the player and how far away from camera he/she is staying
let windowShapeConstructor = (startingX, tempLeftAnkleY, tempScale, name) => {
  if (name === 'split') {
    return [
      {x: startingX, y: tempLeftAnkleY + 30}, //0
      {x: startingX, y: tempLeftAnkleY + 30 - 0.8 * tempScale}, //1
      {
        x: startingX + 2 * tempScale,
        y: tempLeftAnkleY + 30 - 0.8 * tempScale
      }, // 2
      {
        x: startingX + 2 * tempScale,
        y: tempLeftAnkleY + 30 - 1.4 * tempScale
      }, // 3
      {x: startingX, y: tempLeftAnkleY + 30 - 1.4 * tempScale}, //4
      {x: startingX, y: tempLeftAnkleY + 30 - 2.1 * tempScale}, // 5
      {
        x: startingX + 2 * tempScale,
        y: tempLeftAnkleY + 30 - 2.1 * tempScale
      }, // 6
      {
        x: startingX + 2 * tempScale,
        y: tempLeftAnkleY + 30 - 2.7 * tempScale
      }, // 7
      {
        x: startingX + 3.5 * tempScale,
        y: tempLeftAnkleY + 30 - 2.7 * tempScale
      }, // 8
      {
        x: startingX + 3.5 * tempScale,
        y: tempLeftAnkleY + 30 - 0.8 * tempScale
      }, // 9
      {
        x: startingX + 5.5 * tempScale,
        y: tempLeftAnkleY + 30 - 0.8 * tempScale
      }, // 10
      {x: startingX + 5.5 * tempScale, y: tempLeftAnkleY + 30} // 11
    ]
  } else if (name === 'tShape') {
    return [
      {x: startingX, y: tempLeftAnkleY + 40}, // 0
      {x: startingX, y: tempLeftAnkleY - 2.5 * tempScale}, // 1
      {x: startingX - 2 * tempScale, y: tempLeftAnkleY - 2.5 * tempScale}, // 2
      {x: startingX - 2 * tempScale, y: tempLeftAnkleY - 3.4 * tempScale}, // 3
      {x: startingX, y: tempLeftAnkleY - 3.4 * tempScale}, // 4
      {x: startingX, y: tempLeftAnkleY - 4 * tempScale}, // 5
      {x: startingX + 1.5 * tempScale, y: tempLeftAnkleY - 4 * tempScale}, // 6
      {x: startingX + 1.5 * tempScale, y: tempLeftAnkleY - 3.4 * tempScale}, // 7
      {x: startingX + 3.5 * tempScale, y: tempLeftAnkleY - 3.4 * tempScale}, // 8
      {x: startingX + 3.5 * tempScale, y: tempLeftAnkleY - 2.5 * tempScale}, // 9
      {x: startingX + 1.5 * tempScale, y: tempLeftAnkleY - 2.5 * tempScale}, // 10
      {x: startingX + 1.5 * tempScale, y: tempLeftAnkleY + 40} // 11
    ]
  } else if (name === 'figureSkater') {
    return [
      {x: startingX, y: tempLeftAnkleY + 30 + 40}, // 0
      {x: startingX, y: tempLeftAnkleY + 30 - tempScale}, // 1
      {
        x: startingX - 0.5 * tempScale,
        y: tempLeftAnkleY + 30 - 1.4 * tempScale
      }, // 2
      {x: startingX, y: tempLeftAnkleY + 30 - 1.3 * tempScale}, // 3
      {x: startingX, y: tempLeftAnkleY + 30 - 1.5 * tempScale}, // 4
      {
        x: startingX - 0.8 * tempScale,
        y: tempLeftAnkleY + 30 - 1.8 * tempScale
      }, // 5
      {
        x: startingX - 0.8 * tempScale,
        y: tempLeftAnkleY + 30 - 2.3 * tempScale
      }, // 6
      {x: startingX, y: tempLeftAnkleY + 30 - 2.6 * tempScale}, // 7
      {
        x: startingX + 0.5 * tempScale,
        y: tempLeftAnkleY + 30 - 2.6 * tempScale
      }, // 8
      {
        x: startingX + 1.3 * tempScale,
        y: tempLeftAnkleY + 30 - 2.3 * tempScale
      }, // 9
      {
        x: startingX + 1.3 * tempScale,
        y: tempLeftAnkleY + 30 - 1.8 * tempScale
      }, // 10
      {
        x: startingX + 0.5 * tempScale,
        y: tempLeftAnkleY + 30 - 1.5 * tempScale
      }, // 11
      {
        x: startingX + 0.5 * tempScale,
        y: tempLeftAnkleY + 30 - 1.3 * tempScale
      }, // 12
      {x: startingX + tempScale, y: tempLeftAnkleY + 30 - 1.4 * tempScale}, // 13
      {x: startingX + 0.5 * tempScale, y: tempLeftAnkleY + 30 - tempScale}, // 14
      {x: startingX + 0.5 * tempScale, y: tempLeftAnkleY + 30 + 40} // 15
    ]
  } else if (name === 'jerrysHole') {
    return [
      {x: startingX, y: tempLeftAnkleY + 50},
      {
        x: startingX + 0.5 * tempScale,
        y: tempLeftAnkleY - 1.25 * tempScale + 30
      },
      {
        x: startingX + 1 * tempScale,
        y: tempLeftAnkleY - 1.5 * tempScale + 30
      },
      {
        x: startingX + 1.5 * tempScale,
        y: tempLeftAnkleY - 1.25 * tempScale + 30
      },
      {x: startingX + 2 * tempScale, y: tempLeftAnkleY + 50}
    ]
  } else if (name === 'jumpingJack') {
    return [
      {x: startingX, y: tempLeftAnkleY + 30}, //0
      {x: startingX + tempScale, y: tempLeftAnkleY + 30 - 2 * tempScale}, //1
      {x: startingX + tempScale, y: tempLeftAnkleY + 30 - 2.5 * tempScale}, //2
      {x: startingX, y: tempLeftAnkleY + 30 - 4 * tempScale}, //3
      {
        x: startingX + 0.75 * tempScale,
        y: tempLeftAnkleY + 30 - 4 * tempScale
      }, //4
      {x: startingX + tempScale, y: tempLeftAnkleY + 30 - 3.5 * tempScale}, //5
      {x: startingX + tempScale, y: tempLeftAnkleY + 30 - 4 * tempScale}, //6
      {x: startingX + 2 * tempScale, y: tempLeftAnkleY + 30 - 4 * tempScale}, //7
      {
        x: startingX + 2 * tempScale,
        y: tempLeftAnkleY + 30 - 3.5 * tempScale
      }, //8
      {
        x: startingX + 2.25 * tempScale,
        y: tempLeftAnkleY + 30 - 4 * tempScale
      }, //9
      {x: startingX + 3 * tempScale, y: tempLeftAnkleY + 30 - 4 * tempScale}, //10
      {
        x: startingX + 2 * tempScale,
        y: tempLeftAnkleY + 30 - 2.5 * tempScale
      }, //11
      {x: startingX + 2 * tempScale, y: tempLeftAnkleY + 30 - 2 * tempScale}, //12
      {x: startingX + 3 * tempScale, y: tempLeftAnkleY + 30}, //13
      {x: startingX + 2.25 * tempScale, y: tempLeftAnkleY + 30}, //14
      {
        x: startingX + 1.5 * tempScale,
        y: tempLeftAnkleY + 30 - 1.75 * tempScale
      }, //15
      {x: startingX + 0.75 * tempScale, y: tempLeftAnkleY + 30} //16
    ]
  } else if (name === 'runningMan') {
    return [
      {x: startingX, y: tempLeftAnkleY + 30}, //0
      {x: startingX, y: tempLeftAnkleY + 30 - 2.5 * tempScale}, //1
      {x: startingX - tempScale, y: tempLeftAnkleY + 30 - 2.5 * tempScale}, //2
      {x: startingX - tempScale, y: tempLeftAnkleY + 30 - 3.5 * tempScale}, //3
      {
        x: startingX - 0.6 * tempScale,
        y: tempLeftAnkleY + 30 - 3.5 * tempScale
      }, //4
      {
        x: startingX - 0.6 * tempScale,
        y: tempLeftAnkleY + 30 - 3 * tempScale
      }, //5
      {x: startingX, y: tempLeftAnkleY + 30 - 3 * tempScale}, //6
      {x: startingX, y: tempLeftAnkleY + 30 - 3.75 * tempScale}, //7
      {
        x: startingX + 0.75 * tempScale,
        y: tempLeftAnkleY + 30 - 3.75 * tempScale
      }, //8
      {
        x: startingX + 0.75 * tempScale,
        y: tempLeftAnkleY + 30 - 1.6 * tempScale
      }, //9
      {
        x: startingX + 1.9 * tempScale,
        y: tempLeftAnkleY + 30 - 1.6 * tempScale
      }, //10
      {x: startingX + 1.9 * tempScale, y: tempLeftAnkleY + 30 - tempScale}, // 11
      {x: startingX + 0.75 * tempScale, y: tempLeftAnkleY + 30 - tempScale}, // 12
      {x: startingX + 0.75 * tempScale, y: tempLeftAnkleY + 30} // 13
    ]
  } else if (name === 'breakDancer') {
    return [
      {x: startingX, y: tempLeftAnkleY}, //0
      {x: startingX, y: tempLeftAnkleY - tempScale}, //1
      {x: startingX - 1.5 * tempScale, y: tempLeftAnkleY - tempScale}, //2
      {x: startingX - 1.5 * tempScale, y: tempLeftAnkleY - 1.2 * tempScale}, //3
      {x: startingX, y: tempLeftAnkleY - 1.2 * tempScale}, //4
      {x: startingX, y: tempLeftAnkleY - 1.8 * tempScale}, //5
      {x: startingX - 1.5 * tempScale, y: tempLeftAnkleY - 1.8 * tempScale}, //6
      {x: startingX - 1.5 * tempScale, y: tempLeftAnkleY - 2.5 * tempScale}, //7
      {x: startingX + 2.3 * tempScale, y: tempLeftAnkleY - 2.5 * tempScale}, //8
      {x: startingX + 2.3 * tempScale, y: tempLeftAnkleY - 1.8 * tempScale}, //9
      {x: startingX + 0.8 * tempScale, y: tempLeftAnkleY - 1.8 * tempScale}, //10
      {x: startingX + 0.8 * tempScale, y: tempLeftAnkleY - 1.2 * tempScale}, //11
      {x: startingX + 2.3 * tempScale, y: tempLeftAnkleY - 1.2 * tempScale}, //12
      {x: startingX + 2.3 * tempScale, y: tempLeftAnkleY - tempScale}, //13
      {x: startingX + 0.8 * tempScale, y: tempLeftAnkleY - tempScale}, //14
      {x: startingX + 0.8 * tempScale, y: tempLeftAnkleY} //15
    ]
  }
}

// Collision test
let hit = {
  nose: false,
  leftShoulder: false,
  rightShoulder: false,
  leftElbow: false,
  rightElbow: false,
  leftWrist: false,
  rightWrist: false,
  leftHip: false,
  rightHip: false,
  rightKnee: false,
  leftKnee: false,
  leftAnkle: false,
  rightAnkle: false
}

// check if all 13 points are within the shape
let clear = points => {
  for (let point in points) {
    if (!points[point]) return false
  }
  return true
}

// This defines the starting point of the shape, and if the shape is going to end up off screen it starts at a default location
function setRandomPin(maxX, minX = 0) {
  let startingX = minX + Math.floor(Math.random() * (1920 - maxX - minX))
  if (startingX + maxX <= 1920 && startingX - minX >= 0) {
    return startingX
  } else return 960
}

// once the player completes a level, it grants points based off the shape's difficulty
score = () => {
  if (selectedWindowName === 'tShape') {
    playersScore += 100
  } else if (selectedWindowName === 'split') {
    playersScore += 150
  } else if (selectedWindowName === 'figureSkater') {
    playersScore += 200
  } else if (selectedWindowName === 'jumpingJack') {
    playersScore += 150
  } else if (selectedWindowName === 'runningMan') {
    playersScore += 150
  } else if (selectedWindowName === 'jerrysHole') {
    playersScore += 90
  } else if (selectedWindowName === 'breakDancer') {
    playersScore += 500
  }
}

// This is our game loop
const runGame = () => {
  let firstLoop = true

  const gameLoop = setInterval(() => {
    if (!startGame) {
      clearInterval(gameLoop)
    }

    if (firstLoop) {
      gameCounter = -6
      firstLoop = false
    }

    if (gameCounter === 0) {
      // move to rescale func that will be run once in the beginning of the game
      tempScale = bodyScale
      // move to getStart point function which run every 8 secs
      tempLeftAnkleY = keyPointsToCollide.leftAnkle.y + 30
      if (tempLeftAnkleY > 1080) {
        tempLeftAnkleY = 1080
      }
      startingX = setRandomPin(1920 - 5.5 * tempScale)

      //getting random WindowShape and fill it with current coordinats
      selectedWindowName = getRandomWindowShapeName(windowShapesName)

      // what is min X and Max X is
      startingPoint(selectedWindowName, tempScale)
      // what the actual starting X is depending on the width of the screen and player's height
      startingX = setRandomPin(minMaxX.maxX, minMaxX.minX)

      currentWindowShape = windowShapeConstructor(
        startingX,
        tempLeftAnkleY,
        tempScale,
        selectedWindowName
      )
    }

    // Checking if all 13 pointd are withing windowshape
    if (gameCounter === 7) {
      for (let pointName in keyPointsToCollide) {
        hit = {
          ...hit,
          [pointName]: collideCirclePoly(
            keyPointsToCollide[pointName].x,
            keyPointsToCollide[pointName].y,
            10,
            poly,
            true
          )
        }
      }

      isClear = clear(hit)

      if (isClear) {
        score()
      } else {
        document.getElementById('gameScore').innerText = String(playersScore)

        startGame = false
        gameStarted = false
        gameOver = true

        playersScore = 0

        clearInterval(gameLoop)
      }
    }
    if (gameCounter === 14) {
      gameCounter = 0
    } else {
      gameCounter++
    }
  }, 1000)
}

function modelReady() {
  if (select('#status')) {
    select('#status').html('Model Loaded')
  }
}

//Getting acsess to camera
function setup() {
  //video screen resolution
  createCanvas(1920, 1080)
  video = createCapture(VIDEO)

  video.size(width, height)
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady)
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', gotPoses)
  // Hide the video element, and just show the canvas
  video.hide()
}

function gotPoses(results) {
  poses = results

  //if there are any poses detected
  if (poses.length > 0) {
    let posePoints = [
      'nose',
      'leftEye',
      'rightEye',
      'leftEar',
      'rightEar',
      'leftShoulder',
      'rightShoulder',
      'leftElbow',
      'rightElbow',
      'leftWrist',
      'rightWrist',
      'leftHip',
      'rightHip',
      'rightKnee',
      'leftKnee',
      'leftAnkle',
      'rightAnkle'
    ]

    poses[0].pose.keypoints.forEach((keyPoint, index) => {
      keyPointsToCollide[posePoints[index]].x = keyPoint.position.x
      keyPointsToCollide[posePoints[index]].y = keyPoint.position.y
    })
  }

  bodyScale = dist(
    keyPointsToCollide.rightHip.x,
    keyPointsToCollide.rightHip.y,
    keyPointsToCollide.rightKnee.x,
    keyPointsToCollide.rightKnee.y
  )

  let windowShape = currentWindowShape
  if (windowShape) {
    poly = []
    windowShape.forEach(({x, y}, index) => (poly[index] = createVector(x, y)))
  }
}

// eslint-disable-next-line complexity
const drawWords = () => {
  if (!gameOver) {
    if (gameCounter === -5 || gameCounter === 10) {
      strokeWeight(3)
      textSize(80)
      fill('white')
      text(`Get in the starting position `, 200, 520)
    } else if (gameCounter === 8 && isClear) {
      strokeWeight(3)
      textSize(80)
      fill('white')
      text(`YOU MADE IT CLEAR => YOUR SCORE: ${playersScore}`, 200, 520)
    } else if (gameCounter === 12 || gameCounter === -3) {
      strokeWeight(3)
      textSize(100)
      fill('white')
      text('READY', 800, 520)
    } else if (gameCounter === 13 || gameCounter === -2) {
      strokeWeight(3)
      textSize(100)
      fill('white')
      text('SET', 800, 520)
    } else if (gameCounter === 14 || gameCounter === -1) {
      strokeWeight(3)
      textSize(100)
      fill('white')
      text('GO', 800, 520)
    }
  }
}

function draw() {
  if (document.getElementById('startGame')) {
    let startGameButton = document.getElementById('startGame')

    startGameButton.addEventListener('click', event => {
      startGame = true
      gameOver = false

      if (!gameStarted) {
        runGame()
        gameStarted = true
      }
    })
  } else {
    startGame = false
    gameStarted = false
  }

  if (startGame) {
    //where to show the image of video
    translate(width, 0) // move to far corner
    scale(-1.0, 1.0) // flip x-axis backwards
    image(video, 0, 0, width, height)

    if (1 < gameCounter && gameCounter < 8) {
      drawShape()
    }

    translate(width, 0) // move to far corner
    scale(-1.0, 1.0)
    drawWords()
  } else {
    strokeWeight(0)
    fill('#292B2F')
    rect(0, 0, 1920, 1080)
  }
}

const drawShape = () => {
  beginShape()
  for (i = 0; i < poly.length; i++) {
    vertex(poly[i].x, poly[i].y)
  }
  endShape(CLOSE)
}
