const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const SPRITE_SIZE = 16;
const RENDER_SCALE = 8;

let fontRegular;
let fontBold;
let fontCondensed;
let fontCondensedBold;

function preload() {
  fontRegular = loadFont('Fonts/ari-w9500.ttf');
  fontBold = loadFont('Fonts/ari-w9500-bold.ttf');
  fontCondensed = loadFont('Fonts/ari-w9500-condensed.ttf');
  fontCondensedBold = loadFont('Fonts/ari-w9500-condensed-bold.ttf');

  InitMonsterData();
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  imageMode(CORNER);
  noSmooth();
  textFont(fontRegular);

  currentLifeStage = LIFE_STAGE.EGG;
  currentMonsterIndex = MONSTER_ID.EGG1;
  monster = monsterData?.[currentMonsterIndex] || null;
}

function draw() {
  background(220);
  DrawScreen();

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

function DrawScreen()
{
  //draw a rect at the top and bottom of the screen. its like little headers
  fill(100, 100, 100);
  rect(0, 0, width, 50);
  rect(0, height - 50, width, 50);

  //draw attention signal if the monster needs attention its an italics exclamation mark in the bottom left corner of the screen. it should be red and big enough to be seen easily
  if(attentionSignal)
  {
    textFont(fontCondensedBold);
    textSize(48);
    fill("black");
    text("!", 16, height - 8);
  }
}