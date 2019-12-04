let windowShapeConstructor = (startingX, tempLeftAnkleY, tempScale, name) => {
  if (name === 'split') {
    return [
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
  } else if (name === 'tShape') {
    return [
      { x: startingX, y: (tempLeftAnkleY + 40) }, // 0
      { x: startingX, y: (tempLeftAnkleY - 2.5 * tempScale) }, // 1
      { x: (startingX - 2 * tempScale), y: (tempLeftAnkleY - 2.5 * tempScale) }, // 2
      { x: (startingX - 2 * tempScale), y: (tempLeftAnkleY - 3.4 * tempScale) }, // 3
      { x: startingX, y: (tempLeftAnkleY - 3.4 * tempScale) }, // 4
      { x: startingX, y: (tempLeftAnkleY - 4 * tempScale) }, // 5
      { x: (startingX + 1.5 * tempScale), y: (tempLeftAnkleY - 4 * tempScale) }, // 6
      { x: (startingX + 1.5 * tempScale), y: (tempLeftAnkleY - 3.4 * tempScale) }, // 7
      { x: (startingX + 3.5 * tempScale), y: (tempLeftAnkleY - 3.4 * tempScale) }, // 8
      { x: (startingX + 3.5 * tempScale), y: (tempLeftAnkleY - 2.5 * tempScale) }, // 9
      { x: (startingX + 1.5 * tempScale), y: (tempLeftAnkleY - 2.5 * tempScale) }, // 10
      { x: (startingX + 1.5 * tempScale), y: (tempLeftAnkleY + 40) } // 11
    ]
  }
}

let windowShapesName = ['split', 'tShape'];

let getRandomWindowShapeName = (widowShapesName) => {
  let randomIndex = Math.floor(Math.random() * widowShapesName.length)
  return widowShapesName[randomIndex];
}

let selectedWindowName = getRandomWindowShapeName(widowShapesName);

currentWindowShape = windowShapeConstructor(startingX, tempLeftAnkleY, tempScale, selectedWindowName);
