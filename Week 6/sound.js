function PlayTone(frequency, duration = 0.12, volume = 0.04, waveform = 'square')
{
    userStartAudio();

    const oscillator = new p5.Oscillator(waveform);
    const envelope = new p5.Envelope();

    oscillator.freq(frequency);
    oscillator.amp(0);
    oscillator.start();

    envelope.setADSR(0.01, 0.08, 0.2, 0.12);
    envelope.setRange(volume, 0);
    envelope.play(oscillator, 0, duration);

    oscillator.stop(duration + 0.06);
}

function AttentionBeep()
{
    const notes = [660, 880];

    notes.forEach((frequency, index) => {
        setTimeout(() => {
            PlayTone(frequency, 0.12, 0.04, 'square');
            PlayTone(frequency, 0.12, 0.04, 'square');
        }, index * 150);
    });
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

    notes.forEach(([frequency, duration], index) => {
        setTimeout(() => {
            PlayTone(frequency, duration, 0.04, 'square');
        }, index * 300);
    });
}