function FeedMonster()
{
    if(hunger < 100)
    {
        hunger += 25; //Increase hunger by 25 units (1/4th of the maximum) when fed
        happiness += 10;
    }
}