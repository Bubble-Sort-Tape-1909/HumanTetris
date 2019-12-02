/* eslint-disable no-undef */

let video
let poseNet
let poses = []
let selectedWindowName

let playersScore = 0

// body/window scale
let bodyScale
let tempScale

//random starting point which is used to draw window shapes
let tempLeftAnkleY
let startingX

//Initialize start key point x & y:
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
let isClearGlobal = false

// getting random window shape
let currentWindowShape
let windowShapesName = [
  'split',
  'tShape',
  'figureSkater',
  'jerrysHole',
  'stopAndFrisk',
  'runningMan',
  'breakDancer'
]
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
      {x: startingX - 2.5 * tempScale, y: tempLeftAnkleY - tempScale}, //2
      {x: startingX - 1.5 * tempScale, y: tempLeftAnkleY - 1.2 * tempScale}, //3
      {x: startingX, y: tempLeftAnkleY - 1.2 * tempScale}, //4
      {x: startingX, y: tempLeftAnkleY - 2 * tempScale}, //5
      {x: startingX - 1.5 * tempScale, y: tempLeftAnkleY - 2 * tempScale}, //6
      {x: startingX - 1.5 * tempScale, y: tempLeftAnkleY - 2.5 * tempScale}, //7
      {x: startingX + 2.3 * tempScale, y: tempLeftAnkleY - 2.5 * tempScale}, //8
      {x: startingX + 2.3 * tempScale, y: tempLeftAnkleY - 2 * tempScale}, //9
      {x: startingX + 0.8 * tempScale, y: tempLeftAnkleY - 2 * tempScale}, //10
      {x: startingX + 0.8 * tempScale, y: tempLeftAnkleY - 1.2 * tempScale}, //11
      {x: startingX + 2.3 * tempScale, y: tempLeftAnkleY - 1.2 * tempScale}, //12
      {x: startingX + 2.3 * tempScale, y: tempLeftAnkleY - tempScale}, //13
      {x: startingX + 0.8 * tempScale, y: tempLeftAnkleY - tempScale}, //14
      {x: startingX + 0.8 * tempScale, y: tempLeftAnkleY} //15
    ]
  }
}

// Test collision
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

// check if all 13 points are within the windowshape
let clear = points => {
  for (let point in points) {
    if (!points[point]) return false
  }
  return true
}

function setRandomPin(maxX) {
  return Math.floor(Math.random() * Math.floor(maxX))
}

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
  // for future scoring purposes
  // if (morecollisions > 0) {
  //   playersScore += morecollisions * 50
  // }
}

const runGame = () => {
  let firstLoop = true

  const gameLoop = setInterval(() => {
    if (firstLoop) {
      gameCounter = -3
      firstLoop = false
    }

    if (gameCounter === 0) {
      // move to rescale func that will be run once in the beginning of the game
      tempScale = bodyScale
      // move to getStart point function which run every 8 secs
      tempLeftAnkleY = keyPointsToCollide.leftAnkle.y + 30
      startingX = setRandomPin(1920 - 5.5 * tempScale)

      //getting random WindowShape and fill it with current coordinats
      selectedWindowName = getRandomWindowShapeName(windowShapesName)
      currentWindowShape = windowShapeConstructor(
        startingX,
        tempLeftAnkleY,
        tempScale,
        selectedWindowName
      )
    }

    // Checking if all 13 pointd are withing windowshape
    if (gameCounter === 8) {
      isClear = clear(hit)
      isClearGlobal = isClear
      if (isClear) {
        playersScore += 100
        score()
      } else {
        // comment in for gameplay
        clearInterval(gameLoop)
      }
    }
    if (gameCounter === 12) {
      gameCounter = 0
    } else {
      gameCounter++
    }
  }, 1000)
}

runGame()

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

function modelReady() {
  select('#status').html('Model Loaded')
}

function draw() {
  //where to show the image of video
  translate(width, 0) // move to far corner
  scale(-1.0, 1.0) // flip x-axis backwards
  image(video, 0, 0, width, height)

  if (gameCounter < 8 && gameCounter > 0) {
    drawShape()
  }

  for (let pointName in keyPointsToCollide) {
    ellipse(
      keyPointsToCollide[pointName].x,
      keyPointsToCollide[pointName].y,
      20,
      20
    )

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
  translate(width, 0) // move to far corner
  scale(-1.0, 1.0)
  drawWords()
}

const drawShape = () => {
  beginShape()
  for (i = 0; i < poly.length; i++) {
    vertex(poly[i].x, poly[i].y)
  }
  endShape(CLOSE)
}

const drawWords = () => {
  if (gameCounter === -3 || gameCounter === 9) {
    textSize(80)
    fill('red')
    text(`Get in the starting position `, 200, 520)
  } else if (gameCounter === 8) {
    if (isClearGlobal) {
      textSize(80)
      fill('red')
      text(`CLEAR!!!!!! => YOUR SCORE: ${playersScore}`, 200, 520)
    } else {
      textSize(80)
      fill('red')
      text(`YOUR SCORE: ${playersScore}`, 200, 520)
    }
  } else if (gameCounter === 10) {
    textSize(100)
    fill('black')
    text('READY', 800, 520)
  } else if (gameCounter === 11) {
    textSize(100)
    fill('black')
    text('SET', 800, 520)
  } else if (gameCounter === 12) {
    textSize(100)
    fill('black')
    text('GO', 800, 520)
  }
}
