
const TICK_INTERVAL = 1 * 1000 // Minutes to milliseconds
const UNFED_TICKS_BEFORE_CARE_MISTAKE = 15;

const EVOLUTION_TICKS = [5, 65];

let currentTickTime = TICK_INTERVAL;
let elapsedTicks = 0;

let ticksUnfed = 0;
let ticksSick = 0;

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
    }

    CheckHunger();
    CheckEvolution();
    CheckSickness();
    //CheckDeath();
}

function NeedDecay()
{
    // Update the monster's hunger level
    if(hunger > 0)
    {
        hunger -= 1; // Decrease hunger by 1 unit per tick
    }
}

function CheckHunger()
{
    if (currentLifeStage === LIFE_STAGE.EGG)
    {
        return;
    }

    // If you starve your monster for too long, you gain a care mistake. 
    // If you gain too many care mistakes, your monster will die.
    if (hunger <= 0) 
    {
        ticksUnfed++;
        //If you don't feed your monster for 5 ticks and it's super hungry, you gain a care mistake.
        if(ticksUnfed >= UNFED_TICKS_BEFORE_CARE_MISTAKE)
        {
            careMistakes++;
            ticksUnfed = 0;
             alert("Your monster is hungry! Feed it soon or it will die!");
        }
        // 
        console.log("Monster is hungry!");
    }
}

function CheckSickness()
{
    //if(isSick )
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
                alert("Your egg has hatched into " + GetMonsterName() + "!");
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