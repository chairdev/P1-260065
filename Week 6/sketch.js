
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const SPRITE_SIZE = 16;
const RENDER_SCALE = 8;

const MONSTER_MARGIN = 40;
const MONSTER_SPEED = 1;
const MONSTER_Y = CANVAS_HEIGHT / 2;

let monsterX = 0;
let monsterDirection = 1; // 1 = right, -1 = left

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

  gameState.currentLifeStage = LIFE_STAGE.EGG;
  gameState.currentMonsterIndex = MONSTER_ID.EGG1;
  gameState.monster =
    monsterData?.[gameState.currentMonsterIndex] || null;

  // Start the monster in the middle of the screen
  const displayWidth = SPRITE_SIZE * RENDER_SCALE;
  monsterX = (width - displayWidth) / 2;
  monsterDirection = 1;

  createDebugButtons();
}

function draw() {
  background(220);

  DrawScreen();

  GameLoop();
  
  if(gameState.currentLifeStage != LIFE_STAGE.EGG)
  {
    UpdateMonsterMovement();
  }
  DrawMonster();

  updateDebugStateDisplay();
}

function UpdateMonsterMovement() {
  const displayWidth = SPRITE_SIZE * RENDER_SCALE;

  const minX = MONSTER_MARGIN;
  const maxX = width - displayWidth - MONSTER_MARGIN;

  // Move horizontally
  monsterX += MONSTER_SPEED * monsterDirection;

  // Turn around at the right edge
  if (monsterX >= maxX) {
    monsterX = maxX;
    monsterDirection = -1;
  }
  // Turn around at the left edge
  else if (monsterX <= minX) {
    monsterX = minX;
    monsterDirection = 1;
  }
}

function DrawMonster() {
  const activeMonsterIndex =
    gameState.currentMonsterIndex ?? MONSTER_ID.EGG1;

  const monsterImage = monsterImages[activeMonsterIndex];

  if (!monsterImage) {
    return;
  }

  const displayWidth = SPRITE_SIZE * RENDER_SCALE;
  const displayHeight = SPRITE_SIZE * RENDER_SCALE;

  // Select the normal or sick sprite from the sprite sheet
  const sourceX = gameState.isSick ? SPRITE_SIZE : 0;

  push();

  // Position the monster
  translate(
    Math.round(monsterX + displayWidth / 2),
    MONSTER_Y
  );

  // Flip the sprite when facing left
  scale(monsterDirection, 1);

  image(
    monsterImage,
    -displayWidth / 2,
    -displayHeight / 2,
    displayWidth,
    displayHeight,
    sourceX,
    0,
    SPRITE_SIZE,
    SPRITE_SIZE
  );

  pop();
}

function DrawScreen() {
  // Draw headers at the top and bottom of the screen
  fill(100, 100, 100);
  rect(0, 0, width, 50);
  rect(0, height - 50, width, 50);

  // Draw the attention signal when the monster needs attention
  if (gameState.attentionSignal) {
    textFont(fontCondensedBold);
    textSize(48);
    fill("black");
    text("!", 16, height - 8);
  }
}
