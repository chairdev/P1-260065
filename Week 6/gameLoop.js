
const TICK_INTERVAL = 1 * 1000 // Minutes to milliseconds
const NEGLECT_TICK_THRESHOLD = 15;

const EVOLUTION_TICKS = [5, 65];

gameState.currentTickTime = TICK_INTERVAL;

function GameLoop()
{
    UpdateTickTime();
}

function UpdateTickTime()
{
    // Update the tick time based on the frame rate
    gameState.currentTickTime -= deltaTime;

    if (gameState.currentTickTime <= 0) 
    {
        gameState.elapsedTicks++;
        gameState.currentTickTime = TICK_INTERVAL;
        console.log("Tick");

        OnTick();
    }
}

function OnTick()
{
    if(gameState.elapsedTicks % 12 === 0) // Every 12 ticks
    {
        gameState.age++;
        console.log("Monster aged! Current age: " + gameState.age);
    }

    // An egg's needs do not decay, so we only do it if the monster is not an egg.
    if(gameState.currentLifeStage !== LIFE_STAGE.EGG)
    {
        NeedDecay();
        CheckHunger();
        CheckHappiness();
    }

    //Maybe they should become feverish (like in mother 3) if theyre close to evolving 
    CheckEvolution();
    CheckSickness();
    CheckDeath();

    gameState.attentionSignal = SetAttentionSignal();
}

function ResetGame()
{
    // Reset all game variables to their initial state
    gameState = { ...initGameState };
}

function NeedDecay()
{
    if(gameState.hunger > 0)
    {
        gameState.hunger -= 1; // Decrease hunger by 1 unit per tick
    }

    if(gameState.happiness > 0)
    {
        gameState.happiness -= 1; // Decrease happiness by 1 unit per tick
    }
}

function SetAttentionSignal()
{
    if(gameState.happiness < 5 || gameState.hunger < 5 || gameState.isSick)
    {
        return true;
    }

    return false;
}

function CheckHunger()
{
    // If you starve your monster for too long, you gain a care mistake. 
    // If you gain too many care mistakes, your monster will die.
    if (gameState.hunger <= 0) 
    {
        gameState.ticksUnfed++;
        //If you don't feed your monster for 5 ticks and it's super hungry, you gain a care mistake.
        if(gameState.ticksUnfed >= NEGLECT_TICK_THRESHOLD)
        {
            gameState.isSick = true;
            gameState.physicalCareMistakes++;
            gameState.ticksUnfed = 0;
            alert("Your monster is hungry! Feed it soon or it will die!");
        }
        // 
        console.log("Monster is hungry!");
    }
    else
    {
        gameState.ticksUnfed = 0; // Reset the counter if the monster is fed
    }
}

function CheckHappiness()
{
    // If you neglect your monster's happiness for too long, you gain a mental care mistake.
    if (gameState.happiness <= 0)
    {
        gameState.ticksUnhappy++;
        if(gameState.ticksUnhappy >= NEGLECT_TICK_THRESHOLD)
        {
            gameState.isSick = true;
            gameState.mentalCareMistakes++;
            gameState.ticksUnhappy = 0;
            alert("Your monster is unhappy! Play with it soon or it will die!");
        }
    }
    else
    {
        gameState.ticksUnhappy = 0; // Reset the counter if the monster is happy
    }
}

function CheckSickness()
{
    // If your monster is sick for too long, you gain a care mistake.
    if (gameState.isSick)
    {
        gameState.ticksSick++;
        if(gameState.ticksSick >= NEGLECT_TICK_THRESHOLD)
        {
            gameState.physicalCareMistakes++;
        }
    }
}

function CheckDeath()
{
    if(gameState.physicalCareMistakes >= 3)
    {
        alert("Your monster has died due to neglect! Game will reset.");
        ResetGame();
    }
    if(gameState.mentalCareMistakes >= 3)
    {
        alert("Your monster has run away due to neglect! Game will reset.");
        ResetGame();
    }
}

function CheckEvolution()
{
    evolutionCandidates = GetEvolutionCandidates();

    if(evolutionCandidates.length == 0)
    {
        return;
    }

    // Monsters evolve based on their life stage and the number of ticks that have passed.
    switch (gameState.currentLifeStage)
    {
        case LIFE_STAGE.EGG:
            if (gameState.elapsedTicks >= EVOLUTION_TICKS[0])
            {
                gameState.currentLifeStage = LIFE_STAGE.BABY;
                // Evolve into the first candidate
                SetMonsterID(evolutionCandidates[0].to); // Evolve into the first candidate
                alert("Your egg has hatched into " + GetMonsterName(false) + "!");
                SetMonsterName();
                
                console.log("Egg hatched into " + GetMonsterName() + " at tick " + gameState.elapsedTicks);
            }
            break;
        case LIFE_STAGE.BABY:
            if (gameState.elapsedTicks >= EVOLUTION_TICKS[1])
            {
                console.log("Baby evolved at tick " + gameState.elapsedTicks);
            }
            break;
    }
}