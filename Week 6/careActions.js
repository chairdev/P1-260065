function FeedMonster()
{
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
    if(gameState.isSick)
    {
        gameState.isSick = false;
        gameState.happiness = constrain(gameState.happiness + 1, 0, MAX_STAT_CAP); // Increase happiness when cured
        gameState.ticksSick = 0;

        alert("Your monster has been cured!");
    }
}

function CleanPoop()
{
    if(gameState.poopCount > 0)
    {
        gameState.poopCount = 0;
        gameState.ticksPooped = 0;
        gameState.happiness = constrain(gameState.happiness + 1, 0, MAX_STAT_CAP); // Increase happiness when cleaned
    }
}