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

let monster;
let nickname = "";
let currentMonsterIndex = MONSTER_ID.EGG1;
let age = 0;
let careMistakes = 0;
let currentLifeStage = LIFE_STAGE.EGG;
let happiness = 30;
let hunger = 100;
let isSick = false;

let monsterImages = {};

let monsterData;

function InitMonsterData() 
{
    // Load the monster data from the JSON file
    // Then, load the corresponding images for each monster entry
  monsterData = loadJSON('Data/monster.json', function (json) {
    monsterData = json;
    monster = monsterData[currentMonsterIndex] || monsterData[0] || null;

    monsterData.forEach((monsterEntry, index) => {
      monsterImages[index] = loadImage(monsterEntry.image_path);
    });
  });
}

function SetMonsterName()
{
    let newName = prompt("Enter a name for your monster:");
    if (newName) {
        nickname = newName;
        console.log("Monster named: " + nickname);
    }
}

function SetMonsterID(monsterId)
{
    console.log("Setting monster ID to: " + monsterId);
    currentMonsterIndex = monsterId;
    monster = monsterData?.[currentMonsterIndex] || null;
}

function GetMonsterName(isSpeciesName = false)
{
    // If the user has set a nickname, return that.
    // Otherwise, return the default name from the monster data.
    if (nickname && nickname.trim() !== "" && !isSpeciesName) {
        return nickname;
    }

    return monster?.name || "Unknown Monster";
}

function GetEvolutionCandidates()
{
    if (!monster || !monster.evolutions) {
        return [];
    }

    return monster.evolutions;
}