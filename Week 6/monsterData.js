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

function GetEvolutionCandidates()
{
    // Get the evolution candidates for the current monster
    if (!monster) {
        return [];
    }

    const currentMonsterData = monsterData[monster.id];
    if (!currentMonsterData || !currentMonsterData.evolutions) {
        return [];
    }

    return currentMonsterData.evolutions;
}

function ProcessMonsterEvolution()
{
    const candidates = GetEvolutionCandidates();
    if (candidates.length === 0) {
        console.log("No evolution candidates available.");
        return;
    }

    candidates.forEach((candidate) => {
        if(candidate.condition == "none")
        {
            // Evolve to the first candidate with no conditions
            monster = monsterData[candidate.id];
            console.log("Monster evolved to: " + monster.name);
            return;
        }
    });
}