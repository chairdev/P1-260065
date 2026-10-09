const canvasWidth = 800;
const canvasHeight = 600;

const optionHeight = 50;
const optionWidth = 300;
const optionSpacing = 20;
const startY = 150;

const questionTime = 10; // Time in seconds for each question
const answerCooldown = 1; // Time in seconds to show the answer before moving to the next question

let currentQuestionIndex = 0;
let quiz;

const QUIZ_STATE = {
  START: 0,
  QUESTION: 1,
  ANSWER: 2,
  END: 3
}

let state = QUIZ_STATE.START;
let correctAnswers = 0;
let countDown = 10; // Countdown timer in seconds


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

  //Check the current state of the quiz and draw the appropriate objects
  switch (state) {
    case QUIZ_STATE.START:
      DrawStartScreen();
      break;
    case QUIZ_STATE.QUESTION:
      DrawQuestionText();
      DrawOptions();
      UpdateCountdown();
      break;
    case QUIZ_STATE.ANSWER:
        DrawQuestionText();
        DrawOptions(true);
      break;
    case QUIZ_STATE.END:
      DrawFinalResults();
      break;
  }
}

function mousePressed()
{
  switch (state) {
    case QUIZ_STATE.START:
      RandomizeQuestionOrder();
      state = QUIZ_STATE.QUESTION;
      break;
    case QUIZ_STATE.QUESTION:
      CheckClickedOption();
      break;
    case QUIZ_STATE.END:
      // Reset the quiz to start over
      currentQuestionIndex = 0;
      correctAnswers = 0;
      countDown = questionTime;
      state = QUIZ_STATE.START;
      break;
  }
}

function UpdateCountdown()
{
  // Decrease the countdown timer every second
  if (frameCount % 60 == 0 && countDown > 0) {
    countDown--;
  }

  if(countDown <= 0) {
    state = QUIZ_STATE.ANSWER;
    setTimeout(() => { GoToNextQuestion(); }, answerCooldown * 1000); // 1 second delays
  }
}

function CheckClickedOption()
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
      state = QUIZ_STATE.ANSWER;
      // Check if the clicked option is correct
      if (i == quiz.Data[currentQuestionIndex].CorrectAnswer) {
        correctAnswers++;
      }
      // Move to the next question after a short delay
      setTimeout(() => { GoToNextQuestion(); }, answerCooldown * 1000); // 1 second delays
      return; // Exit the loop after finding the clicked option
    }
  }
}

function RandomizeQuestionOrder()
{
  // Use the Fisher-Yates shuffle algorithm to randomize the order of questions (thank you stack overflow!)
  for (let i = quiz.Data.length - 1; i > 0; i--) 
  {
    let j = Math.floor(Math.random() * (i + 1));
    [quiz.Data[i], quiz.Data[j]] = [quiz.Data[j], quiz.Data[i]];
  }
}


function GoToNextQuestion()
{
  countDown = questionTime; // Reset the countdown timer for the next question
  currentQuestionIndex++;
  if (currentQuestionIndex >= quiz.Data.length)
  {
    state = QUIZ_STATE.END;
  } 
  else 
  {
    state = QUIZ_STATE.QUESTION;
  }
}

function DrawStartScreen()
{
  fill("black");
  textAlign(CENTER, CENTER);
  textSize(32);
  text(quiz.Title, canvasWidth / 2, canvasHeight / 2 - 50);
  textSize(24);
  text("Click to Start", canvasWidth / 2, canvasHeight / 2 + 20);
}

function DrawFinalResults()
{
  fill("black");
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Quiz Completed!", canvasWidth / 2, canvasHeight / 2 - 50);
  textSize(24);
  text(`You answered ${correctAnswers} out of ${quiz.Data.length} questions correctly.\nClick to restart.`, canvasWidth / 2, canvasHeight / 2 + 20);
}

function DrawQuestionText()
{
  //Draw the current question text at the top of the canvas
  fill("black");
  textAlign(CENTER, CENTER);
  textSize(24);
  text(quiz.Data[currentQuestionIndex].Question, canvasWidth / 2, 60);
}

function DrawOptions(showAnswer = false)
{
  const options = quiz.Data[currentQuestionIndex].Options;
  const optionColor = ["#fa6a0a", "#143464", "#793a80", "#e86a73"];
  const optionHighlightCol = ["#14a02e", "#b4202a"];
  let correctAnswerIndex = quiz.Data[currentQuestionIndex].CorrectAnswer;
  for (let i = 0; i < options.length; i++) 
  {
    let optionX = (canvasWidth - optionWidth) / 2;
    let optionY = startY + i * (optionHeight + optionSpacing);
    if (showAnswer) 
    {
      if (i == correctAnswerIndex) 
      {
        fill(optionHighlightCol[0]); // Highlight the correct answer in green
      }
      else 
      {
        fill(optionHighlightCol[1]); // Highlight the incorrect answers in red
      }
    }
    else
    {
      fill(optionColor[i % optionColor.length]); //Make sure this loops around if there are more than 4 options
    }

    rect(optionX, optionY, optionWidth, optionHeight);
    fill("white");
    textAlign(CENTER, CENTER);
    textSize(20);
    // Draw the option text
    text(options[i], optionX + optionWidth / 2, optionY + optionHeight / 2);
  }
}

