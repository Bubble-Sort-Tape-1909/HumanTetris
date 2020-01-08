![Human Tetris](./public/Tetris.png)

## By Milo Calvo-Platero, Sam Miller, Maksim Pesetski and Danny Gutmann



# Technologies
  We had to find ways to integrate various technologies in order to get our game fully functional. Each one provided a specific part of the game and all together they allowed us to 

## PoseNet
  (PoseNet)[https://github.com/google-coral/project-posenet] is a javascript library that was built on top of ML5 in order to constantly improve the accuracy of the technology. It tracks 17 key points across people's bodies 

## p5.js
(p5.js)[https://github.com/processing/p5.js?files=1] is a javascript library that allows for the creation of graphic experiences and has various sub libraries. The parts of p5 that were integral to our game were canvas, p5.collide2d.js and p5.sound.js

### Canvas
(p5.createCanvas)[] function creates a canvas element in the document, and sets the dimensions of it in pixels. We used created canvas to draw a video on it and then shapes with directions for the game process to create a unique UI.

### p5.Collide2D.js
(p5.Collide2D.js)[https://github.com/bmoren/p5.collide2D] allowed us to check if the user’s body is within the current shape by calculating collision between the window shape and all 17 player’s body keypoints.

### p5.Sound.js
(p5.Sound.js)[https://github.com/processing/p5.js-sound] is a library that allowed us to play music during the game process to help players get a full game experience.

### Firebase Authentication
(Firebase’s Authentication)[https://firebase.google.com/products/auth/]

### Firebase Firestore
(Firestore)[https://firebase.google.com/products/firestore/] is a no-sql document database




# Installation
Run ‘npm install’ within the website folder
Run ‘npm run start’ to run the website locally


#Presentation
Please, feel free to checkout the project presentation at (HERE)[https://youtu.be/TcYCWliA7PI]


You can play the game at https://humantetris.web.app