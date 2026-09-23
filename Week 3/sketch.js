const squareSize = 100;
const squareRadius = 20;
const squarePadding = 10;

let currentTurn = 0;
let field = [
  -1, -1, -1,
  -1, -1, -1,
  -1, -1, -1
];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  DrawSquares();
}

function DrawSquares()
{
  //Draw a padded game board
  for (let x = 0; x < 3; x++) 
  {
      for (let y = 0; y < 3; y++) 
      {
        let clickedSquare = FindClickedSquare();
        
        if(clickedSquare != false)
        {
          //Change the color of the square to show that it's currently being hovered over
          if(clickedSquare[0] == x && clickedSquare[1] == y)
          {

          }
        }
        square(squarePadding + x * (squareSize + squarePadding), squarePadding + y * (squareSize + squarePadding), squareSize, squareRadius);
      }
  }
}


function mousePressed() 
{
  
}

function FindClickedSquare()
{
  for (let x = 0; x < 3; x++) 
  {
    for (let y = 0; y < 3; y++) 
    {
      let squareX = x * (squareSize + squarePadding);
      let squareY = y * (squareSize + squarePadding);

      //Return the square's id
      if (MouseIsWithinBounds(mouseX, mouseY, squareX, squareY)) {
        console.log("Square clicked:", x, y);
        return [x, y];
      }
    }
  }
  //Otherwise return false to signify that there was no match
  return false;
}

function MouseIsWithinBounds(mouseX, mouseY, squareX, squareY)
{
  //Check if Mouse's coordinates are within the bounds of the square
  return (  mouseX >= squareX && mouseX <= squareX + squareSize &&
            mouseY >= squareY && mouseY <= squareY + squareSize );
}