const canvasWidth = 800;
const canvasHeight = 600;

const numCars = 5;

let cloudX = 100;
let cars = InitCars(numCars)

//wow week 2!! aren't we all so excited to work with p5.js more
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(30);
  
}

function draw() {
  background("skyblue");
  DrawClouds();
  DrawMountains();
  DrawGrass();
  DrawRoad()

  UpdateCar();
}

function DrawClouds()
{
  const cloudY = -250;
  const cloudSpeed = 0.1;

  if (cloudX > canvasWidth + 100)
  {
    cloudX = -650;
  }

  cloudX += cloudSpeed * deltaTime;

  InitCloud(cloudX-75, cloudY);
  InitCloud(cloudX, 100);
  InitCloud(cloudX + 200, 150);
  InitCloud(cloudX + 400, 75);
  InitCloud(cloudX + 425, 90);
}

function InitCloud(x, y)
{
  //Draw a cloud using ellipses
  //i must re-iterate, listening to hyper pop is a great way to feel myself while getting this work done!!
  noStroke();
  fill("white");
  ellipse(x, y, 100, 50);
  ellipse(x + 50, y, 100, 50);
  ellipse(x + 5, y - 25, 100, 50);
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

function InstantiateCar(x, y, color)
{
  //Draw a car using rectangles and ellipses
  fill(color);
  rect(x, y, 130, 90);
  rect(x + 120, y + 30, 60, 60);

  //window
  fill("lightblue");
  rect(x + 10, y + 10, 50, 30);
  rect(x + 70, y + 10, 50, 30);

  //wheels
  fill("black");
  ellipse(x + 40, y + 90, 35, 35);
  ellipse(x + 140, y + 90, 35, 35);
  fill("gray");
  ellipse(x + 40, y + 90, 25, 25);
  ellipse(x + 140, y + 90, 25, 25);
}

//populate car object array
function InitCars(numCars)
{
  let cars = [];
  for (let i = 0; i < numCars; i++) {
    //every other car is on the other lane, so we can use the modulus operator to determine which lane to put the car in
    cars.push({ x: 0-(200*i), y: (i % 2) * 125 + 350, color: GetRandomColor(), speed: 0.1  })
  }

  return cars;
}

function GetRandomColor()
{
  const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
  const randomIndex = GetRandomInt(colors.length);
  return colors[randomIndex];
}

function GetRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function UpdateCar()
{
  for (let i = 0; i < numCars; i++) 
  {
    //use a car object to keep things 
    car = cars[i];
    
    car.x += car.speed * deltaTime
    InstantiateCar(car.x, car.y, car.color);

    //reset the car's position, randomize its lane and color when it drives off screen
    if (car.x > canvasWidth + 100)
    {
      car.x = -250;
      car.y = (GetRandomInt(5) % 2) * 100 + 350;
      car.color = GetRandomColor();
    }
  }

  //cloudX += cloudSpeed * deltaTime;
  
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
