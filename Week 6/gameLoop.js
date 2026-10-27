
const TICK_INTERVAL = 3 * 1000 // Seconds to milliseconds
const NEGLECT_TICK_THRESHOLD = 15;

const EVOLUTION_TICKS = [65, 195, 295, 395, 495]; // Ticks required for each evolution stage
const NEED_DECAY_INTERVAL = [5, 20, 30, 50]; // Ticks between need decay for each life stage (egg, baby, teen, adult)

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

    monsterX = (width - displayWidth) / 2;
    monsterDirection = 1;
}

function NeedDecay()
{
    const decayInterval = NEED_DECAY_INTERVAL[gameState.currentLifeStage];

    //If the decay interval is undefined or the current tick is not a multiple of the decay interval, ain't nothin to do here
    if (decayInterval === undefined || gameState.elapsedTicks % decayInterval !== 0)
    {
        return;
    }

    if(gameState.hunger > 0)
    {
        gameState.hunger = constrain(gameState.hunger - 1, 0, MAX_STAT_CAP);
    }

    if(gameState.happiness > 0)
    {
        gameState.happiness = constrain(gameState.happiness - 1, 0, MAX_STAT_CAP);
    }
}

function SetAttentionSignal()
{
    //Show the attention signal if the monster is super hungry or unhappy
    if(gameState.happiness < 1 || gameState.hunger < 1)
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
            AttentionBeep();
            console.log("Your monster is hungry! Feed it soon or it will die!");
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
        if(gameState.ticksUnhappy == 0)
        {
            AttentionBeep();
            //AttentionBeep();
        }
        gameState.ticksUnhappy++;
        if(gameState.ticksUnhappy >= NEGLECT_TICK_THRESHOLD)
        {
            gameState.isSick = true;
            gameState.mentalCareMistakes++;
            gameState.ticksUnhappy = 0;
            
           
            console.log("Your monster is unhappy! Play with it soon or it will die!");
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
    if (gameState.isJinglePlaying || gameState.currentLifeStage === LIFE_STAGE.EGG  || gameState.currentLifeStage === LIFE_STAGE.BABY)
    {
        return;
    }

    if(gameState.physicalCareMistakes >= 6)
    {
        gameState.isJinglePlaying = true;
        DeathJingle().then(() => {
            gameState.isJinglePlaying = false;
            alert("Your monster has died due to neglect! Game will reset.");
            ResetGame();
        });
        return;
    }
    if(gameState.mentalCareMistakes >= 6)
    {
        gameState.isJinglePlaying = true;
        DeathJingle().then(() => {
            gameState.isJinglePlaying = false;
            alert("Your monster has run away due to neglect! Game will reset.");
            ResetGame();
        });
        return;
    }
}

function CheckEvolution()
{
    const evolutionCandidates = GetEvolutionCandidates();

    if(evolutionCandidates.length == 0)
    {
        return;
    }

    // Monsters evolve based on their life stage and the number of ticks that have passed.
    if (gameState.isJinglePlaying)
    {
        return;
    }

    switch (gameState.currentLifeStage)
    {
        case LIFE_STAGE.EGG:
            if (gameState.elapsedTicks >= EVOLUTION_TICKS[0])
            {
                const eggCandidate = evolutionCandidates.find(candidate => MeetsEvolutionRequirements(candidate));

                if (!eggCandidate)
                {
                    return;
                }

                gameState.isJinglePlaying = true;
                EvolutionJingle().then(() => {
                    gameState.isJinglePlaying = false;
                    gameState.currentLifeStage = LIFE_STAGE.BABY;
                    SetMonsterID(eggCandidate.to);
                    SetMonsterName();
                    alert("Your egg has hatched into " + GetMonsterName() + "!");
                    console.log("Egg hatched into " + GetMonsterName() + " at tick " + gameState.elapsedTicks);
                });
            }
            break;
        case LIFE_STAGE.BABY:
            if (gameState.elapsedTicks >= EVOLUTION_TICKS[1])
            {
                const validEvolution = evolutionCandidates.find(candidate => MeetsEvolutionRequirements(candidate));

                if (!validEvolution)
                {
                    return;
                }

                gameState.isJinglePlaying = true;
                EvolutionJingle().then(() => {
                    gameState.isJinglePlaying = false;
                    gameState.currentLifeStage = Math.min(gameState.currentLifeStage + 1, LIFE_STAGE.ADULT);
                    SetMonsterID(validEvolution.to);
                    alert("Your baby has evolved into " + GetMonsterName() + "!");
                    console.log("Baby evolved into " + GetMonsterName() + " at tick " + gameState.elapsedTicks);
                });
            }
            break;
        case LIFE_STAGE.TEEN:
            if (gameState.elapsedTicks >= EVOLUTION_TICKS[2])
            {
                const validEvolution = evolutionCandidates.find(candidate => MeetsEvolutionRequirements(candidate));

                if (!validEvolution)
                {
                    return;
                }

                gameState.isJinglePlaying = true;
                EvolutionJingle().then(() => {
                    gameState.isJinglePlaying = false;
                    gameState.currentLifeStage = Math.min(gameState.currentLifeStage + 1, LIFE_STAGE.ADULT);
                    SetMonsterID(validEvolution.to);
                    alert("Your teen has evolved into " + GetMonsterName() + "!");
                    console.log("Teen evolved into " + GetMonsterName() + " at tick " + gameState.elapsedTicks);
                });
            }
            break;
    }
}