function preload() {
  InitMonsterData();
}

function setup() {
  createCanvas(400, 400);
  imageMode(CORNER);
  noSmooth();

  currentLifeStage = LIFE_STAGE.EGG;
  currentMonsterIndex = MONSTER_ID.EGG1;
  monster = monsterData?.[currentMonsterIndex] || null;
}

function draw() {
  background(220);

  GameLoop();
  DrawMonster();
}

function DrawMonster()
{
  const activeMonsterIndex = currentMonsterIndex ?? MONSTER_ID.EGG1;
  let monsterImage = monsterImages[activeMonsterIndex];

  if (!monsterImage) {
    return;
  }

  const displayWidth = SPRITE_SIZE * RENDER_SCALE;
  const displayHeight = SPRITE_SIZE * RENDER_SCALE;
  const x = (width - displayWidth) / 2;
  const y = (height - displayHeight) / 2;

  image(monsterImage, x, y, displayWidth, displayHeight, 0, 0, SPRITE_SIZE, SPRITE_SIZE);
}