const xAnchor = 10;
const yAnchor = 10;
const stripeHeight = 60 / 3;
const checkerboardSize = 18;
const houseWidth = 60;
const houseHeight = 50;

//web dev more like LAME dev

function setup() 
{
  createCanvas(800, 800);
}
 
function draw() 
{
  background(220);
  
  textSize(15);
  //#region Name
  fill(0, 0, 0);
  text("1", xAnchor, calculateYAnchor(1), 70, 80);
  //"btch pls... you know who tf i am" - a very wise woman (natalie nunn)
  text("Tirell Benard", calculateXAnchor(1), calculateYAnchor(1), 100, 80);
  //#endregion

  //#region Flag
  fill(0, 0, 0);
  text("2", xAnchor, calculateYAnchor(2), 70, 80);

  //red white blue
  fill(0, 129, 31);
  rect(calculateXAnchor(2), calculateYAnchor(2) + stripeHeight, 100, stripeHeight)
  fill(255, 255, 255);
  rect(calculateXAnchor(2), calculateYAnchor(2) + stripeHeight * 2, 100, stripeHeight)
  fill(0, 129, 31);
  rect(calculateXAnchor(2), calculateYAnchor(2) + stripeHeight * 3, 100, stripeHeight)
  //#endregion

  //#region Checkerboard
  fill(0, 0, 0);
  text("3", xAnchor, calculateYAnchor(5), 70, 80);
  
  // Black squares
  //Drawing them using offsets (math blegh) because its ez
  fill(0, 0, 0);
  square(calculateXAnchor(3), calculateYAnchor(5), checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize, calculateYAnchor(5) + checkerboardSize, checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize*2, calculateYAnchor(5) + checkerboardSize * 2, checkerboardSize);
  square(calculateXAnchor(3)+checkerboardSize*2, calculateYAnchor(5), checkerboardSize);
  square(calculateXAnchor(3), calculateYAnchor(5)+checkerboardSize*2, checkerboardSize);

  // White squares
  fill(255, 255, 255);
  square(calculateXAnchor(3), calculateYAnchor(5)+checkerboardSize, checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize*2, calculateYAnchor(5) + checkerboardSize, checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize, calculateYAnchor(5), checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize, calculateYAnchor(5) + checkerboardSize*2, checkerboardSize);
  //#endregion

  // this is insufferable and i dont feel like doing it rn so im writing comments
  // i forgot how nice it is to pass time this way

  //#region Transparent house
  fill(0, 0, 0);
  text("4", xAnchor, calculateYAnchor(7), 70, 80);

  fill(0, 0, 0, 0);
  triangle(calculateXAnchor(5), calculateYAnchor(8), calculateXAnchor(7) + houseWidth, calculateYAnchor(8), calculateXAnchor(5) + houseWidth / 2, calculateYAnchor(8) - houseHeight/2);
  rect(calculateXAnchor(5), calculateYAnchor(8), houseWidth, houseHeight);
  //#endregion
}

function calculateXAnchor(num)
{
  return xAnchor + (num + 15);
}

function calculateYAnchor(num)
{
  return yAnchor + (num * 30);
}