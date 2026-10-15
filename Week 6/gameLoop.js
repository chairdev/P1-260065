
const TICK_INTERVAL = 1 * 1000 // Minutes to milliseconds
const UNFED_TICKS_BEFORE_CARE_MISTAKE = 5;
const EGG_EVOLUTION_TICK = 5;
const BABY_EVOLUTION_TICK = 65;

let currentTickTime = TICK_INTERVAL;
let elapsedTicks = 0;

let ticksUnfed = 0;

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

    // Update the monster's hunger level
    if(hunger > 0)
    {
        hunger -= 1; // Decrease hunger by 1 unit per tick
    }

    CheckHunger();
    CheckEvolution();
    //CheckDeath();
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
        }
        // 
        console.log("Monster is hungry!");
        alert("Your monster is hungry! Feed it soon or it will die!");
    }
}

function CheckEvolution()
{
    if (currentLifeStage === LIFE_STAGE.EGG && elapsedTicks >= EGG_EVOLUTION_TICK)
    {
        currentLifeStage = LIFE_STAGE.BABY;
        currentMonsterIndex = MONSTER_ID.BLOBBY;
        monster = monsterData?.[currentMonsterIndex] || null;
        console.log("Egg evolved into Blobby at tick " + elapsedTicks);
        return;
    }

    if (currentLifeStage === LIFE_STAGE.BABY && elapsedTicks >= BABY_EVOLUTION_TICK)
    {
        console.log("Baby evolved at tick " + elapsedTicks);
    }
}