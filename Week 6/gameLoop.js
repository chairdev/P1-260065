const TICK_INTERVAL = 1 * 1000 // Seconds to milliseconds
const NEGLECT_TICK_THRESHOLD = 15;

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
    CheckEvolution();

    // An egg's needs do not decay, so we only do it if the monster is not an egg.
    if(gameState.currentLifeStage !== LIFE_STAGE.EGG)
    {
        if(gameState.isLightOn)
        {
            NeedDecay();
            CheckPoop();
            CheckEnergy();
            CheckHunger();
            CheckHappiness();
        }
        else
        {
            RecoverEnergy();
        }
    }

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
    const decayInterval = LIFE_STAGE_CONFIG[gameState.currentLifeStage]?.needDecayInterval;

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

    if(gameState.energy > 0)
    {
        gameState.energy = constrain(gameState.energy - 1, 0, MAX_STAT_CAP);
    }
    else
    {
        gameState.ticksTired++;
    }
}

function RecoverEnergy()
{
    if (gameState.energy >= MAX_STAT_CAP)
    {
        gameState.energy = MAX_STAT_CAP;
        gameState.ticksTired = 0;
        return;
    }

    gameState.energy = constrain(gameState.energy + 1, 0, MAX_STAT_CAP);

    if (gameState.energy >= MAX_STAT_CAP)
    {
        gameState.ticksTired = 0;
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

function TrySickness(isMentalNeglect = false)
{
    let chance = LIFE_STAGE_CONFIG[gameState.currentLifeStage]?.sicknessChance;

    if (chance === undefined || chance <= 0)
    {
        return;
    }

    if(isMentalNeglect)
    {
        chance /= 2; // Reduce the chance of sickness if it's due to mental neglect
    }

    // Generate a random number between 0 and 100 to determine if the monster becomes sick
    const randomValue = Math.random() * 100;

    if (randomValue < chance)
    {
        gameState.isSick = true;
        console.log("Your monster has become sick!");
    }
}

function CheckPoop()
{
    const poopInterval = LIFE_STAGE_CONFIG[gameState.currentLifeStage]?.poopInterval;

    // If the monster has pooped, increment the ticksPooped counter and check if it exceeds the neglect threshold
    if(gameState.poopCount > 0)
    {
        gameState.ticksPooped++;

        if(gameState.ticksPooped >= NEGLECT_TICK_THRESHOLD)
        {
            gameState.physicalCareMistakes++;
            gameState.ticksPooped = 0;
            console.log("Your monster is neglected! Clean up its poop soon or it will die!");
        }
    }

    console.log(gameState.elapsedTicks % poopInterval);

    //If the poop interval is undefined or the current tick is not a multiple of the poop interval, ain't nothin to do here
    if (poopInterval === undefined || gameState.elapsedTicks % poopInterval !== 0)
    {
        return;
    }

    gameState.poopCount++;
    gameState.hunger = constrain(gameState.hunger - 1, 0, MAX_STAT_CAP); // Decrease hunger by 1 unit when the monster poops

    console.log("Monster pooped! Total poop count: " + gameState.poopCount);
}

function CheckEnergy()
{
    if(gameState.energy <= 0)
    {
        gameState.ticksTired++;

        if(gameState.ticksTired % NEGLECT_TICK_THRESHOLD === 0)
        {
            gameState.physicalCareMistakes++;
            console.log("Your monster is tired! Rest it soon or it will die!");
        }
    }
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
            TrySickness();
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
        }
        gameState.ticksUnhappy++;
        if(gameState.ticksUnhappy >= NEGLECT_TICK_THRESHOLD)
        {
            TrySickness(true);
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
    const stageConfig = LIFE_STAGE_CONFIG[gameState.currentLifeStage];
    const evolutionStage = stageConfig?.evolution;

    if (evolutionCandidates.length === 0 ||
        !evolutionStage ||
        gameState.isJinglePlaying ||
        gameState.elapsedTicks < stageConfig.evolutionTick)
    {
        return;
    }

    const evolution = evolutionCandidates.find(candidate => MeetsEvolutionRequirements(candidate));
    if (!evolution)
    {
        return;
    }

    gameState.isJinglePlaying = true;
    EvolutionJingle().then(() => {
        if (!evolutionStage.animation)
        {
            return;
        }

        PlayAnimation(evolutionStage.animation);
        return WaitForAnimationToFinish(evolutionStage.animation);
    }).then(() => {
        gameState.currentLifeStage = evolutionStage.nextStage;
        SetMonsterID(evolution.to);

        if (evolutionStage.setName)
        {
            SetMonsterName();
        }

        gameState.isJinglePlaying = false;
        alert("Your " + evolutionStage.label + " has " + evolutionStage.action + " into " + GetMonsterName() + "!");
        console.log(
            evolutionStage.label + " " + evolutionStage.action + " into " + GetMonsterName() +
            " at tick " + gameState.elapsedTicks
        );
    });
}