let poly = []
function setup() {
  createCanvas(1920, 1080);
  background(200);
  
  poly[0] = createVector(75, 300);     // set X/Y position
  poly[1] = createVector(75, 800);
  poly[2] = createVector(225, 800);
  poly[3] = createVector(225, 1080);
  poly[4] = createVector(325, 1080);
  poly[5] = createVector(325, 800);
  poly[6] = createVector(425, 800);
  poly[7] = createVector(425, 1080);
  poly[8] = createVector(525, 1080);
  poly[9] = createVector(525, 800);
  poly[10] = createVector(700, 800);
  poly[11] = createVector(700, 300);
  poly[12] = createVector(600, 300)
  poly[13] = createVector(600, 550)
  poly[14] = createVector(450, 550)
  poly[15] = createVector(450, 425)
  poly[16] = createVector(300, 425)
  poly[17] = createVector(300, 550)
  poly[18] = createVector(175, 550)
  poly[19] = createVector(175, 300)
  
  
  beginShape();
  for (i = 0; i < poly.length; i++) {
    vertex(poly[i].x, poly[i].y);
  }
  endShape(CLOSE);
  }

  //https://human-tetris.firebaseapp.com