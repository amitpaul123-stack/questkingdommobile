/**
 * MathQuest Kingdom — Main Game Controller
 * Three.js scene setup, game loop, level progression, state management
 */
(function () {
    'use strict';
    window.Game = window.Game || {};
    /* ══════════════════════════════════════
       GAME STATE
       ══════════════════════════════════════ */
    var state = {
        currentLevel: 0,
        hearts: 0,
        score: 0,
        totalGatesOpened: 0,
        totalMonstersDefeated: 0,
        gatesOpenedThisLevel: 0,
        monstersDefeatedThisLevel: 0,
        gameStarted: false,
        levelActive: false,
        interacting: false,  // true when player is at a gate or in combat
        lastGateCheck: -1,
        lastMonsterCheck: -1
    };
    /* ══════════════════════════════════════
       THREE.JS SETUP
       ══════════════════════════════════════ */
    var scene, camera, renderer;
    var clock = new THREE.Clock();
    // Camera offset from player
    var cameraOffset = new THREE.Vector3(0, 14, -16);
    var cameraLookOffset = new THREE.Vector3(0, 2, 5);
    function initThreeJS() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            60, window.innerWidth / window.innerHeight, 0.1, 300
        );
        camera.position.set(0, 14, -16);
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputEncoding = THREE.sRGBEncoding;
        var container = document.getElementById('game-container');
        container.appendChild(renderer.domElement);
        // Resize handler
        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    /* ══════════════════════════════════════
       CAMERA
       ══════════════════════════════════════ */
    function updateCamera() {
        var playerPos = Game.Player.getPosition();
        var targetPos = new THREE.Vector3(
            playerPos.x + cameraOffset.x,
            playerPos.y + cameraOffset.y,
            playerPos.z + cameraOffset.z
        );
        // Smooth follow
        camera.position.lerp(targetPos, 0.05);
        var lookTarget = new THREE.Vector3(
            playerPos.x + cameraLookOffset.x,
            playerPos.y + cameraLookOffset.y,
            playerPos.z + cameraLookOffset.z
        );
        camera.lookAt(lookTarget);
    }
    /* ══════════════════════════════════════
       GAME LOOP
       ══════════════════════════════════════ */
    function animate() {
        requestAnimationFrame(animate);
        var delta = clock.getDelta();
        delta = Math.min(delta, 0.05); // Cap delta to avoid huge jumps
        if (state.gameStarted && state.levelActive) {
            Game.Player.update(delta);
            Game.World.update(delta);
            updateCamera();
            // Proximity checks (only when not already interacting)
            if (!state.interacting) {
                checkProximity();
            }
        }
        renderer.render(scene, camera);
    }
    /* ══════════════════════════════════════
       PROXIMITY & INTERACTION
       ══════════════════════════════════════ */
    function checkProximity() {
        var playerPos = Game.Player.getPosition();
        // Check gates
        var gateResult = Game.World.checkGateProximity(playerPos);
        if (gateResult && gateResult.gateIndex !== state.lastGateCheck) {
            state.lastGateCheck = gateResult.gateIndex;
            handleGateEncounter(gateResult.gateIndex);
            return;
        }
        // Check monsters
        var monsterResult = Game.World.checkMonsterProximity(playerPos);
        if (monsterResult && monsterResult.monsterIndex !== state.lastMonsterCheck) {
            state.lastMonsterCheck = monsterResult.monsterIndex;
            handleMonsterEncounter(monsterResult.monsterIndex);
            return;
        }
        // Show/hide interact prompt
        if (gateResult || monsterResult) {
            var promptText = gateResult
                ? '🔒 Gate ahead — approach to unlock!'
                : '⚔️ Monster ahead — prepare for battle!';
            Game.UI.showInteractPrompt(promptText);
        } else {
            Game.UI.hideInteractPrompt();
        }
    }
    /* ══════════════════════════════════════
       GATE ENCOUNTER
       ══════════════════════════════════════ */
    function handleGateEncounter(gateIndex) {
        state.interacting = true;
        Game.Player.setMovementEnabled(false);
        Game.UI.hideInteractPrompt();
        var question = Game.Questions.getMathQuestion(state.currentLevel);
        Game.Audio.play('gate_approach');
        Game.UI.showGateQuestion(question, function (isCorrect) {
            if (isCorrect) {
                // Gate opens!
                Game.World.openGate(gateIndex);
                Game.Audio.play('gate_open');
                state.gatesOpenedThisLevel++;
                state.totalGatesOpened++;
                state.score += 100;
                Game.UI.updateScore(state.score);
                Game.UI.updateChallengeCounter(state.gatesOpenedThisLevel, 5);
                Game.UI.showMessage('🔓 Gate Opened!', 1200, function () {
                    state.interacting = false;
                    Game.Player.setMovementEnabled(true);
                    checkLevelComplete();
                });
            } else {
                // Wrong answer — retry with a new question
                state.score = Math.max(0, state.score - 20);
                Game.UI.updateScore(state.score);
                state.lastGateCheck = -1; // Allow re-trigger
                state.interacting = false;
                Game.Player.setMovementEnabled(true);
            }
        });
    }
    /* ══════════════════════════════════════
       MONSTER ENCOUNTER
       ══════════════════════════════════════ */
    function handleMonsterEncounter(monsterIndex) {
        state.interacting = true;
        Game.Player.setMovementEnabled(false);
        Game.UI.hideInteractPrompt();
        var config = Game.Levels.getConfig(state.currentLevel);
        
        Game.Combat.startBattle(config.monsterName, function (victory, firstQuestionCorrect) {
            if (victory) {
                Game.World.destroyMonster(monsterIndex);
                state.monstersDefeatedThisLevel++;
                state.totalMonstersDefeated++;
                state.score += 200;
                Game.UI.updateScore(state.score);
                
                if (firstQuestionCorrect) {
                    var playerPos = Game.Player.getPosition();
                    var nextGate = null;
                    for (var g = 0; g < config.gatePositions.length; g++) {
                        var gp = config.gatePositions[g];
                        if (gp.z > playerPos.z) {
                            nextGate = gp;
                            break;
                        }
                    }
                    
                    if (nextGate) {
                        var targetZ = nextGate.z - 3;
                        if (Game.Player.mesh) {
                            Game.Player.mesh.position.set(nextGate.x, nextGate.y, targetZ);
                        }
                        
                        // Warp camera instantly to avoid laggy catch-up
                        if (camera) {
                            camera.position.set(
                                nextGate.x + cameraOffset.x,
                                nextGate.y + cameraOffset.y,
                                targetZ + cameraOffset.z
                            );
                        }
                        
                        state.lastGateCheck = -1;
                        state.lastMonsterCheck = -1;
                        
                        Game.UI.showMessage('🌟 First question correct! Teleported to the next gate!', 2000, function () {
                            state.interacting = false;
                            Game.Player.setMovementEnabled(true);
                        });
                    } else {
                        // No more gates ahead, complete the level
                        Game.UI.showMessage('🌟 First question correct! Level Complete!', 2000, function () {
                            state.interacting = false;
                            forceLevelComplete();
                        });
                    }
                } else {
                    Game.UI.showMessage('⚔️ ' + config.monsterName + ' Defeated!', 1500, function () {
                        state.interacting = false;
                        Game.Player.setMovementEnabled(true);
                    });
                }
            } else {
                // Failed — can retry by approaching again
                Game.UI.showMessage('❌ Battle failed! The monster fights back.', 2000, function () {
                    state.lastMonsterCheck = -1;
                    state.interacting = false;
                    Game.Player.setMovementEnabled(true);
                });
            }
        });
    }
    /* ══════════════════════════════════════
       LEVEL COMPLETION
       ══════════════════════════════════════ */
    function forceLevelComplete() {
        state.levelActive = false;
        Game.Player.setMovementEnabled(false);
        Game.Audio.play('level_complete');
        var config = Game.Levels.getConfig(state.currentLevel);
        state.hearts++;
        state.score += 500;
        Game.UI.updateScore(state.score);
        Game.UI.addHeart(state.currentLevel);
        setTimeout(function () {
            Game.UI.showHeartCollected(
                config.heartMessage,
                state.hearts,
                function () {
                    if (state.hearts >= 5) {
                        showVictory();
                    } else {
                        nextLevel();
                    }
                }
            );
        }, 800);
    }
    function checkLevelComplete() {
        var finalGateIdx = Game.World.getGateCount() - 1;
        if (state.gatesOpenedThisLevel >= 5 || (finalGateIdx >= 0 && Game.World.isGateOpen(finalGateIdx))) {
            forceLevelComplete();
        }
    }
    /* ══════════════════════════════════════
       LEVEL MANAGEMENT
       ══════════════════════════════════════ */
    function startLevel(index) {
        state.currentLevel = index;
        state.gatesOpenedThisLevel = 0;
        state.monstersDefeatedThisLevel = 0;
        state.lastGateCheck = -1;
        state.lastMonsterCheck = -1;
        state.interacting = false;
        var config = Game.Levels.getConfig(index);
        // Clear old world
        Game.World.clear();
        // Build new world
        Game.World.init(scene, config);
        // Reset player
        Game.Player.resetForLevel();
        Game.Player.setBounds(
            -(config.pathWidth / 2 - 2),
            config.pathWidth / 2 - 2,
            config.pathLength + 5
        );
        
        // Reset camera instantly to player start position to avoid empty void during level intro
        var startPlayerPos = Game.Player.getPosition();
        if (camera) {
            camera.position.set(
                startPlayerPos.x + cameraOffset.x,
                startPlayerPos.y + cameraOffset.y,
                startPlayerPos.z + cameraOffset.z
            );
            camera.lookAt(new THREE.Vector3(
                startPlayerPos.x + cameraLookOffset.x,
                startPlayerPos.y + cameraLookOffset.y,
                startPlayerPos.z + cameraLookOffset.z
            ));
        }
        // Update HUD
        Game.UI.updateLevel(config.name);
        Game.UI.updateChallengeCounter(0, 5);
        Game.UI.updateHealth(Game.Player.health, Game.Player.maxHealth);
        // Start ambient audio
        Game.Audio.playAmbient(index);
        // Show level intro
        Game.UI.showLevelIntro(config, function () {
            state.levelActive = true;
            Game.Player.setMovementEnabled(true);
        });
    }
    function nextLevel() {
        startLevel(state.currentLevel + 1);
    }
    /* ══════════════════════════════════════
       VICTORY
       ══════════════════════════════════════ */
    function showVictory() {
        state.levelActive = false;
        Game.Player.setMovementEnabled(false);
        Game.Audio.stopAmbient();
        Game.UI.showVictory(state.score, state.totalGatesOpened, state.totalMonstersDefeated);
    }
    /* ══════════════════════════════════════
       RESET / PLAY AGAIN
       ══════════════════════════════════════ */
    function resetGame() {
        state.currentLevel = 0;
        state.hearts = 0;
        state.score = 0;
        state.totalGatesOpened = 0;
        state.totalMonstersDefeated = 0;
        state.gameStarted = false;
        state.levelActive = false;
        state.interacting = false;
        Game.Questions.reset();
        Game.UI.resetHearts();
        Game.UI.updateScore(0);
        Game.World.clear();
        Game.Audio.stopAmbient();
    }
    /* ══════════════════════════════════════
       INITIALIZATION
       ══════════════════════════════════════ */
    function init() {
        // Initialize Three.js
        initThreeJS();
        // Initialize modules
        Game.UI.init();
        Game.Player.init(scene);
        Game.Audio.init();
        // Fade out loading screen → show title
        Game.UI.hideLoading(function () {
            Game.UI.showTitleScreen();
        });
        // Start button
        document.getElementById('start-button').addEventListener('click', function () {
            Game.Audio.play('click');
            Game.UI.hideTitleScreen(function () {
                state.gameStarted = true;
                Game.UI.showHud();
                startLevel(0);
            });
        });
        // Play again button
        document.getElementById('play-again-btn').addEventListener('click', function () {
            Game.Audio.play('click');
            document.getElementById('victory-screen').style.display = 'none';
            resetGame();
            state.gameStarted = true;
            Game.UI.showHud();
            startLevel(0);
        });
        // Start the render loop
        animate();
    }
    // Expose
    window.Game.state = state;
    window.Game.init = init;
    /* ── Auto-start when DOM is ready ── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
