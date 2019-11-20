let video;
let poseNet;
let poses = [];


//Getting acsess to camera
function setup() {
  //video screen resolution
  createCanvas(1500, 900);
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
}


function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  //where to show the image of video
  image(video, 0, 0, width, height);
  //You acn add filters by insertinf filter()

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
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
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  console.log(poses)
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;



    let rightHipX = poses[i].pose.rightHip.x;
    let rightHipY = poses[i].pose.rightHip.y;

    let rightKneeX = poses[i].pose.rightKnee.x;
    let rightKneeY = poses[i].pose.rightKnee.y;

    let d = dist(rightHipX, rightHipY, rightKneeX, rightKneeY) /3;


    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];




      stroke(255);
      strokeWeight(d);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);

    }
  }
}
