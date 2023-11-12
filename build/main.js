import GameState from './gameState.js';
import update from './update.js';
import draw from './draw.js';
(function () {
    var gameState = new GameState();
    var timeTracker = gameState.timeTracker;
    function game(time) {
        if (time === void 0) { time = 0; }
        window.requestAnimationFrame(game);
        timeTracker.trackTime(time);
        while (timeTracker.isTimeBetweenUpdatesOverTimeLimit()) {
            update(gameState);
            timeTracker.logUpdate();
        }
        draw(gameState);
    }
    game();
})();
//# sourceMappingURL=main.js.map