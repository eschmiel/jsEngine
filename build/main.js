import GameState from './gameState.js';
import update from './update.js';
import { RenderingSystem2 } from './services/rendering/renderingSystem.js';
(function () {
    var gameState = new GameState();
    var renderingSystem2 = new RenderingSystem2(gameState);
    var timeTracker = gameState.timeTracker;
    function game(time) {
        if (time === void 0) { time = 0; }
        window.requestAnimationFrame(game);
        timeTracker.trackTime(time);
        while (timeTracker.isTimeBetweenUpdatesOverTimeLimit()) {
            update(gameState);
            renderingSystem2.run();
            timeTracker.logUpdate();
        }
    }
    game();
})();
//# sourceMappingURL=main.js.map