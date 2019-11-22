let video;
let poseNet;
let poses = [];

let scale;
let tempScale;
let rescale = true;

//Start x & y:
let leftWristX = 0;
let leftWristY = 0;

let rightWristX = 0;
let rightWristY = 0;

//setIntervalOne to grab and update the current scale for window;
function setRescaleOne() {
  setInterval(() => {
    rescale = !rescale;
    tempScale = scale;
  }, 6000);
}
//setIntervalTwo get invoked to update the current scale for window constantly;
function setRescaleTwo() {
  setInterval(() => {
    rescale = !rescale;
    tempScale = scale;
  }, 6000);
}

setRescaleOne();
setRescaleTwo();

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
  poseNet.on("pose", gotPoses);
  // Hide the video element, and just show the canvas
  video.hide();
}

function gotPoses(results) {
  poses = results;
  if (poses.length > 0) {
    leftWristX = poses[0].pose.keypoints[9].position.x;
    leftWristY = poses[0].pose.keypoints[9].position.y;

    rightWristX = poses[0].pose.keypoints[10].position.x;
    rightWristY = poses[0].pose.keypoints[10].position.y;
  }
}

// Test collision
let hit = false;

function modelReady() {
  select("#status").html("Model Loaded");
}

function draw() {
  //where to show the image of video
  image(video, 0, 0, width, height);
  //You acn add filters by insertinf filter()

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();

  rect(200, 200, 100, 150);

  ellipse(rightWristX, rightWristY, 100, 100);

  hit = collideRectCircle(200, 200, 100, 150, rightWristX, rightWristY, 100);
  print("colliding? " + hit);

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
      line(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y
      );
    }
  }
}

function drawWindowPoints() {
  let x = 200;
  let y = 200;

  let testWindow = [
    { x: x, y: y },
    { x: x + tempScale * 15, y: y },
    { x: x + tempScale * 15, y: y + tempScale * 15 },
    { x: x, y: y + tempScale * 15 }
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
  });
}
