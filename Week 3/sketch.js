const squareXOffset = 75;
const squareYOffset = 100;
const squareSize = 100;
const squareRadius = 20;
const squarePadding = 10;

let currentTurn = 0;
let field = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0
];

let gameIsOver = false;

function setup() {
  createCanvas(500, 510);
}

function draw() {
  background(220);
  // Board background
  fill("black");
  square(squareXOffset, squareYOffset, 330, 30);

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
        if(clickedSquare != false && clickedSquare[0] == x && clickedSquare[1] == y && !gameIsOver)
        {
          fill(selectedColor[field[fieldIndex]]);
        }
        else
        {
          fill(deselectedColor[field[fieldIndex]]);
        }

        square(squareXOffset + x * (squareSize + squarePadding), squareYOffset + y * (squareSize + squarePadding), squareSize, squareRadius);
      }
  }
}

function mousePressed() 
{
  let clickedSquare = FindClickedSquare();
  
  if(clickedSquare != false && !gameIsOver)
  {
    let fieldIndex = GetFieldIndex(clickedSquare);
    if(!IsTileAlreadyOwned(fieldIndex))
    {
      //Set the square on the field to the current player's index
      field[fieldIndex] = currentTurn+1;
      console.log("Claimed by player " + currentTurn)
      CheckFieldState();
    }
  }
}

function IsTileAlreadyOwned(index)
{
  return (field[index] != 0);
}

function CheckFieldState()
{
  if (HasThreeInAColumn(1) || HasThreeInARow(1) || HasThreeDiagonally(1))
  {
    console.log("Player 1 wins!");
    gameIsOver = true;
  }
  else if(HasThreeInAColumn(2) || HasThreeInARow(2) || HasThreeDiagonally(2))
  {
    console.log("Player 2 wins!");
    gameIsOver = true;
  }
  else if(IsBoardFull())
  {
    console.log("All tiles are full! It's a draw!!")
    gameIsOver = true;
  }
  else
  {
    NextTurn();
  }
}

function IsBoardFull()
{
  //Loop through the board and check if there are any zeroes (empty) left
  for (let i = 0; i < field.length; i++)
  {
    if (field[i] == 0)
    {
      return false;
    }
  }

  return true;
}

function HasThreeDiagonally(player)
{
  // Top left to bottom right
  let tLbR = [ field[GetFieldIndex([0, 0])], field[GetFieldIndex([1, 1])], field[GetFieldIndex([2, 2])]];
  let tRbL = [ field[GetFieldIndex([2, 0])], field[GetFieldIndex([1, 1])], field[GetFieldIndex([0, 2])]];
  
  
  if(tLbR[0] == player && tLbR[1] == player && tLbR[2] == player)
  {
    console.log("Player " + player + " has three diagonally!");
    return true;
  }

  // Top right to bottom left
  if (tRbL == player && tRbL == player && tRbL == player)
  {
    console.log("Player " + player + " has three diagonally!");
    return true;
  }

  return false;
}

function HasThreeInAColumn(player)
{
  //check if a player has three in a row
  for (let column = 0; column < 3; column++) 
  {
    let tiles = [field[GetFieldIndex([column, 0])], field[GetFieldIndex([column, 1])], field[GetFieldIndex([column, 2])]];

     if (tiles[0] == player && tiles[1] == player && tiles[2] == player)
      {
        console.log("Player " + player + " has three in a column!!")
        return true;
      } 
  }
  return false;
}

function HasThreeInARow(player)
{
  //check if a player has three in a row
  for (let row = 0; row < 3; row++) 
  {
    let tiles = [field[GetFieldIndex([0, row])], field[GetFieldIndex([1, row])], field[GetFieldIndex([2, row])]];

     if (tiles[0] == player && tiles[1] == player && tiles[2] == player)
      {
        console.log("Player " + player + " has three in a row!!")
        return true;
      } 
  }
  return false;
}

function NextTurn()
{
  //Next player's turn (0 or 1)
  currentTurn = (currentTurn + 1) % 2;
  console.log("Player " + currentTurn + "'s turn!")
}

function GetFieldIndex(square)
{
  //turn the 2D positions into a 1D array index using MAAAAAAAAAATH
  return square[1] * 3 + square[0];
}

function FindClickedSquare()
{
  for (let x = 0; x < 3; x++) 
  {
    for (let y = 0; y < 3; y++) 
    {
      let squareX = squareXOffset + x * (squareSize + squarePadding);
      let squareY = squareYOffset + y * (squareSize + squarePadding);

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