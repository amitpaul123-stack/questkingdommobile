(function () {
    'use strict';
    window.Game = window.Game || {};
    window.Game.Levels = {
        configs: [
            /* ── Level 0: Enchanted Forest ── */
            {
                id: 0,
                name: 'Enchanted Forest',
                subtitle: 'The Whispering Woods',
                narrative: 'Ancient trees whisper of a dark corruption spreading through the land. Only by solving the magical gate puzzles can you reach the Heart of Nature hidden deep within the forest.',
                colors: {
                    sky: 0x0f0c1b,         // Mystical twilight sky
                    fog: 0x1d1135,         // Glowing purple fog
                    ground: 0x124a2c,      // Rich emerald green
                    groundAlt: 0x1c8b52,   // Bright neon moss green
                    path: 0x4b1f69,        // Enchanted violet path
                    accent: 0x00e6ff,      // Electric cyan accent
                    particle: 0xff00b7,    // Magenta fairy dust particles
                    ambient: 0x2a1b4e,     // Lavender ambient lighting
                    directional: 0xa6ff00,  // Lime-yellow sunlight highlights
                    gate: 0x00e6ff,        // Neon cyan gates
                    gateGlow: 0xff00b7,    // Magenta emissive gate glow
                    monster: 0x3b1c55,     // Dark amethyst purple golem
                    monsterAccent: 0xa6ff00, // Glowing neon lime-green details
                    decoration: 0x1b7943   // Jade green tree leaves
                },
                fogNear: 30,
                fogFar: 140,
                monsterName: 'Thorn Golem',
                monsterType: 'golem',
                heartMessage: 'The forest spirit grants you the Heart of Nature! 🌿',
                decorationType: 'forest',
                pathLength: 200,
                pathWidth: 30,
                gatePositions: [
                    { x: 0, y: 0, z: 30 },
                    { x: 0, y: 0, z: 65 },
                    { x: 0, y: 0, z: 100 },
                    { x: 0, y: 0, z: 140 },
                    { x: 0, y: 0, z: 180 }
                ],
                monsterPositions: [
                    { x: 0, y: 0, z: 48 },
                    { x: 0, y: 0, z: 120 },
                    { x: 0, y: 0, z: 160 }
                ]
            },
            /* ── Level 1: Crystal Caves ── */
            {
                id: 1,
                name: 'Crystal Caves',
                subtitle: 'The Shimmering Depths',
                narrative: 'Descend into the luminous caverns where ancient crystals pulse with mathematical energy. Solve the riddles etched into the crystal gates to claim the Heart of Wisdom.',
                colors: {
                    sky: 0x0b001a,         // Deep celestial abyss
                    fog: 0x1c0038,         // Vivid violet cavern fog
                    ground: 0x0b1f54,      // Deep sapphire blue cavern ground
                    groundAlt: 0x00e5ff,   // Bright glowing cyan crystals/veins
                    path: 0x30054e,        // Mystic deep purple path
                    accent: 0xff007f,      // Vibrant neon pink accent
                    particle: 0x00ffff,    // Glowing cyan crystal dust
                    ambient: 0x2a004f,     // Violet ambient light
                    directional: 0xff80df, // Vibrant pink directional light
                    gate: 0xff007f,        // Pink glowing gate frame
                    gateGlow: 0x00ffff,    // Cyan glowing gate orb
                    monster: 0x230046,     // Dark obsidian crystal serpent
                    monsterAccent: 0x00ffff, // Glowing neon cyan eyes/scales
                    decoration: 0xff00ff   // Bright fuchsia cave crystal growths
                },
                fogNear: 25,
                fogFar: 120,
                monsterName: 'Crystal Serpent',
                monsterType: 'serpent',
                heartMessage: 'The crystal spirits bestow the Heart of Wisdom! 💎',
                decorationType: 'crystal',
                pathLength: 200,
                pathWidth: 28,
                gatePositions: [
                    { x: 0, y: 0, z: 28 },
                    { x: 0, y: 0, z: 60 },
                    { x: 0, y: 0, z: 95 },
                    { x: 0, y: 0, z: 135 },
                    { x: 0, y: 0, z: 178 }
                ],
                monsterPositions: [
                    { x: 0, y: 0, z: 45 },
                    { x: 0, y: 0, z: 115 },
                    { x: 0, y: 0, z: 158 }
                ]
            },
            /* ── Level 2: Volcanic Wasteland ── */
            {
                id: 2,
                name: 'Volcanic Wasteland',
                subtitle: 'The Scorched Expanse',
                narrative: 'Cross the blazing wasteland where rivers of lava block every path. Only mathematical precision can cool the molten gates and reveal the Heart of Courage.',
                colors: {
                    sky: 0x150005,         // Ashy red dark sky
                    fog: 0x2a0500,         // Dense glowing ember fog
                    ground: 0x180f1d,      // Deep obsidian rock ground
                    groundAlt: 0xff3c00,   // Molten magma ground highlights
                    path: 0x38000c,        // Dark maroon lava stone path
                    accent: 0xffea00,      // Bright yellow lava/spark accents
                    particle: 0xff6c00,    // Glowing orange embers and sparks
                    ambient: 0x3d0c00,     // Burning crimson ambient glow
                    directional: 0xff5100, // Fiery orange sunlight
                    gate: 0xff1e00,        // Blazing red gate arches
                    gateGlow: 0xffea00,    // Solar yellow core glow
                    monster: 0x1c0005,     // Scorched magma titan skin
                    monsterAccent: 0xffea00, // Glowing core cracking yellow lava
                    decoration: 0xbf360c   // Lava crystal formations
                },
                fogNear: 20,
                fogFar: 110,
                monsterName: 'Lava Titan',
                monsterType: 'titan',
                heartMessage: 'From the molten core rises the Heart of Courage! 🔥',
                decorationType: 'volcanic',
                pathLength: 200,
                pathWidth: 32,
                gatePositions: [
                    { x: 0, y: 0, z: 32 },
                    { x: 0, y: 0, z: 68 },
                    { x: 0, y: 0, z: 105 },
                    { x: 0, y: 0, z: 145 },
                    { x: 0, y: 0, z: 185 }
                ],
                monsterPositions: [
                    { x: 0, y: 0, z: 50 },
                    { x: 0, y: 0, z: 125 },
                    { x: 0, y: 0, z: 165 }
                ]
            },
            /* ── Level 3: Sky Castle ── */
            {
                id: 3,
                name: 'Sky Castle',
                subtitle: 'The Celestial Fortress',
                narrative: 'Ascend to the floating fortress above the clouds where ancient geometers built impossible structures. Decode their architectural puzzles to find the Heart of Light.',
                colors: {
                    sky: 0x0a1c36,         // Deep celestial blue sunset
                    fog: 0x2b0d4f,         // Ethereal purple cloud fog
                    ground: 0x0f2547,      // Celestial blue ground platforms
                    groundAlt: 0xffd700,   // Bright shining gold accents
                    path: 0x00d2ff,        // Translucent neon cyan path
                    accent: 0xffe600,      // Radiant golden sunburst highlights
                    particle: 0xffffff,    // Sparkly white stars and star dust
                    ambient: 0x261947,     // Lavender light
                    directional: 0xffd700, // Warm golden sunlight
                    gate: 0xffd700,        // Golden arches
                    gateGlow: 0x00ffff,    // Cyan energy core
                    monster: 0x172c47,     // Sky storm armor
                    monsterAccent: 0xffd700, // Bright gold griffin feathers
                    decoration: 0x00d2ff   // Glowing celestial crystals
                },
                fogNear: 40,
                fogFar: 160,
                monsterName: 'Storm Griffin',
                monsterType: 'griffin',
                heartMessage: 'The celestial guardians entrust you with the Heart of Light! ✨',
                decorationType: 'sky',
                pathLength: 200,
                pathWidth: 26,
                gatePositions: [
                    { x: 0, y: 0, z: 30 },
                    { x: 0, y: 0, z: 62 },
                    { x: 0, y: 0, z: 98 },
                    { x: 0, y: 0, z: 138 },
                    { x: 0, y: 0, z: 182 }
                ],
                monsterPositions: [
                    { x: 0, y: 0, z: 46 },
                    { x: 0, y: 0, z: 118 },
                    { x: 0, y: 0, z: 162 }
                ]
            },
            /* ── Level 4: Shadow Dungeon ── */
            {
                id: 4,
                name: 'Shadow Dungeon',
                subtitle: 'The Final Descent',
                narrative: 'The Dark Sorcerer awaits in the deepest dungeon, guarding the final Heart. Every skill you\'ve learned will be tested. Survive the shadows and save the kingdom!',
                colors: {
                    sky: 0x05010a,         // True void
                    fog: 0x0d031c,         // Dark purple shadow fog
                    ground: 0x0c0717,      // Shadow stone flooring
                    groundAlt: 0x00ff88,   // Poisonous green glowing runes
                    path: 0x18092d,        // Dark shadow brick path
                    accent: 0x00ff88,      // Toxic neon green accents
                    particle: 0x7000ff,    // Glowing violet shadow particles
                    ambient: 0x0d001e,     // Shadow violet lighting
                    directional: 0x00ff88, // Toxic green spotlights
                    gate: 0x7000ff,        // Purple gate runes
                    gateGlow: 0x00ff88,    // Neon green glowing gate energy
                    monster: 0x110228,     // Pure dark sorcerer shadow robes
                    monsterAccent: 0x00ff88, // Glowing green magical core
                    decoration: 0x7000ff   // Violet necrotic crystal shards
                },
                fogNear: 15,
                fogFar: 90,
                monsterName: 'Shadow Sorcerer',
                monsterType: 'sorcerer',
                heartMessage: 'The darkness lifts! You claim the final Heart of Hope! 🌟',
                decorationType: 'dungeon',
                pathLength: 200,
                pathWidth: 24,
                gatePositions: [
                    { x: 0, y: 0, z: 26 },
                    { x: 0, y: 0, z: 58 },
                    { x: 0, y: 0, z: 92 },
                    { x: 0, y: 0, z: 132 },
                    { x: 0, y: 0, z: 175 }
                ],
                monsterPositions: [
                    { x: 0, y: 0, z: 42 },
                    { x: 0, y: 0, z: 112 },
                    { x: 0, y: 0, z: 155 }
                ]
            }
        ],
        getConfig: function (index) {
            return this.configs[index] || this.configs[0];
        },
        getTotalLevels: function () {
            return this.configs.length;
        }
    };
})();