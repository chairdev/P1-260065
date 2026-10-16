function FeedMonster()
{
    if(gameState.hunger < 100)
    {
        gameState.hunger += 25; //Increase hunger by 25 units (1/4th of the maximum) when fed
        gameState.happiness += 10;
    }
}