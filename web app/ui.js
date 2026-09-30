/**
 * MathQuest Kingdom — UI Manager
 * Handles all DOM-based UI: HUD, modals, transitions, overlays
 */
(function () {
    'use strict';
    window.Game = window.Game || {};
    /* ── DOM Cache ── */
    var dom = {};
    var uiReady = false;
    /* ── DOM Cache ── */
    var dom = {};
    var uiReady = false;
    var isTouchDevice = false;

    function detectTouch() {
        isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth <= 1024);
        if (isTouchDevice && dom['move-hint-text']) {
            dom['move-hint-text'].textContent = 'Drag Joystick to move';
        }
    }

    function cacheDom() {
        var ids = [
            'loading-screen', 'loading-fill', 'title-screen', 'start-button',
            'game-container', 'hud',
            'health-fill', 'health-text', 'level-display', 'challenge-counter',
            'score-display', 'hearts-container',
            'level-intro', 'intro-level-number', 'intro-name', 'intro-subtitle',
            'intro-narrative', 'intro-start-btn',
            'gate-modal', 'gate-question-text', 'gate-options', 'gate-feedback',
            'gate-feedback-icon', 'gate-feedback-text',
            'combat-modal', 'combat-monster-name', 'monster-health-fill',
            'timer-ring-progress', 'combat-timer-text', 'combat-questions',
            'combat-submit', 'combat-feedback', 'combat-feedback-icon', 'combat-feedback-text',
            'heart-collected', 'heart-message', 'hearts-progress', 'heart-continue-btn',
            'victory-screen', 'final-score', 'final-gates', 'final-monsters', 'play-again-btn',
            'damage-overlay', 'message-overlay', 'message-text',
            'interact-prompt', 'interact-text',
            'mobile-controls', 'joystick-zone', 'joystick-base', 'joystick-knob',
            'mobile-action-btn', 'mobile-action-label', 'move-hint-text'
        ];
        ids.forEach(function (id) {
            dom[id] = document.getElementById(id);
        });
        uiReady = true;
        detectTouch();
        initMobileControls();
    }

    /* ── Mobile Controls Management ── */
    function showMobileControls() {
        detectTouch();
        if (dom['mobile-controls'] && isTouchDevice) {
            dom['mobile-controls'].style.display = 'block';
        }
    }

    function hideMobileControls() {
        if (dom['mobile-controls']) {
            dom['mobile-controls'].style.display = 'none';
        }
    }

    function initMobileControls() {
        detectTouch();
        window.addEventListener('touchstart', function () {
            if (!isTouchDevice) {
                isTouchDevice = true;
                if (dom['move-hint-text']) dom['move-hint-text'].textContent = 'Drag Joystick to move';
                if (dom['hud'] && dom['hud'].style.display !== 'none') showMobileControls();
            }
        }, { once: true, passive: true });

        var zone = dom['joystick-zone'];
        var base = dom['joystick-base'];
        var knob = dom['joystick-knob'];
        var actionBtn = dom['mobile-action-btn'];
        var prompt = dom['interact-prompt'];

        if (!zone || !base || !knob) return;

        var touchState = { active: false, touchId: null };
        var maxRadius = 45;

        function updateJoystick(clientX, clientY) {
            var rect = base.getBoundingClientRect();
            var centerX = rect.left + rect.width / 2;
            var centerY = rect.top + rect.height / 2;

            var domDx = clientX - centerX;
            var domDy = clientY - centerY;
            var dist = Math.sqrt(domDx * domDx + domDy * domDy);

            var clampedDist = Math.min(dist, maxRadius);
            var angle = Math.atan2(domDy, domDx);

            var knobX = Math.cos(angle) * clampedDist;
            var knobY = Math.sin(angle) * clampedDist;

            knob.style.transform = 'translate(' + knobX + 'px, ' + knobY + 'px)';

            var normX = (domDx / (dist || 1)) * (clampedDist / maxRadius);
            var normY = (domDy / (dist || 1)) * (clampedDist / maxRadius);

            var gameDx = -normX;
            var gameDz = -normY;

            if (window.Game && window.Game.Player && window.Game.Player.setTouchInput) {
                window.Game.Player.setTouchInput(gameDx, gameDz, true);
            }
        }

        function resetJoystick() {
            touchState.active = false;
            touchState.touchId = null;
            knob.style.transform = 'translate(0px, 0px)';

            if (window.Game && window.Game.Player && window.Game.Player.setTouchInput) {
                window.Game.Player.setTouchInput(0, 0, false);
            }
        }

        zone.addEventListener('touchstart', function (e) {
            e.preventDefault();
            if (Game.Audio && Game.Audio.init) Game.Audio.init();
            if (touchState.active) return;
            var touch = e.changedTouches[0];
            touchState.active = true;
            touchState.touchId = touch.identifier;
            updateJoystick(touch.clientX, touch.clientY);
        }, { passive: false });

        window.addEventListener('touchmove', function (e) {
            if (!touchState.active) return;
            for (var i = 0; i < e.changedTouches.length; i++) {
                var touch = e.changedTouches[i];
                if (touch.identifier === touchState.touchId) {
                    e.preventDefault();
                    updateJoystick(touch.clientX, touch.clientY);
                    break;
                }
            }
        }, { passive: false });

        window.addEventListener('touchend', function (e) {
            if (!touchState.active) return;
            for (var i = 0; i < e.changedTouches.length; i++) {
                if (e.changedTouches[i].identifier === touchState.touchId) {
                    resetJoystick();
                    break;
                }
            }
        }, { passive: false });

        window.addEventListener('touchcancel', function () {
            if (touchState.active) resetJoystick();
        }, { passive: false });

        var triggerStepAction = function (e) {
            if (e) e.preventDefault();
            Game.Audio.play('click');
            var player = window.Game.Player;
            if (player && player.setTouchInput) {
                player.setTouchInput(0, 1, true);
                setTimeout(function () { player.setTouchInput(0, 0, false); }, 250);
            }
        };

        if (actionBtn) {
            actionBtn.addEventListener('click', triggerStepAction);
            actionBtn.addEventListener('touchstart', triggerStepAction, { passive: false });
        }

        if (prompt) {
            prompt.addEventListener('click', triggerStepAction);
            prompt.addEventListener('touchstart', triggerStepAction, { passive: false });
        }
    }

    /* ── Loading Screen ── */
    function hideLoading(callback) {
        var el = dom['loading-screen'];
        if (!el) { if (callback) callback(); return; }
        el.classList.add('fade-out');
        setTimeout(function () {
            el.style.display = 'none';
            if (callback) callback();
        }, 600);
    }
    /* ── Title Screen ── */
    function showTitleScreen() {
        dom['title-screen'].style.display = 'flex';
        hideMobileControls();
    }
    function hideTitleScreen(callback) {
        dom['title-screen'].style.opacity = '0';
        dom['title-screen'].style.transition = 'opacity 0.5s ease';
        setTimeout(function () {
            dom['title-screen'].style.display = 'none';
            dom['title-screen'].style.opacity = '1';
            if (callback) callback();
        }, 500);
    }
    /* ── HUD ── */
    function showHud() {
        dom['hud'].style.display = 'block';
        showMobileControls();
    }
    function hideHud() {
        dom['hud'].style.display = 'none';
        hideMobileControls();
    }
    function updateHealth(current, max) {
        var pct = Math.max(0, Math.min(100, (current / max) * 100));
        dom['health-fill'].style.width = pct + '%';
        dom['health-text'].textContent = current + '/' + max;
        // Change color based on health
        if (pct > 50) {
            dom['health-fill'].style.background = 'linear-gradient(90deg, #cc0000, #ff4444, #ff6b6b)';
        } else if (pct > 25) {
            dom['health-fill'].style.background = 'linear-gradient(90deg, #cc6600, #ff9800, #ffb74d)';
        } else {
            dom['health-fill'].style.background = 'linear-gradient(90deg, #880000, #cc0000, #ff4444)';
        }
    }
    function updateScore(score) {
        dom['score-display'].textContent = score;
    }
    function updateLevel(name) {
        dom['level-display'].textContent = name;
    }
    function updateChallengeCounter(gatesOpened, totalGates) {
        dom['challenge-counter'].textContent = 'Gate ' + gatesOpened + '/' + totalGates;
    }
    function addHeart(index) {
        var slots = dom['hearts-container'].querySelectorAll('.heart-slot');
        if (slots[index]) {
            slots[index].querySelector('.heart-empty').style.display = 'none';
            slots[index].querySelector('.heart-full').style.display = 'inline';
            slots[index].classList.add('collected');
            setTimeout(function () { slots[index].classList.remove('collected'); }, 500);
        }
    }
    function resetHearts() {
        var slots = dom['hearts-container'].querySelectorAll('.heart-slot');
        for (var i = 0; i < slots.length; i++) {
            slots[i].querySelector('.heart-empty').style.display = 'inline';
            slots[i].querySelector('.heart-full').style.display = 'none';
        }
    }
    /* ── Level Intro ── */
    function showLevelIntro(config, callback) {
        hideMobileControls();
        dom['intro-level-number'].textContent = 'LEVEL ' + (config.id + 1);
        dom['intro-name'].textContent = config.name;
        dom['intro-subtitle'].textContent = config.subtitle;
        dom['intro-narrative'].textContent = config.narrative;
        dom['level-intro'].style.display = 'flex';
        // Re-trigger animation
        var content = dom['level-intro'].querySelector('.intro-content');
        content.style.animation = 'none';
        content.offsetHeight; // force reflow
        content.style.animation = 'fadeSlideUp 0.8s ease-out';
        var startBtn = dom['intro-start-btn'];
        var handler = function () {
            startBtn.removeEventListener('click', handler);
            dom['level-intro'].style.display = 'none';
            showMobileControls();
            if (callback) callback();
        };
        startBtn.addEventListener('click', handler);
    }
    /* ── Gate Question Modal ── */
    function showGateQuestion(questionObj, onAnswer) {
        hideMobileControls();
        dom['gate-question-text'].textContent = questionObj.question;
        dom['gate-feedback'].style.display = 'none';
        dom['gate-feedback'].className = 'gate-feedback';
        var optionsEl = dom['gate-options'];
        optionsEl.innerHTML = '';
        var answered = false;
        var shuffled = questionObj.options.slice().sort(function () { return Math.random() - 0.5; });
        shuffled.forEach(function (opt) {
            var btn = document.createElement('button');
            btn.className = 'gate-option';
            btn.textContent = opt;
            btn.addEventListener('click', function () {
                if (answered) return;
                answered = true;
                Game.Audio.play('click');
                // Disable all
                var allBtns = optionsEl.querySelectorAll('.gate-option');
                for (var i = 0; i < allBtns.length; i++) {
                    allBtns[i].classList.add('disabled');
                }
                var isCorrect = (opt === questionObj.answer);
                if (isCorrect) {
                    btn.classList.add('selected-correct');
                    dom['gate-feedback-icon'].textContent = '✅';
                    dom['gate-feedback-text'].textContent = 'Correct! ' + (questionObj.explanation || '');
                    dom['gate-feedback'].className = 'gate-feedback correct';
                    Game.Audio.play('correct');
                } else {
                    btn.classList.add('selected-wrong');
                    // Highlight correct
                    for (var j = 0; j < allBtns.length; j++) {
                        if (allBtns[j].textContent === questionObj.answer) {
                            allBtns[j].classList.add('selected-correct');
                        }
                    }
                    dom['gate-feedback-icon'].textContent = '❌';
                    dom['gate-feedback-text'].textContent = 'Wrong! The answer is: ' + questionObj.answer;
                    dom['gate-feedback'].className = 'gate-feedback wrong';
                    Game.Audio.play('wrong');
                }
                dom['gate-feedback'].style.display = 'flex';
                setTimeout(function () {
                    dom['gate-modal'].style.display = 'none';
                    showMobileControls();
                    if (onAnswer) onAnswer(isCorrect);
                }, isCorrect ? 1200 : 2000);
            });
            optionsEl.appendChild(btn);
        });
        dom['gate-modal'].style.display = 'flex';
    }
    /* ── Combat Modal ── */
    function showCombatModal(monsterName, questions, onComplete) {
        hideMobileControls();
        dom['combat-monster-name'].textContent = '⚔️ ' + monsterName;
        dom['monster-health-fill'].style.width = '100%';
        dom['combat-submit'].style.display = 'none';
        dom['combat-feedback'].style.display = 'none';
        dom['combat-feedback'].className = 'combat-feedback';
        
        var currentQuestionIndex = 0;
        var selections = {};
        var timerInterval = null;
        var timerSeconds = 15; // 15 seconds per question
        var totalQuestions = questions.length;
        var correctCount = 0;
        var firstCorrect = false;

        function displayQuestion(qi) {
            currentQuestionIndex = qi;
            if (timerInterval) clearInterval(timerInterval);
            
            var q = questions[qi];
            var questionsEl = dom['combat-questions'];
            questionsEl.innerHTML = '';
            
            var card = document.createElement('div');
            card.className = 'combat-question-card';
            
            var numEl = document.createElement('div');
            numEl.className = 'cq-number';
            numEl.textContent = 'Question ' + (qi + 1) + ' of ' + totalQuestions;
            
            var textEl = document.createElement('div');
            textEl.className = 'cq-text';
            textEl.textContent = q.question;
            
            var optsEl = document.createElement('div');
            optsEl.className = 'cq-options';
            
            var answered = false;
            var shuffled = q.options.slice().sort(function () { return Math.random() - 0.5; });
            
            shuffled.forEach(function (opt) {
                var btn = document.createElement('button');
                btn.className = 'cq-option';
                btn.textContent = opt;
                btn.addEventListener('click', function () {
                    if (answered) return;
                    answered = true;
                    if (timerInterval) clearInterval(timerInterval);
                    
                    Game.Audio.play('click');
                    
                    // Disable all buttons in this card
                    var allBtns = optsEl.querySelectorAll('.cq-option');
                    for (var b = 0; b < allBtns.length; b++) {
                        allBtns[b].classList.add('disabled');
                    }
                    
                    var isCorrect = (opt === q.answer);
                    selections[qi] = opt;
                    
                    if (isCorrect) {
                        btn.classList.add('selected-correct');
                        Game.Audio.play('correct');
                        correctCount++;
                        if (qi === 0) firstCorrect = true;
                    } else {
                        btn.classList.add('selected-wrong');
                        // Highlight correct one
                        for (var c = 0; c < allBtns.length; c++) {
                            if (allBtns[c].textContent === q.answer) {
                                allBtns[c].classList.add('selected-correct');
                            }
                        }
                        Game.Audio.play('wrong');
                    }
                    
                    // Advance to next question or end
                    setTimeout(function () {
                        if (qi === 0 && firstCorrect) {
                            // First question correct: immediate shortcut victory!
                            finishCombat();
                        } else {
                            var nextIdx = qi + 1;
                            if (nextIdx < totalQuestions) {
                                displayQuestion(nextIdx);
                            } else {
                                finishCombat();
                            }
                        }
                    }, isCorrect ? 1200 : 2000);
                });
                optsEl.appendChild(btn);
            });
            
            card.appendChild(numEl);
            card.appendChild(textEl);
            card.appendChild(optsEl);
            questionsEl.appendChild(card);
            
            startTimerForQuestion();
        }

        function startTimerForQuestion() {
            var circumference = 2 * Math.PI * 34; // r=34 from SVG
            dom['timer-ring-progress'].style.strokeDasharray = circumference;
            dom['timer-ring-progress'].style.strokeDashoffset = '0';
            dom['timer-ring-progress'].classList.remove('urgent');
            dom['combat-timer-text'].classList.remove('urgent');
            dom['combat-timer-text'].textContent = timerSeconds;
            
            var timerStart = Date.now();
            var totalMs = timerSeconds * 1000;
            
            timerInterval = setInterval(function () {
                var elapsed = Date.now() - timerStart;
                var remaining = Math.max(0, totalMs - elapsed);
                var secs = Math.ceil(remaining / 1000);
                var pct = elapsed / totalMs;
                
                dom['combat-timer-text'].textContent = secs;
                dom['timer-ring-progress'].style.strokeDashoffset = (pct * circumference).toString();
                
                if (secs <= 4) {
                    dom['timer-ring-progress'].classList.add('urgent');
                    dom['combat-timer-text'].classList.add('urgent');
                    if (secs > 0) Game.Audio.play('tick');
                }
                
                if (remaining <= 0) {
                    clearInterval(timerInterval);
                    Game.Audio.play('timeout');
                    
                    selections[currentQuestionIndex] = null;
                    
                    // Highlight correct answer on timeout
                    var card = dom['combat-questions'].querySelector('.combat-question-card');
                    if (card) {
                        var btns = card.querySelectorAll('.cq-option');
                        var q = questions[currentQuestionIndex];
                        for (var b = 0; b < btns.length; b++) {
                            btns[b].classList.add('disabled');
                            if (btns[b].textContent === q.answer) {
                                btns[b].classList.add('selected-correct');
                            }
                        }
                    }
                    
                    setTimeout(function () {
                        var nextIdx = currentQuestionIndex + 1;
                        if (nextIdx < totalQuestions) {
                            displayQuestion(nextIdx);
                        } else {
                            finishCombat();
                        }
                    }, 2000);
                }
            }, 200);
        }

        function finishCombat() {
            if (timerInterval) clearInterval(timerInterval);
            
            var allCorrect = (correctCount === totalQuestions);
            var isVictory = firstCorrect || allCorrect;
            
            // Monster health
            var hpPct = isVictory ? 0 : Math.max(0, ((totalQuestions - correctCount) / totalQuestions) * 100);
            dom['monster-health-fill'].style.width = hpPct + '%';
            
            if (isVictory) {
                dom['combat-feedback-icon'].textContent = '🏆';
                dom['combat-feedback-text'].textContent = firstCorrect 
                    ? 'First answer correct! Monster defeated!' 
                    : 'Monster defeated! All answers correct!';
                dom['combat-feedback'].className = 'combat-feedback victory';
                Game.Audio.play('monster_defeat');
            } else {
                dom['combat-feedback-icon'].textContent = '💥';
                dom['combat-feedback-text'].textContent = correctCount + '/' + totalQuestions + ' correct. The monster fights back!';
                dom['combat-feedback'].className = 'combat-feedback defeat';
                Game.Audio.play('damage');
            }
            
            dom['combat-feedback'].style.display = 'flex';
            setTimeout(function () {
                dom['combat-modal'].style.display = 'none';
                showMobileControls();
                if (onComplete) onComplete(allCorrect, correctCount, firstCorrect);
            }, isVictory ? 2000 : 2500);
        }

        // Start with the first question
        displayQuestion(0);
        
        dom['combat-modal'].style.display = 'flex';
        Game.Audio.play('monster_roar');
    }
    function hideCombatModal() {
        dom['combat-modal'].style.display = 'none';
        showMobileControls();
    }
    /* ── Monster Health (external update) ── */
    function updateMonsterHealth(current, max) {
        var pct = Math.max(0, Math.min(100, (current / max) * 100));
        dom['monster-health-fill'].style.width = pct + '%';
    }
    /* ── Heart Collected ── */
    function showHeartCollected(message, heartsCount, callback) {
        hideMobileControls();
        dom['heart-message'].textContent = message;
        // Build progress
        var prog = dom['hearts-progress'];
        prog.innerHTML = '';
        for (var i = 0; i < 5; i++) {
            var span = document.createElement('span');
            span.style.fontSize = '2rem';
            span.textContent = i < heartsCount ? '❤️' : '🖤';
            prog.appendChild(span);
        }
        dom['heart-collected'].style.display = 'flex';
        Game.Audio.play('heart');
        var handler = function () {
            dom['heart-continue-btn'].removeEventListener('click', handler);
            dom['heart-collected'].style.display = 'none';
            showMobileControls();
            if (callback) callback();
        };
        dom['heart-continue-btn'].addEventListener('click', handler);
    }
    /* ── Victory Screen ── */
    function showVictory(score, gates, monsters) {
        hideMobileControls();
        dom['final-score'].textContent = score;
        dom['final-gates'].textContent = gates;
        dom['final-monsters'].textContent = monsters;
        dom['victory-screen'].style.display = 'flex';
        Game.Audio.play('victory');
        spawnConfetti();
    }
    function spawnConfetti() {
        var container = document.getElementById('victory-particles');
        if (!container) return;
        container.innerHTML = '';
        var colors = ['#ffd700', '#ff4444', '#4caf50', '#03a9f4', '#e040fb', '#ff9800', '#ffffff'];
        for (var i = 0; i < 80; i++) {
            var piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = (Math.random() * 100) + '%';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.width = (6 + Math.random() * 8) + 'px';
            piece.style.height = (6 + Math.random() * 8) + 'px';
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            piece.style.animationDuration = (2 + Math.random() * 3) + 's';
            piece.style.animationDelay = (Math.random() * 2) + 's';
            piece.style.opacity = (0.6 + Math.random() * 0.4).toString();
            container.appendChild(piece);
        }
    }
    /* ── Damage Flash ── */
    function showDamage() {
        var el = dom['damage-overlay'];
        el.classList.remove('flash');
        el.offsetHeight; // force reflow
        el.classList.add('flash');
    }
    /* ── Message Overlay ── */
    function showMessage(text, duration, callback) {
        dom['message-text'].textContent = text;
        dom['message-overlay'].style.display = 'flex';
        setTimeout(function () {
            dom['message-overlay'].style.display = 'none';
            if (callback) callback();
        }, duration || 2000);
    }
    /* ── Interact Prompt ── */
    function showInteractPrompt(text) {
        dom['interact-text'].textContent = text || 'Approach to interact';
        dom['interact-prompt'].style.display = 'block';
    }
    function hideInteractPrompt() {
        dom['interact-prompt'].style.display = 'none';
    }
    /* ── Public API ── */
    window.Game.UI = {
        init: function () { cacheDom(); },
        hideLoading: hideLoading,
        showTitleScreen: showTitleScreen,
        hideTitleScreen: hideTitleScreen,
        showHud: showHud,
        hideHud: hideHud,
        updateHealth: updateHealth,
        updateScore: updateScore,
        updateLevel: updateLevel,
        updateChallengeCounter: updateChallengeCounter,
        addHeart: addHeart,
        resetHearts: resetHearts,
        showLevelIntro: showLevelIntro,
        showGateQuestion: showGateQuestion,
        showCombatModal: showCombatModal,
        hideCombatModal: hideCombatModal,
        updateMonsterHealth: updateMonsterHealth,
        showHeartCollected: showHeartCollected,
        showVictory: showVictory,
        showDamage: showDamage,
        showMessage: showMessage,
        showInteractPrompt: showInteractPrompt,
        hideInteractPrompt: hideInteractPrompt
    };
})();
