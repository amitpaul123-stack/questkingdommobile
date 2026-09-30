(function () {
    'use strict';
    window.Game = window.Game || {};
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let ctx = null;
    let masterGain = null;
    let ambientNodes = [];
    function ensureCtx() {
        if (!ctx) {
            ctx = new AudioCtx();
            masterGain = ctx.createGain();
            masterGain.connect(ctx.destination);
            masterGain.gain.value = 0.35;
        }
        if (ctx.state === 'suspended') ctx.resume();
    }

    // Mobile audio context unlock on user gesture
    function unlockAudio() {
        ensureCtx();
        if (ctx && ctx.state === 'running') {
            window.removeEventListener('touchstart', unlockAudio);
            window.removeEventListener('touchend', unlockAudio);
            window.removeEventListener('pointerdown', unlockAudio);
            window.removeEventListener('click', unlockAudio);
        }
    }
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('touchend', unlockAudio, { passive: true });
    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('click', unlockAudio, { passive: true });
    /* ── Helpers ── */
    function tone(freq, dur, type, vol, startDelay) {
        ensureCtx();
        const t = ctx.currentTime + (startDelay || 0);
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(vol || 0.25, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        osc.connect(g);
        g.connect(masterGain);
        osc.start(t);
        osc.stop(t + dur + 0.05);
    }
    function sweep(startFreq, endFreq, dur, type, vol) {
        ensureCtx();
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + dur);
        g.gain.setValueAtTime(vol || 0.2, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.connect(g);
        g.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + dur + 0.05);
    }
    /* ── Sound Definitions ── */
    const sounds = {
        correct() {
            tone(523.25, 0.12, 'sine', 0.3);
            tone(659.25, 0.12, 'sine', 0.3, 0.1);
            tone(783.99, 0.25, 'sine', 0.35, 0.2);
        },
        wrong() {
            tone(200, 0.25, 'sawtooth', 0.18);
            tone(150, 0.35, 'sawtooth', 0.15, 0.12);
        },
        gate_open() {
            tone(392, 0.15, 'sine', 0.25);
            tone(440, 0.15, 'sine', 0.25, 0.12);
            tone(523.25, 0.15, 'sine', 0.28, 0.24);
            tone(659.25, 0.35, 'sine', 0.3, 0.36);
        },
        monster_roar() {
            sweep(120, 50, 0.6, 'sawtooth', 0.35);
            tone(55, 0.8, 'square', 0.15, 0.15);
        },
        heart() {
            tone(523.25, 0.15, 'sine', 0.25);
            tone(659.25, 0.15, 'sine', 0.28, 0.15);
            tone(783.99, 0.15, 'sine', 0.3, 0.3);
            tone(1046.5, 0.45, 'sine', 0.35, 0.45);
        },
        victory() {
            const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5, 1318.5];
            notes.forEach(function (f, i) {
                tone(f, i === notes.length - 1 ? 0.6 : 0.18, 'sine', 0.3, i * 0.16);
            });
        },
        damage() {
            tone(120, 0.15, 'square', 0.3);
            sweep(180, 80, 0.2, 'sawtooth', 0.2);
        },
        click() {
            tone(880, 0.04, 'sine', 0.15);
        },
        tick() {
            tone(1200, 0.03, 'sine', 0.12);
        },
        timeout() {
            tone(250, 0.3, 'square', 0.25);
            tone(180, 0.4, 'square', 0.2, 0.25);
        },
        level_complete() {
            const notes = [392, 440, 523.25, 659.25, 783.99];
            notes.forEach(function (f, i) {
                tone(f, 0.2, 'sine', 0.28, i * 0.18);
            });
        },
        monster_defeat() {
            sweep(400, 80, 0.5, 'sawtooth', 0.25);
            tone(523.25, 0.3, 'sine', 0.2, 0.35);
            tone(659.25, 0.3, 'sine', 0.25, 0.5);
        },
        gate_approach() {
            tone(440, 0.3, 'sine', 0.1);
            tone(554.37, 0.3, 'sine', 0.1, 0.15);
        }
    };
    /* ── Ambient Background ── */
    // Each level gets a subtle ambient drone
    const ambientConfigs = [
        { base: 110, mod: 0.5, type: 'sine' },    // Forest  — warm low hum
        { base: 146.83, mod: 0.3, type: 'sine' },  // Crystal — ethereal
        { base: 82.41, mod: 0.8, type: 'triangle' },// Volcano — rumble
        { base: 196, mod: 0.2, type: 'sine' },      // Sky     — airy
        { base: 73.42, mod: 1.0, type: 'triangle' } // Dungeon — ominous
    ];
    function playAmbient(levelIndex) {
        stopAmbient();
        ensureCtx();
        var cfg = ambientConfigs[levelIndex] || ambientConfigs[0];
        // Base drone
        var osc1 = ctx.createOscillator();
        var g1 = ctx.createGain();
        var filter = ctx.createBiquadFilter();
        osc1.type = cfg.type;
        osc1.frequency.value = cfg.base;
        filter.type = 'lowpass';
        filter.frequency.value = 250;
        g1.gain.value = 0.04;
        osc1.connect(filter);
        filter.connect(g1);
        g1.connect(masterGain);
        osc1.start();
        // Subtle modulation
        var lfo = ctx.createOscillator();
        var lfoGain = ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.value = cfg.mod;
        lfoGain.gain.value = 5;
        lfo.connect(lfoGain);
        lfoGain.connect(osc1.frequency);
        lfo.start();
        // Harmonic
        var osc2 = ctx.createOscillator();
        var g2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.value = cfg.base * 1.5;
        g2.gain.value = 0.015;
        osc2.connect(g2);
        g2.connect(masterGain);
        osc2.start();
        ambientNodes = [
            { osc: osc1, gain: g1 },
            { osc: lfo, gain: lfoGain },
            { osc: osc2, gain: g2 }
        ];
    }
    function stopAmbient() {
        ambientNodes.forEach(function (n) {
            try {
                n.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
                setTimeout(function () { try { n.osc.stop(); } catch (e) { } }, 600);
            } catch (e) { }
        });
        ambientNodes = [];
    }
    /* ── Public API ── */
    window.Game.Audio = {
        init: function () { ensureCtx(); },
        play: function (name) {
            ensureCtx();
            if (sounds[name]) sounds[name]();
        },
        playAmbient: playAmbient,
        stopAmbient: stopAmbient,
        setVolume: function (v) {
            if (masterGain) masterGain.gain.value = Math.max(0, Math.min(1, v));
        }
    };
})();