const squareSize = 100;
const squareRadius = 20;
const squarePadding = 10;

let currentTurn = 0;
let field = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0
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
  const selectedColor = ["#6d758d", "#143464", "#73172d"];
  const deselectedColor = ["#dae0ea", "#285cc4", "#b4202a"]

  let clickedSquare = FindClickedSquare();

  //Draw a padded game board
  for (let x = 0; x < 3; x++) 
  {
      for (let y = 0; y < 3; y++) 
      {        
        let fieldIndex = GetFieldIndex([x, y]);

        //Set the square color
        if(clickedSquare != false && clickedSquare[0] == x && clickedSquare[1] == y)
        {
          fill(selectedColor[field[fieldIndex]]);
        }
        else
        {
          fill(deselectedColor[field[fieldIndex]]);
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
    let fieldIndex = GetFieldIndex(clickedSquare);
    if(!IsTileAlreadyOwned(fieldIndex))
    {
      //Set the square on the field to the current player's index
      field[fieldIndex] = currentTurn+1;
      console.log("Claimed by player " + currentTurn)
      CheckFieldState();
      NextTurn();
    }
  }
}

function IsTileAlreadyOwned(index)
{
  return (field[index] != 0);
}

function CheckFieldState()
{
  if (HasThreeInARow(1) || HasThreeInARow(2))
  {

  }
}

function HasThreeInARow(player)
{
  //check if a player has three in a row
  for (let row = 0; row < 3; row++) 
  {
    let tiles = [field[GetFieldIndex([0, row])], field[GetFieldIndex([1, row])], field[GetFieldIndex([2, row])]];

     if (tiles[0] == player && tiles[0] == player && tiles[0] == player)
      {
        console.log("Player " + player + " has won!!")
        return true;
      } 
  }
  return false;
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