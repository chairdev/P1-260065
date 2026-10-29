let debugStateDisplay = null;

function createDebugButtons() {
    // Create a panel to hold the debug buttons and state display
    const panel = createDiv('DEBUG');
    panel.position(430, 18);
    panel.style('display', 'flex');
    panel.style('flex-direction', 'column');
    panel.style('gap', '6px');
    panel.style('padding', '10px 12px');
    panel.style('background', 'rgba(30, 30, 30, 0.9)');
    panel.style('color', 'white');
    panel.style('font-family', 'sans-serif');
    panel.style('font-size', '12px');
    panel.style('font-weight', '700');
    panel.style('border-radius', '8px');
    panel.style('box-shadow', '0 4px 12px rgba(0,0,0,0.2)');
    panel.style('width', '160px');

    debugStateDisplay = createDiv();
    debugStateDisplay.parent(panel);
    debugStateDisplay.style('margin-top', '4px');
    debugStateDisplay.style('padding-top', '6px');
    debugStateDisplay.style('border-top', '1px solid rgba(255,255,255,0.25)');
    debugStateDisplay.style('font-family', 'monospace');
    debugStateDisplay.style('font-size', '10px');
    debugStateDisplay.style('font-weight', '600');
    debugStateDisplay.style('line-height', '1.5');
    debugStateDisplay.style('white-space', 'pre-wrap');
    debugStateDisplay.style('color', '#eaf3ff');
    updateDebugStateDisplay();

    const debugActions = [
        ['Make Tired', () => {
        gameState.energy = 0;
        }],
        ['Make Happy', () => {
        gameState.happiness = MAX_STAT_CAP;
        }],
        ['Evolve', () => {
            gameState.elapsedTicks = LIFE_STAGE_CONFIG[gameState.currentLifeStage].evolutionTick - 1;
        }],
        ['Clean Poop', () => {
            CleanPoop();
        }],
        ['Starve', () => {
        gameState.hunger = 0;
        }],
        ['Unhappy', () => {
        gameState.happiness = 0;
        }],
        ['Make Sick', () => {
        gameState.isSick = true;
        }],
        ['Reset', () => {
        ResetGame();
        }]
    ];

    debugActions.forEach(([label, action]) => 
    {
        const button = createButton(label);
        button.parent(panel);
        button.mousePressed(() => {
        action();
        updateDebugStateDisplay();
    });
    button.style('padding', '6px 8px');
    button.style('border', 'none');
    button.style('border-radius', '6px');
    button.style('background', '#f0f0f0');
    button.style('color', '#111');
    button.style('font-weight', '700');
    button.style('cursor', 'pointer');
  });
}

function updateDebugStateDisplay() 
{
    if (!debugStateDisplay) 
    {
        return;
    }

    let stateValues = [
        `hunger: ${gameState.hunger}`,
        `happiness: ${gameState.happiness}`,
        `energy: ${gameState.energy}`,
        `isSick: ${gameState.isSick}`,
        `ticksUnfed: ${gameState.ticksUnfed}`,
        `ticksUnhappy: ${gameState.ticksUnhappy}`,
        `ticksTired: ${gameState.ticksTired}`,
        `ticksSick: ${gameState.ticksSick}`,
        `poopCount: ${gameState.poopCount}`,
        `ticksPooped: ${gameState.ticksPooped}`,
        `attention: ${gameState.attentionSignal}`,
        `stage: ${gameState.currentLifeStage}`,
        `elapsed: ${gameState.elapsedTicks}`
    ];

    debugStateDisplay.html(stateValues.join('<br>'));
}