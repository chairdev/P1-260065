function DrawStatus() {
  const activeMonsterIndex =
    gameState.currentMonsterIndex ?? MONSTER_ID.EGG1;
  const monsterImage = monsterImages[activeMonsterIndex];

  push();
  textAlign(LEFT, TOP);
  fill(0);
  textFont(fontBold);
  textSize(24);
  text("Status", 24, 72);

  if (monsterImage) {
    image(
      monsterImage,
      24,
      115,
      128,
      128,
      0,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE
    );
  }

  textFont(fontRegular);
  textSize(18);
  text(`Name: ${GetMonsterName()}`, 180, 120);
  text(`Hunger: ${gameState.hunger}`, 180, 155);
  text(`Happiness: ${gameState.happiness}`, 180, 185);
  text(`Energy: ${gameState.energy}`, 180, 215);
  text(`Stage: ${GetLifeStageName()}`, 180, 245);
  pop();
}

function GetLifeStageName() {
  const stageNames = {
    [LIFE_STAGE.EGG]: "Egg",
    [LIFE_STAGE.BABY]: "Baby",
    [LIFE_STAGE.TEEN]: "Teen",
    [LIFE_STAGE.ADULT]: "Adult"
  };

  return stageNames[gameState.currentLifeStage] ?? "Unknown";
}
