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