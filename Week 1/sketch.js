const xAnchor = 10;
const yAnchor = 10;

const stripeHeight = 60 / 3;
const checkerboardSize = 18;

const roffaGreen = "#00811f"

const houseWidth = 60;
const houseHeight = 50;

const signalSize = 35;

const diceCircleSize = 20;

//web dev more like LAME dev

function setup() 
{
  createCanvas(800, 800);
  noLoop(); //running this every frame isn't really that necessary...
}
 
function draw() 
{
  background(220);
  textSize(15);

  DrawName();
  DrawFlag();
  DrawCheckerboard();
  DrawTransparentHouse();
  DrawTrafficLight();
  DrawDice();
}

function DrawName()
{
  fill("black");
  text("1", xAnchor, CalcYAnchor(1), 70, 80);
  //"btch pls... you know who tf i am" - a very wise woman (natalie nunn)
  text("Tirell Benard", CalcXAnchor(1), CalcYAnchor(1), 100, 80);
}

function DrawFlag()
{
  fill("black");
  text("2", xAnchor, CalcYAnchor(2), 70, 80);

  //green white green
  noStroke();
  fill(roffaGreen);
  rect(CalcXAnchor(2), CalcYAnchor(2) + stripeHeight, 100, stripeHeight)
  fill("white");
  rect(CalcXAnchor(2), CalcYAnchor(2) + stripeHeight * 2, 100, stripeHeight)
  fill(roffaGreen);
  rect(CalcXAnchor(2), CalcYAnchor(2) + stripeHeight * 3, 100, stripeHeight)
}

function DrawCheckerboard()
{
  // this is insufferable and i dont feel like doing it rn so im writing comments
  // i forgot how nice it is to pass time this way

  fill("black");
  text("3", xAnchor, CalcYAnchor(5), 70, 80);
  
  // Black squares
  stroke(1);
  strokeWeight(2);

  //Drawing them using offsets (math blegh) because its ez
  fill("black");
  square(CalcXAnchor(3), CalcYAnchor(5), checkerboardSize);
  square(CalcXAnchor(3) + checkerboardSize, CalcYAnchor(5) + checkerboardSize, checkerboardSize);
  square(CalcXAnchor(3) + checkerboardSize*2, CalcYAnchor(5) + checkerboardSize * 2, checkerboardSize);
  square(CalcXAnchor(3)+checkerboardSize*2, CalcYAnchor(5), checkerboardSize);
  square(CalcXAnchor(3), CalcYAnchor(5)+checkerboardSize*2, checkerboardSize);

  // White squares
  fill("white");
  square(CalcXAnchor(3), CalcYAnchor(5)+checkerboardSize, checkerboardSize);
  square(CalcXAnchor(3) + checkerboardSize*2, CalcYAnchor(5) + checkerboardSize, checkerboardSize);
  square(CalcXAnchor(3) + checkerboardSize, CalcYAnchor(5), checkerboardSize);
  square(CalcXAnchor(3) + checkerboardSize, CalcYAnchor(5) + checkerboardSize*2, checkerboardSize);
}

function DrawTransparentHouse()
{
  strokeWeight(0);
  fill("black");
  text("4", xAnchor, CalcYAnchor(7), 70, 80);

  strokeWeight(5)
  fill(0, 0, 0, 0);
  triangle(CalcXAnchor(4), CalcYAnchor(8), CalcXAnchor(7) + houseWidth, CalcYAnchor(8), CalcXAnchor(5) + houseWidth / 2, CalcYAnchor(8) - houseHeight/2);
  rect(CalcXAnchor(5), CalcYAnchor(8), houseWidth, houseHeight);
}

function DrawTrafficLight()
{
  strokeWeight(0);
  fill("black");
  text("5", CalcXAnchor(200), CalcYAnchor(1), 70, 80);

  noStroke()
  fill("gray");
  rect(CalcXAnchor(210), CalcYAnchor(2), 50, 140);

  fill("red")
  circle(CalcXAnchor(200)+signalSize, CalcYAnchor(2)+signalSize/1.5, signalSize);

  fill("orange")
  circle(CalcXAnchor(200)+signalSize, CalcYAnchor(3.5)+signalSize/1.5, signalSize);

  fill("green")
  circle(CalcXAnchor(200)+signalSize, CalcYAnchor(5)+signalSize/1.5, signalSize);

  fill("gray");
  rect(CalcXAnchor(200)+signalSize/1.5, CalcYAnchor(6.5), 25, 40); 
}

function DrawDice()
{
  fill("black");
  text("6", CalcXAnchor(200), CalcYAnchor(8), 70, 80);

  stroke(1);
  strokeWeight(3);
  fill("white");
  square(CalcXAnchor(210), CalcYAnchor(9), 100, 10);

  stroke(1)
  strokeWeight(3)
  fill("black")

  //This'll draw a 6. Yes, I'm lazy. How'd you know?
  circle(CalcXAnchor(210)+diceCircleSize, CalcYAnchor(9)+diceCircleSize, diceCircleSize);
  circle(CalcXAnchor(210)+diceCircleSize, CalcYAnchor(10)+diceCircleSize, diceCircleSize);
  circle(CalcXAnchor(210)+diceCircleSize, CalcYAnchor(11)+diceCircleSize, diceCircleSize);

  circle(CalcXAnchor(270)+diceCircleSize, CalcYAnchor(9)+diceCircleSize, diceCircleSize);
  circle(CalcXAnchor(270)+diceCircleSize, CalcYAnchor(10)+diceCircleSize, diceCircleSize);
  circle(CalcXAnchor(270)+diceCircleSize, CalcYAnchor(11)+diceCircleSize, diceCircleSize);
}

function CalcXAnchor(num)
{
  return xAnchor + (num + 15);
}

function CalcYAnchor(num)
{
  return yAnchor + (num * 30);
}