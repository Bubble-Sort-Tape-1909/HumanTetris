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


// function drawWindowPoints() {
//   let x = 200;
//   let y = 200;

//   let testWindow = [
//     { x: x, y: y },
//     { x: (x + tempScale * 15), y: y },
//     { x: (x + tempScale * 15), y: (y + tempScale * 15) },
//     { x: x, y: (y + tempScale * 15) }
//   ];

//   //Loop through all the points in window
//   testWindow.forEach((point, index) => {
//     fill(0, 0, 255);
//     noStroke();
//     ellipse(point.x, point.y, 50, 50);

//     //drowing the lines between points:
//     // if we haven't reach the laat point keep drowing
//     if (testWindow[index + 1]) {
//       stroke(255);
//       strokeWeight(20);
//       line(point.x, point.y, testWindow[index + 1].x, testWindow[index + 1].y);
//     } else {
//       //if it's the lat point make a line to the first one
//       stroke(255);
//       strokeWeight(20);
//       line(point.x, point.y, testWindow[0].x, testWindow[0].y);
//     }
//   })
// }


// poly[0] = createVector(380, 410);     // set X/Y position
//   poly[1] = createVector(410, 410);
//   poly[2] = createVector(410, 430);     // set X/Y position
//   poly[3] = createVector(485, 430);
//   poly[3] = createVector(, 430);


// function setup() {
//   // Create the canvas
//   createCanvas(1920, 1080);
//   background(0);

//    stroke(255);
//   point(393, 398);
//   point(469, 477);
//   point(323, 461);
//   point(554, 531);
//   point(216, 526);
//   point(621, 597);
//   point(109, 594);
//   point(427, 664);
//   point(323, 659);
//   point(445, 820);
//   point(290, 803);
//   point(457, 951);
//   point(250, 953);
// }

// let poly = []
// function setup() {
//   // Create the canvas
//   createCanvas(1920, 1080);
//   background(0);

//   stroke(255);
// ellipse(393, 398, 120, 120)// nose
// ellipse(469, 477, 40, 40)// leftShoulder
// ellipse(323, 461, 40, 40) // rightShoulder
// ellipse(554, 531, 40, 40)  // leftElbow
// ellipse(216, 526, 40, 40); // rightElbow
// ellipse(621, 597, 40, 40); // leftWrist
// ellipse(109, 594, 40, 40); // rightWrist
// ellipse(427, 664, 40, 40); // leftHip
// ellipse(323, 659, 40, 40); // rightHip
// ellipse(445, 820, 40, 40); // leftKnee
// ellipse(290, 803, 40, 40); // rightKnee
// ellipse(457, 951, 40, 40); // leftAnkle
// ellipse(250, 953, 40, 40); // rightAnkle

// poly[0] = createVector((469 + 20), (477 - 20));  //  left shoulder top outside // set X/Y position
// poly[1] = createVector((554 + 20), (531 - 20)); // left elbow top outside
// poly[2] = createVector((621 + 20), (597 - 20));  // left wrist top outside
// poly[3] = createVector((621 + 20), (597 + 20));  // left wrist bottom outside
// poly[4] = createVector((621 - 20), (597 + 20));  // left wrist bottom inside
// poly[5] = createVector((554 - 20), (531 - 20));  // left elbow bottom inside
// poly[6] = createVector((469 - 20), (477 + 20));  // left shoulder bottom inside  // set X/Y position
// poly[7] = createVector((427 + 40), (664));  //   left hip outside middle
// poly[8] = createVector((445 + 20), (820));  //   left knee outside middle
// poly[9] = createVector((457 + 20), (951 + 20));  //   left ankle outside
// poly[10] = createVector((457 + 20), (951 + 20))  //left ankle inside
// poly[11] = createVector((445 - 20), (820));  // left knee inside middle

// // THIS ONE WILL NEED TO BE ADJUSTED LATER TO MAKE SURE THAT WE ARE TARGETING THE MIDDLE OF THE HIPS
// poly[12] = createVector(((427 - 323) / 2 + 323), ((427 - 323) * 0.4 + (664 + 659) / 2));  //   GROIN


// poly[13] = createVector((290 + 20), (803));  //   right knee insdie
// poly[14] = createVector((250 + 20), (953 + 20));  //   right ankle inside
// poly[15] = createVector((250 - 20), (953 + 20)); //right ankle outside
// poly[16] = createVector((290 - 20), (803));  //   right knee outside
// poly[17] = createVector((323 - 40), (659));  //  right hip outside
// poly[18] = createVector((323 - 20), (461 + 20));  //   right shoulder
// poly[19] = createVector((216 + 20), (526 + 20));   //right elbow bottom inside
// poly[20] = createVector((109 + 20), (594 + 20));   // right wrist inside bottom
// poly[21] = createVector((109 - 20), (594 + 20));   // right wrist outside bottom
// poly[22] = createVector((109 - 20), (594 - 20));   // right wrist outside top
// poly[23] = createVector((216 - 20), (526 - 20));   // right elbow
// poly[24] = createVector((323 - 20), (461 - 20));   // right shoulder


//   beginShape();
//   for (i = 0; i < poly.length; i++) {
//     vertex(poly[i].x, poly[i].y);
//   }
//   endShape(CLOSE);
// }
