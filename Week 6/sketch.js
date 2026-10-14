let monster;
let currentLifeStage = LIFE_STAGE.EGG;

//JSON
let monsterData;

function preload() 
{
  // Load the monster data array from the JSON file
  // == Monster Structure ==
  // String name, string lifeStage, string imagePath
  monsterData = loadJSON('Data/monster.json');
}

const MONSTER_ID = {
  EGG1: 0,
  BLOBBY: 1
};

const LIFE_STAGE = {
  EGG: 0,
  BABY: 1,
  TEEN: 2,
  ADULT: 3
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

//class for monster