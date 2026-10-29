const DEBUG_MODE = true;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const SPRITE_SIZE = 16;
const RENDER_SCALE = 8;
const displayWidth = SPRITE_SIZE * RENDER_SCALE;

const MONSTER_MARGIN = 96;
const MONSTER_SPEED = 0.4;
const MONSTER_Y = CANVAS_HEIGHT / 2;
const GAME_SAVE_KEY = "week-6-virtual-pet-save";
const AUTO_SAVE_INTERVAL = 1000;

const MENU_OPTIONS = {
  ROOM: 0,
  STATUS: 1,
};

let currentMenu = MENU_OPTIONS.ROOM;

let monsterX = 0;
let monsterDirection = 1;

let fontRegular;
let fontBold;
let fontCondensed;
let fontCondensedBold;

let animationData = {};
let poopImage;
let sicknessImage;

let currentAnimation = "idle";
let animationFrameIndex = 0;
let lastAnimationFrameTime = 0;
let poopAnimationFrameIndex = 0;
let lastPoopAnimationFrameTime = 0;
let sicknessAnimationFrameIndex = 0;
let lastSicknessAnimationFrameTime = 0;

function preload() {
  fontRegular = loadFont('Fonts/ari-w9500.ttf');
  fontBold = loadFont('Fonts/ari-w9500-bold.ttf');
  fontCondensed = loadFont('Fonts/ari-w9500-condensed.ttf');
  fontCondensedBold = loadFont('Fonts/ari-w9500-condensed-bold.ttf');

  animationData = loadJSON('Data/animation.json');
  poopImage = loadImage('Graphics/Effects/poop.png');
  sicknessImage = loadImage('Graphics/Effects/sickness.png');
  LoadBgMusic();

  InitMonsterData();
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  imageMode(CORNER);
  noSmooth();
  textFont(fontRegular);

  const hasSavedGame = LoadGameState();

  if (!hasSavedGame) {
    gameState.currentLifeStage = LIFE_STAGE.EGG;
    gameState.currentMonsterIndex = MONSTER_ID.EGG1;
  }

  gameState.monster = monsterData?.[gameState.currentMonsterIndex] || null;

  monsterX = (width - displayWidth) / 2;
  monsterDirection = 1;

  PlayAnimation("egg_idle");
  PlayPoopAnimation();

  createActionButtons();
  createMenuButtons();

  if (DEBUG_MODE) {
    createDebugButtons();
  }

  StartBgMusic();
}

function mousePressed() {
  StartBgMusic();
}

function LoadGameState() {
  try {
    const savedState = localStorage.getItem(GAME_SAVE_KEY);

    if (!savedState) {
      return false;
    }

    const parsedState = JSON.parse(savedState);

    if (!parsedState || typeof parsedState !== "object" ||
        Array.isArray(parsedState)) {
      throw new Error("Saved game data is not an object.");
    }

    gameState = {
      ...initGameState,
      ...parsedState,
      monster: null
    };

    return true;
  } catch (error) {
    console.error("Could not load the saved game:", error);

    try {
      localStorage.removeItem(GAME_SAVE_KEY);
    } catch (removeError) {
      console.error("Could not remove the invalid saved game:", removeError);
    }

    return false;
  }
}

function SaveGameState() {
  try {
    const stateToSave = {
      ...gameState,
      monster: undefined
    };

    localStorage.setItem(GAME_SAVE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Could not save the game:", error);
  }
}

function windowResized() {
  resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  background(220);

  DrawScreen();
  GameLoop();

  if (currentMenu === MENU_OPTIONS.ROOM) {
    DrawRoom();
    DrawLightingOverlay();
  } else if (currentMenu === MENU_OPTIONS.STATUS) {
    DrawStatus();
  }

  updateDebugStateDisplay();
}
