let actionButtons = {};
let menuButtons = {};
let actionPanel;

function createActionButtons() {
  actionPanel = createDiv();
  actionPanel.position(0, 0);
  actionPanel.style('display', 'flex');
  actionPanel.style('gap', '0');
  actionPanel.style('width', `${CANVAS_WIDTH}px`);
  actionPanel.style('height', '50px');
  actionPanel.style('box-sizing', 'border-box');
  actionPanel.style('margin', '0');
  actionPanel.style('padding', '0');
  actionPanel.style('z-index', '1');

  const actions = [
    ['feed', 'Feed', FeedMonster],
    ['clean', 'Clean', CleanPoop],
    ['cure', 'Cure', GiveMedicine],
    ['sleep', 'Sleep', () => {
      gameState.isLightOn = !gameState.isLightOn;
    }]
  ];

  actions.forEach(([key, label, action]) => {
    const button = createButton(label);
    button.parent(actionPanel);
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

    actionButtons[key] = button;
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
  if (!actionPanel) {
    return;
  }

  actionPanel.style(
    'display',
    currentMenu === MENU_OPTIONS.ROOM ? 'flex' : 'none'
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
