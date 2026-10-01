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
}

function keyPressed()
{
  //If backspace is pressed, generate the shapes
  if (keyCode === BACKSPACE)
  {
    shapes = [];
    for (let i = 0; i < loopCount; i++) {
      CreateRandomShape();
    }
  }
}

function draw() {
  background(220);
    noStroke();

  //Iterate through the shapes array and draw each shape
  shapes.forEach(shape => {
    shape.angle += shape.rotationSpeed * (deltaTime / 1000);
    DrawShape(shape.x, shape.y, shape.shape, shape.size, shape.color, shape.angle);
  });
}

function CreateRandomShape() {
  // Randomly generate shape properties
  let x = getRandomInt(width);
  let y = getRandomInt(height);
  let size = [90 + getRandomInt(150), getRandomInt(150)];
  let shape = getRandomInt(GEOMETRY_SHAPE.LENGTH);
  let shapeColor = color(getRandomInt(256), getRandomInt(256), getRandomInt(256));
  let angle = random(360);
  let rotationSpeed = random(-5, 5);

  //Push the new shape
  shapes.push({ x: x, y: y, size: size, shape: shape, color: shapeColor, angle: angle, rotationSpeed: rotationSpeed });
}

function DrawShape(x, y, shape, size, color, angle) {
  fill(color);
  // Begin the drawing group.
  push();
  translate(x, y);
  rotate(angle);

  // Draw the right shape
  switch (shape) {
    case GEOMETRY_SHAPE.ELIPSE:
      ellipse(0, 0, size[0], size[1]);
      break;
    case GEOMETRY_SHAPE.RECTANGLE:
      rect(0, 0, size[0], size[1]);
      break;
    case GEOMETRY_SHAPE.TRIANGLE:
      triangle(0, 0, size[0] / 2, size[1] / 2, 0, -size[1] / 2);
      break;
    default:
      console.log("Invalid shape type");
  }
  pop();
  // End the drawing group.
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}