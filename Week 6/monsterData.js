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
  happiness: 30,
  hunger: 100,
  isSick: false,
  currentTickTime: null,
  elapsedTicks: 0,
  ticksUnfed: 0,
  ticksUnhappy: 0,
  ticksSick: 0,
  attentionSignal: false
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

function GetEvolutionCandidates()
{
    // Return the evolution candidates for the current monster based on its data.
    // If the monster data or its evolutions are missing, return an empty array.
    if (!gameState.monster || !gameState.monster.evolutions) 
    {
        return [];
    }

  return gameState.monster.evolutions;
}