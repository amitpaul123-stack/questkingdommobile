/**
 * MathQuest Kingdom — Combat System
 * Manages monster battles with 3 timed logic questions
 */
(function () {
    'use strict';
    window.Game = window.Game || {};
    var inBattle = false;
    /**
     * Start a monster battle
     * @param {string} monsterName - Display name of the monster
     * @param {function} onComplete - callback(victory: boolean)
     */
    function startBattle(monsterName, onComplete) {
        if (inBattle) return;
        inBattle = true;
        // Get 3 logic questions
        var questions = Game.Questions.getLogicQuestions(3);
        // Show combat modal — UI handles all the interaction, timer, and scoring
        Game.UI.showCombatModal(monsterName, questions, function (allCorrect, correctCount, firstCorrect) {
            inBattle = false;
            var victory = firstCorrect || allCorrect;
            if (victory) {
                // Victory — monster defeated
                Game.Audio.play('monster_defeat');
                if (onComplete) onComplete(true, firstCorrect);
            } else {
                // Defeat — player takes damage proportional to wrong answers
                var wrongCount = 3 - correctCount;
                var damage = wrongCount * 15; // 15 damage per wrong answer
                Game.Player.takeDamage(damage);
                Game.UI.showDamage();
                if (Game.Player.health <= 0) {
                    // Player lost all health — heal back to 30 and let them retry
                    Game.Player.heal(30);
                    Game.UI.showMessage('You barely survived! Try again with renewed vigor!', 2000, function () {
                        if (onComplete) onComplete(false, false);
                    });
                } else {
                    if (onComplete) onComplete(false, false);
                }
            }
        });
    }
    /* ── Public API ── */
    window.Game.Combat = {
        startBattle: startBattle,
        isInBattle: function () { return inBattle; }
    };
})();
