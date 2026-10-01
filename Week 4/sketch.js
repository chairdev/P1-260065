let shapes = [];
const canvasWidth = 800;
const canvasHeight = 600;
const loopCount = 105;

const GEOMETRY_SHAPE = {
  ELIPSE: 0,
  RECTANGLE: 1,
  TRIANGLE: 2,
  LENGTH: 3
}

function setup() 
{
  createCanvas(canvasWidth, canvasHeight);
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

function draw()
{
  background(255);
    noStroke();

  //Iterate through the shapes array and draw each shape

  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    shape.angle += shape.rotationSpeed * (deltaTime / 1000);
    DrawShape(i, shape.shape, shape.size, shape.color, shape.angle);
  }
}

function CreateRandomShape() 
{
  // Randomly generate shape properties
  let size = [40 + getRandomInt(40), 40 + getRandomInt(40)];
  let shape = getRandomInt(GEOMETRY_SHAPE.LENGTH);
  let shapeColor = color(getRandomInt(256), getRandomInt(256), getRandomInt(256));
  let angle = random(360);
  let rotationSpeed = random(-5, 5);

  //Push the new shape
  shapes.push({ size: size, shape: shape, color: shapeColor, angle: angle, rotationSpeed: rotationSpeed });
}

function DrawShape(index, shape, size, color, angle) 
{
  const columns = 10;
  const padding = 50;
  const cellSize = 60;

  fill(color);
  // Begin the drawing group.
  push();
  let x = (index % columns) * cellSize + padding;
  let y = Math.floor(index / columns) * cellSize + padding;
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