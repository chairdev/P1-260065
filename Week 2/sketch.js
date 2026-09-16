const canvasWidth = 800;
const canvasHeight = 600;
//wow week 2!! aren't we all so excited to work with p5.js more
function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background("skyblue");
    DrawMountains();
  DrawGrass();
  DrawRoad()
}

function DrawGrass() 
{
  const grassY = 400;
  const grassHeight = 25;
  const grassColor = ["#6E8649", "#2D531A"] 

  //Draw grass
  fill(grassColor[0]);
  rect(0, grassY-grassHeight/2, canvasWidth, grassHeight/2)
  fill(grassColor[1]);
  rect(0, grassY-grassHeight, canvasWidth, grassHeight/2)
}

function DrawMountains()
{
  //coding to ayesha erotica songs is so young ho coded

  fill("gray");
  triangle(100, 400, 300, 100, 500, 400);
  fill("lightgray");
  triangle(300, 400, 400, 200, 500, 400);
  fill("darkgray");
  triangle(500, 400, 600, 250, 700, 400);
}

function DrawRoad()
{
  const roadY = 400;
  const roadHeight = 200;
  const numStripes = 10;
  const stripeWidth = 50;
  const stripeHeight = 12;
  const stripeY = roadHeight + 290;

  fill("gray");
  rect(0, roadY, canvasWidth, roadHeight)

  //use a for loop to draw the stripes with an offset
  fill("white");

  for (let i = 0; i < numStripes; i++) 
  {
    let stripeX = stripeWidth * 2 * i;
    rect(stripeX, stripeY, stripeWidth, stripeHeight, 20)
    
  }
}
