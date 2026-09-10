const xAnchor = 10;
const yAnchor = 10;

const stripeHeight = 60 / 3;
const checkerboardSize = 18;

const roffaGreen = "#00811f"

const houseWidth = 60;
const houseHeight = 50;

const circleSize = 35;

//web dev more like LAME dev

function setup() 
{
  createCanvas(800, 800);
  noLoop(); //running this every frame isn't really that necessary... and besides, it made using noStroke() kinda annoying
}
 
function draw() 
{
  background(220);
  
  textSize(15);
  //#region Name
  fill("black");
  text("1", xAnchor, calculateYAnchor(1), 70, 80);
  //"btch pls... you know who tf i am" - a very wise woman (natalie nunn)
  text("Tirell Benard", calculateXAnchor(1), calculateYAnchor(1), 100, 80);
  //#endregion

  //#region Flag
  fill("black");
  text("2", xAnchor, calculateYAnchor(2), 70, 80);

  //green white green
  noStroke()
  fill(roffaGreen);
  rect(calculateXAnchor(2), calculateYAnchor(2) + stripeHeight, 100, stripeHeight)
  fill("white");
  rect(calculateXAnchor(2), calculateYAnchor(2) + stripeHeight * 2, 100, stripeHeight)
  fill(roffaGreen);
  rect(calculateXAnchor(2), calculateYAnchor(2) + stripeHeight * 3, 100, stripeHeight)
  //#endregion

  //#region Checkerboard
  fill("black");
  text("3", xAnchor, calculateYAnchor(5), 70, 80);
  
  // Black squares
  stroke(1)
  strokeWeight(2)

  //Drawing them using offsets (math blegh) because its ez
  fill("black");
  square(calculateXAnchor(3), calculateYAnchor(5), checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize, calculateYAnchor(5) + checkerboardSize, checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize*2, calculateYAnchor(5) + checkerboardSize * 2, checkerboardSize);
  square(calculateXAnchor(3)+checkerboardSize*2, calculateYAnchor(5), checkerboardSize);
  square(calculateXAnchor(3), calculateYAnchor(5)+checkerboardSize*2, checkerboardSize);

  // White squares
  fill("white");
  square(calculateXAnchor(3), calculateYAnchor(5)+checkerboardSize, checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize*2, calculateYAnchor(5) + checkerboardSize, checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize, calculateYAnchor(5), checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize, calculateYAnchor(5) + checkerboardSize*2, checkerboardSize);
  //#endregion

  // this is insufferable and i dont feel like doing it rn so im writing comments
  // i forgot how nice it is to pass time this way

  //#region Transparent house
  strokeWeight(0)
  fill("black");
  text("4", xAnchor, calculateYAnchor(7), 70, 80);

  strokeWeight(5)
  fill(0, 0, 0, 0);
  triangle(calculateXAnchor(4), calculateYAnchor(8), calculateXAnchor(7) + houseWidth, calculateYAnchor(8), calculateXAnchor(5) + houseWidth / 2, calculateYAnchor(8) - houseHeight/2);
  rect(calculateXAnchor(5), calculateYAnchor(8), houseWidth, houseHeight);
  //#endregion

  //#region Traffic Light
  strokeWeight(0)
  fill("black")
  text("5", calculateXAnchor(200), calculateYAnchor(1), 70, 80);

  noStroke()
  fill("gray");
  rect(calculateXAnchor(210), calculateYAnchor(2), 50, 140);

  fill("red")
  circle(calculateXAnchor(200)+circleSize, calculateYAnchor(2)+circleSize/1.5, circleSize);

  fill("orange")
  circle(calculateXAnchor(200)+circleSize, calculateYAnchor(3.5)+circleSize/1.5, circleSize);

  fill("green")
  circle(calculateXAnchor(200)+circleSize, calculateYAnchor(5)+circleSize/1.5, circleSize);

  fill("gray");
  rect(calculateXAnchor(200)+circleSize/1.5, calculateYAnchor(6.5), 25, 40); 
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