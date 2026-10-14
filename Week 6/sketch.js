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


let monster;
let currentLifeStage = LIFE_STAGE.EGG;
let monsterImages = {};

const SPRITE_SIZE = 16;
const RENDER_SCALE = 8;

//JSON
let monsterData;

function preload() 
{
  // Load the monster data array from the JSON file
  InitMonsterData();
}

function InitMonsterData() {
  // == Monster Entry Structure ==
  // String name, string lifeStage, string imagePath

  monsterData = loadJSON('Data/monster.json', function (json) {
    monsterData = json;
    // Load the monster images based on the image paths
    monsterData.forEach((monsterEntry, index) => {
      monsterImages[index] = loadImage(monsterEntry.image_path);
    });
  });
}

function setup() {
  createCanvas(400, 400);
  imageMode(CORNER);
  noSmooth();

  monster = monsterData?.[MONSTER_ID.BLOBBY] || null;
}

function draw() {
  background(220);

  let monsterImage = monsterImages[MONSTER_ID.BLOBBY];

  if (!monsterImage) {
    return;
  }

  const displayWidth = SPRITE_SIZE * RENDER_SCALE;
  const displayHeight = SPRITE_SIZE * RENDER_SCALE;
  const x = (width - displayWidth) / 2;
  const y = (height - displayHeight) / 2;

  image(monsterImage, x, y, displayWidth, displayHeight, 0, 0, SPRITE_SIZE, SPRITE_SIZE);
}