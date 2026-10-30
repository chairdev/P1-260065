const CLEANING_SWEEP_DURATION = 350;
const CLEANING_SWEEP_PIXEL_SIZE = 8;
let cleaningSweepStartTime = -Infinity;

function StartCleaningSweep()
{
    cleaningSweepStartTime = millis();
}

function DrawCleaningSweep()
{
    const elapsed = millis() - cleaningSweepStartTime;

    if(elapsed < 0 || elapsed >= CLEANING_SWEEP_DURATION)
    {
        return;
    }

    const progress = elapsed / CLEANING_SWEEP_DURATION;
    const pixelSize = CLEANING_SWEEP_PIXEL_SIZE;
    const sweepY =
        Math.floor(progress * (height + pixelSize) / pixelSize) * pixelSize -
        pixelSize;

    push();
    noStroke();
    fill(180, 180, 180);
    for(let x = 0; x < width; x += pixelSize * 2)
    {
        rect(x, sweepY, pixelSize, pixelSize);
        rect(x + pixelSize, sweepY + pixelSize * 2, pixelSize, pixelSize);
    }

    fill(255, 255, 255);
    rect(0, sweepY + pixelSize, width, pixelSize);
    pop();
}

function FeedMonster()
{
    //only allow feeding if the monster is awake, not sick, not at max hunger, and not in the egg stage
    if(!gameState.isLightOn || gameState.isSick || gameState.hunger >= MAX_STAT_CAP || gameState.currentLifeStage === LIFE_STAGE.EGG)
    {
        ErrorBeep();
        return;
    }


    if(gameState.hunger < MAX_STAT_CAP)
    {
        //Increase hunger by 2 units when fed
        gameState.hunger = constrain(gameState.hunger + 2, 0, MAX_STAT_CAP);
        gameState.happiness = constrain(gameState.happiness + 1, 0, MAX_STAT_CAP); // Increase happiness when fed
        gameState.ticksUnfed = 0;
        gameState.ticksUnhappy = 0;
    }
}

function GiveMedicine()
{
    if(!gameState.isLightOn|| !gameState.isSick)
    {
        ErrorBeep();
        return;
    }

    gameState.isSick = false;
    gameState.happiness = constrain(gameState.happiness + 1, 0, MAX_STAT_CAP); // Increase happiness when cured
    gameState.ticksSick = 0;

    alert("Your monster has been cured!");
}

function CleanPoop()
{
    if(!gameState.isLightOn || gameState.poopCount <= 0)
    {
        ErrorBeep();
        return;
    }

    gameState.poopCount = 0;
    gameState.ticksPooped = 0;
    gameState.happiness = constrain(gameState.happiness + 1, 0, MAX_STAT_CAP); // Increase happiness when cleaned
    CleanBeep();
    StartCleaningSweep();
}

function PlayGuessingGame()
{
    //only allow the guessing game to be played if the monster is awake, not sick, not hungry, there's no poop, and not in the egg stage
    if(!gameState.isLightOn || gameState.isSick || gameState.currentLifeStage === LIFE_STAGE.EGG || gameState.hunger <= 0 || gameState.poopCount > 0)
    {
        ErrorBeep();
        return;
    }
    
    StartGuessingGame();
}

function ToggleLights()
{
    //only allow the lights to be turned off if energy is 0
    if(gameState.isLightOn)
    {
        if(gameState.energy > 0 || gameState.currentLifeStage === LIFE_STAGE.EGG)
        {
            ErrorBeep();
            return;
        }
    }
}