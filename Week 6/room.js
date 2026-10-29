function SetAnimationState() {
  if (gameState.currentLifeStage === LIFE_STAGE.EGG &&
      currentAnimation === "egg_hatch") {
    return;
  }

  if (gameState.isSick) {
    PlayAnimation("sick");
  } else if (gameState.currentLifeStage !== LIFE_STAGE.EGG) {
    PlayAnimation("walking");
  } else {
    PlayAnimation("egg_idle");
  }
}

function WaitForAnimationToFinish(animationName) {
  return new Promise((resolve) => {
    const checkAnimation = () => {
      const animation = animationData?.animations?.[animationName];

      if (!animation || !Array.isArray(animation.frames) ||
          currentAnimation !== animationName) {
        resolve();
        return;
      }

      const frameDuration = animation.frameDuration ?? 250;
      const isLastFrame = animationFrameIndex >= animation.frames.length - 1;
      const hasDisplayedLastFrame =
        millis() - lastAnimationFrameTime >= frameDuration;

      if (animation.loop === false && isLastFrame && hasDisplayedLastFrame) {
        resolve();
        return;
      }

      setTimeout(checkAnimation, 16);
    };

    checkAnimation();
  });
}

function UpdateMonsterMovement() {
  const minX = MONSTER_MARGIN;
  const maxX = width - displayWidth - MONSTER_MARGIN;

  monsterX += MONSTER_SPEED * monsterDirection;

  if (monsterX >= maxX) {
    monsterX = maxX;
    monsterDirection = -1;
  } else if (monsterX <= minX) {
    monsterX = minX;
    monsterDirection = 1;
  }
}

function PlayAnimation(animationName) {
  if (currentAnimation === animationName) {
    return;
  }

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

  if (!animation || !Array.isArray(animation.frames) ||
      animation.frames.length <= 1) {
    return;
  }

  const frameDuration = animation.frameDuration ?? 250;

  if (millis() - lastAnimationFrameTime >= frameDuration) {
    if (animation.loop === false) {
      if (animationFrameIndex < animation.frames.length - 1) {
        animationFrameIndex++;
      }
    } else {
      animationFrameIndex =
        (animationFrameIndex + 1) % animation.frames.length;
    }

    lastAnimationFrameTime = millis();
  }
}

function PlayPoopAnimation() {
  const animation = animationData?.animations?.poop;

  if (!animation || !Array.isArray(animation.frames)) {
    return;
  }

  poopAnimationFrameIndex = 0;
  lastPoopAnimationFrameTime = millis();
}

function UpdatePoopAnimation() {
  const animation = animationData?.animations?.poop;

  if (!animation || !Array.isArray(animation.frames) ||
      animation.frames.length <= 1) {
    return;
  }

  const frameDuration = animation.frameDuration ?? 250;

  if (millis() - lastPoopAnimationFrameTime >= frameDuration) {
    poopAnimationFrameIndex =
      (poopAnimationFrameIndex + 1) % animation.frames.length;
    lastPoopAnimationFrameTime = millis();
  }
}

function DrawPoop() {
  const animation = animationData?.animations?.poop;

  if (!poopImage || !animation || !Array.isArray(animation.frames) ||
      gameState.poopCount <= 0) {
    return;
  }

  const frame = animation.frames[poopAnimationFrameIndex];
  const defaultPoopSize = SPRITE_SIZE * RENDER_SCALE;
  const rows = Math.ceil(gameState.poopCount / 2);
  const poopSize = Math.min(defaultPoopSize, (height - 100) / rows);
  const edgeMargin = 10;
  const verticalGap = Math.max(
    4,
    (height - 100 - rows * poopSize) / (rows + 1)
  );

  for (let poopIndex = 0; poopIndex < gameState.poopCount; poopIndex++) {
    const row = Math.floor(poopIndex / 2);
    const isRightEdge = poopIndex % 2 === 1;
    const poopX = isRightEdge ? width - edgeMargin - poopSize : edgeMargin;
    const poopY =
      height - 50 - poopSize - verticalGap - row * (poopSize + verticalGap);

    image(
      poopImage,
      poopX,
      poopY,
      poopSize,
      poopSize,
      frame * SPRITE_SIZE,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE
    );
  }
}

function UpdateSicknessAnimation() {
  const animation = animationData?.animations?.skull;

  if (!gameState.isSick || !sicknessImage ||
      !animation || !Array.isArray(animation.frames)) {
    sicknessAnimationFrameIndex = 0;
    lastSicknessAnimationFrameTime = millis();
    return;
  }

  const frameDuration = animation.frameDuration ?? 250;

  if (millis() - lastSicknessAnimationFrameTime >= frameDuration) {
    sicknessAnimationFrameIndex =
      (sicknessAnimationFrameIndex + 1) % animation.frames.length;
    lastSicknessAnimationFrameTime = millis();
  }
}

function DrawSickness() {
  const animation = animationData?.animations?.skull;

  if (!gameState.isSick || !sicknessImage ||
      !animation || !Array.isArray(animation.frames)) {
    return;
  }

  const sicknessSize = SPRITE_SIZE * RENDER_SCALE;
  const sicknessX = monsterX + (displayWidth - sicknessSize) / 2;
  const sicknessY = MONSTER_Y - displayWidth / 2 - sicknessSize;
  const frame = animation.frames[sicknessAnimationFrameIndex];

  image(
    sicknessImage,
    sicknessX,
    sicknessY,
    sicknessSize,
    sicknessSize,
    frame * SPRITE_SIZE,
    0,
    SPRITE_SIZE,
    SPRITE_SIZE
  );
}

function DrawMonster() {
  const activeMonsterIndex =
    gameState.currentMonsterIndex ?? MONSTER_ID.EGG1;
  const monsterImage = monsterImages[activeMonsterIndex];

  if (!monsterImage) {
    return;
  }

  const animation = animationData?.animations?.[currentAnimation];

  if (!animation || !Array.isArray(animation.frames)) {
    return;
  }

  const monsterDisplayWidth = SPRITE_SIZE * RENDER_SCALE;
  const frame = animation.frames[animationFrameIndex];

  push();
  translate(Math.round(monsterX + monsterDisplayWidth / 2), MONSTER_Y);
  scale(monsterDirection, 1);
  image(
    monsterImage,
    -monsterDisplayWidth / 2,
    -monsterDisplayWidth / 2,
    monsterDisplayWidth,
    monsterDisplayWidth,
    frame * SPRITE_SIZE,
    0,
    SPRITE_SIZE,
    SPRITE_SIZE
  );
  pop();
}

function DrawRoom() {
  SetAnimationState();

  if (gameState.currentLifeStage !== LIFE_STAGE.EGG &&
      !gameState.isSick && gameState.isLightOn) {
    UpdateMonsterMovement();
  } else {
    monsterX = (width - displayWidth) / 2;
  }

  UpdateAnimation();
  DrawMonster();
  UpdateSicknessAnimation();
  DrawSickness();
  UpdatePoopAnimation();
  DrawPoop();
}