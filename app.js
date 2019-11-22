/* eslint-disable no-undef */


let video;
let poseNet;
let poses = [];

let scale;
let tempScale;
let tempLeftAnkleY;
let rescale = true;

let startingX;



//Initialize start key point x & y:
let noseX = 0;
let noseY = 0;

let leftShoulderX = 0;
let leftShoulderY = 0;

let rightShoulderX = 0;
let rightShoulderY = 0;

let leftElbowX = 0;
let leftElbowY = 0;

let rightElbowX = 0;
let rightElbowY = 0;

let leftWristX = 0;
let leftWristY = 0;

let rightWristX = 0;
let rightWristY = 0;

let leftHipX = 0;
let leftHipY = 0;

let rightHipX = 0;
let rightHipY = 0;

let rightKneeX = 0;
let rightKneeY = 0;

let leftKneeX = 0;
let leftKneeY = 0;

let leftAnkleX = 0;
let leftAnkleY = 0;

let rightAnkleX = 0;
let rightAnkleY = 0;

let keyPointsToCollide;

let poly = [];



//setIntervalOne to grab and update the current scale for window;
function setRescaleOne() {
  setInterval(() => {
    rescale = !rescale
    tempScale = scale;
    tempLeftAnkleY = leftAnkleY;
    startingX = setRandomPin(1920 - 5.5 * tempScale)
  }, 8000);
}
//setIntervalTwo get invoked to update the current scale for window constantly;
function setRescaleTwo() {
  setInterval(() => {
    rescale = !rescale
    tempScale = scale;
    tempLeftAnkleY = leftAnkleY;
    startingX = setRandomPin(1920 - 5.5 * tempScale)
  }, 8000);
}

setRescaleOne()
setRescaleTwo()




//Getting acsess to camera
function setup() {
  //video screen resolution
  createCanvas(1920, 1080);

  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', gotPoses);
  // Hide the video element, and just show the canvas
  video.hide();
}

function setRandomPin(maxX) {
  return Math.floor(Math.random() * Math.floor(maxX))
}

function gotPoses(results) {
  poses = results;
  if (poses.length > 0) {

    noseX = poses[0].pose.keypoints[0].position.x;
    noseY = poses[0].pose.keypoints[0].position.y;

    leftShoulderX = poses[0].pose.keypoints[5].position.x;
    leftShoulderY = poses[0].pose.keypoints[5].position.y;

    rightShoulderX = poses[0].pose.keypoints[6].position.x;
    rightShoulderY = poses[0].pose.keypoints[6].position.y;

    leftElbowX = poses[0].pose.keypoints[7].position.x;
    leftElbowY = poses[0].pose.keypoints[7].position.y;

    rightElbowX = poses[0].pose.keypoints[8].position.x;
    rightElbowY = poses[0].pose.keypoints[8].position.y;

    leftWristX = poses[0].pose.keypoints[9].position.x;
    leftWristY = poses[0].pose.keypoints[9].position.y;

    rightWristX = poses[0].pose.keypoints[10].position.x;
    rightWristY = poses[0].pose.keypoints[10].position.y;

    leftHipX = poses[0].pose.keypoints[11].position.x;
    leftHipY = poses[0].pose.keypoints[11].position.y;

    rightHipX = poses[0].pose.keypoints[12].position.x;
    rightHipY = poses[0].pose.keypoints[12].position.y;

    rightKneeX = poses[0].pose.keypoints[13].position.x;
    rightKneeY = poses[0].pose.keypoints[13].position.y;

    leftKneeX = poses[0].pose.keypoints[14].position.x;
    leftKneeY = poses[0].pose.keypoints[14].position.y;

    leftAnkleX = poses[0].pose.keypoints[15].position.x;
    leftAnkleY = poses[0].pose.keypoints[15].position.y;

    rightAnkleX = poses[0].pose.keypoints[16].position.x;
    rightAnkleY = poses[0].pose.keypoints[16].position.y;

    keyPointsToCollide = {
      nose: {
        x: noseX,
        y: noseY
      },
      leftShoulder: {
        x: leftShoulderX,
        y: leftShoulderY
      },
      rightShoulder: {
        x: rightShoulderX,
        y: rightShoulderY
      },
      leftElbow: {
        x: leftElbowX,
        y: leftElbowY
      },
      rightElbow: {
        x: rightElbowX,
        y: rightElbowY
      },
      leftWrist: {
        x: leftWristX,
        y: leftWristY
      },
      rightWrist: {
        x: rightWristX,
        y: rightWristY
      },
      leftHip: {
        x: leftHipX,
        y: leftHipY
      },
      rightHip: {
        x: rightHipX,
        y: rightHipY
      },
      rightKnee: {
        x: rightKneeX,
        y: rightKneeY
      },
      leftKnee: {
        x: leftKneeX,
        y: leftKneeY
      },
      leftAnkle: {
        x: leftAnkleX,
        y: leftAnkleY
      },
      rightAnkle: {
        x: rightAnkleX,
        y: rightAnkleY
      }
    }
  }

  scale = dist(rightHipX, rightHipY, rightKneeX, rightKneeY);



  let windowShape = [
    { x: startingX, y: (tempLeftAnkleY + 30) }, //0
    { x: startingX, y: (tempLeftAnkleY + 30 - 0.8 * tempScale) }, //1
    { x: (startingX + 2 * tempScale), y: (tempLeftAnkleY + 30 - 0.8 * tempScale) }, // 2
    { x: (startingX + 2 * tempScale), y: (tempLeftAnkleY + 30 - 1.4 * tempScale) }, // 3
    { x: (startingX), y: (tempLeftAnkleY + 30 - 1.4 * tempScale) }, //4
    { x: (startingX), y: (tempLeftAnkleY + 30 - 2.1 * tempScale) }, // 5
    { x: (startingX + 2 * tempScale), y: (tempLeftAnkleY + 30 - 2.1 * tempScale) }, // 6
    { x: (startingX + 2 * tempScale), y: (tempLeftAnkleY + 30 - 2.7 * tempScale) }, // 7
    { x: (startingX + 3.5 * tempScale), y: (tempLeftAnkleY + 30 - 2.7 * tempScale) }, // 8
    { x: (startingX + 3.5 * tempScale), y: (tempLeftAnkleY + 30 - 0.8 * tempScale) }, // 9
    { x: (startingX + 5.5 * tempScale), y: (tempLeftAnkleY + 30 - 0.8 * tempScale) }, // 10
    { x: (startingX + 5.5 * tempScale), y: (tempLeftAnkleY + 30) } // 11
  ]

  windowShape.forEach(({ x, y }, index) => (
    poly[index] = createVector(x, y))
  )
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

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  //where to show the image of video
  image(video, 0, 0, width, height);
  //You acn add filters by insertinf filter()

  beginShape();
  for (i = 0; i < poly.length; i++) {
    vertex(poly[i].x, poly[i].y);
  }
  endShape(CLOSE);


  for (let pointName in keyPointsToCollide) {


    ellipse(keyPointsToCollide[pointName].x, keyPointsToCollide[pointName].y, 20, 20);

    hit = { ...hit, [pointName]: collideCirclePoly(keyPointsToCollide[pointName].x, keyPointsToCollide[pointName].y, 10, poly, true) };


    // print("colliding? " + hit);

    console.log('HIT OBJECT>>>>', hit)
  }

  // if (rescale) {
  //   drawWindowPoints();
  // }
}
