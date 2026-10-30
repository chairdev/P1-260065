let actionButtons = {};
let menuButtons = {};
let actionPanel;
let statusActionPanel;
let playPanel;
let guessInput;

function createActionButtons() {
  actionPanel = createDiv();
  setupActionPanel(actionPanel);

  const actions = [
    ['feed', 'Feed', FeedMonster],
    ['clean', 'Clean', CleanPoop],
    ['cure', 'Cure', GiveMedicine],
    ['play', 'Play', PlayGuessingGame],
    ['sleep', 'Sleep', () => {
      gameState.isLightOn = !gameState.isLightOn;
    }]
  ];

  createButtons(actionPanel, actions);

  statusActionPanel = createDiv();
  setupActionPanel(statusActionPanel);

  const statusActions = [
    ['changeName', 'Change Name', SetMonsterName],
    ['reset', 'Reset', ResetGame]
  ];

  createButtons(statusActionPanel, statusActions);

  playPanel = createDiv();
  setupActionPanel(playPanel);
  playPanel.style('justify-content', 'center');
  playPanel.style('align-items', 'center');

  guessInput = createInput('');
  guessInput.attribute('type', 'number');
  guessInput.attribute('min', '1');
  guessInput.attribute('max', '10');
  guessInput.attribute('placeholder', '1-10');
  guessInput.attribute('aria-label', 'Your guess');
  guessInput.style('width', '75px');
  guessInput.style('height', '32px');
  guessInput.style('box-sizing', 'border-box');
  guessInput.style('margin', '0 4px');
  guessInput.parent(playPanel);

  const guessButton = createButton('Guess');
  guessButton.attribute('aria-label', 'Submit guess');
  guessButton.mousePressed(() => {
    ConfirmationBeep();
    SubmitGuess();
  });
  guessButton.style('height', '32px');
  guessButton.style('margin', '0 4px');
  guessButton.parent(playPanel);

  const backButton = createButton('Back');
  backButton.attribute('aria-label', 'Back to room');
  backButton.mousePressed(() => {
    ConfirmationBeep();
    currentMenu = MENU_OPTIONS.ROOM;
    updateMenuVisibility();
  });
  backButton.style('height', '32px');
  backButton.style('margin', '0 4px');
  backButton.parent(playPanel);
}

function setupActionPanel(panel) {
  panel.position(0, 0);
  panel.style('display', 'flex');
  panel.style('gap', '0');
  panel.style('width', `${CANVAS_WIDTH}px`);
  panel.style('height', '50px');
  panel.style('box-sizing', 'border-box');
  panel.style('margin', '0');
  panel.style('padding', '0');
  panel.style('z-index', '1');
}

function createButtons(panel, actions) {
  actions.forEach(([key, label, action]) => {
    const button = createButton(label);
    button.parent(panel);
    button.attribute('aria-label', label);
    button.mousePressed(() => {
      ConfirmationBeep();
      action();
      SaveGameState();
      updateActionButtonLabels();
    });
    button.style('flex', '1');
    button.style('min-width', '0');
    button.style('height', '50px');
    button.style('box-sizing', 'border-box');
    button.style('margin', '0');
    button.style('padding', '0');
    button.style('border', '1px solid rgba(255, 255, 255, 0.35)');
    button.style('border-radius', '0');
    button.style('background', 'transparent');
    button.style('color', 'black');
    button.style('font-family', '"Ari W9500", sans-serif');
    button.style('font-size', '15px');
    button.style('font-weight', '700');
    button.style('cursor', 'pointer');
    button.style('box-shadow', 'none');
    button.mouseOver(() => {
      button.style('color', 'white');
      button.style('font-size', '18px');
    });
    button.mouseOut(() => {
      button.style('color', 'black');
      button.style('font-size', '15px');
    });

    if (panel === actionPanel) {
      actionButtons[key] = button;
    }
  });
}

function updateActionButtonLabels() {
  if (!actionButtons.sleep) {
    return;
  }

  actionButtons.sleep.html(gameState.isLightOn ? 'Sleep' : 'Wake Up');
  actionButtons.sleep.attribute(
    'aria-label',
    gameState.isLightOn ? 'Put monster to sleep' : 'Wake monster'
  );
}

function createMenuButtons() {
  const panel = createDiv();
  panel.position(0, CANVAS_HEIGHT - 50);
  panel.style('display', 'flex');
  panel.style('justify-content', 'flex-end');
  panel.style('gap', '0');
  panel.style('width', `${CANVAS_WIDTH}px`);
  panel.style('height', '50px');
  panel.style('box-sizing', 'border-box');
  panel.style('margin', '0');
  panel.style('padding', '0');
  panel.style('z-index', '1');

  const menus = [
    ['status', 'Status', MENU_OPTIONS.STATUS],
    ['room', 'Room', MENU_OPTIONS.ROOM]
  ];

  menus.forEach(([key, label, menu]) => {
    const button = createButton(label);
    button.parent(panel);
    button.attribute('aria-label', label);
    button.mousePressed(() => {
      ConfirmationBeep();
      currentMenu = menu;
      updateMenuVisibility();
    });
    button.style('width', '100px');
    button.style('height', '50px');
    button.style('box-sizing', 'border-box');
    button.style('margin', '0');
    button.style('padding', '0');
    button.style('border', '1px solid rgba(255, 255, 255, 0.35)');
    button.style('border-radius', '0');
    button.style('background', 'transparent');
    button.style('color', 'black');
    button.style('font-family', '"Ari W9500", sans-serif');
    button.style('font-size', '15px');
    button.style('font-weight', '700');
    button.style('cursor', 'pointer');
    button.style('box-shadow', 'none');
    button.mouseOver(() => {
      button.style('color', 'white');
      button.style('font-size', '18px');
    });
    button.mouseOut(() => {
      button.style('color', 'black');
      button.style('font-size', '15px');
    });

    menuButtons[key] = button;
  });

  updateMenuVisibility();
}

function updateMenuVisibility() {
  if (!actionPanel || !statusActionPanel) {
    return;
  }

  actionPanel.style(
    'display',
    currentMenu === MENU_OPTIONS.ROOM ? 'flex' : 'none'
  );
  statusActionPanel.style(
    'display',
    currentMenu === MENU_OPTIONS.STATUS ? 'flex' : 'none'
  );
  playPanel.style(
    'display',
    currentMenu === MENU_OPTIONS.PLAY ? 'flex' : 'none'
  );
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

function DrawLightingOverlay() {
  if (gameState.isLightOn) {
    return;
  }

  push();
  noStroke();
  fill(0, 0, 0, 140);
  rect(0, 0, width, height);
  pop();
}
