function preload() {
  InitMonsterData();
}

function setup() {
  createCanvas(400, 400);
  imageMode(CORNER);
  noSmooth();

  monster = monsterData?.[MONSTER_ID.BLOBBY] || null;
}

function draw() {
  background(220);

  DrawMonster();
}

function DrawMonster()
{
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