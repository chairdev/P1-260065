const canvasWidth = 800;
const canvasHeight = 600;

const optionHeight = 50;
const optionWidth = 300;
const optionSpacing = 20;
const startY = 150;

let currentQuestionIndex = 0;
let quiz;

function preload()
{
  // Load the JSON data from the file
  // No way am I gonna hardcode the questions and clutter up my source code
  quiz = loadJSON('data.json');
}

function setup() 
{
  createCanvas(canvasWidth, canvasHeight);
}

function draw()
{
  background(220);
  DrawQuestionText();
  DrawOptions();
}

function mousePressed()
{
  const options = quiz.Data[currentQuestionIndex].Options;
  for (let i = 0; i < options.length; i++)
  {
    console.log("Checking option " + i);
    let optionX = (canvasWidth - optionWidth) / 2;
    let optionY = startY + i * (optionHeight + optionSpacing);
    if (mouseX >= optionX && mouseX <= optionX + optionWidth && mouseY >= optionY && mouseY <= optionY + optionHeight) 
    {
      console.log("Option " + i + " clicked.");
      // Check if the clicked option is correct
      if (i == quiz.Data[currentQuestionIndex].CorrectAnswer)
      {
        console.log("Correct answer!");
        // Move to the next question
        currentQuestionIndex++;
      }
    }
    console.log("Option " + i + " is not the correct answer.");
  }
}


function DrawQuestionText()
{
  //Draw the current question text at the top of the canvas
  fill("black");
  textAlign(CENTER, CENTER);
  textSize(24);
  text(quiz.Data[currentQuestionIndex].Question, canvasWidth / 2, 60);
}

function DrawOptions()
{
  const options = quiz.Data[currentQuestionIndex].Options;
  const optionColor = ["#fa6a0a", "#143464", "#793a80", "#e86a73"];

  for (let i = 0; i < options.length; i++) {
    let optionX = (canvasWidth - optionWidth) / 2;
    let optionY = startY + i * (optionHeight + optionSpacing);
    fill(optionColor[i % optionColor.length]); //Make sure this loops around if there are more than 4 options
    rect(optionX, optionY, optionWidth, optionHeight);
    fill("white");
    textAlign(CENTER, CENTER);
    textSize(20);
    // Draw the option text
    text(options[i], optionX + optionWidth / 2, optionY + optionHeight / 2);
  }
}

