const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const SPRITE_SIZE = 16;
const RENDER_SCALE = 8;
const displayWidth = SPRITE_SIZE * RENDER_SCALE;

const MONSTER_MARGIN = 40;
const MONSTER_SPEED = 1;
const MONSTER_Y = CANVAS_HEIGHT / 2;

let monsterX = 0;
let monsterDirection = 1; // 1 = right, -1 = left

let fontRegular;
let fontBold;
let fontCondensed;
let fontCondensedBold;

// Animation data loaded from JSON
let animationData = {};

// Current animation state
let currentAnimation = "idle";
let animationFrameIndex = 0;
let lastAnimationFrameTime = 0;

function preload() {
  fontRegular = loadFont('Fonts/ari-w9500.ttf');
  fontBold = loadFont('Fonts/ari-w9500-bold.ttf');
  fontCondensed = loadFont('Fonts/ari-w9500-condensed.ttf');
  fontCondensedBold = loadFont('Fonts/ari-w9500-condensed-bold.ttf');

  animationData = loadJSON('Data/animation.json');

  InitMonsterData();
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  imageMode(CORNER);
  noSmooth();
  textFont(fontRegular);

  gameState.currentLifeStage = LIFE_STAGE.EGG;
  gameState.currentMonsterIndex = MONSTER_ID.EGG1;
  gameState.monster = monsterData?.[gameState.currentMonsterIndex] || null;

  // Start the monster in the middle of the screen
  monsterX = (width - displayWidth) / 2;
  monsterDirection = 1;

  PlayAnimation("egg_idle");

  createDebugButtons();
}

function draw() {
  background(220);

  DrawScreen();

  GameLoop();

  SetAnimationState();

  // Update movement and animation
  if (gameState.currentLifeStage !== LIFE_STAGE.EGG && !gameState.isSick) {
    UpdateMonsterMovement();
  }
  else
  {
    // If the monster is an egg or sick, keep it centered
    monsterX = (width - displayWidth) / 2;
  }

  UpdateAnimation();
  DrawMonster();

  updateDebugStateDisplay();
}

function SetAnimationState()
{
  // Keep the egg hatch animation from being replaced until it finishes.
  if (gameState.currentLifeStage === LIFE_STAGE.EGG &&
      currentAnimation === "egg_hatch")
  {
    return;
  }

  // Choose the animation based on the monster's state
  if (gameState.isSick)
  {
    PlayAnimation("sick");
  }
  else if (gameState.currentLifeStage !== LIFE_STAGE.EGG)
  {
    PlayAnimation("walking");
  }
  else
  {
    PlayAnimation("egg_idle");
  }
}

function WaitForAnimationToFinish(animationName) {
  return new Promise((resolve) => {
    const checkAnimation = () => {
      const animation = animationData?.animations?.[animationName];

      if (!animation || !Array.isArray(animation.frames) ||
          currentAnimation !== animationName)
      {
        resolve();
        return;
      }

      const frameDuration = animation.frameDuration ?? 250;
      const isLastFrame = animationFrameIndex >= animation.frames.length - 1;
      const hasDisplayedLastFrame =
        millis() - lastAnimationFrameTime >= frameDuration;

      if (animation.loop === false && isLastFrame && hasDisplayedLastFrame)
      {
        resolve();
        return;
      }

      setTimeout(checkAnimation, 16);
    };

    checkAnimation();
  });
}

// --------------------------------------------------
// MONSTER MOVEMENT
// --------------------------------------------------

function UpdateMonsterMovement() {
  const minX = MONSTER_MARGIN;
  const maxX = width - displayWidth - MONSTER_MARGIN;

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

// --------------------------------------------------
// ANIMATION SYSTEM
// --------------------------------------------------

function PlayAnimation(animationName) {
  // Don't restart an animation that is already playing
  if (currentAnimation === animationName) {
    return;
  }

  // Get the animation definition from the JSON file
  const animation = animationData?.animations?.[animationName];

  if (!animation || !Array.isArray(animation.frames)) {
    return;
  }

  currentAnimation = animationName;
  animationFrameIndex = 0;
  lastAnimationFrameTime = millis();
}

function UpdateAnimation() {
  const animation = animationData?.animations?.[currentAnimation];

  if (!animation || !Array.isArray(animation.frames)) {
    return;
  }

  // A single-frame animation does not need updating
  if (animation.frames.length <= 1) {
    return;
  }

  const frameDuration = animation.frameDuration ?? 250;

  if (millis() - lastAnimationFrameTime >= frameDuration) {
    if (animation.loop === false) {
      // Play the animation once, then leave it on its last frame
      if (animationFrameIndex < animation.frames.length - 1) {
        animationFrameIndex++;
      }
    } else {
      // Cycle back to the first frame when reaching the end
      animationFrameIndex =
        (animationFrameIndex + 1) % animation.frames.length;
    }

    lastAnimationFrameTime = millis();
  }
}

function DrawMonster() {
  // Get the current monster's image based on its index
  const activeMonsterIndex =
    gameState.currentMonsterIndex ?? MONSTER_ID.EGG1;

  
  const monsterImage = monsterImages[activeMonsterIndex];

  if (!monsterImage) {
    return;
  }

  const displayWidth = SPRITE_SIZE * RENDER_SCALE;
  const displayHeight = SPRITE_SIZE * RENDER_SCALE;

  const animation = animationData?.animations?.[currentAnimation];

  if (!animation || !Array.isArray(animation.frames)) {
    return;
  }

  // Find the sprite-sheet frame for the current animation
  const frame = animation.frames[animationFrameIndex];
  const sourceX = frame * SPRITE_SIZE;

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