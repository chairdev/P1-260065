function PlayTone(frequency, duration = 0.12, volume = 0.04, waveform = 'square')
{
    userStartAudio();

    return new Promise((resolve) => {
        const oscillator = new p5.Oscillator(waveform);
        const envelope = new p5.Envelope();

        oscillator.freq(frequency);
        oscillator.amp(0);
        oscillator.start();

        envelope.setADSR(0.01, 0.08, 0.2, 0.12);
        envelope.setRange(volume, 0);
        envelope.play(oscillator, 0, duration);

        const fullDurationMs = (duration + 0.06) * 1000;
        setTimeout(() => {
            oscillator.stop();
            resolve();
        }, fullDurationMs);
    });
}

function PlayJingle(notes)
{
    return (async () => {
        for (const [frequency, duration] of notes)
        {
            await PlayTone(frequency, duration, 0.04, 'square');
        }
    })();
}

function ConfirmationBeep()
{
    PlayTone(1200, 0.045, 0.035, 'square');
}

function ErrorBeep()
{
    PlayTone(400, 0.09, 0.04, 'square');
}

function AttentionBeep()
{
     const notes = [880, 1175, 880, 1175, 880, 1175];

    notes.forEach((frequency, index) => {
        setTimeout(() => {
            PlayTone(frequency, 0.10, 0.04, 'square');
        }, index * 180);
    });
}

function EvolutionJingle()
{
    const notes = [
        [523, 0.12],  // C5
        [659, 0.12],  // E5
        [784, 0.12],  // G5
        [1047, 0.20], // C6
        [784, 0.12],  // G5
        [1047, 0.35]  // C6
    ];

    return PlayJingle(notes);
}

function DeathJingle()
{
    const notes = [
        [784, 0.25], // G5
        [784, 0.25], // G5
        [784, 0.25], // G5
        [659, 0.25], // E5
        [698, 0.25], // F5
        [698, 0.25], // F5
        [698, 0.25], // F5
        [587, 0.25], // D5
        [659, 0.5],  // E5
        [523, 0.5],  // C5
    ];

    return PlayJingle(notes);
}