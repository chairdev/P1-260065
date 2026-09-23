function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  DrawSquares();
}

function DrawSquares()
{
  const padding = 10;
  const squareSize = 100;
  const squareRadius = 20;

  for (let x = 0; x < 3; x++) 
  {
      for (let y = 0; y < 3; y++) 
      {
        square(padding + x * (squareSize + padding), padding + y * (squareSize + padding), squareSize, squareRadius);
      }
  }
}