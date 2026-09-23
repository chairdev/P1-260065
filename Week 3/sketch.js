const squareSize = 100;
const squareRadius = 20;
const squarePadding = 10;

let currentTurn = 0;
let field = [
  -1, -1, -1,
  -1, -1, -1,
  -1, -1, -1
];

let isMouseMoving = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  DrawSquares();
}

function DrawSquares()
{
  let clickedSquare = FindClickedSquare();

  //Draw a padded game board
  for (let x = 0; x < 3; x++) 
  {
      for (let y = 0; y < 3; y++) 
      {        
        if (clickedSquare != false && clickedSquare[0] == x && clickedSquare[1] == y)
        {
          fill("gray");
        }
        else
        {
          fill("white");
        }
        square(squarePadding + x * (squareSize + squarePadding), squarePadding + y * (squareSize + squarePadding), squareSize, squareRadius);
      }
  }
}

function mousePressed() 
{
  let clickedSquare = FindClickedSquare();
  
  if(clickedSquare != false)
  {
    //Set the square on the field to the current player's index
    field[GetFieldIndex(clickedSquare)] = currentTurn;
    console.log("Claimed by player " + currentTurn)
    NextTurn();
  }
}

function IsTileAlreadyOwned(index)
{
  return (field[index] != -1);
}

function NextTurn()
{
  //Next player's turn (0 or 1)
  currentTurn = (currentTurn + 1) % 2;
}

function GetFieldIndex(square)
{
  return square[1] * 3 + square[0];
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
        console.log("Square detected", x, y);
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