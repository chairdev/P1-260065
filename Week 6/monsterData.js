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
let currentMonsterIndex = MONSTER_ID.EGG1;
let age = 0;
let careMistakes = 0;
let currentLifeStage = LIFE_STAGE.EGG;
let happiness = 30;
let hunger = 100;
let isSick = false;

let monsterImages = {};

const SPRITE_SIZE = 16;
const RENDER_SCALE = 8;

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

function SetMonsterID(monsterId)
{
    console.log("Setting monster ID to: " + monsterId);
    currentMonsterIndex = monsterId;
    monster = monsterData?.[currentMonsterIndex] || null;
}

function GetMonsterName()
{
    return monster?.name || "Unknown Monster";
}

function GetEvolutionCandidates()
{
    if (!monster || !monster.evolutions) {
        return [];
    }

    return monster.evolutions;
}