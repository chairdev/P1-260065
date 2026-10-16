
const TICK_INTERVAL = 1 * 1000 // Minutes to milliseconds
const NEGLECT_TICK_THRESHOLD = 15;

const EVOLUTION_TICKS = [5, 65];

let currentTickTime = TICK_INTERVAL;
let elapsedTicks = 0;

let ticksUnfed = 0;
let ticksUnhappy = 0;
let ticksSick = 0;

let attentionSignal = false;

function GameLoop()
{
    UpdateTickTime();
}

function UpdateTickTime()
{
    // Update the tick time based on the frame rate
    currentTickTime -= deltaTime;

    if (currentTickTime <= 0) {
        elapsedTicks++;
        currentTickTime = TICK_INTERVAL;
        console.log("Tick");

        OnTick();
    }
}

function OnTick()
{
    if(elapsedTicks % 12 === 0) // Every 12 ticks
    {
        age++;
        console.log("Monster aged! Current age: " + age);
    }

    // An egg's needs do not decay, so we only do it if the monster is not an egg.
    if(currentLifeStage !== LIFE_STAGE.EGG)
    {
        NeedDecay();
        CheckHunger();
        CheckHappiness();
    }

    CheckEvolution();
    CheckSickness();
    //CheckDeath();

    attentionSignal = SetAttentionSignal();
}

function ResetGame()
{
    // Reset all game variables to their initial state
    currentTickTime = TICK_INTERVAL;
    isSick = false;
    currentLifeStage = LIFE_STAGE.EGG;
    currentMonsterIndex = MONSTER_ID.EGG1;
    monster = monsterData?.[currentMonsterIndex] || null;
    age = 0;
    elapsedTicks = 0;
    ticksUnfed = 0;
    ticksUnhappy = 0;
    ticksSick = 0;
    attentionSignal = false;
}

function NeedDecay()
{
    if(hunger > 0)
    {
        hunger -= 1; // Decrease hunger by 1 unit per tick
    }

    if(happiness > 0)
    {
        happiness -= 1; // Decrease happiness by 1 unit per tick
    }
}

function SetAttentionSignal()
{
    if(happiness < 5 || hunger < 5 || isSick)
    {
        return true;
    }

    return false;
}

function CheckHunger()
{
    // If you starve your monster for too long, you gain a care mistake. 
    // If you gain too many care mistakes, your monster will die.
    if (hunger <= 0) 
    {
        ticksUnfed++;
        //If you don't feed your monster for 5 ticks and it's super hungry, you gain a care mistake.
        if(ticksUnfed >= NEGLECT_TICK_THRESHOLD)
        {
            isSick = true;
            physicalCareMistakes++;
            ticksUnfed = 0;
            alert("Your monster is hungry! Feed it soon or it will die!");
        }
        // 
        console.log("Monster is hungry!");
    }
    else
    {
        ticksUnfed = 0; // Reset the counter if the monster is fed
    }
}

function CheckHappiness()
{
    // If you neglect your monster's happiness for too long, you gain a mental care mistake.
    if (happiness <= 0)
    {
        ticksUnhappy++;
        if(ticksUnhappy >= NEGLECT_TICK_THRESHOLD)
        {
            isSick = true;
            mentalCareMistakes++;
            ticksUnhappy = 0;
            alert("Your monster is unhappy! Play with it soon or it will die!");
        }
    }
    else
    {
        ticksUnhappy = 0; // Reset the counter if the monster is happy
    }
}

function CheckSickness()
{
    // If your monster is sick for too long, you gain a care mistake.
    if (isSick)
    {
        ticksSick++;
        if(ticksSick >= NEGLECT_TICK_THRESHOLD)
        {
            physicalCareMistakes++;
        }
    }
}

function CheckDeath()
{
    if(physicalCareMistakes >= 3)
    {
        alert("Your monster has died due to neglect! Game will reset.");
        ResetGame();
    }
    if(mentalCareMistakes >= 3)
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
    switch (currentLifeStage)
    {
        case LIFE_STAGE.EGG:
            if (elapsedTicks >= EVOLUTION_TICKS[0])
            {
                currentLifeStage = LIFE_STAGE.BABY;
                // Evolve into the first candidate
                SetMonsterID(evolutionCandidates[0].to); // Evolve into the first candidate
                alert("Your egg has hatched into " + GetMonsterName(false) + "!");
                SetMonsterName();
                
                console.log("Egg hatched into " + GetMonsterName() + " at tick " + elapsedTicks);
            }
            break;
        case LIFE_STAGE.BABY:
            if (elapsedTicks >= EVOLUTION_TICKS[1])
            {
                console.log("Baby evolved at tick " + elapsedTicks);
            }
            break;
    }
}