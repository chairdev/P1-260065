const xAnchor = 10;
const yAnchor = 10;
const stripeHeight = 60 / 3;
const checkerboardSize = 20;

function setup() 
{
  createCanvas(400, 400);
}
 
function draw() 
{
  background(220);
  
  textSize(15);
  //Name
  fill(0, 0, 0);
  text("1", xAnchor, calculateYAnchor(1), 70, 80);
  
  text("Tirell Benard", calculateXAnchor(1), calculateYAnchor(1), 100, 80);

  //Flag
  fill(0, 0, 0);
  text("2", xAnchor, calculateYAnchor(2), 70, 80);
  //red white blue
  fill(255, 0, 0);
  rect(calculateXAnchor(2), calculateYAnchor(2) + stripeHeight, 100, stripeHeight)
  fill(255, 255, 255);
  rect(calculateXAnchor(2), calculateYAnchor(2) + stripeHeight * 2, 100, stripeHeight)
  fill(0, 0, 255);
  rect(calculateXAnchor(2), calculateYAnchor(2) + stripeHeight * 3, 100, stripeHeight)

  //Checkerboard
  fill(0, 0, 0);
  text("3", xAnchor, calculateYAnchor(5), 70, 80);
  
  //Black squares
  fill(0, 0, 0);
  square(calculateXAnchor(3), calculateYAnchor(5), checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize, calculateYAnchor(5) + checkerboardSize, checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize*2, calculateYAnchor(5) + checkerboardSize * 2, checkerboardSize);
  square(calculateXAnchor(3)+checkerboardSize*2, calculateYAnchor(5), checkerboardSize);
  square(calculateXAnchor(3), calculateYAnchor(5)+checkerboardSize*2, checkerboardSize);

  //White squares
  fill(255, 255, 255);
  square(calculateXAnchor(3), calculateYAnchor(5)+checkerboardSize, checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize*2, calculateYAnchor(5) + checkerboardSize, checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize, calculateYAnchor(5), checkerboardSize);
  square(calculateXAnchor(3) + checkerboardSize, calculateYAnchor(5) + checkerboardSize*2, checkerboardSize);
}

function calculateXAnchor(num)
{
  return xAnchor + (num+15);
}

function calculateYAnchor(num)
{
  return yAnchor + (num * 30);
}