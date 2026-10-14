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
let monsterImages = {};

const SPRITE_SIZE = 16;
const RENDER_SCALE = 8;

let monsterData;

function InitMonsterData() {
  monsterData = loadJSON('Data/monster.json', function (json) {
    monsterData = json;

    monsterData.forEach((monsterEntry, index) => {
      monsterImages[index] = loadImage(monsterEntry.image_path);
    });
  });
}
