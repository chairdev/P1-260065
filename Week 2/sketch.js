const canvasWidth = 800;
const canvasHeight = 600;

const numCars = 15;

let cars = InitCars(numCars);
let clouds = InitClouds();
let sun = { x: 100, y: 75, speed: 0.05 };
let trees = InitTrees();

//wow week 2!! aren't we all so excited to work with p5.js more
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(60);
  
}

function draw() {
  background("skyblue");
  DrawSun();
  DrawClouds();
  DrawMountains();
  DrawGrass();
  DrawTrees(true);
  DrawRoad();

  UpdateCar();
  UpdateClouds();
  DrawTrees(false);
}

function InitClouds()
{
  return [
  { x: 25, y: -250 },
  { x: 100, y: 100 },
  { x: 300, y: 150 },
  { x: 500, y: 75 },
  { x: 525, y: 90 },
  { x: 600, y: 100 },
  { x: 800, y: 100 }]
}

function UpdateClouds()
{
  const cloudSpeed = 0.00005;
  for (let i = 0; i < clouds.length; i++)
  {
    //Move the clouds froms right to left
    //The higher up the cloud is, the faster it moves
    let cloud = clouds[i];
    cloud.x -= (Math.sqrt(cloudSpeed * cloud.y)) * deltaTime;

    //reset the cloud's position when it goes off screen
    if (cloud.x < -200)
    {
      //randomize the cloud's y position
      cloud.x = canvasWidth + 200;
      cloud.y = 50 + GetRandomInt(35);
      
    }
  }
}

function DrawClouds()
{
  for (let i = 0; i < clouds.length; i++)
  {
    let cloud = clouds[i];
    InitCloud(cloud.x, cloud.y);
  }
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

function DrawSun()
{
  fill("yellow");
  ellipse(sun.x, sun.y, 100, 100);
  fill("gold")

  //Sun goes from left to right
  sun.x += sun.speed * deltaTime;

  if(sun.x > canvasWidth + 100)
  {
    sun.x = -50
  }
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
    cars.push({ x: 0-(200*i), y: (i % 2) * 125 + 350, color: GetRandomColor(), speed: 0.9  })
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
  const minSeparation = 210;
  const maxSeparation = 280;

  for (let i = 0; i < numCars; i++) 
  {
    //use a car object to keep things 
    let car = cars[i];
    
    car.x += car.speed * deltaTime
    InstantiateCar(car.x, car.y, car.color);

    //reset the car's position, randomize its lane and color when it drives off screen
    if (car.x > canvasWidth + 100)
    {
      // find the leftmost car and place this car  a random distance behind it
      // thank you stackoverflow...
      let leftmostX = Math.min(...cars.map(c => c.x));
      car.x = leftmostX - Math.random() * (maxSeparation - minSeparation) - minSeparation;
      // randomize lane (two lanes) and color
      car.y = (GetRandomInt(2)) * 125 + 350;
      car.color = GetRandomColor();
    }
  }  
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

function InitTrees()
{
  let trees = [
    { x: 50, isBG: true},
    { x: 200, isBG: false},
    { x: 350, isBG: true},
    { x: 500, y: 315, isBG: false },
    { x: 650, y: 315, isBG: true },
    { x: 800, y: 315, isBG: false }
  ]
  return trees;
}

function InitTree(x, y)
{
  //Draw a tree using a rectangle for the trunk and an ellipse for the leaves
  fill("brown");
  rect(x, y, 20, 80);
  fill("green");
  ellipse(x + 10, y - 20, 80, 80);
}

function DrawTrees(drawMode)
{
  // finally.... im almost done!!!!!!!!!!!!
  // i locked in 2day tho lowk
  for (let i = 0; i < trees.length; i++)
  {
    //if drawMode is false and the tree is a background tree, skip drawing it
    if(drawMode == false && trees[i].isBG)
    {
      continue;
    }
    let tree = trees[i];
    //if the tree is a background tree, draw it at a higher position
    let yPos = tree.isBG ? 315: 585;
    InitTree(tree.x, yPos);
  }
}