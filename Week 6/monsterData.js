const MONSTER_ID = {
  EGG1: 0,
  BLOBBY: 1
};

const LIFE_STAGE = {
  EGG: 0,
  BABY: 1,
  TEEN: 2,
  ADULT: 3
};

const LIFE_STAGE_CONFIG = {
    [LIFE_STAGE.EGG]: {
        evolutionTick: 65,
        needDecayInterval: 5,
        poopInterval: 0,
        sicknessChance: 0,
        evolution: {
            nextStage: LIFE_STAGE.BABY,
            label: "egg",
            action: "hatched",
            animation: "egg_hatch",
            setName: true
        }
    },
    [LIFE_STAGE.BABY]: {
        evolutionTick: 195,
        needDecayInterval: 20,
        poopInterval: 10,
        sicknessChance: 80,
        evolution: {
            nextStage: LIFE_STAGE.TEEN,
            label: "baby",
            action: "evolved"
        }
    },
    [LIFE_STAGE.TEEN]: {
        evolutionTick: 295,
        needDecayInterval: 30,
        poopInterval: 30,
        sicknessChance: 60,
        evolution: {
            nextStage: LIFE_STAGE.ADULT,
            label: "teen",
            action: "evolved"
        }
    },
    [LIFE_STAGE.ADULT]: {
        evolutionTick: 395,
        needDecayInterval: 50,
        poopInterval: 50,
        sicknessChance: 40
    }
};

const MAX_STAT_CAP = 4;

// Game state object to hold the current state of the game
// We on that OBJECT  object oriented programming cuh
const initGameState = {
    monster: null,
    nickname: "",
    currentMonsterIndex: MONSTER_ID.EGG1,
    age: 0,
    physicalCareMistakes: 0,
    mentalCareMistakes: 0,
    currentLifeStage: LIFE_STAGE.EGG,
    happiness: 4,
    hunger: 4,
    isSick: false,
    currentTickTime: null,
    elapsedTicks: 0,
    ticksUnfed: 0,
    ticksUnhappy: 0,
    ticksSick: 0,
    ticksPooped: 0,
    poopCount: 0,
    attentionSignal: false,
    isJinglePlaying: false
};

let gameState = { ...initGameState }; // Initialize the game state with a copy of the initial state

let monsterImages = {};

let monsterData;

function InitMonsterData() 
{
    // Load the monster data from the JSON file
    // Then, load the corresponding images for each monster entry
  monsterData = loadJSON('Data/monster.json', function (json) {
    monsterData = json;
    gameState.monster = monsterData[gameState.currentMonsterIndex] || monsterData[0] || null;

    monsterData.forEach((monsterEntry, index) => {
      monsterImages[index] = loadImage(monsterEntry.image_path);
    });
  });
}

function SetMonsterName()
{
    let newName = prompt("Enter a name for your monster:");
    if (newName)
    {
        gameState.nickname = newName;
        console.log("Monster named: " + gameState.nickname);
    }
}

function SetMonsterID(monsterId)
{
    console.log("Setting monster ID to: " + monsterId);
    gameState.currentMonsterIndex = monsterId;
    gameState.monster = monsterData?.[gameState.currentMonsterIndex] || null; // If the monster entry or the data is missing, default to null

    //Reset care mistakes for the new monster
    gameState.mentalCareMistakes = 0;
    gameState.physicalCareMistakes = 0;

    if (gameState.monster?.lifeStage)
    {
        const mappedStage = LIFE_STAGE[gameState.monster.lifeStage.toUpperCase()];
        if (mappedStage !== undefined)
        {
            gameState.currentLifeStage = mappedStage;
        }
    }
}

function GetMonsterName(isSpeciesName = false)
{
    // If the user has set a nickname, return that.
    // Otherwise, return the default name from the monster data.
    if (gameState.nickname && gameState.nickname.trim() !== "" && !isSpeciesName) 
    {
        return gameState.nickname;
    }

  return gameState.monster?.name || "Unknown Monster";
}

function GetTotalCareMistakes()
{
    return (gameState.physicalCareMistakes ?? 0) + (gameState.mentalCareMistakes ?? 0);
}

function MeetsEvolutionRequirements(candidate)
{
    if (!candidate)
    {
        return false;
    }

    const totalCareMistakes = GetTotalCareMistakes();

    if (candidate.totalCareMistakes !== undefined)
    {
        if (candidate.totalCareMistakes === 0)
        {
            if (totalCareMistakes > 0)
            {
                return false;
            }
        }
        else if (totalCareMistakes < candidate.totalCareMistakes)
        {
            return false;
        }
    }

    if (candidate.physicalCareMistakes !== undefined && gameState.physicalCareMistakes > candidate.physicalCareMistakes)
    {
        return false;
    }

    if (candidate.mentalCareMistakes !== undefined && gameState.mentalCareMistakes >= candidate.mentalCareMistakes)
    {
        return false;
    }

    if (candidate.happiness !== undefined && gameState.happiness > candidate.happiness)
    {
        return false;
    }

    if (candidate.hunger !== undefined && gameState.hunger > candidate.hunger)
    {
        return false;
    }

    return true;
}

function GetEvolutionCandidates()
{
    // Return the evolution candidates for the current monster based on its data.
    // If the monster data or its evolutions are missing, return an empty array.
    const evolutionData = gameState.monster?.evolutions ?? gameState.monster?.evolution ?? [];
    return Array.isArray(evolutionData) ? evolutionData : [];
}