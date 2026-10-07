const canvasWidth = 800;
const canvasHeight = 600;

let currentQuestionIndex = 0;
let quiz;

function preload() {
  // Load the JSON data from the file
  quiz = loadJSON('data.json');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(220);
  DrawQuestionText();
}

function DrawQuestionText() {
  fill("black");
  textAlign(CENTER, CENTER);
  textSize(24);
  text(quiz.Data[currentQuestionIndex].Question, 490, 60);
  text("yeah", 0, 100);
}

