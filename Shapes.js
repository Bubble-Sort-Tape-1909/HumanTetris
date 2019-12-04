
// this is the shape for split person
let poly = []
function setup() {
  // Create the canvas
  createCanvas(1920, 1080);
  background(200);

  poly[0] = createVector(825, 540);     // set X/Y position
  poly[1] = createVector(1095, 540);
  poly[2] = createVector(1095, 972);
  poly[3] = createVector(1500, 972);
  poly[4] = createVector(1500, 1080);
  poly[5] = createVector(420, 1080);
  poly[6] = createVector(420, 972);
  poly[7] = createVector(825, 972);
  poly[8] = createVector(825, 756);
  poly[9] = createVector(420, 756);
  poly[10] = createVector(420, 648);
  poly[11] = createVector(825, 648);

  beginShape();
  for (i = 0; i < poly.length; i++) {
    vertex(poly[i].x, poly[i].y);
  }
  endShape(CLOSE);
  }
