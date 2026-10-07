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
  DrawOptions();
}

function DrawQuestionText() {
  fill("black");
  textAlign(CENTER, CENTER);
  textSize(24);
  text(quiz.Data[currentQuestionIndex].Question, canvasWidth / 2, 60);
}

function DrawOptions() {
  const options = quiz.Data[currentQuestionIndex].Options;
  const optionHeight = 50;
  const optionWidth = 300;
  const optionSpacing = 20;
  const startY = 150;
  const optionColor = ["#fa6a0a", "#143464", "#793a80", "#e86a73"];

  for (let i = 0; i < options.length; i++) {
    const optionX = (canvasWidth - optionWidth) / 2;
    const optionY = startY + i * (optionHeight + optionSpacing);
    fill(optionColor[i % optionColor.length]); //Make sure this loops around if there are more than 4 options
    rect(optionX, optionY, optionWidth, optionHeight);
    fill("white");
    textAlign(CENTER, CENTER);
    textSize(20);
    // Draw the option text
    text(options[i], optionX + optionWidth / 2, optionY + optionHeight / 2);
  }
}