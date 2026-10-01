let shapes = [];
const loopCount = 105;

const GEOMETRY_SHAPE = {
  ELIPSE: 0,
  RECTANGLE: 1,
  TRIANGLE: 2,
  LENGTH: 3
}

function setup() {
  createCanvas(800, 600);

  for (let i = 0; i < loopCount; i++) {
    CreateRandomShape();
  }
}

function draw() {
  background(220);

  //Iterate through the shapes array and draw each shape
  shapes.forEach(shape => {
    DrawShape(shape.x, shape.y, shape.shape, shape.size, shape.color);
  });
}

function CreateRandomShape() {
  // Randomly generate shape properties
  let x = getRandomInt(width);
  let y = getRandomInt(height);
  let size = [getRandomInt(150), getRandomInt(150)];
  let shape = getRandomInt(GEOMETRY_SHAPE.LENGTH);
  let shapeColor = color(getRandomInt(256), getRandomInt(256), getRandomInt(256));

  //Push the new shape
  shapes.push({ x: x, y: y, size: size, shape: shape, color: shapeColor });
}

function DrawShape(x, y, shape, size, color) {
  fill(color);
  // Draw the right shape
  switch (shape) {
    case GEOMETRY_SHAPE.ELIPSE:
      ellipse(x, y, size[0], size[1]);
      break;
    case GEOMETRY_SHAPE.RECTANGLE:
      rect(x, y, size[0], size[1]);
      break;
    case GEOMETRY_SHAPE.TRIANGLE:
      triangle(x, y, x + size[0], y, x + size[0] / 2, y - size[1]);
      break;
    default:
      console.log("Invalid shape type");
  }
  //{ x: 25, y: -250 }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}