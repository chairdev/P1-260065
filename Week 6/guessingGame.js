let guessingGame = {
  secretNumber: 0,
  message: "Guess a number from 1 to 10.",
  finished: false
};

const GUESSING_GAME_RESULT_DELAY = 1500;

function StartGuessingGame() {
  //Generate a random number between 1 and 10 for the player to guess
  guessingGame.secretNumber = Math.floor(Math.random() * 10) + 1;
  guessingGame.message = "Guess a number from 1 to 10.";
  guessingGame.finished = false;
  guessInput.value('');
  currentMenu = MENU_OPTIONS.PLAY;
  updateMenuVisibility();
}

function SubmitGuess() {
  if (guessingGame.finished) {
    return;
  }

  const guessedNumber = Number(guessInput.value());

  if (!Number.isInteger(guessedNumber) || guessedNumber < 1 ||
      guessedNumber > 10) {
    guessingGame.message = "Enter a whole number from 1 to 10.";
    return;
  }

  guessingGame.finished = true;

  if (guessedNumber === guessingGame.secretNumber) {
    // Correct guess
    guessingGame.message = "Correct!\nYou guessed the number.";
    
    gameState.happiness = constrain(gameState.happiness + 2, 0, MAX_STAT_CAP); // Increase happiness when guessed correctly
  } 
  else 
  {
    gameState.happiness = constrain(gameState.happiness + 1, 0, MAX_STAT_CAP); 
    guessingGame.message = `Too bad!\nThe number was ${guessingGame.secretNumber}.`;
  }

  gameState.hunger = constrain(gameState.hunger - 1, 0, MAX_STAT_CAP); // Decrease hunger when the game is played
  gameState.energy = constrain(gameState.energy - 1, 0, MAX_STAT_CAP); // Decrease energy when the game is played

  setTimeout(() => {
    currentMenu = MENU_OPTIONS.ROOM;
    updateMenuVisibility();
  }, GUESSING_GAME_RESULT_DELAY);
}

function DrawGuessingGame() {
  monsterX = (width - displayWidth) / 2;
  DrawMonster();

  push();
  textAlign(CENTER, TOP);
  fill(0);
  textFont(fontBold);
  textSize(26);
  text("Guess the Number", width / 2, 68);

  textFont(fontRegular);
  textSize(18);
  text(guessingGame.message, width / 2, 300);
  pop();
}
