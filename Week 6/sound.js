let bgMusic;
const BG_MUSIC_VOLUME = 0.5;
let hasStartedBgMusic = false;

function LoadBgMusic()
{
    bgMusic = loadSound('Sound/bg_music.mp3');
}

function StartBgMusic()
{
    if (hasStartedBgMusic || !bgMusic)
    {
        return;
    }

    userStartAudio().then(() => {
        if (hasStartedBgMusic)
        {
            return;
        }

        bgMusic.setVolume(BG_MUSIC_VOLUME);
        bgMusic.loop();
        hasStartedBgMusic = true;
    }).catch((error) => {
        console.error("Could not start the background music:", error);
    });
}

function PlayTone(frequency, duration = 0.12, volume = 0.04, waveform = 'square')
{
    StartBgMusic();
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

function CleanBeep()
{
    return (async () => {
        const notes = [
            [500, 0.04],
            [700, 0.04],
            [950, 0.05],
            [1250, 0.07]
        ];

        for (const [frequency, duration] of notes)
        {
            await PlayTone(frequency, duration, 0.035, 'square');
        }
    })();
}

function WinJingle()
{
    const notes = [
        [784, 0.10],
        [988, 0.10],
        [1175, 0.10],
        [1568, 0.22]
    ];

    return PlayJingle(notes);
}

function LoseJingle()
{
    const notes = [
        [1175, 0.12],
        [988, 0.12],
        [784, 0.12],
        [587, 0.25]
    ];

    return PlayJingle(notes);
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