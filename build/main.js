import update from './update.js';
import { init } from './init.js';
import { startGame } from './startGame.js';
import draw from './draw.js';
(function () {
    var _a = init(), gameEntities = _a.gameEntities, particleEffectManager = _a.particleEffectManager, timeTracker = _a.timeTracker, gameState = _a.gameState;
    startGame(gameEntities, gameState);
    function game(time) {
        if (time === void 0) { time = 0; }
        window.requestAnimationFrame(game);
        timeTracker.trackTime(time);
        while (timeTracker.isTimeBetweenUpdatesOverTimeLimit()) {
            update(gameEntities, particleEffectManager, gameState);
            timeTracker.logUpdate();
        }
        draw(gameEntities, gameState, particleEffectManager);
    }
    game();
})();
//# sourceMappingURL=main.js.map