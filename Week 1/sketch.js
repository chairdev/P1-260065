const xAnchor = 10;
const yAnchor = 10;

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
  DrawMario();
  DrawRockman();
}

function CalcXAnchor(num)
{
  return xAnchor + (num + 15);
}

function CalcYAnchor(num)
{
  return yAnchor + (num * 30);
}

function DrawBitmap(bitmap, width, colors, xPos, yPos)
{
  const pixelSize = 10;
  noStroke()

  //Drawing this with a for loop so it's easier later
  for (let i = 0; i < bitmap.length; i++) {
    const element = bitmap[i];
    
    fill(colors[bitmap[i]]);
    //Use modulo so it wraps around to the next row when it exceeds the width of the bitmap
    //Math.floor is used to make sure we dont have mixels!!!
    rect(xPos + (i % width) * pixelSize, yPos + Math.floor(i / width) * pixelSize, pixelSize, pixelSize);
  }
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
  const stripeHeight = 60 / 3;
  const roffaGreen = "#00811f";

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
  const checkerboardSize = 18;

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
  const houseWidth = 60;
  const houseHeight = 50;

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
  const signalSize = 35;
  
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
  const diceCircleSize = 20;

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

function DrawMario()
{
  const colors = ["clear", "red", "brown", "LightSalmon", "black", "blue", "gold"]
  //0: transparent
  //1: red
  //2: brown
  //3: peach
  //4: black
  //5: blue
  //6: gold

  const marioBitMap = [
    0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 2, 2, 2, 3, 3, 4, 3, 0, 0, 0,
    0, 2, 3, 2, 3, 3, 3, 4, 3, 3, 3, 0,
    0, 2, 3, 2, 2, 3, 3, 3, 4, 3, 3, 3,
    0, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 0,
    0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0,
    0, 0, 1, 1, 5, 1, 1, 1, 0, 0, 0, 0,
    0, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 0,
    1, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 1,
    3, 3, 1, 5, 6, 5, 5, 6, 5, 1, 3, 3,
    3, 3, 3, 5, 5, 5, 5, 5, 5, 3, 3, 3,
    3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3,
    0, 0, 5, 5, 5, 0, 0, 5, 5, 5, 0, 0,
    0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 0,
    2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2
  ]

  strokeWeight(0);
  fill("black");
  text("7", CalcXAnchor(400), CalcYAnchor(0), 70, 80);
  text("Mario", CalcXAnchor(420), CalcYAnchor(0), 70, 80);

  DrawBitmap(marioBitMap, 12, colors, CalcXAnchor(410), CalcYAnchor(2))
}

function DrawRockman()
{
  const colors = ["clear", "#383838", "#6068b8", "#f8d820", "#20c0e8", "#2858c0", "#3888e0", "#e0a048", "#f8d0a8", "#f0e8f8"]
  //0: transparent
  //1: black
  //2: navy
  //3: gold
  //4: light blue
  //5: darker blue
  //6: darkest blue
  //7: dark gold
  //8: peach
  //9: white

  const rockmanBitMap = [
    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 2, 2, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 4, 2, 2, 3, 3, 2, 2, 4, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 5, 4, 2, 2, 2, 2, 2, 2, 4, 5, 1, 0, 0, 0,
    0, 0, 0, 1, 5, 6, 2, 2, 3, 3, 2, 2, 6, 5, 1, 0, 0, 0, 
    0, 0, 0, 1, 5, 6, 2, 2, 3, 3, 2, 2, 6, 5, 1, 0, 0, 0,  
    0, 0, 1, 3, 5, 5, 2, 2, 2, 2, 2, 2, 5, 5, 3, 1, 0, 0,  
    0, 0, 1, 3, 3, 7, 4, 5, 2, 2, 5, 4, 7, 3, 3, 1, 0, 0,
    0, 0, 1, 7, 7, 7, 9, 5, 8, 8, 5, 9, 7, 7, 7, 1, 0, 0,
    1, 1, 1, 1, 1, 7, 8, 8, 8, 8, 8, 8, 7, 1, 1, 1, 1, 1,
    0, 0, 0, 1, 1, 1, 8, 8, 7, 7, 8, 8, 1, 1, 1, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 7, 8, 8, 7, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  ]

  strokeWeight(0);
  fill("black");
  text("7", CalcXAnchor(200), CalcYAnchor(13), 70, 80);
  text("Rockman.EXE", CalcXAnchor(220), CalcYAnchor(13), 70, 80);

  DrawBitmap(rockmanBitMap, 18, colors, CalcXAnchor(210), CalcYAnchor(14))
}