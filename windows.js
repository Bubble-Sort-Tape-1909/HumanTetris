let tShape = [
  { x: 700, y: (tempLeftAnkleY + 40) }, // 0
  { x: 700, y: (tempLeftAnkleY - 2.5 * tempScale) }, // 1
  { x: (700 - 2 * tempScale), y: (tempLeftAnkleY - 2.5 * tempScale) }, // 2
  { x: (700 - 2 * tempScale), y: (tempLeftAnkleY - 3.4 * tempScale) }, // 3
  { x: 700, y: (tempLeftAnkleY - 3.4 * tempScale) }, // 4
  { x: 700, y: (tempLeftAnkleY - 4 * tempScale) }, // 5
  { x: (700 + 1.5 * tempScale), y: (tempLeftAnkleY - 4 * tempScale) }, // 6
  { x: (700 + 1.5 * tempScale), y: (tempLeftAnkleY - 3.4 * tempScale) }, // 7
  { x: (700 + 3.5 * tempScale), y: (tempLeftAnkleY - 3.4 * tempScale) }, // 8
  { x: (700 + 3.5 * tempScale), y: (tempLeftAnkleY - 2.5 * tempScale) }, // 9
  { x: (700 + 1.5 * tempScale), y: (tempLeftAnkleY - 2.5 * tempScale) }, // 10
  { x: (700 + 1.5 * tempScale), y: (tempLeftAnkleY + 40) } // 11
];


let split = [
  { x: 420, y: (tempLeftAnkleY + 30) }, //0
  { x: 420, y: (tempLeftAnkleY + 30 - 0.8 * tempScale) }, //1
  { x: (420 + 2 * tempScale), y: (tempLeftAnkleY + 30 - 0.8 * tempScale) }, // 2
  { x: (420 + 2 * tempScale), y: (tempLeftAnkleY + 30 - 1.4 * tempScale) }, // 3
  { x: (420), y: (tempLeftAnkleY + 30 - 1.4 * tempScale) }, //4
  { x: (420), y: (tempLeftAnkleY + 30 - 2.1 * tempScale) }, // 5
  { x: (420 + 2 * tempScale), y: (tempLeftAnkleY + 30 - 2.1 * tempScale) }, // 6
  { x: (420 + 2 * tempScale), y: (tempLeftAnkleY + 30 - 2.7 * tempScale) }, // 7
  { x: (420 + 3.5 * tempScale), y: (tempLeftAnkleY + 30 - 2.7 * tempScale) }, // 8
  { x: (420 + 3.5 * tempScale), y: (tempLeftAnkleY + 30 - 0.8 * tempScale) }, // 9
  { x: (420 + 5.5 * tempScale), y: (tempLeftAnkleY + 30 - 0.8 * tempScale) }, // 10
  { x: (420 + 5.5 * tempScale), y: (tempLeftAnkleY + 30) } // 11
]


let windowShapes = {
  split: [
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
  ],
  tShape: [
    { x: 700, y: (tempLeftAnkleY + 40) }, // 0
    { x: 700, y: (tempLeftAnkleY - 2.5 * tempScale) }, // 1
    { x: (700 - 2 * tempScale), y: (tempLeftAnkleY - 2.5 * tempScale) }, // 2
    { x: (700 - 2 * tempScale), y: (tempLeftAnkleY - 3.4 * tempScale) }, // 3
    { x: 700, y: (tempLeftAnkleY - 3.4 * tempScale) }, // 4
    { x: 700, y: (tempLeftAnkleY - 4 * tempScale) }, // 5
    { x: (700 + 1.5 * tempScale), y: (tempLeftAnkleY - 4 * tempScale) }, // 6
    { x: (700 + 1.5 * tempScale), y: (tempLeftAnkleY - 3.4 * tempScale) }, // 7
    { x: (700 + 3.5 * tempScale), y: (tempLeftAnkleY - 3.4 * tempScale) }, // 8
    { x: (700 + 3.5 * tempScale), y: (tempLeftAnkleY - 2.5 * tempScale) }, // 9
    { x: (700 + 1.5 * tempScale), y: (tempLeftAnkleY - 2.5 * tempScale) }, // 10
    { x: (700 + 1.5 * tempScale), y: (tempLeftAnkleY + 40) } // 11
  ]
}

let getRandomWindowShape = (windowShapes) => {
  let shapes = Object.keys(windowShapes);
  let randomIndex = Math.floor(Math.random() * shapes.length)

  return windowShapes[shapes[randomIndex]]
}
