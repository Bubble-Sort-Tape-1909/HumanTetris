let video;
let poseNet;
let poses = [];

let scale;
let tempScale;
let rescale = true;

//Start x & y:
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


// //setIntervalOne to grab and update the current scale for window;
// function setRescaleOne() {
//   setInterval(() => {
//     rescale = !rescale
//     tempScale = scale;
//   }, 6000);
// }
// //setIntervalTwo get invoked to update the current scale for window constantly;
// function setRescaleTwo() {
//   setInterval(() => {
//     rescale = !rescale
//     tempScale = scale;
//   }, 6000);
// }

// setRescaleOne()
// setRescaleTwo()


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

  // We can call both functions to draw all keypoints and the skeletons
  // drawKeypoints();
  // drawSkeleton();

  rect(200, 50, 800, 1000);
  for (let pointName in keyPointsToCollide) {
    ellipse(keyPointsToCollide[pointName].x, keyPointsToCollide[pointName].y, 20, 20);

    // hit[pointName] = collideRectCircle(200, 50, 800, 1000, keyPointsToCollide[pointName].x, keyPointsToCollide[pointName].y, 100)

    hit = { ...hit, [pointName]: collideRectCircle(200, 50, 800, 1000, keyPointsToCollide[pointName].x, keyPointsToCollide[pointName].y, 100) }

    // print("colliding? " + hit);

    console.log('HIT OBJECT>>>>', hit)
  }



  // if (rescale) {
  //   drawWindowPoints();
  // }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        if (keypoint.part === "nose") {
          fill(255, 0, 0);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 100, 100);
        } else {
          fill(255, 0, 0);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        }
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;

    let rightHipX = poses[i].pose.rightHip.x;
    let rightHipY = poses[i].pose.rightHip.y;

    let rightKneeX = poses[i].pose.rightKnee.x;
    let rightKneeY = poses[i].pose.rightKnee.y;

    //grabing a scale parameter to resize the objects at the screen
    scale = dist(rightHipX, rightHipY, rightKneeX, rightKneeY) / 3;

    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];

      stroke(255);
      strokeWeight(scale);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);

    }
  }
}


function drawWindowPoints() {
  let x = 200;
  let y = 200;

  let testWindow = [
    { x: x, y: y },
    { x: (x + tempScale * 15), y: y },
    { x: (x + tempScale * 15), y: (y + tempScale * 15) },
    { x: x, y: (y + tempScale * 15) }
  ];

  //Loop through all the points in window
  testWindow.forEach((point, index) => {
    fill(0, 0, 255);
    noStroke();
    ellipse(point.x, point.y, 50, 50);

    //drowing the lines between points:
    // if we haven't reach the laat point keep drowing
    if (testWindow[index + 1]) {
      stroke(255);
      strokeWeight(20);
      line(point.x, point.y, testWindow[index + 1].x, testWindow[index + 1].y);
    } else {
      //if it's the lat point make a line to the first one
      stroke(255);
      strokeWeight(20);
      line(point.x, point.y, testWindow[0].x, testWindow[0].y);
    }
  })
}

