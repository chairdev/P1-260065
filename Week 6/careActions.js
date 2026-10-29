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